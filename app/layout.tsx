import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SK Pembagian Jam Mengajar SMPN 7 Sentani',
  description: 'Aplikasi Pembuatan SK Pembagian Jam Mengajar dan Tugas Tambahan Guru SMP Negeri 7 Sentani (Kolektif & Perorangan)',
  openGraph: {
    title: 'SK Pembagian Jam Mengajar SMPN 7 Sentani',
    description: 'Aplikasi Pembuatan SK Pembagian Jam Mengajar dan Tugas Tambahan Guru SMP Negeri 7 Sentani (Kolektif & Perorangan)',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SK Pembagian Jam Mengajar SMPN 7 Sentani',
    description: 'Aplikasi Pembuatan SK Pembagian Jam Mengajar dan Tugas Tambahan Guru SMP Negeri 7 Sentani (Kolektif & Perorangan)',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
