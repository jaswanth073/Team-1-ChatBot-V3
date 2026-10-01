import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import json
import hashlib
import uuid
from datetime import datetime
from functools import wraps
import threading

from tensorflow import keras
from tensorflow.keras.layers import (
    GlobalAveragePooling2D,
    BatchNormalization,
    Dense,
    Dropout
)
from tensorflow.keras.applications import MobileNetV2, ResNet50
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input as mobilenet_preprocess
from tensorflow.keras.applications.resnet50 import preprocess_input as resnet_preprocess

# Suppress TF logs
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

app = Flask(__name__)
CORS(app)

# ===========================
# Data storage - use absolute paths based on this file's location
# ===========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')

USERS_FILE = os.path.join(DATA_DIR, 'users.json')
CHAT_HISTORY_FILE = os.path.join(DATA_DIR, 'chat_history.json')
USER_PROFILES_FILE = os.path.join(DATA_DIR, 'user_profiles.json')
PARENTAL_PROFILES_FILE = os.path.join(DATA_DIR, 'parental_profiles.json')
EMERGENCY_REQUESTS_FILE = os.path.join(DATA_DIR, 'emergency_requests.json')
FEEDBACK_FILE = os.path.join(DATA_DIR, 'feedback.json')

# Initialize data directory
os.makedirs(DATA_DIR, exist_ok=True)

# File lock for thread-safe JSON read/write
_file_locks = {}
_lock_mutex = threading.Lock()

def _get_lock(filepath):
    """Get or create a lock for a specific file."""
    with _lock_mutex:
        if filepath not in _file_locks:
            _file_locks[filepath] = threading.Lock()
        return _file_locks[filepath]


# Helper functions for JSON storage (thread-safe with atomic writes)
def load_json(filepath):
    lock = _get_lock(filepath)
    with lock:
        if os.path.exists(filepath):
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError) as e:
                print(f"⚠️ Error reading {filepath}: {e}")
                # Try to recover from backup
                backup = filepath + '.bak'
                if os.path.exists(backup):
                    try:
                        with open(backup, 'r', encoding='utf-8') as f:
                            return json.load(f)
                    except Exception:
                        pass
                return {}
        return {}

