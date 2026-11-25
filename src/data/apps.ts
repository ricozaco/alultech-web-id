import { Language } from '../i18n/translations';

export type AppCategoryKey =
  | 'all'
  | 'finance'
  | 'utilities'
  | 'health'
  | 'lifestyle';

export interface LocalizedAppContent {
  subtitle: string;
  description: string;
  highlights: string[];
  permissions: string[];
  storageModel: string;
}

export interface AlulApp {
  id: string;
  name: string;
  packageId: string;
  categoryKey: Exclude<AppCategoryKey, 'all'>;
  featureImage: string;
  featured?: boolean;
  locales: Record<Language, LocalizedAppContent>;
}

export const CATEGORY_LABELS: Record<Language, Record<AppCategoryKey, string>> = {
  id: {
    all: 'Semua',
    finance: 'Keuangan & Bisnis',
    utilities: 'Utilitas & AI',
    health: 'Kesehatan & Keluarga',
    lifestyle: 'Gaya Hidup & Bahasa',
  },
  en: {
    all: 'All',
    finance: 'Finance & Business',
    utilities: 'Utilities & AI',
    health: 'Health & Family',
    lifestyle: 'Lifestyle & Language',
  },
};

export const APP_CATEGORY_KEYS: AppCategoryKey[] = [
  'all',
  'finance',
  'utilities',
  'health',
  'lifestyle',
];

const IMG_FINANCE = '/src/assets/images/bento_finance_suite_1795649136687.jpg';
const IMG_UTILITIES = '/src/assets/images/feature_utilities_ai_1795650126668.jpg';
const IMG_HEALTH = '/src/assets/images/feature_health_family_1795650126055.jpg';
const IMG_LIFESTYLE = '/src/assets/images/feature_lifestyle_lang_1795650126996.jpg';
const IMG_VAULT = '/src/assets/images/bento_offline_vault_1795649137230.jpg';
const IMG_STUDIO = '/src/assets/images/hero_studio_showcase_1795649135010.jpg';

export const BACKGROUND_IMAGES = {
  heroStudio: IMG_STUDIO,
  charcoalAmbient: '/src/assets/images/bg_charcoal_ambient_1795650125079.jpg',
  offlineVault: IMG_VAULT,
  gradientLogo: '/src/assets/images/alultech_gradient_logo_1795650125065.jpg',
};

