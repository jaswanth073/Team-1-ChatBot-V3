import React, { useState, useEffect, useCallback } from 'react';
import { XIcon } from './Icons';

interface ChatEntry {
  id: string;
  message: any;
  chat_type: 'normal' | 'parental';
  timestamp: string;
}

interface ChatHistoryProps {
  onClose: () => void;
  token: string;
  onLoadChat?: (messages: any[]) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ onClose, token, onLoadChat }) => {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('http://localhost:5000/chat-history', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      if (Array.isArray(data)) {
        setHistory(data.reverse()); // Most recent first
      } else {
        setHistory([]);
      }
    } catch (err: any) {
      console.error('Error loading chat history:', err);
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setError('Could not connect to server. Please make sure the backend is running.');
      } else {
        setError(`Failed to load chat history: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return 'Unknown date';
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Unknown date';
    }
  };

  const getMessagePreview = (message: any) => {
    if (typeof message === 'string') {
      return message.substring(0, 100) + (message.length > 100 ? '...' : '');
    }
    if (Array.isArray(message)) {
      const userMsg = message.find((m: any) => m.role === 'user');
      if (userMsg) {
        return userMsg.content.substring(0, 100) + '...';
      }
    }
    return 'Chat session';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8 md:p-16 overflow-y-auto">
      <div className="bg-white rounded-[40px] shadow-2xl max-w-3xl w-full p-8 md:p-12 my-16 md:my-20 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Chat History
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={loadHistory}
              disabled={loading}
              className="p-3 hover:bg-purple-50 rounded-full transition-colors text-purple-600 disabled:opacity-50"
              title="Refresh history"
            >
              <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-3 hover:bg-slate-100 rounded-full transition-colors"
            >
              <XIcon className="w-6 h-6 text-slate-500" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Loading your chat history...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-slate-700 text-lg font-semibold mb-2">Unable to load history</p>
            <p className="text-slate-500 mb-6">{error}</p>
            <button
              onClick={loadHistory}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg"
            >
              🔄 Try Again
            </button>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No chat history yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => {
                  if (onLoadChat && typeof entry.message === 'object') {
                    onLoadChat(entry.message);
                    onClose();
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      entry.chat_type === 'parental' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {entry.chat_type === 'parental' ? '👨‍👩‍👧 Parental' : '💬 Normal'}
                    </span>
                  </div>
                  <span className="text-sm text-slate-500">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {getMessagePreview(entry.message)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
