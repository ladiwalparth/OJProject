import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

const Layout = () => (
  <div className="min-h-screen bg-slate-900 text-slate-200">
    <div className="max-w-6xl mx-auto px-5 py-6">
      <Header />
      <main className="mt-6"><Outlet /></main>
      <Footer />
    </div>
  </div>
);

export default Layout;