export const ALUL_APPS: AlulApp[] = [
  {
    id: 'budget-harian',
    name: 'BudgetHarian',
    packageId: 'com.holding.budgetharian.amplop',
    categoryKey: 'finance',
    featureImage: IMG_FINANCE,
    featured: true,
    locales: {
      id: {
        subtitle: 'Amplop Digital 50/30/20',
        description:
          'Pengelola arus kas harian berbasis metode amplop 50/30/20 yang berjalan sepenuhnya di memori internal perangkat tanpa sinkronisasi cloud.',
        highlights: [
          'Alokasi otomatis kebutuhan, keinginan, dan tabungan',
          'Ringkasan pengeluaran bulanan berbasis grafik lokal',
          'Ekspor laporan transaksi ke CSV dan PDF offline',
        ],
        permissions: ['Penyimpanan Lokal (Ekspor Laporan)'],
        storageModel: '100% Lokal (SQLite Internal)',
      },
      en: {
        subtitle: '50/30/20 Digital Envelopes',
        description:
          'Daily cash flow manager built around the 50/30/20 envelope rule, running strictly in internal device storage without cloud syncing.',
        highlights: [
          'Automatic allocation across needs, wants, and savings',
          'Monthly spending breakdown via local charts',
          'Offline transaction export to CSV and PDF',
        ],
        permissions: ['Local Storage (Report Export)'],
        storageModel: '100% Local (Internal SQLite)',
      },
    },
  },
  {
    id: 'kos-pro',
    name: 'KosPro',
    packageId: 'com.holding.kos.pro',
    categoryKey: 'finance',
    featureImage: IMG_STUDIO,
    featured: true,
    locales: {
      id: {
        subtitle: 'Manajemen Kos & Kontrakan',
        description:
          'Solusi administrasi kamar kos, jatuh tempo sewa, catatan penyewa, dan kuitansi pembayaran untuk pemilik properti mandiri.',
        highlights: [
          'Pelacakan status kamar terisi, kosong, dan jatuh tempo',
          'Pembuatan kuitansi sewa instan dalam format PDF',
          'Rekapitulasi pemasukan properti bulanan secara privat',
        ],
        permissions: ['Penyimpanan Lokal (Simpan Kuitansi PDF)'],
        storageModel: '100% Lokal (Memori Internal)',
      },
      en: {
        subtitle: 'Boarding House & Rental Manager',
        description:
          'Room occupancy tracking, rent due alerts, tenant records, and digital payment receipts tailored for independent property owners.',
        highlights: [
          'Room status overview for occupied, vacant, and overdue units',
          'Instant rent receipt generation in PDF format',
          'Private monthly rental revenue summaries',
        ],
        permissions: ['Local Storage (Save PDF Receipts)'],
        storageModel: '100% Local (Internal Memory)',
      },
    },
  },
  {
    id: 'kredit-pintar',
    name: 'KreditPintar',
    packageId: 'com.holding.kredit.pintar',
    categoryKey: 'finance',
    featureImage: IMG_VAULT,
    featured: true,
    locales: {
      id: {
        subtitle: 'Simulasi KPR & Cicilan',
        description:
          'Kalkulator simulasi Kredit Pemilikan Rumah (KPR) dengan perhitungan bunga flat, efektif, dan anuitas lengkap dengan tabel amortisasi.',
        highlights: [
          'Perbandingan skema bunga tetap dan floating',
          'Tabel angsuran pokok serta bunga per bulan',
          'Simpan skenario simulasi tanpa membuat akun',
        ],
        permissions: ['Tidak Memerlukan Izin Khusus'],
        storageModel: '100% Lokal (Preferensi Perangkat)',
      },
      en: {
        subtitle: 'Mortgage & Loan Simulator',
        description:
          'Home mortgage and installment simulator supporting flat, effective, and annuity interest calculations with full amortization tables.',
        highlights: [
          'Side-by-side fixed and floating interest comparisons',
          'Monthly principal vs. interest amortization schedule',
          'Save loan scenarios without creating an account',
        ],
        permissions: ['No Special Permissions Required'],
        storageModel: '100% Local (Device Preferences)',
      },
    },
  },
  {
    id: 'cek-hp',
    name: 'CekHP',
    packageId: 'com.holding.cek.hp',
    categoryKey: 'utilities',
    featureImage: IMG_UTILITIES,
    featured: true,
    locales: {
      id: {
        subtitle: 'IMEI & Diagnostik HP Bekas',
        description:
          'Alat diagnostik perangkat keras ponsel bekas meliputi uji layar sentuh, sensor, audio, baterai, serta panduan verifikasi IMEI.',
        highlights: [
          'Uji piksel mati, multi-touch, dan respons layar',
          'Pembacaan status sensor perangkat secara langsung',
          'Daftar periksa fisik terstruktur sebelum transaksi',
        ],
        permissions: ['Kamera (Uji Lensa)', 'Mikrofon (Uji Audio)', 'Getar'],
        storageModel: '100% Lokal (Tanpa Pengunggahan Diagnostik)',
      },
      en: {
        subtitle: 'Used Phone & IMEI Diagnostics',
        description:
          'Hardware inspection suite for pre-owned smartphones covering touchscreen tests, sensors, audio, battery health, and IMEI verification guides.',
        highlights: [
          'Dead pixel, multi-touch, and display responsiveness tests',
          'Real-time hardware sensor status readout',
          'Structured physical inspection checklist before purchase',
        ],
        permissions: ['Camera (Lens Test)', 'Microphone (Audio Test)', 'Vibration'],
        storageModel: '100% Local (No Diagnostic Uploads)',
      },
    },
  },
  {
    id: 'snap-struk',
    name: 'SnapStruk',
    packageId: 'com.holding.snapstruk.ocr',
    categoryKey: 'utilities',
    featureImage: IMG_UTILITIES,
    featured: true,
    locales: {
      id: {
        subtitle: 'Scan & Simpan Struk OCR',
        description:
          'Pemindai struk belanja dengan pengenalan teks optik (OCR) langsung di perangkat untuk pengarsipan nota dan klaim pengeluaran.',
        highlights: [
          'Ekstraksi nominal dan tanggal belanja otomatis on-device',
          'Klasifikasi arsip nota berdasarkan kategori',
          'Foto struk tersimpan aman di penyimpanan lokal',
        ],
        permissions: ['Kamera (Pemindaian Struk)', 'Penyimpanan Lokal'],
        storageModel: '100% Lokal (Pemrosesan OCR On-Device)',
      },
      en: {
        subtitle: 'OCR Receipt Scanner & Archive',
        description:
          'Shopping receipt scanner powered by on-device optical character recognition (OCR) for expense tracking and organized archiving.',
        highlights: [
          'On-device extraction of totals and purchase dates',
          'Category-based receipt folder organization',
          'Receipt photos stored securely in local memory',
        ],
        permissions: ['Camera (Receipt Scanning)', 'Local Storage'],
        storageModel: '100% Local (On-Device OCR)',
      },
    },
  },
  {
    id: 'voicenote-ai',
    name: 'VoiceNote AI',
    packageId: 'com.holding.voicenoteai.transkrip',
    categoryKey: 'utilities',
    featureImage: IMG_STUDIO,
    featured: true,
    locales: {
      id: {
        subtitle: 'Rekam & Transkrip Suara',
        description:
          'Perekam catatan suara rapat, kuliah, dan ide cepat dengan dukungan transkripsi terstruktur serta penanda waktu.',
        highlights: [
          'Perekaman audio jernih dengan penanda segmen penting',
          'Transkripsi catatan rapat terorganisir',
          'Arsip audio terenkapsulasi di folder lokal pengguna',
        ],
        permissions: ['Mikrofon (Perekaman Audio)', 'Penyimpanan Lokal'],
        storageModel: '100% Lokal (Audio Tersimpan di Perangkat)',
      },
      en: {
        subtitle: 'Voice Recorder & Transcription',
        description:
          'Audio recorder for meetings, lectures, and quick ideas featuring structured transcription and timestamped markers.',
        highlights: [
          'Clear voice recording with bookmarkable key segments',
          'Structured meeting notes and transcript organization',
          'Audio archives encapsulated in local user folders',
        ],
        permissions: ['Microphone (Audio Capture)', 'Local Storage'],
        storageModel: '100% Local (Device Audio Archive)',
      },
    },
  },
  {
    id: 'kiblat-kilat',
    name: 'KiblatKilat',
    packageId: 'com.holding.kiblatkilat.kompas',
    categoryKey: 'lifestyle',
    featureImage: IMG_LIFESTYLE,
    featured: true,
    locales: {
      id: {
        subtitle: 'Kompas Arah Kiblat Presisi',
        description:
          'Penunjuk arah kiblat responsif memanfaatkan magnetometer internal perangkat dengan kalibrasi visual tanpa koneksi internet.',
        highlights: [
          'Indikator kompas real-time berbasis sensor perangkat',
          'Kalibrasi cepat saat interferensi magnetik',
          'Antarmuka gelap ramah mata di ruangan redup',
        ],
        permissions: ['Sensor Magnetometer & Getar'],
        storageModel: '100% Lokal (Tanpa Pelacakan Lokasi Server)',
      },
      en: {
        subtitle: 'Precision Qibla Compass',
        description:
          'Responsive Qibla direction pointer utilizing your phone’s internal magnetometer with visual calibration and zero internet dependency.',
        highlights: [
          'Real-time compass indicator powered by device sensors',
          'Quick calibration prompts during magnetic interference',
          'Low-glare dark interface suited for dim environments',
        ],
        permissions: ['Magnetometer Sensor & Haptics'],
        storageModel: '100% Local (No Server Location Tracking)',
      },
    },
  },
  {
    id: 'pintar-ngaji',
    name: 'PintarNgaji',
    packageId: 'com.holding.pintarngaji.tajwid',
    categoryKey: 'lifestyle',
    featureImage: IMG_LIFESTYLE,
    featured: true,
    locales: {
      id: {
        subtitle: 'Tahsin Tajwid Visual',
        description:
          'Panduan belajar hukum tajwid dan makharijul huruf dengan penandaan warna visual serta contoh pelafalan offline.',
        highlights: [
          'Kode warna hukum bacaan yang konsisten dan jelas',
          'Penjelasan makhraj huruf langkah demi langkah',
          'Dapat diakses penuh tanpa paket data',
        ],
        permissions: ['Tidak Memerlukan Izin Khusus'],
        storageModel: '100% Lokal (Aset Pembelajaran Offline)',
      },
      en: {
        subtitle: 'Visual Tajweed & Recitation Guide',
        description:
          'Interactive learning guide for Quranic tajweed rules and letter articulation featuring visual color coding and offline examples.',
        highlights: [
          'Consistent color-coded recitation rules',
          'Step-by-step articulation point breakdowns',
          'Fully accessible without mobile data',
        ],
        permissions: ['No Special Permissions Required'],
        storageModel: '100% Local (Offline Learning Assets)',
      },
    },
  },
  {
    id: 'cuaca-kita',
    name: 'CuacaKita',
    packageId: 'com.holding.cuaca.kita',
    categoryKey: 'lifestyle',
    featureImage: IMG_LIFESTYLE,
    locales: {
      id: {
        subtitle: 'Cuaca & Alarm Panen',
        description:
          'Pemantau kondisi cuaca lokal dengan fitur pengingat waktu tanam, penyiraman, dan alarm panen bagi pekebun serta petani.',
        highlights: [
          'Ringkasan prakiraan cuaca harian yang ringkas',
          'Jadwal alarm panen dan perawatan lahan kustom',
          'Pencatatan riwayat curah hujan mandiri',
        ],
        permissions: ['Notifikasi Alarm Lokal'],
        storageModel: 'Penyimpanan Jadwal Lokal',
      },
      en: {
        subtitle: 'Weather & Harvest Alarm',
        description:
          'Local weather monitor paired with planting schedules, irrigation reminders, and harvest alarms built for growers and farmers.',
        highlights: [
          'Concise daily weather forecast summaries',
          'Custom harvest and field care alarm schedules',
          'Self-logged local rainfall history',
        ],
        permissions: ['Local Alarm Notifications'],
        storageModel: 'Local Schedule Storage',
      },
    },
  },
  {
    id: 'rapor-kalk',
    name: 'RaporKalk',
    packageId: 'com.holding.rapor.kalk',
    categoryKey: 'health',
    featureImage: IMG_HEALTH,
    locales: {
      id: {
        subtitle: 'Nilai Rapor Indonesia',
        description:
          'Kalkulator rata-rata nilai rapor kurikulum Indonesia untuk memantau capaian semester siswa SD, SMP, hingga SMA.',
        highlights: [
          'Perhitungan bobot nilai tugas, UTS, dan UAS',
          'Simulasi target nilai minimum semester berikutnya',
          'Riwayat nilai tersimpan rapi per semester',
        ],
        permissions: ['Tidak Memerlukan Izin Khusus'],
        storageModel: '100% Lokal (Database Nilai Internal)',
      },
      en: {
        subtitle: 'Indonesian Grade Calculator',
        description:
          'Academic average calculator tailored for Indonesian school grading weights across elementary, middle, and high school terms.',
        highlights: [
          'Weighted calculations for assignments, midterms, and finals',
          'Target minimum grade simulator for upcoming semesters',
          'Organized grade history by academic term',
        ],
        permissions: ['No Special Permissions Required'],
        storageModel: '100% Local (Internal Grade Database)',
      },
    },
  },
  {
    id: 'rekam-kita',
    name: 'RekamKita',
    packageId: 'com.holding.rekam.kita',
    categoryKey: 'utilities',
    featureImage: IMG_UTILITIES,
    locales: {
      id: {
        subtitle: 'Rekam Layar Ringan',
        description:
          'Perekam layar Android tanpa watermark dengan pengaturan resolusi, bitrate, dan sumber audio internal atau mikrofon.',
        highlights: [
          'Hasil rekaman bersih tanpa tanda air',
          'Kontrol mengambang ringkas selama perekaman',
          'File video langsung masuk ke galeri perangkat',
        ],
        permissions: ['Tampilan di Atas Aplikasi Lain', 'Mikrofon', 'Penyimpanan'],
        storageModel: '100% Lokal (Video Tersimpan di Galeri)',
      },
      en: {
        subtitle: 'Lightweight Screen Recorder',
        description:
          'Watermark-free Android screen recorder with configurable resolution, bitrate, and internal or microphone audio capture.',
        highlights: [
          'Clean recordings without intrusive watermarks',
          'Compact floating controls during capture',
          'Videos saved directly to your device gallery',
        ],
        permissions: ['Display Over Other Apps', 'Microphone', 'Storage'],
        storageModel: '100% Local (Saved to Device Gallery)',
      },
    },
  },
  {
    id: 'bulan-kita',
    name: 'BulanKita',
    packageId: 'com.holding.bulankita.haid',
    categoryKey: 'health',
    featureImage: IMG_HEALTH,
    locales: {
      id: {
        subtitle: 'Kalender Haid Offline',
        description:
          'Pelacak siklus menstruasi dan catatan gejala harian yang menjamin kerahasiaan data kesehatan pribadi sepenuhnya di perangkat.',
        highlights: [
          'Prediksi siklus berikutnya berdasarkan riwayat lokal',
          'Catatan gejala fisik, suasana hati, dan fase siklus',
          'Tanpa registrasi email atau sinkronisasi pihak ketiga',
        ],
        permissions: ['Notifikasi Pengingat Lokal'],
        storageModel: '100% Lokal (Data Kesehatan Privat)',
      },
      en: {
        subtitle: 'Offline Cycle & Period Calendar',
        description:
          'Private menstrual cycle tracker and daily symptom log keeping sensitive health records strictly inside your own device.',
        highlights: [
          'Cycle predictions calculated from local history',
          'Daily physical symptoms, mood, and phase logging',
          'Zero email sign-ups or third-party cloud sync',
        ],
        permissions: ['Local Reminder Notifications'],
        storageModel: '100% Local (Private Health Data)',
      },
    },
  },
  {
    id: 'cek-nomor',
    name: 'CekNomor',
    packageId: 'com.holding.ceknomor.info',
    categoryKey: 'utilities',
    featureImage: IMG_VAULT,
    locales: {
      id: {
        subtitle: 'Info Nomor HP Indonesia',
        description:
          'Pencarian cepat operator seluler dan wilayah asal berdasarkan prefiks nomor telepon Indonesia secara offline.',
        highlights: [
          'Basis data prefiks seluruh operator nasional',
          'Verifikasi cepat kode area telepon rumah',
          'Tidak membaca atau mengunggah daftar kontak',
        ],
        permissions: ['Tidak Memerlukan Izin Kontak'],
        storageModel: '100% Lokal (Indeks Prefiks Offline)',
      },
      en: {
        subtitle: 'Indonesian Number Prefix Lookup',
        description:
          'Instant offline lookup for Indonesian mobile carriers and regional area codes using telephone number prefixes.',
        highlights: [
          'Comprehensive national mobile carrier prefix database',
          'Fast landline regional code verification',
          'Never reads or uploads your contacts list',
        ],
        permissions: ['No Contacts Permission Required'],
        storageModel: '100% Local (Offline Prefix Index)',
      },
    },
  },
  {
    id: 'timbang-bayi',
    name: 'TimbangBayi',
    packageId: 'com.holding.timbangbayi.kms',
    categoryKey: 'health',
    featureImage: IMG_HEALTH,
    locales: {
      id: {
        subtitle: 'KMS & Grafik WHO',
        description:
          'Kartu Menuju Sehat (KMS) digital dengan kurva standar pertumbuhan WHO untuk memantau berat dan tinggi badan balita.',
        highlights: [
          'Plot grafik berat terhadap usia berbasis standar WHO',
          'Catatan perkembangan bulanan lebih dari satu anak',
          'Ekspor ringkasan tumbuh kembang untuk posyandu',
        ],
        permissions: ['Penyimpanan Lokal (Ekspor Grafik)'],
        storageModel: '100% Lokal (Memori Internal)',
      },
      en: {
        subtitle: 'Child Growth & WHO Charts',
        description:
          'Digital child growth record featuring World Health Organization (WHO) growth curves to track infant weight and height.',
        highlights: [
          'Weight-for-age and height curves based on WHO standards',
          'Multi-child monthly growth tracking profiles',
          'Exportable growth summaries for pediatric visits',
        ],
        permissions: ['Local Storage (Chart Export)'],
        storageModel: '100% Local (Internal Memory)',
      },
    },
  },
  {
    id: 'kamus-jawa',
    name: 'KamusJawa',
    packageId: 'com.holding.kamusjawa.offline',
    categoryKey: 'lifestyle',
    featureImage: IMG_LIFESTYLE,
    locales: {
      id: {
        subtitle: 'Kamus Jawa-Indonesia Offline',
        description:
          'Kamus dua arah Bahasa Jawa (Ngoko, Krama Madya, Krama Inggil) ke Bahasa Indonesia yang bekerja cepat tanpa internet.',
        highlights: [
          'Klasifikasi tingkatan tutur Ngoko dan Krama',
          'Pencarian kata instan dengan riwayat kata favorit',
          'Contoh penggunaan kalimat sehari-hari',
        ],
        permissions: ['Tidak Memerlukan Izin Khusus'],
        storageModel: '100% Lokal (Leksikon Offline)',
      },
      en: {
        subtitle: 'Offline Javanese-Indonesian Dictionary',
        description:
          'Bidirectional Javanese (Ngoko, Krama Madya, Krama Inggil) to Indonesian dictionary working instantaneously offline.',
        highlights: [
          'Clear speech register classification (Ngoko & Krama)',
          'Instant keyword search with saved favorites',
          'Everyday conversational sentence examples',
        ],
        permissions: ['No Special Permissions Required'],
        storageModel: '100% Local (Offline Lexicon)',
      },
    },
  },
  {
    id: 'shift-ku',
    name: 'ShiftKu',
    packageId: 'com.holding.shiftku.lembur',
    categoryKey: 'finance',
    featureImage: IMG_FINANCE,
    locales: {
      id: {
        subtitle: 'Jadwal Shift & Lembur',
        description:
          'Kalender jadwal kerja shift pagi, siang, malam, serta pencatat jam lembur dan estimasi upah tambahan bulanan.',
        highlights: [
          'Pola rotasi shift otomatis pada kalender bulanan',
          'Kalkulasi jam lembur dan tunjangan shift',
          'Pengingat jadwal masuk kerja terintegrasi',
        ],
        permissions: ['Notifikasi Pengingat Lokal'],
        storageModel: '100% Lokal (Database Jadwal)',
      },
      en: {
        subtitle: 'Work Shift & Overtime Tracker',
        description:
          'Shift work calendar for morning, afternoon, and night rotations paired with overtime hour logging and monthly pay estimates.',
        highlights: [
          'Automated rotating shift patterns on monthly view',
          'Overtime hours and shift allowance calculation',
          'Integrated local clock-in reminders',
        ],
        permissions: ['Local Reminder Notifications'],
        storageModel: '100% Local (Schedule Database)',
      },
    },
  },
  {
    id: 'kuota-meter',
    name: 'KuotaMeter',
    packageId: 'com.holding.kuotameter.monitor',
    categoryKey: 'utilities',
    featureImage: IMG_UTILITIES,
    locales: {
      id: {
        subtitle: 'Monitor Data Real-Time',
        description:
          'Pemantau konsumsi kuota seluler dan WiFi harian lengkap dengan peringatan batas pemakaian agar paket data lebih terkendali.',
        highlights: [
          'Statistik penggunaan data harian dan bulanan',
          'Peringatan ambang batas kuota kustom',
          'Ringan di latar belakang dengan konsumsi daya minimal',
        ],
        permissions: ['Akses Statistik Penggunaan Jaringan Lokal'],
        storageModel: '100% Lokal (Log Kuota Internal)',
      },
      en: {
        subtitle: 'Real-Time Data Usage Monitor',
        description:
          'Daily mobile cellular and Wi-Fi bandwidth monitor with custom threshold alerts to keep data usage under control.',
        highlights: [
          'Daily and monthly data consumption analytics',
          'Customizable data cap warning thresholds',
          'Lightweight background footprint with minimal battery draw',
        ],
        permissions: ['Local Network Usage Stats Access'],
        storageModel: '100% Local (Internal Quota Logs)',
      },
    },
  },
  {
    id: 'baby-log',
    name: 'BabyLog',
    packageId: 'com.holding.babylog.jurnal',
    categoryKey: 'health',
    featureImage: IMG_HEALTH,
    locales: {
      id: {
        subtitle: 'Jurnal Bayi & Imunisasi',
        description:
          'Jurnal aktivitas harian bayi meliputi jadwal menyusui, jam tidur, pergantian popok, dan kalender imunisasi dasar.',
        highlights: [
          'Pencatatan sekali ketuk untuk rutinitas harian bayi',
          'Daftar jadwal imunisasi wajib beserta pengingat',
          'Data keluarga tersimpan privat di ponsel orang tua',
        ],
        permissions: ['Notifikasi Jadwal Imunisasi'],
        storageModel: '100% Lokal (Memori Internal)',
      },
      en: {
        subtitle: 'Baby Activity & Immunization Log',
        description:
          'Daily newborn activity journal covering feeding times, sleep windows, diaper changes, and essential immunization schedules.',
        highlights: [
          'One-tap logging for daily newborn routines',
          'Essential vaccination checklist with local reminders',
          'Family records stored privately on parents’ phones',
        ],
        permissions: ['Immunization Schedule Notifications'],
        storageModel: '100% Local (Internal Memory)',
      },
    },
  },
  {
    id: 'cek-tagihan',
    name: 'CekTagihan',
    packageId: 'com.holding.cektagihan.reminder',
    categoryKey: 'finance',
    featureImage: IMG_FINANCE,
    locales: {
      id: {
        subtitle: 'Reminder Semua Tagihan',
        description:
          'Pengingat jadwal pembayaran tagihan listrik, air, internet, dan cicilan rutin agar tidak melewati tanggal jatuh tempo.',
        highlights: [
          'Jadwal berulang bulanan dengan notifikasi H-3',
          'Penanda status lunas dan riwayat nominal tagihan',
          'Estimasi total kewajiban rutin per bulan',
        ],
        permissions: ['Notifikasi Pengingat Lokal'],
        storageModel: '100% Lokal (Daftar Tagihan Privat)',
      },
      en: {
        subtitle: 'Recurring Bill Reminders',
        description:
          'Payment due-date reminder for electricity, water, internet, and recurring installments so bills are never missed.',
        highlights: [
          'Monthly recurring schedules with 3-day advance alerts',
          'Paid status toggles and historical amount logs',
          'Estimated total monthly recurring obligations',
        ],
        permissions: ['Local Reminder Notifications'],
        storageModel: '100% Local (Private Bill List)',
      },
    },
  },
  {
    id: 'kamus-slang',
    name: 'KamusSlang',
    packageId: 'com.holding.kamusslang.gaul',
    categoryKey: 'lifestyle',
    featureImage: IMG_LIFESTYLE,
    locales: {
      id: {
        subtitle: 'Bahasa Gaul & Gen Z',
        description:
          'Referensi istilah bahasa gaul, akronim populer, dan kosakata percakapan digital terkini lengkap dengan arti dan konteks.',
        highlights: [
          'Indeks istilah populer lengkap dengan contoh konteks',
          'Pencarian cepat tanpa perlu koneksi internet',
          'Daftar istilah tersimpan untuk referensi cepat',
        ],
        permissions: ['Tidak Memerlukan Izin Khusus'],
        storageModel: '100% Lokal (Basis Data Istilah)',
      },
      en: {
        subtitle: 'Indonesian Slang & Gen Z Lexicon',
        description:
          'Reference guide to modern Indonesian slang, popular internet acronyms, and digital vernacular with definitions and usage examples.',
        highlights: [
          'Curated index of trending terms with context examples',
          'Fast offline search without mobile data',
          'Bookmarkable favorites for quick reference',
        ],
        permissions: ['No Special Permissions Required'],
        storageModel: '100% Local (Term Database)',
      },
    },
  },
  {
    id: 'tanam-pintar',
    name: 'TanamPintar',
    packageId: 'com.holding.tanampintar.kebun',
    categoryKey: 'lifestyle',
    featureImage: IMG_LIFESTYLE,
    locales: {
      id: {
        subtitle: 'Panduan Kebun & Perawatan',
        description:
          'Buku saku perawatan tanaman hias, sayur pekarangan, jadwal penyiraman, serta panduan pemupukan dasar.',
        highlights: [
          'Profil kebutuhan cahaya dan air per jenis tanaman',
          'Jadwal penyiraman dan pemupukan berkala',
          'Identifikasi masalah daun dan hama umum',
        ],
        permissions: ['Kamera (Catatan Foto Tanaman)', 'Notifikasi'],
        storageModel: '100% Lokal (Jurnal Kebun Internal)',
      },
      en: {
        subtitle: 'Home Garden & Plant Care Guide',
        description:
          'Pocket handbook for houseplants and backyard vegetables featuring watering schedules, sunlight profiles, and fertilizing tips.',
        highlights: [
          'Light and moisture profiles per plant species',
          'Recurring watering and fertilizing reminders',
          'Common leaf symptom and pest troubleshooting',
        ],
        permissions: ['Camera (Plant Photo Notes)', 'Notifications'],
        storageModel: '100% Local (Internal Garden Log)',
      },
    },
  },
  {
    id: 'printer-ku',
    name: 'PrinterKu',
    packageId: 'com.holding.printerku.cetak',
    categoryKey: 'utilities',
    featureImage: IMG_UTILITIES,
    locales: {
      id: {
        subtitle: 'Cetak WiFi & Bluetooth',
        description:
          'Utilitas pencetakan dokumen PDF, gambar, dan struk kasir langsung ke printer termal Bluetooth atau printer jaringan WiFi.',
        highlights: [
          'Dukungan printer termal 58mm/80mm dan printer WiFi',
          'Pratinjau tata letak cetak sebelum mengirim ke printer',
          'Komunikasi langsung perangkat-ke-printer tanpa cloud',
        ],
        permissions: ['Bluetooth & Jaringan WiFi Lokal', 'Penyimpanan'],
        storageModel: '100% Lokal (Koneksi Perangkat Langsung)',
      },
      en: {
        subtitle: 'Direct Wi-Fi & Bluetooth Printing',
        description:
          'Print PDFs, images, and POS receipts directly to 58mm/80mm Bluetooth thermal printers or local Wi-Fi network printers.',
        highlights: [
          'Supports 58mm/80mm thermal and local Wi-Fi printers',
          'Layout print preview prior to dispatch',
          'Direct device-to-printer communication with zero cloud relay',
        ],
        permissions: ['Bluetooth & Local Wi-Fi Network', 'Storage'],
        storageModel: '100% Local (Direct Device Link)',
      },
    },
  },
];

