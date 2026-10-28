'use client';

import React from 'react';
import { Users, FileText, Settings, Grid, Award, Printer, ShieldAlert, School } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  academicYear: string;
  semester: string;
}

export default function Navbar({ activeTab, setActiveTab, academicYear, semester }: NavbarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: School },
    { id: 'teachers', label: 'Data Guru', icon: Users },
    { id: 'matrix', label: 'Matriks KBM', icon: Grid },
    { id: 'config', label: 'Pengaturan SK', icon: Settings },
    { id: 'collective-sk', label: 'SK Kolektif', icon: FileText },
    { id: 'individual-sk', label: 'SK Perorangan', icon: Award },
  ];

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow">
              7
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">SMP NEGERI 7 SENTANI</h1>
              <p className="text-xs text-slate-400">
                Aplikasi SK Mengajar & Tugas Tambahan · TP {academicYear} ({semester})
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
              title="Cetak Halaman Aktif"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-slate-300 bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
