
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <div className="w-full max-w-[1440px] flex items-center justify-center">
        <div className="w-full max-w-md p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-brand-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-500/30">
              <span className="text-3xl font-black text-white">NGO</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Login</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-center">Enterprise Resource Planning Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">User Identification</label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition dark:text-white font-bold"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Access Token</label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition dark:text-white font-bold"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-4 px-6 rounded-2xl transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-xl shadow-brand-500/20 uppercase tracking-widest text-sm"
            >
              Enter Portal
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <a href="#" className="text-xs font-bold text-brand-600 hover:text-brand-500 transition uppercase tracking-wider">Trouble accessing your account?</a>
          </div>
        </div>
      </div>
    </div>
  );
};
