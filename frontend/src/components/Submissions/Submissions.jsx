import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubmissions } from '../../service/api';

const vstyle = (v) =>
  v === 'Accepted' ? 'bg-green-500/15 text-green-400'
  : v === 'Wrong Answer' ? 'bg-red-500/15 text-red-400'
  : v === 'Time Limit Exceeded' ? 'bg-amber-500/15 text-amber-400'
  : 'bg-orange-500/15 text-orange-400';

const Submissions = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => { (async () => setSubmissions(await getSubmissions(navigate) || []))(); }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">My Submissions</h1>
      {submissions.length === 0 && <p className="text-slate-400">No submissions yet.</p>}
      <div className="flex flex-col gap-2">
        {submissions.map((item) => (
          <div key={item._id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-5 py-4">
            <span className="text-lg font-medium text-slate-200">{item.problem}</span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${vstyle(item.verdict)}`}>{item.verdict}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submissions;