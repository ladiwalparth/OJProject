import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProblems } from '../../service/api';

const diff = (d) =>
  d === 'Easy' ? 'bg-green-500/15 text-green-400'
  : d === 'Medium' ? 'bg-amber-500/15 text-amber-400'
  : d === 'Hard' ? 'bg-red-500/15 text-red-400'
  : 'bg-slate-600/30 text-slate-300';

const ProblemSet = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  useEffect(() => { (async () => setProblems(await getProblems(navigate) || []))(); }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">Problems</h1>
      <div className="flex flex-col gap-2">
        {problems.map((item) => (
          <Link to={`/submit/${item.code}`} key={item._id}
            className="group flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-indigo-500 px-5 py-4 transition">
            <span className="text-lg font-medium text-slate-200 group-hover:text-white">{item.name}</span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${diff(item.difficulty)}`}>{item.difficulty}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProblemSet;