import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { enterData } from '../../service/api';

const Enter = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { userId: e.target.userId.value, password: e.target.password.value };
    try { await enterData(formData, navigate); } catch (err) { console.log(err.message); }
  };

  const field = "w-full rounded-md border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-500 px-4 py-3 outline-none focus:border-indigo-500 transition";

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="text-2xl font-bold text-white mb-6">Welcome back</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800/50 p-8 flex flex-col gap-4">
        <input name="userId" placeholder="User ID" className={field} required />
        <div className="relative">
          <input name="password" type={showPw ? "text" : "password"} placeholder="Password" className={field} required />
          <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-200">
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        <button className="rounded-md bg-indigo-600 hover:bg-indigo-500 py-3 font-semibold text-white transition">Enter</button>
      </form>
      <Link to="/register" className="mt-4 text-indigo-400 hover:text-indigo-300">Don't have an account? Register</Link>
    </div>
  );
};

export default Enter;