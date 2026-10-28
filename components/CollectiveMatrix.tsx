'use client';

import React, { useState } from 'react';
import { Teacher, SKConfig } from '../types/sk';
import { Grid, Search, Plus, Save, CheckCircle2 } from 'lucide-react';

interface CollectiveMatrixProps {
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  skConfig: SKConfig;
}

export default function CollectiveMatrix({ teachers, setTeachers, skConfig }: CollectiveMatrixProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHourChange = (teacherId: string, className: string, value: string) => {
    const val = parseInt(value) || 0;
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === teacherId) {
          const updatedClasses = { ...t.classes };
          if (val === 0) {
            delete updatedClasses[className];
          } else {
            updatedClasses[className] = val;
          }
          return { ...t, classes: updatedClasses };
        }
        return t;
      })
    );
  };

  const handleDutyChange = (teacherId: string, duty: string) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, additionalDuty: duty } : t))
    );
  };

  const handleDutyHoursChange = (teacherId: string, hours: number) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, additionalHours: hours } : t))
    );
  };

  const handleSave = () => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-[98%] mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Matriks Pembagian Tugas Mengajar & Tugas Tambahan</h2>
          <p className="text-sm text-slate-600">
            Matriks kolektif alokasi jam pelajaran per kelas dan tugas tambahan guru SMP Negeri 7 Sentani Tahun Pelajaran {skConfig.academicYear}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {successMsg && (
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Perubahan Tersimpan
            </span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 shadow transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Matriks</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari guru atau mata pelajaran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>
      </div>

      {/* Large Matrix Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
          <thead>
            <tr className="bg-slate-900 text-white text-center font-semibold">
              <th className="p-3 border border-slate-700 w-12 sticky left-0 z-20 bg-slate-900">No</th>
              <th className="p-3 border border-slate-700 text-left sticky left-12 z-20 bg-slate-900 min-w-[200px]">Nama Guru & NIP</th>
              <th className="p-3 border border-slate-700 min-w-[140px]">Mata Pelajaran</th>
              {skConfig.classesList.map((cls) => (
                <th key={cls} className="p-3 border border-slate-700 w-16">
                  {cls}
                </th>
              ))}
              <th className="p-3 border border-slate-700 min-w-[160px]">Tugas Tambahan</th>
              <th className="p-3 border border-slate-700 w-20">Jam Tambahan</th>
              <th className="p-3 border border-slate-700 w-20">Total Jam</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            {filteredTeachers.map((t, idx) => {
              const teachingSum = Object.values(t.classes || {}).reduce((a, b) => a + (b || 0), 0);
              const totalHours = teachingSum + (t.additionalHours || 0);
              return (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-2 border border-slate-200 text-center font-medium sticky left-0 bg-white z-10">{idx + 1}</td>
                  <td className="p-2 border border-slate-200 sticky left-12 bg-white z-10">
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-slate-500 text-[10px]">NIP. {t.nip || '-'}</div>
                  </td>
                  <td className="p-2 border border-slate-200 font-medium text-emerald-800">{t.subject}</td>
                  {skConfig.classesList.map((cls) => {
                    const val = t.classes?.[cls] || 0;
                    return (
                      <td key={cls} className="p-1 border border-slate-200 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={val === 0 ? '' : val}
                          onChange={(e) => handleHourChange(t.id, cls, e.target.value)}
                          placeholder="-"
                          className="w-12 p-1 text-center font-mono border border-slate-200 rounded bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-1 focus:ring-emerald-500 text-xs"
                        />
                      </td>
                    );
                  })}
                  <td className="p-2 border border-slate-200">
                    <input
                      type="text"
                      value={t.additionalDuty}
                      onChange={(e) => handleDutyChange(t.id, e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-2 border border-slate-200 text-center">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={t.additionalHours}
                      onChange={(e) => handleDutyHoursChange(t.id, parseInt(e.target.value) || 0)}
                      className="w-16 p-1 text-center font-mono border border-slate-200 rounded text-xs bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-2 border border-slate-200 text-center font-bold font-mono bg-slate-50 text-slate-900">
                    {totalHours} Jam
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
