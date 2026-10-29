'use client';

import React, { useState } from 'react';
import { Teacher, SKConfig } from '../types/sk';
import { Printer, FileText, LayoutGrid, CheckCircle2 } from 'lucide-react';

interface CollectiveSKViewProps {
  teachers: Teacher[];
  skConfig: SKConfig;
}

export default function CollectiveSKView({ teachers, skConfig }: CollectiveSKViewProps) {
  const [activeView, setActiveView] = useState<'all' | 'sk_only' | 'lampiran_only'>('all');
  const [printOrientation, setPrintOrientation] = useState<'portrait' | 'landscape'>('landscape');

  const handlePrint = (viewMode: 'all' | 'sk_only' | 'lampiran_only', orientation: 'portrait' | 'landscape') => {
    setActiveView(viewMode);
    setPrintOrientation(orientation);
    
    // Allow state to re-render DOM before calling window.print()
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="max-w-[98%] xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Inject dynamic print orientation style configured for F4 / Legal */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: ${printOrientation === 'landscape' ? '330mm 215mm' : '215mm 330mm'};
              margin: ${printOrientation === 'landscape' ? '8mm' : '12mm'};
            }
          }
        `
      }} />

      {/* Control & Header Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span>Dokumen Surat Keputusan (SK) Kolektif</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Format Kertas F4/Legal: Naskah SK Portrait (21.5 × 33 cm) & Lampiran Matriks Landscape (33 × 21.5 cm).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Filter Segmented Controls */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => { setActiveView('all'); setPrintOrientation('landscape'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeView === 'all'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua (SK & Lampiran)
            </button>
            <button
              onClick={() => { setActiveView('sk_only'); setPrintOrientation('portrait'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeView === 'sk_only'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Surat SK (F4 Portrait)
            </button>
            <button
              onClick={() => { setActiveView('lampiran_only'); setPrintOrientation('landscape'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                activeView === 'lampiran_only'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lampiran (F4 Landscape)
            </button>
          </div>

          {/* Action Print Buttons */}
          <button
            onClick={() => handlePrint('lampiran_only', 'landscape')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow transition"
            title="Cetak khusus lampiran matriks KBM dalam kertas F4 Landscape (33 x 21.5 cm)"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Cetak Lampiran (F4 Landscape)</span>
          </button>

          <button
            onClick={() => handlePrint('sk_only', 'portrait')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition"
            title="Cetak khusus naskah SK dalam kertas F4 Portrait (21.5 x 33 cm)"
          >
            <FileText className="w-4 h-4" />
            <span>Cetak SK (F4 Portrait)</span>
          </button>

          <button
            onClick={() => handlePrint('all', 'landscape')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold rounded-xl transition"
            title="Cetak seluruh dokumen sekaligus dalam kertas F4"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Lengkap (F4)</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW CONTAINER */}
      <div className="space-y-8">
        
        {/* ========================================================================= */}
        {/* PART 1: NASKAH UTAMA SURAT KEPUTUSAN (F4 PORTRAIT STYLE) */}
        {/* ========================================================================= */}
        {(activeView === 'all' || activeView === 'sk_only') && (
          <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lg border border-slate-200 rounded-xl space-y-6 text-slate-900 text-sm font-serif leading-relaxed print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full print:f4-portrait">
            
            {/* Visual Indicator of F4 Portrait Format for Screen */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 print:hidden text-slate-500 text-xs">
              <span className="flex items-center gap-1.5 font-sans font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                Ukuran Kertas: F4 / Legal (21.5 × 33 cm) · Format Portrait (Tegak)
              </span>
              <span className="font-sans text-[11px] text-slate-500">Standar Surat Keputusan Dinas</span>
            </div>

            {/* Kop Surat Resmi (Format Tata Naskah Dinas) */}
            <div className="w-full pb-2 mb-4">
              {/* Baris Atas: Logo Kiri, Nama Instansi/Sekolah, Logo Kanan */}
              <div className="flex items-center justify-between gap-4">
                {/* Logo Kiri */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                  {skConfig.leftLogo ? (
                    <img src={skConfig.leftLogo} alt="Logo Kiri" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-800 text-white rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-center p-1 shadow">
                      PEMDA
                    </div>
                  )}
                </div>

                {/* Teks Lembaga & Sekolah */}
                <div className="text-center flex-1 px-2 space-y-1">
                  <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-900 leading-tight">
                    PEMERINTAH KABUPATEN JAYAPURA
                  </h3>
                  <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-900 leading-tight">
                    DINAS PENDIDIKAN
                  </h3>
                  <h2 className="text-base sm:text-xl md:text-2xl font-black tracking-wide uppercase text-slate-950 pt-0.5 leading-tight">
                    {skConfig.schoolName}
                  </h2>
                </div>

                {/* Logo Kanan */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                  {skConfig.rightLogo ? (
                    <img src={skConfig.rightLogo} alt="Logo Kanan" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-600 text-white rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-center p-1 shadow">
                      SEKOLAH
                    </div>
                  )}
                </div>
              </div>

              {/* Baris Alamat Memanjang Penuh Di Bawah Logo */}
              <div className="text-center pt-2 pb-1.5 text-[11px] sm:text-xs font-sans text-slate-700 tracking-normal w-full border-t border-slate-300 mt-2">
                <p className="leading-relaxed">
                  {skConfig.schoolAddress} &nbsp;·&nbsp; Telepon: {skConfig.schoolPhone} &nbsp;·&nbsp; Email: {skConfig.schoolEmail}
                </p>
              </div>

              {/* Garis Ganda Pembatas Kop Surat Resmi (Garis Tebal & Tipis) */}
              <div className="w-full mt-0.5">
                <div className="border-b-[3px] border-slate-950 w-full mb-[2px]"></div>
                <div className="border-b-[1px] border-slate-950 w-full"></div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-1.5 pt-2">
              <h4 className="font-bold uppercase tracking-wide text-sm sm:text-base underline underline-offset-4">
                SURAT KEPUTUSAN KEPALA {skConfig.schoolName}
              </h4>
              <p className="font-semibold text-xs tracking-wider">
                Nomor : {skConfig.skNumber}
              </p>
              <div className="pt-2">
                <p className="font-bold text-xs uppercase tracking-wide">TENTANG</p>
                <p className="font-bold text-xs uppercase tracking-wide max-w-2xl mx-auto text-center leading-normal">
                  PEMBAGIAN TUGAS GURU DALAM KEGIATAN PROSES BELAJAR MENGAJAR, BIMBINGAN DAN KONSELING, TUGAS TAMBAHAN DAN TUGAS KARYAWAN PADA SEMESTER {skConfig.semester.toUpperCase()} TAHUN PELAJARAN {skConfig.academicYear}
                </p>
              </div>
              <p className="font-bold uppercase text-xs pt-2">KEPALA {skConfig.schoolName}</p>
            </div>

            {/* Menimbang */}
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-2 font-semibold">Menimbang</div>
                <div className="col-span-1 text-center">:</div>
                <div className="col-span-9 space-y-2">
                  <div className="flex gap-2">
                    <span className="font-semibold shrink-0">a.</span>
                    <p className="text-justify">
                      Bahwa proses belajar mengajar merupakan inti proses pendidikan dan pelaksanaan kegiatan pada satuan pendidikan sebagai bentuk Implementasi Kurikulum Merdeka dalam rangka pemulihan pembelajaran;
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold shrink-0">b.</span>
                    <p className="text-justify">
                      Bahwa untuk menjamin kelancaran Proses Belajar Mengajar (PBM) perlu ditetapkan Pemenuhan Beban Kerja Guru dan Kepala Sekolah, Pembagian Tugas Guru dalam Proses Belajar Mengajar dan Bimbingan, serta Tugas Tambahan pada Kurikulum yang diterapkan di {skConfig.schoolName}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mengingat */}
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
                    <span className="font-semibold shrink-0">a.</span>
                    <p>Pedoman Umum Penyelenggaraan Administrasi Sekolah.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold shrink-0">b.</span>
                    <p>Kalender Pendidikan Kabupaten Jayapura Tahun Pelajaran {skConfig.academicYear}.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Memutuskan */}
            <div className="text-center font-bold uppercase tracking-widest pt-4">
              MEMUTUSKAN
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-2 font-semibold">Menetapkan</div>
                <div className="col-span-1 text-center">:</div>
                <div className="col-span-9 font-semibold uppercase">
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

            {/* Signature Block */}
            <div className="pt-2 flex justify-end">
              <div className="w-72 space-y-0.5 text-xs">
                <p>Ditetapkan di : {skConfig.city}</p>
                <p>Pada tanggal : {skConfig.decreeDate}</p>
                <p className="font-bold pt-1">Kepala Sekolah,</p>
                <div className="h-14"></div>
                <p className="font-bold uppercase underline">{skConfig.headmasterName}</p>
                <p>NIP. {skConfig.headmasterNip}</p>
              </div>
            </div>

            {/* Tembusan Block */}
            <div className="pt-2 border-t border-slate-200 text-xs">
              <p className="font-bold">Tembusan disampaikan kepada Yth:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-700 mt-1">
                {(skConfig.tembusanList && skConfig.tembusanList.length > 0
                  ? skConfig.tembusanList
                  : [
                      'Kepala Dinas Pendidikan Kabupaten Jayapura',
                      'Pengawas Pembina SMP Kabupaten Jayapura',
                      'Ketua Komite SMP Negeri 7 Sentani',
                      'Arsip Sekolah',
                    ]
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PART 2: LAMPIRAN SK KOLEKTIF - FORMAT LANDSCAPE */}
        {/* ========================================================================= */}
        {(activeView === 'all' || activeView === 'lampiran_only') && (
          <div className={`bg-white p-6 sm:p-10 shadow-lg border border-slate-200 rounded-xl space-y-4 text-slate-900 text-xs font-serif print:shadow-none print:border-none print:p-0 print:m-0 w-full print:f4-landscape ${activeView === 'all' ? 'print:break-before-page' : ''}`}>
            
            {/* Visual Indicator of F4 Landscape Format for Screen */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 print:hidden text-slate-500 text-xs">
              <span className="flex items-center gap-1.5 font-sans font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <LayoutGrid className="w-3.5 h-3.5 text-emerald-600" />
                Ukuran Kertas: F4 / Legal (33 × 21.5 cm) · Format Landscape (Mendatar)
              </span>
              <span className="font-sans text-[11px] text-slate-500">Matriks Beban Mengajar Guru SMPN 7 Sentani</span>
            </div>

            {/* Lampiran Header Metadata */}
            <div className="flex justify-between items-start text-[11px] leading-tight pb-4">
              <div>
                {/* Optional decorative marker or left header */}
              </div>
              <div className="w-80 space-y-0.5 text-left pl-6">
                <p><span className="font-semibold inline-block w-20">Lampiran</span>: Surat Keputusan Kepala {skConfig.schoolName}</p>
                <p><span className="font-semibold inline-block w-20">Nomor</span>: {skConfig.skNumber}</p>
                <p><span className="font-semibold inline-block w-20">Tanggal</span>: {skConfig.decreeDate}</p>
                <p><span className="font-semibold inline-block w-20">Tentang</span>: Pembagian Tugas Guru dalam KBM & Tugas Tambahan</p>
              </div>
            </div>

            {/* Lampiran Title */}
            <div className="text-center space-y-1 pb-4">
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
                PEMBAGIAN TUGAS MENGAJAR GURU {skConfig.schoolName}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                SEMESTER {skConfig.semester.toUpperCase()} TAHUN PELAJARAN {skConfig.academicYear}
              </p>
            </div>

            {/* LANDSCAPE MATRIX TABLE (FORMAT PERSIS DOKUMEN LAMPIRAN PDF RESMI) */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse text-[10px] sm:text-[11px] border-2 border-slate-900">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 text-center font-bold">
                    <th rowSpan={2} className="p-1.5 border border-slate-900 w-8 align-middle">NO.</th>
                    <th rowSpan={2} className="p-1.5 border border-slate-900 text-left min-w-[170px] align-middle">NAMA / NIP.</th>
                    <th rowSpan={2} className="p-1.5 border border-slate-900 min-w-[130px] text-left align-middle">MATA PELAJARAN</th>
                    <th colSpan={skConfig.classesList.length} className="p-1 border border-slate-900 bg-slate-200">
                      JAM AJAR TATAP MUKA / MINGGU
                    </th>
                    <th rowSpan={2} className="p-1.5 border border-slate-900 w-12 align-middle">JML. JAM TM</th>
                    <th rowSpan={2} className="p-1.5 border border-slate-900 min-w-[190px] text-left align-middle">TUGAS TAMBAHAN</th>
                    <th rowSpan={2} className="p-1.5 border border-slate-900 w-12 align-middle">TOTAL JAM</th>
                    <th rowSpan={2} className="p-1.5 border border-slate-900 w-16 align-middle">GT/ GTT</th>
                    <th rowSpan={2} className="p-1.5 border border-slate-900 w-20 align-middle">KET.</th>
                  </tr>
                  <tr className="bg-slate-100 text-slate-900 text-center font-bold">
                    {skConfig.classesList.map((cls) => (
                      <th key={cls} className="p-1 border border-slate-900 min-w-[32px] font-mono text-[10px]">
                        {cls}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {teachers.map((t, idx) => {
                    const teachingSum = Object.values(t.classes || {}).reduce((a, b) => a + (b || 0), 0);
                    const totalHours = teachingSum + (t.additionalHours || 0);
                    return (
                      <tr key={t.id} className="hover:bg-slate-50/70">
                        <td className="p-1.5 border border-slate-800 text-center font-medium align-top">{t.no || idx + 1}</td>
                        <td className="p-1.5 border border-slate-800 align-top">
                          <div className="font-bold text-slate-950 leading-tight">{t.name}</div>
                          <div className="text-[10px] font-mono text-slate-700 leading-tight mt-0.5">{t.nip ? t.nip : '-'}</div>
                        </td>
                        <td className="p-1.5 border border-slate-800 text-slate-950 font-medium align-top leading-tight">{t.subject}</td>
                        {skConfig.classesList.map((cls) => {
                          const val = t.classes?.[cls] || 0;
                          return (
                            <td key={cls} className="p-1 border border-slate-800 text-center font-mono align-top">
                              {val > 0 ? val : ''}
                            </td>
                          );
                        })}
                        <td className="p-1.5 border border-slate-800 text-center font-mono font-bold align-top">{teachingSum || ''}</td>
                        <td className="p-1.5 border border-slate-800 align-top text-[10px] leading-tight">
                          {t.tugasTambahanItems && t.tugasTambahanItems.length > 0 ? (
                            <div className="space-y-1">
                              {t.tugasTambahanItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center gap-2">
                                  <span>{item.nama}</span>
                                  {item.jam !== undefined && <span className="font-mono font-bold shrink-0">{item.jam}</span>}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div>{t.additionalDuty && t.additionalDuty !== '-' ? t.additionalDuty : ''}</div>
                          )}
                        </td>
                        <td className="p-1.5 border border-slate-800 text-center font-bold font-mono align-top text-slate-950">
                          {totalHours}
                        </td>
                        <td className="p-1.5 border border-slate-800 text-center font-semibold text-[10px] align-top">
                          {t.statusKepegawaian || 'GT'}
                        </td>
                        <td className="p-1.5 border border-slate-800 text-center text-[10px] align-top">
                          {t.sertifikasi || 'Sertifikasi'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-200 font-bold border-t-2 border-slate-900">
                    <td colSpan={3 + skConfig.classesList.length} className="p-2 border border-slate-900 text-right uppercase">
                      JUMLAH TOTAL JAM:
                    </td>
                    <td className="p-2 border border-slate-900 text-center font-mono text-xs">
                      {teachers.reduce((acc, t) => acc + Object.values(t.classes || {}).reduce((a, b) => a + (b || 0), 0), 0)}
                    </td>
                    <td className="p-2 border border-slate-900"></td>
                    <td className="p-2 border border-slate-900 text-center font-mono text-xs text-slate-950 font-black">
                      {teachers.reduce((acc, t) => {
                        const sum = Object.values(t.classes || {}).reduce((a, b) => a + (b || 0), 0);
                        return acc + sum + (t.additionalHours || 0);
                      }, 0)}
                    </td>
                    <td colSpan={2} className="p-2 border border-slate-900"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Keterangan & Signature Block Sesuai PDF */}
            <div className="pt-2 flex flex-col sm:flex-row justify-between items-start gap-4">
              {/* Keterangan Permendiknas */}
              <div className="text-[11px] text-slate-700 max-w-md font-sans">
                <p className="font-semibold text-slate-900">Keterangan :</p>
                <p className="mt-0.5 leading-relaxed">
                  {skConfig.footerNote || 'Disusun berdasarkan Permendiknas No. 30 tahun 2011 yang merupakan penyempurnaan Permendiknas No. 39 tahun 2009'}
                </p>
              </div>

              {/* Signature */}
              <div className="w-80 space-y-0.5 text-xs text-left pl-8">
                <p>Ditetapkan di : {skConfig.city}</p>
                <p>Pada tanggal : {skConfig.decreeDate}</p>
                <p className="font-bold pt-1">Kepala Sekolah,</p>
                <div className="h-14"></div>
                <p className="font-bold uppercase underline">{skConfig.headmasterName}</p>
                <p>NIP. {skConfig.headmasterNip}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
