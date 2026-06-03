import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { uploadData } from '../../service/api.js';

const Register = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      dob: e.target.dob.value,
      userId: e.target.userId.value,
    };
    try { await uploadData(formData, navigate); } catch (err) { console.log(err.message); }
  };

  const field = "w-full rounded-md border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-500 px-4 py-3 outline-none focus:border-indigo-500 transition";

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-2xl font-bold text-white mb-6">Create your account</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800/50 p-8 flex flex-col gap-4">
        <input name="fullName" placeholder="Full name" className={field} required />
        <input name="email" type="email" placeholder="Email" className={field} required />
        <div className="relative">
          <input name="password" type={showPw ? "text" : "password"} placeholder="Password" className={field} required />
          <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-200">
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        <input name="dob" type="date" className={field} required />
        <input name="userId" placeholder="User ID" className={field} required />
        <button className="rounded-md bg-indigo-600 hover:bg-indigo-500 py-3 font-semibold text-white transition">Register</button>
      </form>
      <Link to="/enter" className="mt-4 text-indigo-400 hover:text-indigo-300">Already a user? Enter</Link>
    </div>
  );
};

export default Register;