import React from 'react';
import { FlaskConical, Award, BookCheck, ShieldCheck, ArrowRight } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
  onSelectLKPD: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart, onSelectLKPD }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-teal-500/30">
              Kurikulum Merdeka - IPA Kelas VII SMP
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Laboratorium Virtual <span className="text-teal-400">Pemisahan Campuran</span>
            </h1>
            <p className="text-slate-200 text-base sm:text-lg mb-8 leading-relaxed">
              Jelajahi dan lakukan percobaan pemisahan campuran secara interaktif dalam lingkungan 3D real-time. Amati fenomena filtrasi, dekantasi, evaporasi, kristalisasi, hingga distilasi langsung dari meja laboratorium virtualmu!
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onStart}
                className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-sm sm:text-base"
              >
                Mulai Praktikum 3D <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSelectLKPD}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/20 transition text-sm sm:text-base"
              >
                Buka LKPD Digital
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-4">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Simulasi 3D Interaktif</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Animasi nyata pergerakan zat cair, residu pasir, penguapan, dan kondensasi dengan kontrol kamera bebas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <BookCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">LKPD Digital Terintegrasi</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lembar kerja siswa dengan format saintifik: prediksi awal, tabel data pengamatan, analisis, dan kesimpulan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Transparan & Aman</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Didukung penyimpanan aman dengan status koneksi transparan dan dashboard evaluasi khusus guru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
