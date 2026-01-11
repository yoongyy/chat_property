
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MessageCircle, LayoutDashboard, Settings, Bell, Rocket, Search, User, Menu, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'AI Search', path: '/', icon: <Search size={18} /> },
    { name: 'Seller Hub', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
              <Rocket size={20} fill="currentColor" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 leading-none tracking-tight">ChatProperty</h1>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Malaysia AI Native</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-2 text-sm font-semibold transition-all duration-200 px-4 py-2 rounded-xl ${
                location.pathname === item.path 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                <User size={14} />
              </div>
              My Account
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-4 rounded-2xl font-semibold ${
                location.pathname === item.path ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#fafbff] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
        <Navbar />
        <main className="pt-24 pb-12">
          <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        <footer className="py-8 border-t border-slate-200/60 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-4">
              <span>© 2025 ChatProperty Malaysia</span>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            </div>
            <div className="flex items-center gap-2 text-indigo-600/70 italic">
              Built with Next-Gen Gemini Architecture
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
