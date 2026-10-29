export type SeparationMethodId = 'filtrasi' | 'dekantasi' | 'evaporasi' | 'kristalisasi' | 'distilasi';

export interface SeparationMethodInfo {
  id: SeparationMethodId;
  nama: string;
  deskripsi: string;
  campuran: string;
  prinsipDasar: string;
  alatUtama: string[];
}

export interface LkpdAnswer {
  id?: string;
  siswaNama: string;
  siswaKelas: string;
  siswaNoAbsen: string;
  metode: SeparationMethodId;
  prediksiAwal: string;
  tabelPengamatan: {
    kondisiCampuranAwal: string;
    zatTertahan: string;
    zatLolos: string;
  };
  pertanyaanAnalisis: string;
  kesimpulan: string;
  submittedAt?: string;
}

export interface EvaluasiQuestion {
  id: number;
  soal: string;
  pilihan: string[];
  kunciJawaban: number;
  pembahasan: string;
}
