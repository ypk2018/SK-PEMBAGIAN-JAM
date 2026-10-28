export interface Teacher {
  id: string;
  no: number;
  name: string;
  nip: string;
  nuptk?: string;
  golongan: string; // e.g. "IV/a", "III/c", "Honorer", "P3K"
  subject: string; // e.g. "Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris", "PJOK", "Seni Budaya", "Prakarya", "BK", "PAI", "PAK", "Kepala Sekolah", "Wakasek"
  classes: {
    [className: string]: number; // e.g. { "VIIA": 4, "VIIB": 4, "VIIIB": 4 }
  };
  additionalDuty: string; // e.g. "Kepala Sekolah", "Wakasek Kurikulum", "Wali Kelas VII A", "Pembina OSIS", "Guru BK", "-"
  additionalHours: number; // e.g. 24 for Kepala Sekolah, 12 for Wakasek, 2 for Wali Kelas
}

export interface SKConfig {
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  city: string;
  skNumber: string;
  academicYear: string; // e.g. "2025/2026"
  semester: string; // "Ganjil" | "Genap"
  decreeDate: string; // e.g. "14 Juli 2025"
  headmasterName: string;
  headmasterNip: string;
  headmasterRank: string;
  classesList: string[]; // e.g. ["VII A", "VII B", "VII C", "VIII A", "VIII B", "VIII C", "IX A", "IX B", "IX C"]
  leftLogo?: string;
  rightLogo?: string;
}
