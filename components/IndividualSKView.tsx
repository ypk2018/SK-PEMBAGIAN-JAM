'use client';

import React, { useState } from 'react';
import { Teacher, SKConfig } from '../types/sk';
import { Printer, User, Award, CheckCircle2 } from 'lucide-react';

interface IndividualSKViewProps {
  teachers: Teacher[];
  skConfig: SKConfig;
}

export default function IndividualSKView({ teachers, skConfig }: IndividualSKViewProps) {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(teachers[0]?.id || '');

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId) || teachers[0];

  if (!selectedTeacher) {
    return <div className="p-8 text-center text-slate-500">Belum ada data guru. Silakan tambahkan data guru terlebih dahulu.</div>;
  }

  const teachingSum = Object.values(selectedTeacher.classes || {}).reduce((a, b) => a + (b || 0), 0);
  const totalHours = teachingSum + (selectedTeacher.additionalHours || 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Pratinjau SK Pembagian Tugas Perorangan</h2>
          <p className="text-sm text-slate-600">
            Pilih guru untuk melihat dan mencetak Surat Keputusan penugasan mengajar individual.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            className="p-2 border border-slate-300 bg-white rounded-lg text-xs font-semibold text-slate-900 shadow-sm"
          >
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.subject})
              </option>
            ))}
          </select>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 shadow transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak SK Perorangan</span>
          </button>
        </div>
      </div>

      {/* Individual Letter Document Canvas */}
      <div className="bg-white p-8 sm:p-12 shadow-lg border border-slate-200 rounded-xl space-y-8 text-slate-900 text-sm font-serif leading-relaxed print:shadow-none print:border-none print:p-0">
        
        {/* Kop Surat */}
        <div className="flex items-center justify-between border-b-4 border-slate-900 pb-6">
          <div className="w-16 h-16 flex items-center justify-center shrink-0">
            {skConfig.leftLogo ? (
              <img src={skConfig.leftLogo} alt="Logo Kiri" className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-14 h-14 bg-emerald-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold text-center p-1 shadow">PEMDA</div>
            )}
          </div>
          <div className="text-center flex-1 px-4 space-y-1">
            <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase">PEMERINTAH KABUPATEN JAYAPURA</h3>
            <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase">DINAS PENDIDIKAN</h3>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase pt-1 text-emerald-900">
              {skConfig.schoolName}
            </h2>
            <p className="text-xs font-sans text-slate-600">
              {skConfig.schoolAddress} | Telepon: {skConfig.schoolPhone} | Email: {skConfig.schoolEmail}
            </p>
          </div>
          <div className="w-16 h-16 flex items-center justify-center shrink-0">
            {skConfig.rightLogo ? (
              <img src={skConfig.rightLogo} alt="Logo Kanan" className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-14 h-14 bg-amber-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold text-center p-1 shadow">SEKOLAH</div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2 pt-4">
          <h4 className="font-bold uppercase tracking-wide text-sm underline underline-offset-4">
            SURAT KEPUTUSAN PENUGASAN GURU PERORANGAN
          </h4>
          <p className="font-semibold text-xs tracking-wider">
            Nomor : 800 / IND-{selectedTeacher.no} / {skConfig.schoolName.replace(/\s+/g, '')} / {skConfig.academicYear.replace('/', '-')}
          </p>
          <div className="pt-2">
            <p className="font-bold text-xs uppercase tracking-wide">TENTANG</p>
            <p className="font-bold text-xs uppercase tracking-wide max-w-2xl mx-auto">
              PEMBEBANAN TUGAS MENGAJAR DAN TUGAS TAMBAHAN KEPADA SAUDARA {selectedTeacher.name.toUpperCase()} PADA SEMESTER {skConfig.semester.toUpperCase()} TAHUN PELAJARAN {skConfig.academicYear}
            </p>
          </div>
        </div>

        {/* Teacher Profile Box */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2 font-sans text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wide border-b border-slate-300 pb-2 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-700" />
            <span>Identitas Guru yang Diberi Tugas</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
            <div><span className="font-semibold text-slate-600">Nama Lengkap & Gelar:</span> <span className="font-bold text-slate-900">{selectedTeacher.name}</span></div>
            <div><span className="font-semibold text-slate-600">NIP:</span> <span className="font-mono text-slate-900">{selectedTeacher.nip || '-'}</span></div>
            <div><span className="font-semibold text-slate-600">Pangkat / Golongan:</span> <span className="text-slate-900">{selectedTeacher.golongan}</span></div>
            <div><span className="font-semibold text-slate-600">Mata Pelajaran Utama:</span> <span className="font-bold text-emerald-800">{selectedTeacher.subject}</span></div>
            <div><span className="font-semibold text-slate-600">Tugas Tambahan:</span> <span className="font-bold text-amber-800">{selectedTeacher.additionalDuty}</span></div>
            <div><span className="font-semibold text-slate-600">Total Beban Mengajar & Tugas:</span> <span className="font-bold text-slate-900 font-mono">{totalHours} Jam / Minggu</span></div>
          </div>
        </div>

        {/* Assignment Body */}
        <div className="space-y-3 text-xs">
          <p className="font-bold uppercase tracking-wider text-slate-800">MEMUTUSKAN / MENUGASKAN:</p>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="font-semibold shrink-0">PERTAMA:</span>
              <p className="text-justify">
                Memberikan tugas dan tanggung jawab kepada Guru yang bersangkutan untuk melaksanakan Kegiatan Proses Belajar Mengajar (PBM) dan Bimbingan pada mata pelajaran <strong>{selectedTeacher.subject}</strong> di {skConfig.schoolName} Tahun Pelajaran {skConfig.academicYear}.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold shrink-0">KEDUA:</span>
              <p className="text-justify">
                Rincian alokasi jam pelajaran per kelas yang diampu adalah sebagai berikut:
              </p>
            </div>
          </div>

          {/* Classes Breakdown Table */}
          <div className="pt-2">
            <table className="w-full text-left border-collapse text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-100 font-bold text-center">
                  <th className="p-2 border border-slate-300">No</th>
                  <th className="p-2 border border-slate-300 text-left">Kelas / Rombel</th>
                  <th className="p-2 border border-slate-300">Mata Pelajaran</th>
                  <th className="p-2 border border-slate-300">Jumlah Jam / Minggu</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedTeacher.classes || {}).map(([cls, hours], idx) => (
                  <tr key={cls} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-300 text-center font-medium">{idx + 1}</td>
                    <td className="p-2 border border-slate-300 font-semibold">{cls}</td>
                    <td className="p-2 border border-slate-300">{selectedTeacher.subject}</td>
                    <td className="p-2 border border-slate-300 text-center font-mono font-bold">{hours} Jam</td>
                  </tr>
                ))}
                {selectedTeacher.additionalHours > 0 && (
                  <tr className="bg-amber-50/50">
                    <td className="p-2 border border-slate-300 text-center font-medium">-</td>
                    <td className="p-2 border border-slate-300 font-semibold text-amber-900">Tugas Tambahan ({selectedTeacher.additionalDuty})</td>
                    <td className="p-2 border border-slate-300 text-amber-900">Ekuivalensi Jam Tugas Tambahan</td>
                    <td className="p-2 border border-slate-300 text-center font-mono font-bold text-amber-900">{selectedTeacher.additionalHours} Jam</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-slate-200 font-bold">
                  <td colSpan={3} className="p-2 border border-slate-300 text-right">TOTAL BEBAN KERJA:</td>
                  <td className="p-2 border border-slate-300 text-center font-mono text-emerald-900">{totalHours} Jam / Minggu</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex gap-2 pt-2">
            <span className="font-semibold shrink-0">KETIGA:</span>
            <p className="text-justify">
              Keputusan ini disampaikan kepada yang bersangkutan untuk dilaksanakan dengan penuh rasa tanggung jawab dan dedikasi tinggi.
            </p>
          </div>
        </div>

        {/* Signature */}
        <div className="pt-8 flex justify-end">
          <div className="w-72 space-y-1 text-xs">
            <p>Ditetapkan di : {skConfig.city}</p>
            <p>Pada tanggal : {skConfig.decreeDate}</p>
            <p className="font-bold pt-2">Kepala Sekolah,</p>
            <div className="h-16 flex items-center justify-center relative">
              <p className="font-serif italic font-bold text-emerald-900 text-base">{skConfig.headmasterName}</p>
            </div>
            <p className="font-bold uppercase underline">{skConfig.headmasterName}</p>
            <p>NIP. {skConfig.headmasterNip}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
