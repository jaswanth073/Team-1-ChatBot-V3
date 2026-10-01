import React from 'react';
import { LogoIcon, XIcon } from './Icons';

interface SafetyGuidelinesProps {
  onClose: () => void;
}

const SafetyGuidelines: React.FC<SafetyGuidelinesProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8 md:p-16 overflow-y-auto">
      <div className="bg-white rounded-[40px] shadow-2xl max-w-3xl w-full p-8 md:p-12 my-16 md:my-20 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
              <LogoIcon className="w-7 h-7 text-purple-600" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Safety Guidelines
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-full transition-colors"
          >
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <div className="space-y-8 text-slate-700">
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              🚨 Emergency Situations
            </h3>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <p className="font-bold text-red-900 mb-3">
                Call Emergency Services (108) Immediately if you experience:
              </p>
              <ul className="space-y-2 ml-5">
                <li className="list-disc">Chest pain or pressure</li>
                <li className="list-disc">Difficulty breathing or shortness of breath</li>
                <li className="list-disc">Sudden numbness or weakness (especially on one side)</li>
                <li className="list-disc">Severe bleeding that won't stop</li>
                <li className="list-disc">Signs of stroke (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call)</li>
                <li className="list-disc">Loss of consciousness</li>
                <li className="list-disc">Severe allergic reactions</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              ⚕️ What This AI Can and Cannot Do
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h4 className="font-bold text-green-900 mb-3">✓ Can Do:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="list-disc ml-5">Provide general health information</li>
                  <li className="list-disc ml-5">Help document your symptoms</li>
                  <li className="list-disc ml-5">Suggest when to seek medical care</li>
                  <li className="list-disc ml-5">Analyze skin images for educational purposes</li>
                  <li className="list-disc ml-5">Offer lifestyle and wellness tips</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h4 className="font-bold text-red-900 mb-3">✗ Cannot Do:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="list-disc ml-5">Replace professional medical diagnosis</li>
                  <li className="list-disc ml-5">Prescribe medications</li>
                  <li className="list-disc ml-5">Provide definitive diagnoses</li>
                  <li className="list-disc ml-5">Handle medical emergencies</li>
                  <li className="list-disc ml-5">Replace your doctor or healthcare provider</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              🔒 Privacy & Data Security
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Your chat history and personal data are stored securely and locally</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Images you upload are analyzed but not stored permanently</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Your information is never shared with third parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>All passwords are hashed and encrypted</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              👶 Parental Guidance for Minors
            </h3>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <p className="mb-3">
                <strong>For users under 18:</strong> This service requires parental supervision.
                Use the "Parental Chat" mode where parents/guardians can input information on behalf of minors.
              </p>
              <p className="text-sm text-slate-600">
                Parents should always consult with a pediatrician for any health concerns regarding their children.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              📋 Best Practices
            </h3>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="font-bold">1.</span>
                  <span>Be honest and detailed when describing symptoms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">2.</span>
                  <span>Upload clear, well-lit photos for skin analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">3.</span>
                  <span>Follow up with a healthcare provider for persistent or concerning symptoms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">4.</span>
                  <span>Use the emergency request feature to contact our clinical team for urgent matters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">5.</span>
                  <span>Keep your account information secure and don't share your password</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              ⚠️ Disclaimer
            </h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <p className="text-sm leading-relaxed">
                HealthAssist AI is an educational and informational tool designed to assist with preliminary health assessments.
                It is <strong>NOT a substitute for professional medical advice, diagnosis, or treatment</strong>.
                Always seek the advice of your physician or other qualified health provider with any questions you may have
                regarding a medical condition. Never disregard professional medical advice or delay in seeking it because
                of something you have read or received from this AI assistant.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;
