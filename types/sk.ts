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
  statusKepegawaian?: string; // "GT" | "GT/PPPK" | "Kontrak" | "Honor"
  sertifikasi?: string; // "Sertifikasi" | "Blm Sertifikasi"
  tugasTambahanItems?: { nama: string; jam?: number }[];
}

export interface SKConfig {
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  city: string;
  skNumber: string;
  academicYear: string; // e.g. "2026/2027"
  semester: string; // "Ganjil" | "Genap"
  decreeDate: string; // e.g. "22 Juli 2026"
  headmasterName: string;
  headmasterNip: string;
  headmasterRank: string;
  classesList: string[]; // e.g. ["VIIA", "VIIB", "VIIC", "VIIIA", "VIIIB", "VIIIC", "IXA", "IXB", "IXc"]
  leftLogo?: string;
  rightLogo?: string;
  tembusanList?: string[];
  footerNote?: string;
}
