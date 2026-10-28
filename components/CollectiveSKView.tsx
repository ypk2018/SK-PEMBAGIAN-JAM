'use client';

import React from 'react';
import { Teacher, SKConfig } from '../types/sk';
import { Printer, Download, FileText, School } from 'lucide-react';

interface CollectiveSKViewProps {
  teachers: Teacher[];
  skConfig: SKConfig;
}

export default function CollectiveSKView({ teachers, skConfig }: CollectiveSKViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Pratinjau Surat Keputusan (SK) Kolektif</h2>
          <p className="text-sm text-slate-600">
            Dokumen resmi penetapan pembagian tugas mengajar dan tugas tambahan SMP Negeri 7 Sentani Tahun Pelajaran {skConfig.academicYear}.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 shadow transition"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Unduh PDF SK Kolektif</span>
        </button>
      </div>

      {/* Official Letter Document Canvas */}
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
            SURAT KEPUTUSAN KEPALA {skConfig.schoolName}
          </h4>
          <p className="font-semibold text-xs tracking-wider">
            Nomor : {skConfig.skNumber}
          </p>
          <div className="pt-2">
            <p className="font-bold text-xs uppercase tracking-wide">TENTANG</p>
            <p className="font-bold text-xs uppercase tracking-wide max-w-2xl mx-auto">
              PEMBAGIAN TUGAS GURU DALAM KEGIATAN PROSES BELAJAR MENGAJAR, BIMBINGAN DAN KONSELING, TUGAS TAMBAHAN DAN TUGAS KARYAWAN PADA SEMESTER {skConfig.semester.toUpperCase()} TAHUN PELAJARAN {skConfig.academicYear}
            </p>
          </div>
          <p className="font-bold uppercase text-xs pt-2">KEPALA {skConfig.schoolName}</p>
        </div>

        {/* Menimbang */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 font-semibold">Menimbang</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 space-y-2">
              <div className="flex gap-2">
                <span className="font-semibold">a.</span>
                <p className="text-justify">
                  Bahwa proses belajar mengajar merupakan inti proses pendidikan dan pelaksanaan kegiatan pada satuan pendidikan sebagai bentuk Implementasi Kurikulum Merdeka dalam rangka pemulihan pembelajaran;
                </p>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">b.</span>
                <p className="text-justify">
                  Bahwa untuk menjamin kelancaran Proses Belajar Mengajar (PBM) perlu ditetapkan Pemenuhan Beban Kerja Guru dan Kepala Sekolah, Pembagian Tugas Guru dalam Proses Belajar Mengajar dan Bimbingan, serta Tugas Tambahan pada Kurikulum yang diterapkan di {skConfig.schoolName}.
                </p>
              </div>
            </div>
          </div>

          {/* Mengengingat */}
          <div className="grid grid-cols-12 gap-2 pt-2">
            <div className="col-span-2 font-semibold">Mengingat</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 space-y-1.5">
              {[
                'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional.',
                'Undang-Undang Nomor 32 Tahun 2004 tentang Pemerintahan Daerah.',
                'Undang-Undang Nomor 14 Tahun 2005 tentang Guru dan Dosen sebagai Tenaga Profesional.',
                'Peraturan Pemerintah Nomor 74 Tahun 2008 tentang Guru.',
                'Peraturan Pemerintah Nomor 4 Tahun 2022 tentang Standar Nasional Pendidikan.',
                'Permendikbud Nomor 15 Tahun 2018 tentang Pemenuhan Beban Kerja Guru, Kepala Sekolah, dan Pengawas Sekolah.',
                'Permendikbudristek Nomor 5 Tahun 2022 tentang Standar Kompetensi Lulusan pada PAUD, Jenjang Pendidikan Dasar, dan Pendidikan Menengah.',
                'Permendikbudristek Nomor 7 Tahun 2022 tentang Standar Isi pada PAUD, Jenjang Pendidikan Dasar, dan Pendidikan Menengah.',
                'Permendikbudristek Nomor 16 Tahun 2022 tentang Standar Proses pada PAUD, Jenjang Pendidikan Dasar, dan Pendidikan Menengah.',
                'Permendikbudristek Nomor 21 Tahun 2022 tentang Standar Penilaian Pendidikan pada PAUD, Jenjang Pendidikan Dasar, dan Pendidikan Menengah.',
                'Keputusan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 262/M/2022 tentang Pedoman Pemberlakuan Kurikulum dalam Rangka Pemulihan Pembelajaran.',
              ].map((law, index) => (
                <div key={index} className="flex gap-2 text-justify">
                  <span className="font-semibold shrink-0">{index + 1}.</span>
                  <p>{law}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Memperhatikan */}
          <div className="grid grid-cols-12 gap-2 pt-2">
            <div className="col-span-2 font-semibold">Memperhatikan</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 space-y-1">
              <div className="flex gap-2">
                <span className="font-semibold">a.</span>
                <p>Pedoman Umum Penyelenggaraan Administrasi Sekolah.</p>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">b.</span>
                <p>Kalender Pendidikan Kabupaten Jayapura Tahun Pelajaran {skConfig.academicYear}.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Memutuskan */}
        <div className="text-center font-bold uppercase tracking-widest pt-4">
          MEMUTUSKAN
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 font-semibold">Menetapkan</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 font-semibold">
              KEPUTUSAN KEPALA {skConfig.schoolName} TENTANG PEMBAGIAN BEBAN KERJA GURU DAN KEPALA SEKOLAH TAHUN PELAJARAN {skConfig.academicYear}.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 font-semibold">PERTAMA</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 text-justify">
              Pemenuhan Beban Kerja Guru dan Kepala Sekolah Tahun Pelajaran {skConfig.academicYear} Semester {skConfig.semester} sebagaimana tercantum dalam Lampiran 1 Surat Keputusan ini.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 font-semibold">KEDUA</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 text-justify">
              Pembagian Tugas Guru dalam Proses Belajar Mengajar dan Bimbingan Tahun Pelajaran {skConfig.academicYear} Semester {skConfig.semester} sebagaimana tercantum dalam Lampiran Surat Keputusan ini.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 font-semibold">KETIGA</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 text-justify">
              Pembagian Tugas Tambahan pada Kurikulum Merdeka (Wali Kelas, Pembina OSIS, Wakasek, dll) sebagaimana tercantum dalam lampiran Surat Keputusan ini.
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-2 font-semibold">KEEMPAT</div>
            <div className="col-span-1 text-center">:</div>
            <div className="col-span-9 text-justify">
              Keputusan ini berlaku sejak tanggal ditetapkan dan apabila terdapat kekeliruan akan dibetulkan sebagaimana mestinya.
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="pt-8 flex justify-end">
          <div className="w-72 space-y-1 text-xs">
            <p>Ditetapkan di : {skConfig.city}</p>
            <p>Pada tanggal : {skConfig.decreeDate}</p>
            <p className="font-bold pt-2">Kepala Sekolah,</p>
            <div className="h-20 flex items-center justify-center relative">
              {/* Official Stamp & Signature simulation */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                <div className="w-28 h-28 border-4 border-emerald-800 rounded-full flex items-center justify-center font-bold text-[9px] text-center rotate-[-15deg]">
                  {skConfig.schoolName}
                </div>
              </div>
              <p className="font-serif italic font-bold text-emerald-900 text-base">{skConfig.headmasterName}</p>
            </div>
            <p className="font-bold uppercase underline">{skConfig.headmasterName}</p>
            <p>NIP. {skConfig.headmasterNip}</p>
          </div>
        </div>

        {/* Page Break for Attachment */}
        <div className="page-break pt-12 border-t-2 border-dashed border-slate-300 print:break-before-page">
          <div className="text-center space-y-1 pb-6">
            <p className="text-xs font-bold uppercase">LAMPIRAN SURAT KEPUTUSAN KEPALA {skConfig.schoolName}</p>
            <p className="text-xs font-semibold">Nomor : {skConfig.skNumber}</p>
            <p className="text-xs font-semibold">Tanggal : {skConfig.decreeDate}</p>
            <h4 className="text-sm font-bold uppercase pt-2 text-emerald-900">
              MATRIKS PEMBAGIAN TUGAS MENGAJAR DAN TUGAS TAMBAHAN GURU TAHUN PELAJARAN {skConfig.academicYear}
            </h4>
          </div>

          <div className="overflow-x-auto pt-4">
            <table className="w-full text-left border-collapse text-[10px] border border-slate-400">
              <thead>
                <tr className="bg-slate-200 text-slate-900 text-center font-bold">
                  <th className="p-2 border border-slate-400 w-10">NO</th>
                  <th className="p-2 border border-slate-400 text-left min-w-[180px]">NAMA GURU & NIP</th>
                  <th className="p-2 border border-slate-400 min-w-[120px]">MATA PELAJARAN</th>
                  {skConfig.classesList.map((cls) => (
                    <th key={cls} className="p-2 border border-slate-400 w-12">
                      {cls}
                    </th>
                  ))}
                  <th className="p-2 border border-slate-400 min-w-[140px]">TUGAS TAMBAHAN</th>
                  <th className="p-2 border border-slate-400 w-14">JAM TAMB</th>
                  <th className="p-2 border border-slate-400 w-14">TOTAL JAM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {teachers.map((t, idx) => {
                  const teachingSum = Object.values(t.classes || {}).reduce((a, b) => a + (b || 0), 0);
                  const totalHours = teachingSum + (t.additionalHours || 0);
                  return (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-1.5 border border-slate-300 text-center font-medium">{idx + 1}</td>
                      <td className="p-1.5 border border-slate-300">
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-[9px] text-slate-600">NIP. {t.nip || '-'}</div>
                      </td>
                      <td className="p-1.5 border border-slate-300 font-medium">{t.subject}</td>
                      {skConfig.classesList.map((cls) => {
                        const val = t.classes?.[cls] || 0;
                        return (
                          <td key={cls} className="p-1.5 border border-slate-300 text-center font-mono">
                            {val > 0 ? val : '-'}
                          </td>
                        );
                      })}
                      <td className="p-1.5 border border-slate-300">{t.additionalDuty}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-mono">{t.additionalHours}</td>
                      <td className="p-1.5 border border-slate-300 text-center font-bold font-mono bg-slate-100">{totalHours}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Attachment Signature */}
          <div className="pt-8 flex justify-end">
            <div className="w-72 space-y-1 text-xs">
              <p>Ditetapkan di : {skConfig.city}</p>
              <p>Pada tanggal : {skConfig.decreeDate}</p>
              <p className="font-bold pt-2">Kepala Sekolah,</p>
              <div className="h-16"></div>
              <p className="font-bold uppercase underline">{skConfig.headmasterName}</p>
              <p>NIP. {skConfig.headmasterNip}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