export interface PrivacySectionItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
}

export const PRIVACY_ITEMS: Record<Language, PrivacySectionItem[]> = {
  id: [
    {
      id: 'local-first',
      number: '01',
      title: 'Arsitektur Offline-First & Penyimpanan Lokal',
      summary:
        'Seluruh data transaksi, catatan pribadi, riwayat kesehatan, maupun berkas pindaian disimpan eksklusif di memori internal perangkat Anda.',
      details: [
        'Alul Tech (AHZ Dev) tidak mengoperasikan server pusat untuk mengumpulkan atau mencadangkan data pribadi pengguna.',
        'Aplikasi dapat dijalankan secara penuh tanpa wajib membuat akun, login email, atau verifikasi nomor telepon.',
        'Menghapus data aplikasi dari pengaturan Android atau mencopot pemasangan akan menghapus seluruh catatan lokal secara permanen.',
      ],
    },
    {
      id: 'permissions',
      number: '02',
      title: 'Transparansi Izin Perangkat (Permissions)',
      summary:
        'Permintaan akses kamera, mikrofon, Bluetooth, atau penyimpanan hanya aktif saat fitur terkait dijalankan dan diproses secara lokal.',
      details: [
        'Kamera hanya diakses ketika pengguna memindai struk di SnapStruk atau menguji lensa di CekHP.',
        'Mikrofon pada VoiceNote AI dan RekamKita hanya merekam ketika tombol rekam ditekan secara sadar oleh pengguna.',
        'Pengguna berhak penuh mencabut izin kapan saja melalui menu Pengaturan Aplikasi Android.',
      ],
    },
    {
      id: 'admob',
      number: '03',
      title: 'Layanan Iklan Google AdMob & ID Periklanan',
      summary:
        'Sebagian aplikasi gratis menampilkan iklan melalui Google AdMob sesuai Kebijakan Program Pengembang Google Play.',
      details: [
        'Google AdMob dapat menggunakan Advertising ID non-persisten yang dapat diatur ulang oleh pengguna melalui setelan privasi Android.',
        'Alul Tech tidak menautkan atau memanen data pribadi pengguna dengan jaringan periklanan.',
        'Informasi lebih lanjut mengenai praktik privasi Google tersedia di kebijakan privasi resmi Google.',
      ],
    },
    {
      id: 'user-rights',
      number: '04',
      title: 'Hak Kontrol & Penghapusan Data Pengguna',
      summary:
        'Karena seluruh data berada di kendali fisik perangkat Anda, Anda memiliki otoritas penuh untuk mengekspor maupun menghapusnya.',
      details: [
        'Aplikasi keuangan dan utilitas menyediakan fitur ekspor mandiri (PDF/CSV) yang tersimpan langsung ke folder pilihan Anda.',
        'Pertanyaan terkait kepatuhan kebijakan privasi atau permintaan klarifikasi dapat dikirimkan ke support@alultech.web.id atau ahzdev@alultech.web.id.',
      ],
    },
  ],
  en: [
    {
      id: 'local-first',
      number: '01',
      title: 'Offline-First Architecture & Local Storage',
      summary:
        'All transaction logs, personal notes, health histories, and scanned files are stored exclusively inside your device’s internal memory.',
      details: [
        'Alul Tech (AHZ Dev) does not operate central backend servers to collect, harvest, or back up personal user records.',
        'Applications run fully without requiring account creation, email login, or phone number verification.',
        'Clearing app data in Android settings or uninstalling an app permanently removes all local records.',
      ],
    },
    {
      id: 'permissions',
      number: '02',
      title: 'Device Permission Transparency',
      summary:
        'Access to camera, microphone, Bluetooth, or local storage is only activated when the corresponding feature is triggered by you and stays on-device.',
      details: [
        'Camera access is used solely when scanning receipts in SnapStruk or testing lenses in CekHP.',
        'Microphone capture in VoiceNote AI and RekamKita only records when you explicitly tap the record button.',
        'You retain full control to revoke any permission at any time in Android App Settings.',
      ],
    },
    {
      id: 'admob',
      number: '03',
      title: 'Google AdMob & Advertising Identifiers',
      summary:
        'Selected free applications display advertisements via Google AdMob in compliance with Google Play Developer Program Policies.',
      details: [
        'Google AdMob may utilize non-persistent Advertising IDs, which you can reset anytime in Android privacy settings.',
        'Alul Tech never links or harvests personal user data alongside advertising networks.',
        'Further details on Google’s data practices are available in the official Google Privacy Policy.',
      ],
    },
    {
      id: 'user-rights',
      number: '04',
      title: 'User Data Control & Deletion Rights',
      summary:
        'Because your data remains physically on your device, you hold complete authority to export or permanently erase it.',
      details: [
        'Finance and utility tools include self-service export options (PDF/CSV) saved straight to your chosen folder.',
        'Questions regarding privacy compliance or clarification requests can be sent to support@alultech.web.id or ahzdev@alultech.web.id.',
      ],
    },
  ],
};
