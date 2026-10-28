'use client';

import React, { useState } from 'react';
import { SKConfig } from '../types/sk';
import { Settings, Save, CheckCircle2, School, Image as ImageIcon, Trash2 } from 'lucide-react';

interface SkConfigFormProps {
  skConfig: SKConfig;
  setSkConfig: React.Dispatch<React.SetStateAction<SKConfig>>;
}

export default function SkConfigForm({ skConfig, setSkConfig }: SkConfigFormProps) {
  const [formData, setFormData] = useState<SKConfig>(skConfig);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, classesList: arr }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, position: 'leftLogo' | 'rightLogo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [position]: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = (position: 'leftLogo' | 'rightLogo') => {
    setFormData((prev) => ({
      ...prev,
      [position]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSkConfig(formData);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Konfigurasi Surat Keputusan & Kop Surat</h2>
        <p className="text-sm text-slate-600">
          Atur informasi sekolah, logo kop surat kiri dan kanan, nomor SK, tahun pelajaran, semester, dan Kepala Sekolah SMP Negeri 7 Sentani.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Pengaturan SK dan Logo berhasil disimpan dan diterapkan pada dokumen!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 text-xs">
        
        {/* Kop Surat Logo Upload Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>Pengaturan Logo Kop Surat (Kiri & Kanan)</span>
          </h3>
          <p className="text-slate-500 text-xs">
            Unggah logo instansi/kabupaten untuk sebelah kiri dan logo sekolah untuk sebelah kanan pada Kop Surat SK.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Left Logo */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col items-center space-y-3">
              <span className="font-bold text-slate-700">Logo Kiri (Kabupaten / Instansi)</span>
              <div className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-white overflow-hidden relative">
                {formData.leftLogo ? (
                  <img src={formData.leftLogo} alt="Left Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-slate-400 text-center px-2">Belum ada logo</span>
                )}
              </div>
              <div className="flex items-center gap-2 w-full">
                <label className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-center cursor-pointer transition">
                  <span>Pilih File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'leftLogo')}
                  />
                </label>
                {formData.leftLogo && (
                  <button
                    type="button"
                    onClick={() => handleRemoveLogo('leftLogo')}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200"
                    title="Hapus Logo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Logo */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex flex-col items-center space-y-3">
              <span className="font-bold text-slate-700">Logo Kanan (Logo Sekolah / Tut Wuri)</span>
              <div className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center bg-white overflow-hidden relative">
                {formData.rightLogo ? (
                  <img src={formData.rightLogo} alt="Right Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-slate-400 text-center px-2">Belum ada logo</span>
                )}
              </div>
              <div className="flex items-center gap-2 w-full">
                <label className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-center cursor-pointer transition">
                  <span>Pilih File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'rightLogo')}
                  />
                </label>
                {formData.rightLogo && (
                  <button
                    type="button"
                    onClick={() => handleRemoveLogo('rightLogo')}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200"
                    title="Hapus Logo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* School Info */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <School className="w-4 h-4 text-emerald-600" />
            <span>Identitas Sekolah & Wilayah</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Sekolah</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kabupaten / Kota</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Alamat Sekolah</label>
              <input
                type="text"
                name="schoolAddress"
                value={formData.schoolAddress}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nomor Telepon</label>
              <input
                type="text"
                name="schoolPhone"
                value={formData.schoolPhone}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Sekolah</label>
              <input
                type="email"
                name="schoolEmail"
                value={formData.schoolEmail}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
              />
            </div>
          </div>
        </div>

        {/* SK Metadata */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <Settings className="w-4 h-4 text-emerald-600" />
            <span>Nomor & Periode Surat Keputusan</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nomor Surat Keputusan</label>
              <input
                type="text"
                name="skNumber"
                value={formData.skNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tahun Pelajaran</label>
              <input
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm"
                placeholder="2025/2026"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm bg-white"
              >
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tanggal Ditetapkan</label>
              <input
                type="text"
                name="decreeDate"
                value={formData.decreeDate}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
                placeholder="14 Juli 2025"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Daftar Kelas (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={formData.classesList.join(', ')}
                onChange={handleClassesChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
                placeholder="VII A, VII B, VII C, VIII A, VIII B, VIII C, IX A, IX B, IX C"
              />
            </div>
          </div>
        </div>

        {/* Headmaster Info */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Penanda Tangan (Kepala Sekolah)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Sekolah & Gelar</label>
              <input
                type="text"
                name="headmasterName"
                value={formData.headmasterName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
              <input
                type="text"
                name="headmasterNip"
                value={formData.headmasterNip}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pangkat / Golongan</label>
              <input
                type="text"
                name="headmasterRank"
                value={formData.headmasterRank}
                onChange={handleChange}
                required
                className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-medium text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan SK & Logo</span>
          </button>
        </div>
      </form>
    </div>
  );
}
