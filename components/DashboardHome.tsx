'use client';

import React from 'react';
import { Teacher, SKConfig } from '../types/sk';
import { Users, FileText, Settings, Grid, Award, School, ArrowRight, BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

interface DashboardHomeProps {
  setActiveTab: (tab: string) => void;
  teachers: Teacher[];
  skConfig: SKConfig;
}

export default function DashboardHome({ setActiveTab, teachers, skConfig }: DashboardHomeProps) {
  const totalTeachers = teachers.length;
  const totalHours = teachers.reduce((acc, t) => {
    const teachingSum = Object.values(t.classes || {}).reduce((a, b) => a + (b || 0), 0);
    return acc + teachingSum + (t.additionalHours || 0);
  }, 0);

  const keyHolders = teachers.filter((t) => t.additionalDuty && t.additionalDuty !== '-');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <School className="w-96 h-96 text-white" />
        </div>
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Resmi · Kurikulum Merdeka</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Aplikasi Pembuatan SK Pembagian Jam Mengajar & Tugas Tambahan
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pusat administrasi Surat Keputusan (SK) Guru dan Tenaga Kependidikan <strong className="text-white">{skConfig.schoolName}</strong> di bawah kepemimpinan Kepala Sekolah <strong className="text-white">{skConfig.headmasterName}</strong> (NIP. {skConfig.headmasterNip}). Buat SK Kolektif maupun Perorangan dengan mudah dan cepat.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('collective-sk')}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg transition"
            >
              <FileText className="w-4 h-4" />
              <span>Lihat SK Kolektif</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('individual-sk')}
              className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition"
            >
              <Award className="w-4 h-4" />
              <span>SK Perorangan Guru</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Guru & Pegawai</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalTeachers} Orang</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Tahun Pelajaran</p>
            <h3 className="text-xl font-bold text-slate-900">{skConfig.academicYear}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Jumlah Rombel / Kelas</p>
            <h3 className="text-2xl font-bold text-slate-900">{skConfig.classesList.length} Kelas</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Semester Aktif</p>
            <h3 className="text-2xl font-bold text-slate-900">{skConfig.semester}</h3>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setActiveTab('teachers')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 cursor-pointer transition group space-y-3"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">Manajemen Data Guru</h4>
          <p className="text-xs text-slate-600">
            Tambah, edit, dan atur beban mengajar serta tugas tambahan setiap guru sesuai SK.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('matrix')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 cursor-pointer transition group space-y-3"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
            <Grid className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">Matriks KBM & Kelas</h4>
          <p className="text-xs text-slate-600">
            Tabel matriks alokasi jam mengajar lintas kelas (VII A hingga IX C) secara komprehensif.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('config')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500 cursor-pointer transition group space-y-3"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
            <Settings className="w-5 h-5" />
          </div>
          <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">Pengaturan SK & Sekolah</h4>
          <p className="text-xs text-slate-600">
            Ubah nomor SK, tahun pelajaran, tanggal penetapan, dan data kepala sekolah.
          </p>
        </div>
      </div>
    </div>
  );
}
