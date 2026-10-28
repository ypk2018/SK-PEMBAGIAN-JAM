'use client';

import React, { useState } from 'react';
import { Teacher, SKConfig } from '../types/sk';
import { Users, Plus, Edit, Trash2, Search, RefreshCw, Award, BookOpen, Check, X } from 'lucide-react';

interface TeacherManagerProps {
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  skConfig: SKConfig;
  onResetDefaults: () => void;
}

export default function TeacherManager({ teachers, setTeachers, skConfig, onResetDefaults }: TeacherManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.additionalDuty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    const newId = `t-${Date.now()}`;
    const newNo = teachers.length + 1;
    setEditingTeacher({
      id: newId,
      no: newNo,
      name: '',
      nip: '',
      nuptk: '',
      golongan: 'Penata / III/c',
      subject: 'Mata Pelajaran',
      classes: { 'VII A': 3 },
      additionalDuty: '-',
      additionalHours: 0,
    });
    setIsNew(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher({ ...teacher });
    setIsNew(false);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
      const updated = teachers.filter((t) => t.id !== id).map((t, idx) => ({ ...t, no: idx + 1 }));
      setTeachers(updated);
    }
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    if (isNew) {
      setTeachers([...teachers, editingTeacher]);
    } else {
      setTeachers(teachers.map((t) => (t.id === editingTeacher.id ? editingTeacher : t)));
    }
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  // Calculate total teaching hours for a teacher
  const getTotalTeachingHours = (teacher: Teacher) => {
    const teachingSum = Object.values(teacher.classes || {}).reduce((acc, val) => acc + (val || 0), 0);
    return teachingSum + (teacher.additionalHours || 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Data Guru & Beban Mengajar</h2>
          <p className="text-sm text-slate-600">
            Kelola data guru, NIP, golongan, mata pelajaran, alokasi kelas, dan tugas tambahan untuk SMP Negeri 7 Sentani.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 shadow-sm transition"
            title="Reset ke Data Bawaan SMPN 7 Sentani"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Default</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Guru</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, NIP, mata pelajaran, atau tugas tambahan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium hidden sm:block">
          Total Guru: <span className="font-bold text-slate-800">{teachers.length} orang</span>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Nama Guru & NIP</th>
                <th className="p-3">Pangkat / Gol</th>
                <th className="p-3">Mata Pelajaran</th>
                <th className="p-3">Tugas Tambahan</th>
                <th className="p-3 text-center">Jml Kelas</th>
                <th className="p-3 text-center">Total Jam</th>
                <th className="p-3 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Tidak ada guru yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((t, idx) => {
                  const totalHours = getTotalTeachingHours(t);
                  const classCount = Object.keys(t.classes || {}).length;
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-center font-medium text-slate-600">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{t.name}</div>
                        <div className="text-slate-500 text-[11px]">NIP. {t.nip || '-'}</div>
                      </td>
                      <td className="p-3 text-slate-700">{t.golongan}</td>
                      <td className="p-3 font-medium text-emerald-800">{t.subject}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          {t.additionalDuty}
                        </span>
                      </td>
                      <td className="p-3 text-center text-slate-700 font-mono">{classCount} Kelas</td>
                      <td className="p-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${totalHours >= 24 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                          {totalHours} Jam
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleOpenEdit(t)}
                            className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded transition"
                            title="Edit Guru"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                            title="Hapus Guru"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingTeacher && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {isNew ? 'Tambah Guru Baru' : 'Edit Data Guru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.name}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Contoh: Maikel Paul Wally, S.Pd"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIP (Nomor Induk Pegawai)</label>
                  <input
                    type="text"
                    value={editingTeacher.nip}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, nip: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Contoh: 197812232003121006"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pangkat / Golongan</label>
                  <input
                    type="text"
                    value={editingTeacher.golongan}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, golongan: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Contoh: Pembina / IV/a"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran yang Diampu</label>
                  <input
                    type="text"
                    required
                    value={editingTeacher.subject}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Contoh: Matematika"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tugas Tambahan</label>
                  <input
                    type="text"
                    value={editingTeacher.additionalDuty}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, additionalDuty: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Contoh: Kepala Sekolah / Wakasek / Wali Kelas VII A"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jam Tugas Tambahan (SK)</label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={editingTeacher.additionalHours}
                    onChange={(e) => setEditingTeacher({ ...editingTeacher, additionalHours: parseInt(e.target.value) || 0 })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Contoh: 12 atau 24"
                  />
                </div>
              </div>

              {/* Class Hours Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="block font-bold text-slate-800 text-sm">Alokasi Jam per Kelas</label>
                <p className="text-slate-500 text-[11px]">Masukkan jumlah jam per minggu untuk setiap kelas yang diajar:</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {skConfig.classesList.map((cls) => {
                    const hours = editingTeacher.classes?.[cls] || 0;
                    return (
                      <div key={cls} className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <div className="text-[11px] font-semibold text-slate-700 mb-1">{cls}</div>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={hours}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            const updatedClasses = { ...editingTeacher.classes };
                            if (val === 0) {
                              delete updatedClasses[cls];
                            } else {
                              updatedClasses[cls] = val;
                            }
                            setEditingTeacher({ ...editingTeacher, classes: updatedClasses });
                          }}
                          className="w-full p-1 text-center font-mono border border-slate-300 rounded bg-white text-xs"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 shadow"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
