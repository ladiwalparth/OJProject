import { Link } from 'react-router-dom';

const cards = [
  ["🛡️ Sandboxed Judge", "User code compiles and runs inside a Dockerized service with per-run time and memory limits, returning verdicts: Accepted, Wrong Answer, TLE, Compilation/Runtime Error."],
  ["🔐 Secure Auth", "JWT stored in HTTP-only cookies, with bcrypt-hashed passwords."],
  ["🤖 AI Code Review", "Google Gemini gives hint-style feedback on submissions without revealing the full solution."],
  ["⚙️ Monorepo + Cloud", "React (Vite) on Vercel, Node/Express on Render, MongoDB Atlas, and a separate compiler service."],
];

const Home = () => (
  <div className="text-slate-200">
    <section className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-10">
      <h1 className="text-4xl font-bold text-white mb-3">Hi, I'm Parth Ladiwal 👋</h1>
      <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
        Software developer focused on problem-solving, full-stack development, and competitive programming.
        Final-year B.Tech (ECE) at LNMIIT, 600+ DSA problems solved across Codeforces, LeetCode, and CodeChef.
        This site is a full-stack Online Judge I built end to end.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/problemSet" className="rounded-md bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 font-semibold text-white transition">Solve Problems</Link>
        <a href="https://github.com/ladiwalparth/OJProject" target="_blank" rel="noreferrer" className="rounded-md border border-slate-600 hover:border-slate-400 px-5 py-2.5 font-semibold text-slate-200 transition">View Source</a>
      </div>
    </section>

    <section className="mt-8 grid md:grid-cols-2 gap-4">
      {cards.map(([t, b]) => (
        <div key={t} className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
          <h3 className="text-lg font-semibold text-white mb-1">{t}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{b}</p>
        </div>
      ))}
    </section>

    <section className="mt-8">
      <h2 className="text-xl font-semibold text-white mb-3">🔗 Profiles</h2>
      <div className="flex flex-wrap gap-3">
        <a href="https://github.com/ladiwalparth" target="_blank" rel="noreferrer" className="rounded-md border border-slate-700 hover:border-indigo-500 px-4 py-2 transition">GitHub</a>
        <a href="https://leetcode.com/ladiwalparth" target="_blank" rel="noreferrer" className="rounded-md border border-slate-700 hover:border-indigo-500 px-4 py-2 transition">LeetCode</a>
        <a href="https://codeforces.com/profile/ladiwalparth" target="_blank" rel="noreferrer" className="rounded-md border border-slate-700 hover:border-indigo-500 px-4 py-2 transition">Codeforces</a>
      </div>
    </section>
  </div>
);

export default Home;