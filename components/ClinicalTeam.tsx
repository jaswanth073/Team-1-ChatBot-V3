import React, { useState, useEffect } from 'react';
import { XIcon } from './Icons';

interface EmergencyRequest {
  id: string;
  address: string;
  problem: string;
  status: 'pending' | 'en_route' | 'reached' | 'cancelled';
  created_at: string;
  updated_at: string;
}

interface ClinicalTeamProps {
  onClose: () => void;
  token: string;
}

const ClinicalTeam: React.FC<ClinicalTeamProps> = ({ onClose, token }) => {
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [address, setAddress] = useState('');
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [activeRequest, setActiveRequest] = useState<EmergencyRequest | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/emergency-request', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setRequests(data);
        // Find any active request (pending or en_route)
        const active = data.find((req: EmergencyRequest) => 
          req.status === 'pending' || req.status === 'en_route'
        );
        if (active) {
          setActiveRequest(active);
        }
      }
    } catch (err) {
      console.error('Error loading requests:', err);
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/emergency-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ address, problem }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit request');
        setLoading(false);
        return;
      }

      setActiveRequest(data.request);
      setShowEmergencyForm(false);
      setAddress('');
      setProblem('');
      loadRequests();
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, status: 'reached' | 'cancelled') => {
    try {
      const response = await fetch('http://localhost:5000/emergency-request', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ request_id: requestId, status }),
      });

      if (response.ok) {
        setActiveRequest(null);
        loadRequests();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8 md:p-16 overflow-y-auto">
      <div className="bg-white rounded-[40px] shadow-2xl max-w-3xl w-full p-8 md:p-12 my-16 md:my-20 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Clinical Team
            </h2>
            <p className="text-slate-500 text-lg">
              Connect with our medical professionals for urgent care
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-full transition-colors"
          >
            <XIcon className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Active Emergency Request Display */}
        {activeRequest && (
          <div className="mb-8 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-8 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-red-900 mb-2">
                  🚨 Emergency Request Active
                </h3>
                <p className="text-red-700 font-medium">
                  Status: {activeRequest.status === 'pending' ? '📞 Request Received' : '🚑 Ambulance En Route'}
                </p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="bg-white/60 rounded-2xl p-4">
                <p className="text-sm font-bold text-slate-700 mb-1">Address:</p>
                <p className="text-lg text-slate-900">{activeRequest.address}</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-4">
                <p className="text-sm font-bold text-slate-700 mb-1">Problem:</p>
                <p className="text-lg text-slate-900">{activeRequest.problem}</p>
              </div>
            </div>

            <div className="bg-white/80 rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="font-bold text-slate-900">Our clinical team has been notified</p>
              </div>
              <p className="text-slate-600 text-sm">
                {activeRequest.status === 'pending' 
                  ? 'Medical professionals are reviewing your request and will dispatch assistance shortly.'
                  : 'An ambulance is on the way to your location. Please stay calm and keep your phone nearby.'}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleUpdateStatus(activeRequest.id, 'reached')}
                className="flex-1 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all"
              >
                Mark as Reached
              </button>
              <button
                onClick={() => handleUpdateStatus(activeRequest.id, 'cancelled')}
                className="flex-1 py-4 bg-slate-600 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all"
              >
                Cancel Request
              </button>
            </div>
          </div>
        )}

        {/* Emergency Request Button */}
        {!activeRequest && !showEmergencyForm && (
          <div className="mb-8">
            <button
              onClick={() => setShowEmergencyForm(true)}
              className="w-full py-6 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-3xl hover:from-red-600 hover:to-orange-600 transition-all shadow-xl text-xl"
            >
              🚨 Request Emergency Assistance
            </button>
          </div>
        )}

        {/* Emergency Request Form */}
        {showEmergencyForm && !activeRequest && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-red-900 mb-4">
              Emergency Request Form
            </h3>
            <p className="text-red-700 mb-6">
              If this is a life-threatening emergency, please call <a href="tel:108" className="font-extrabold underline">108</a> immediately.
              Use this form for urgent medical assistance that requires clinical team support.
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-2xl">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmitRequest} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Your Address / Location
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-red-200 rounded-2xl outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all"
                  placeholder="Enter complete address for ambulance dispatch"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Describe the Problem
                </label>
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-red-200 rounded-2xl outline-none focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all min-h-[120px]"
                  placeholder="Describe the medical emergency or urgent situation"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 disabled:opacity-50 transition-all"
                >
                  {loading ? 'Submitting...' : 'Send Emergency Request'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmergencyForm(false);
                    setError('');
                  }}
                  className="px-6 py-4 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Clinical Team Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Our Clinical Team</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-3xl p-6">
              <h4 className="font-bold text-purple-900 mb-3 text-lg">👨‍⚕️ Medical Professionals</h4>
              <p className="text-slate-700 text-sm">
                Our team consists of board-certified physicians, nurses, and emergency medical technicians
                available to respond to urgent health situations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-6">
              <h4 className="font-bold text-green-900 mb-3 text-lg">⏱️ Response Time</h4>
              <p className="text-slate-700 text-sm">
                Emergency requests are processed immediately. Our dispatch team works 24/7 to ensure
                rapid response to your medical needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-3xl p-6">
              <h4 className="font-bold text-orange-900 mb-3 text-lg">🚑 Ambulance Service</h4>
              <p className="text-slate-700 text-sm">
                When you submit an emergency request, our team coordinates with local ambulance services
                to reach you as quickly as possible.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">📞 24/7 Support — Call 108</h4>
              <p className="text-slate-700 text-sm mb-3">
                Our clinical team is available around the clock to assist with your health concerns
                and coordinate emergency medical care when needed.
              </p>
              <a href="tel:108" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg text-sm">
                📞 Call 108 Now
              </a>
            </div>
          </div>
        </div>

        {/* Request History */}
        {requests.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Previous Requests</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {requests.filter(req => req.status === 'reached' || req.status === 'cancelled').map((req) => (
                <div key={req.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{req.address}</p>
                      <p className="text-sm text-slate-600">{new Date(req.created_at).toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      req.status === 'reached' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {req.status === 'reached' ? '✓ Reached' : '✗ Cancelled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicalTeam;
