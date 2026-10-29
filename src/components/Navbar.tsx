import React from 'react';
import { FlaskConical, BookOpen, CheckSquare, Users, Home } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'metode', label: 'Pilih Metode', icon: FlaskConical },
    { id: 'lab', label: 'Laboratorium 3D', icon: FlaskConical },
    { id: 'lkpd', label: 'LKPD Digital', icon: BookOpen },
    { id: 'evaluasi', label: 'Evaluasi Siswa', icon: CheckSquare },
    { id: 'guru', label: 'Dashboard Guru', icon: Users }
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50 border-b border-teal-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('beranda')}>
            <div className="bg-teal-600 p-2 rounded-lg text-white">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wide text-white block leading-tight">
                LabVirtual <span className="text-teal-400">IPA SMP</span>
              </span>
              <span className="text-xs text-slate-300">Pemisahan Campuran</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-600 text-white shadow'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