def save_json(filepath, data):
    """Atomically save JSON data — write to temp file, then rename."""
    lock = _get_lock(filepath)
    with lock:
        tmp_path = filepath + '.tmp'
        backup_path = filepath + '.bak'
        try:
            # Write to temp file first
            with open(tmp_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            # Create backup of existing file
            if os.path.exists(filepath):
                try:
                    if os.path.exists(backup_path):
                        os.remove(backup_path)
                    os.rename(filepath, backup_path)
                except OSError:
                    pass
            
            # Rename temp to actual file (atomic on same filesystem)
            os.rename(tmp_path, filepath)
        except Exception as e:
            print(f"❌ Error saving {filepath}: {e}")
            # Cleanup temp file on error
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
            raise

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token():
    return str(uuid.uuid4())

# Helper: extract user_id from token
def get_user_id_from_token(token):
    """Validates token and returns user_id, or None if invalid."""
    if not token:
        return None
    users = load_json(USERS_FILE)
    for user_data in users.values():
        if user_data.get('token') == token:
            return user_data['id']
    return None


IMG_SIZE = 224
NUM_CLASSES = 5

# =========================
# Class Labels
# =========================

class_names = [
    "BCC",                     # 0
    "Eczema",                  # 1
    "Melanoma",                # 2
    "Seborrheic_Keratosis",    # 3
    "Tinea"                    # 4
]

# =========================
# Build MobileNet Model
# =========================

def build_mobilenet():
    base_model = MobileNetV2(
        weights=None,
        include_top=False,
        input_shape=(224, 224, 3)
    )

    inputs = keras.Input(shape=(224, 224, 3))
    x = base_model(inputs)
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    outputs = Dense(NUM_CLASSES, activation='softmax')(x)

    model = keras.Model(inputs, outputs)
    return model


# =========================
# Build ResNet Model
# =========================

def build_resnet():
    base_model = ResNet50(
        weights=None,
        include_top=False,
        input_shape=(224, 224, 3)
    )

    inputs = keras.Input(shape=(224, 224, 3))
    x = base_model(inputs)
    x = GlobalAveragePooling2D()(x)
    x = BatchNormalization()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    outputs = Dense(NUM_CLASSES, activation='softmax')(x)

    model = keras.Model(inputs, outputs)
    return model


# =========================
# Load Models
# =========================

try:
    models_dir = os.path.join(BASE_DIR, 'models')
    
    mobilenet_model = build_mobilenet()
    mobilenet_model.load_weights(os.path.join(models_dir, "mobilenet_model.weights.h5"))

    resnet_model = build_resnet()
    resnet_model.load_weights(os.path.join(models_dir, "resnet_model.weights.h5"))

    print("✅ Both models loaded successfully!")

except Exception as e:
    print("❌ Model loading failed:", e)
    exit()


# =========================
# Image Preprocessing
# =========================

def prepare_image(img):
    img = img.resize((IMG_SIZE, IMG_SIZE))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array


# =========================
# Prediction Logic
# =========================

def ensemble_predict(img):

    img_array = prepare_image(img)

    # MobileNet prediction
    mob_input = mobilenet_preprocess(img_array.copy())
    mob_preds = mobilenet_model.predict(mob_input, verbose=0)[0]
    mob_idx = np.argmax(mob_preds)
    mob_conf = mob_preds[mob_idx]

    # ResNet prediction
    res_input = resnet_preprocess(img_array.copy())
    res_preds = resnet_model.predict(res_input, verbose=0)[0]
    res_idx = np.argmax(res_preds)
    res_conf = res_preds[res_idx]

    # =========================
    # Majority / Confidence Logic
    # =========================

    # Case 1: Both agree
    if mob_idx == res_idx:
        final_idx = mob_idx
        final_conf = max(mob_conf, res_conf)

    # Case 2: Disagree → pick higher confidence
    else:
        if mob_conf > res_conf:
            final_idx = mob_idx
            final_conf = mob_conf
        else:
            final_idx = res_idx
            final_conf = res_conf

    return class_names[final_idx], float(final_conf)


# =========================
# API Route
# =========================


@app.route("/predict", methods=["POST"])
def predict():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        file = request.files["file"]
        img = Image.open(file.stream).convert("RGB")

        label, confidence = ensemble_predict(img)

        return jsonify({
            "prediction": label,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# Authentication Routes
# =========================

@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.json
        email = data.get('email', '').strip().lower()
        username = data.get('username', '').strip()
        password = data.get('password', '')

        if not email or not username or not password:
            return jsonify({"error": "All fields are required"}), 400

        users = load_json(USERS_FILE)

        # Check if user exists
        if email in users:
            return jsonify({"error": "Email already registered"}), 400

        # Check if username exists
        for user_data in users.values():
            if user_data.get('username') == username:
                return jsonify({"error": "Username already taken"}), 400

        # Create new user
        user_id = str(uuid.uuid4())
        token = generate_token()
        users[email] = {
            'id': user_id,
            'username': username,
            'password': hash_password(password),
            'token': token,
            'created_at': datetime.now().isoformat()
        }

        save_json(USERS_FILE, users)

        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user_id,
                'username': username,
                'email': email
            }
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email_or_username = data.get('email', '').strip().lower()
        password = data.get('password', '')

        if not email_or_username or not password:
            return jsonify({"error": "Email/username and password are required"}), 400

        users = load_json(USERS_FILE)
        
        # Find user by email or username
        user_data = None
        user_email = None
        
        # Try as email first
        if email_or_username in users:
            user_data = users[email_or_username]
            user_email = email_or_username
        else:
            # Search by username
            for email, data in users.items():
                if data.get('username', '').lower() == email_or_username:
                    user_data = data
                    user_email = email
                    break

        if not user_data:
            return jsonify({"error": "Invalid credentials"}), 401

        # Verify password
        if user_data['password'] != hash_password(password):
            return jsonify({"error": "Invalid credentials"}), 401

        # Generate new token
        token = generate_token()
        user_data['token'] = token
        users[user_email] = user_data
        save_json(USERS_FILE, users)

        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user_data['id'],
                'username': user_data['username'],
                'email': user_email
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# User Profile Routes
# =========================

@app.route("/profile", methods=["GET", "POST"])
def user_profile():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = get_user_id_from_token(token)
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        profiles = load_json(USER_PROFILES_FILE)

        if request.method == "GET":
            profile = profiles.get(user_id, {})
            return jsonify(profile), 200

        elif request.method == "POST":
            data = request.json
            age = data.get('age')
            biological_sex = data.get('biological_sex', '').strip()

            # Validate age (1-120 range to match frontend)
            if age:
                try:
                    age_int = int(age)
                    if age_int < 1 or age_int > 120:
                        return jsonify({"error": "The age entered appears to be invalid. Please enter a valid age between 1 and 120."}), 400
                    elif 1 <= age_int < 18:
                        return jsonify({
                            "error": "Age restriction: You are under 18. Please ask your parents to consult on your behalf.",
                            "age_restricted": True
                        }), 400
                except ValueError:
                    return jsonify({"error": "Please enter a valid numeric age"}), 400

            # Normalize biological sex
            if biological_sex:
                biological_sex_lower = biological_sex.lower()
                if 'male' in biological_sex_lower and 'female' not in biological_sex_lower:
                    biological_sex = 'Male'
                elif 'female' in biological_sex_lower:
                    biological_sex = 'Female'
                else:
                    biological_sex = biological_sex.capitalize()

            # Get existing profile or create new one
            if user_id not in profiles:
                profiles[user_id] = {}
            
            # Only update fields that have values (preserve existing data)
            if age:
                profiles[user_id]['age'] = age
            if biological_sex:
                profiles[user_id]['biological_sex'] = biological_sex
            
            profiles[user_id]['updated_at'] = datetime.now().isoformat()

            save_json(USER_PROFILES_FILE, profiles)

            return jsonify({
                'success': True,
                'profile': profiles[user_id]
            }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# Parental Chat Routes
# =========================

@app.route("/parental-profile", methods=["GET", "POST"])
def parental_profile():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = get_user_id_from_token(token)
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        parental_profiles = load_json(PARENTAL_PROFILES_FILE)

        if request.method == "GET":
            profile = parental_profiles.get(user_id, {})
            return jsonify(profile), 200

        elif request.method == "POST":
            data = request.json
            child_age = data.get('child_age')
            child_biological_sex = data.get('child_biological_sex', '').strip()
            child_relation = data.get('child_relation', 'son/daughter')

            # Validate child age
            if child_age:
                try:
                    age_int = int(child_age)
                    if age_int < 1 or age_int > 17:
                        return jsonify({"error": "Please enter a valid age between 1 and 17 for parental mode"}), 400
                except ValueError:
                    return jsonify({"error": "Please enter a valid numeric age"}), 400

            # Normalize biological sex
            if child_biological_sex:
                sex_lower = child_biological_sex.lower()
                if 'male' in sex_lower and 'female' not in sex_lower:
                    child_biological_sex = 'Male'
                elif 'female' in sex_lower:
                    child_biological_sex = 'Female'
                else:
                    child_biological_sex = child_biological_sex.capitalize()

            # Get existing parental profile or create new one
            if user_id not in parental_profiles:
                parental_profiles[user_id] = {}
            
            # Only update fields that have values (preserve existing data)
            if child_age:
                parental_profiles[user_id]['child_age'] = child_age
            if child_biological_sex:
                parental_profiles[user_id]['child_biological_sex'] = child_biological_sex
            if child_relation:
                parental_profiles[user_id]['child_relation'] = child_relation
            
            parental_profiles[user_id]['updated_at'] = datetime.now().isoformat()

            save_json(PARENTAL_PROFILES_FILE, parental_profiles)

            return jsonify({
                'success': True,
                'profile': parental_profiles[user_id]
            }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# Chat History Routes
# =========================

@app.route("/chat-history", methods=["GET", "POST", "DELETE"])
def chat_history():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = get_user_id_from_token(token)
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        all_history = load_json(CHAT_HISTORY_FILE)

        if request.method == "GET":
            user_chats = all_history.get(user_id, [])
            return jsonify(user_chats), 200

        elif request.method == "POST":
            data = request.json
            message = data.get('message')
            chat_type = data.get('chat_type', 'normal')  # normal or parental

            if not message:
                return jsonify({"error": "Message is required"}), 400

            if user_id not in all_history:
                all_history[user_id] = []

            # Smart deduplication: if the new message array is a superset
            # of the last saved entry, UPDATE it instead of creating a new entry.
            # This prevents duplicate growing copies of the same conversation.
            updated_existing = False
            if isinstance(message, list) and len(all_history[user_id]) > 0:
                last_entry = all_history[user_id][-1]
                last_msg = last_entry.get('message', [])
                
                if isinstance(last_msg, list) and len(message) > len(last_msg):
                    # Check if the new messages start with the same content as the last saved entry
                    # by comparing the first message IDs
                    if (len(last_msg) > 0 and len(message) > 0 and
                        last_msg[0].get('id') == message[0].get('id')):
                        # This is a continuation of the same conversation — update in place
                        last_entry['message'] = message
                        last_entry['timestamp'] = datetime.now().isoformat()
                        last_entry['chat_type'] = chat_type
                        updated_existing = True
            
            if not updated_existing:
                chat_entry = {
                    'id': str(uuid.uuid4()),
                    'message': message,
                    'chat_type': chat_type,
                    'timestamp': datetime.now().isoformat()
                }
                all_history[user_id].append(chat_entry)

            save_json(CHAT_HISTORY_FILE, all_history)

            return jsonify({
                'success': True,
                'chat': all_history[user_id][-1]
            }), 200

        elif request.method == "DELETE":
            # Allow deleting a specific chat entry or all history
            data = request.json or {}
            chat_id = data.get('chat_id')
            
            if chat_id:
                # Delete specific entry
                if user_id in all_history:
                    all_history[user_id] = [
                        entry for entry in all_history[user_id] 
                        if entry.get('id') != chat_id
                    ]
                    save_json(CHAT_HISTORY_FILE, all_history)
                return jsonify({'success': True, 'message': 'Chat entry deleted'}), 200
            else:
                # Delete all history for user
                if user_id in all_history:
                    all_history[user_id] = []
                    save_json(CHAT_HISTORY_FILE, all_history)
                return jsonify({'success': True, 'message': 'All chat history cleared'}), 200

    except Exception as e:
        print(f"❌ Chat history error: {e}")
        return jsonify({"error": str(e)}), 500


# =========================
# Emergency Request Routes
# =========================

@app.route("/emergency-request", methods=["GET", "POST", "PUT"])
def emergency_request():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = get_user_id_from_token(token)
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        emergency_requests = load_json(EMERGENCY_REQUESTS_FILE)

        if request.method == "GET":
            user_requests = [req for req in emergency_requests.values() if req['user_id'] == user_id]
            return jsonify(user_requests), 200

        elif request.method == "POST":
            data = request.json
            address = data.get('address', '').strip()
            problem = data.get('problem', '').strip()

            if not address or not problem:
                return jsonify({"error": "Address and problem description are required"}), 400

            request_id = str(uuid.uuid4())
            emergency_requests[request_id] = {
                'id': request_id,
                'user_id': user_id,
                'address': address,
                'problem': problem,
                'status': 'pending',  # pending, en_route, reached, cancelled
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat()
            }

            save_json(EMERGENCY_REQUESTS_FILE, emergency_requests)

            return jsonify({
                'success': True,
                'request': emergency_requests[request_id]
            }), 201

        elif request.method == "PUT":
            data = request.json
            request_id = data.get('request_id')
            status = data.get('status')  # reached or cancelled

            if not request_id or status not in ['reached', 'cancelled']:
                return jsonify({"error": "Valid request_id and status required"}), 400

            if request_id not in emergency_requests:
                return jsonify({"error": "Request not found"}), 404

            if emergency_requests[request_id]['user_id'] != user_id:
                return jsonify({"error": "Unauthorized"}), 403

            emergency_requests[request_id]['status'] = status
            emergency_requests[request_id]['updated_at'] = datetime.now().isoformat()

            save_json(EMERGENCY_REQUESTS_FILE, emergency_requests)

            return jsonify({
                'success': True,
                'request': emergency_requests[request_id]
            }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Feedback Routes
# =========================

@app.route("/feedback", methods=["POST"])
def submit_feedback():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({"error": "Unauthorized"}), 401

        users = load_json(USERS_FILE)
        username = None
        for user, user_data in users.items():
            if user_data.get('token') == token:
                username = user
                break

        if not username:
            return jsonify({"error": "Invalid token"}), 401

        data = request.json
        rating = data.get('rating')
        comment = data.get('comment', '').strip()

        if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
            return jsonify({"error": "Valid rating (1-5) is required"}), 400

        feedback_data = load_json(FEEDBACK_FILE)
        
        feedback_id = str(uuid.uuid4())
        feedback_data[feedback_id] = {
            'id': feedback_id,
            'username': username,
            'rating': rating,
            'comment': comment,
            'timestamp': datetime.now().isoformat()
        }

        save_json(FEEDBACK_FILE, feedback_data)

        return jsonify({
            'success': True,
            'message': 'Thank you for your feedback!'
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# =========================
# Run Server
# =========================

if __name__ == "__main__":
    print(f"📁 Data directory: {DATA_DIR}")
    print(f"📁 Models directory: {os.path.join(BASE_DIR, 'models')}")
    app.run(debug=True)
