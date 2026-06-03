import weblogo from '../../assets/FinalLogoOJcopy.png';
import { Link, useLocation, useLoaderData } from 'react-router-dom';
import { logoutUser } from '../../service/api';

const Header = () => {
  const { pathname } = useLocation();
  const loader = useLoaderData();
  const link = "text-lg font-medium text-slate-300 hover:text-white transition";
  const nav = "text-lg font-semibold text-slate-200 hover:text-indigo-400 transition";

  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link to="/"><img src={weblogo} alt="Online Judge" className="h-12 w-auto rounded" /></Link>
        <div className="flex items-center gap-4">
          {pathname === "/enter" ? (
            <Link to="/register" className={link}>Register</Link>
          ) : pathname === "/register" ? (
            <Link to="/enter" className={link}>Enter</Link>
          ) : loader?.id ? (
            <>
              <span className="text-slate-400">Hi, <span className="text-white font-semibold">{loader.id}</span></span>
              <button onClick={logoutUser} className="rounded-md bg-slate-700 hover:bg-slate-600 px-3 py-1.5 text-sm font-semibold text-white transition cursor-pointer">Logout</button>
            </>
          ) : (
            <>
              <Link to="/enter" className={link}>Enter</Link>
              <span className="text-slate-600">|</span>
              <Link to="/register" className={link}>Register</Link>
            </>
          )}
        </div>
      </div>
      <nav className="flex items-center gap-6 rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3">
        <Link to="/" className={nav}>Home</Link>
        <Link to="/problemSet" className={nav}>Problems</Link>
        <Link to="/Submissions" className={nav}>My Submissions</Link>
      </nav>
    </header>
  );
};

export default Header;