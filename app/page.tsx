'use client';

import React, { useState } from 'react';
import { defaultTeachers, defaultSKConfig } from '@/data/default-teachers';
import { Teacher, SKConfig } from '@/types/sk';
import Navbar from '@/components/Navbar';
import DashboardHome from '@/components/DashboardHome';
import TeacherManager from '@/components/TeacherManager';
import SkConfigForm from '@/components/SkConfigForm';
import CollectiveMatrix from '@/components/CollectiveMatrix';
import CollectiveSKView from '@/components/CollectiveSKView';
import IndividualSKView from '@/components/IndividualSKView';

export default function Page() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);
  const [skConfig, setSkConfig] = useState<SKConfig>(defaultSKConfig);

  const handleResetDefaults = () => {
    if (confirm('Reset data kembali ke data bawaan SMP Negeri 7 Sentani?')) {
      setTeachers(defaultTeachers);
      setSkConfig(defaultSKConfig);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        academicYear={skConfig.academicYear}
        semester={skConfig.semester}
      />

      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <DashboardHome
            setActiveTab={setActiveTab}
            teachers={teachers}
            skConfig={skConfig}
          />
        )}
        {activeTab === 'teachers' && (
          <TeacherManager
            teachers={teachers}
            setTeachers={setTeachers}
            skConfig={skConfig}
            onResetDefaults={handleResetDefaults}
          />
        )}
        {activeTab === 'matrix' && (
          <CollectiveMatrix
            teachers={teachers}
            setTeachers={setTeachers}
            skConfig={skConfig}
          />
        )}
        {activeTab === 'config' && (
          <SkConfigForm
            skConfig={skConfig}
            setSkConfig={setSkConfig}
          />
        )}
        {activeTab === 'collective-sk' && (
          <CollectiveSKView
            teachers={teachers}
            skConfig={skConfig}
          />
        )}
        {activeTab === 'individual-sk' && (
          <IndividualSKView
            teachers={teachers}
            skConfig={skConfig}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 print:hidden">
        <p>© {new Date().getFullYear()} {skConfig.schoolName} · Kabupaten Jayapura, Papua</p>
        <p className="mt-1">Kepala Sekolah: {skConfig.headmasterName} (NIP. {skConfig.headmasterNip})</p>
      </footer>
    </div>
  );
}
