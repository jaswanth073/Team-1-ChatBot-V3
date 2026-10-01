import React, { useState } from 'react';
import { UserIcon, XIcon } from './Icons';

interface AuthPanelProps {
  onAuthSuccess: (token: string, user: any) => void;
}

const AuthPanel: React.FC<AuthPanelProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const body = isLogin
        ? { email, password }
        : { email, username, password };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred');
        setLoading(false);
        return;
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      onAuthSuccess(data.token, data.user);
    } catch (err) {
      setError('Connection error. Please ensure the backend is running.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8 md:p-16">
      <div className="bg-white rounded-[40px] shadow-2xl max-w-md w-full p-8 md:p-12 my-12 md:my-16 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
            <UserIcon className="w-7 h-7 text-purple-600" />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Email or Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-slate-800"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-slate-800"
                placeholder="Choose a username"
                required
                disabled={loading}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all text-slate-800"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-purple-600 font-bold text-sm hover:text-purple-700 transition-colors"
            disabled={loading}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
