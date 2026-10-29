import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SeparationMethodId } from '../types';
import { FiltrationScene } from '../simulations/FiltrationScene';
import { Play, RotateCcw, FileText, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface Lab3DProps {
  selectedMethod: SeparationMethodId;
  onOpenLkpd: () => void;
}

export const Lab3D: React.FC<Lab3DProps> = ({ selectedMethod, onOpenLkpd }) => {
  // 4 Tombol Kontrol Eksperimen
  const [animating, setAnimating] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);
  const [animStep, setAnimStep] = useState<0 | 1 | 2>(0); // 0: Awal, 1: Berjalan, 2: Selesai
  const [activeModal, setActiveModal] = useState<'none' | 'langkah' | 'hasil'>('none');

  // Loop Animasi Mulai Percobaan
  useEffect(() => {
    let frameId: number;
    if (animating) {
      setAnimStep(1);
      const duration = 5000; // 5 detik penuangan
      const startTime = performance.now();

      const loop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setAnimProgress(progress);

        if (progress < 1) {
          frameId = requestAnimationFrame(loop);
        } else {
          setAnimating(false);
          setAnimStep(2);
        }
      };
      frameId = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(frameId);
  }, [animating]);

  // Fungsi 4 Tombol Utama:
  const handleMulaiPercobaan = () => {
    if (animStep === 2) {
      // Jika sudah selesai, reset sedikit lalu jalankan lagi
      setAnimProgress(0);
    }
    setAnimating(true);
  };

  const handleLangkahKerja = () => {
    setActiveModal('langkah');
  };

  const handleAmatiHasil = () => {
    setActiveModal('hasil');
  };

  const handleUlangi = () => {
    setAnimating(false);
    setAnimProgress(0);
    setAnimStep(0);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-900 text-white relative overflow-hidden">
      {/* Panel Atas: Identitas Percobaan */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex justify-between items-center z-10 backdrop-blur">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-2 py-0.5 rounded border border-teal-500/40 uppercase tracking-wider">
              Simulasi Aktif
            </span>
            <h2 className="text-lg font-bold text-white capitalize">Metode: {selectedMethod}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Gunakan mouse: Klik kiri seret untuk putar kamera, Scroll untuk zoom, Klik kanan seret untuk geser.
          </p>
        </div>
        <button
          onClick={onOpenLkpd}
          className="bg-teal-700/60 hover:bg-teal-600 text-teal-100 text-xs px-3 py-1.5 rounded-lg border border-teal-500/30 flex items-center gap-1.5 transition"
        >
          <FileText className="w-3.5 h-3.5" /> Buka LKPD Metode Ini
        </button>
      </div>

      {/* Area Viewport 3D Canvas */}
      <div className="flex-1 relative w-full h-full bg-radial from-slate-800 to-slate-950">
        {selectedMethod === 'filtrasi' ? (
          <Canvas
            camera={{ position: [0, 2.5, 4.8], fov: 45 }}
            shadows
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={['#0f172a']} />
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
            <pointLight position={[-4, 3, -2]} intensity={0.5} color="#38bdf8" />
            <pointLight position={[3, 2, 3]} intensity={0.5} color="#14b8a6" />

            <FiltrationScene animationStep={animStep} progress={animProgress} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={8}
              maxPolarAngle={Math.PI / 2 + 0.1}
            />
          </Canvas>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <AlertCircle className="w-12 h-12 text-teal-400 mb-3 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2 capitalize">Simulasi 3D {selectedMethod}</h3>
            <p className="text-slate-300 max-w-md text-sm mb-4">
              Metode ini disiapkan pada roadmap Tahap 3. Silakan eksplorasi metode <strong>Filtrasi</strong> yang sudah terpasang penuh pada tahap pertama ini.
            </p>
          </div>
        )}

        {/* Indikator Animasi Berjalan */}
        {animating && (
          <div className="absolute top-4 left-6 bg-slate-950/80 border border-teal-500/40 px-4 py-2 rounded-xl backdrop-blur flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-teal-400 animate-ping" />
            <span className="text-xs font-medium text-teal-200">
              Menuangkan campuran pasir & menyaring... ({Math.round(animProgress * 100)}%)
            </span>
          </div>
        )}
      </div>

      {/* Panel Bawah: EMPAT TOMBOL UTAMA (Sesuai spesifikasi ketat D) */}
      <div className="bg-slate-950 border-t border-slate-800 p-4 z-20">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* 1. Mulai Percobaan */}
          <button
            onClick={handleMulaiPercobaan}
            disabled={animating}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition ${
              animating
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
            }`}
          >
            <Play className="w-4 h-4 fill-current" /> 1. Mulai Percobaan
          </button>

          {/* 2. Langkah Kerja */}
          <button
            onClick={handleLangkahKerja}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 transition"
          >
            <Info className="w-4 h-4 text-teal-400" /> 2. Langkah Kerja
          </button>

          {/* 3. Amati Hasil */}
          <button
            onClick={handleAmatiHasil}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 transition"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400" /> 3. Amati Hasil
          </button>

          {/* 4. Ulangi */}
          <button
            onClick={handleUlangi}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/50 flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" /> 4. Ulangi
          </button>
        </div>
      </div>

      {/* Modal Langkah Kerja */}
      {activeModal === 'langkah' && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-teal-400 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" /> Langkah Kerja: Filtrasi
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed text-slate-300">
              <li>Siapkan corong kaca beralaskan kertas saring kerucut di atas labu penampung Erlenmeyer.</li>
              <li>Aduk campuran suspensi air dan pasir di dalam gelas beker penuang.</li>
              <li>Klik tombol <strong>Mulai Percobaan</strong> untuk menuangkan campuran secara perlahan ke dinding corong.</li>
              <li>Amati zat cair yang merembes melewati pori kertas saring dan butiran pasir yang tertahan.</li>
              <li>Setelah selesai, klik tombol <strong>Amati Hasil</strong> untuk meneliti residu dan filtrat.</li>
            </ol>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal('none')}
                className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Amati Hasil */}
      {activeModal === 'hasil' && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-200 shadow-2xl">
            <h3 className="text-lg font-bold text-teal-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" /> Hasil Pengamatan Ilmiah
            </h3>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <strong className="text-amber-400 block mb-1">1. Zat Tertahan (Residu):</strong>
                Partikel butiran pasir tertahan pada kertas saring karena ukuran partikel pasir lebih besar daripada diameter pori-pori kertas saring.
              </div>
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <strong className="text-sky-400 block mb-1">2. Zat Lolos (Filtrat):</strong>
                Air bening terkumpul di labu Erlenmeyer bagian bawah karena molekul air berukuran jauh lebih kecil daripada pori kertas saring sehingga lolos dengan bebas.
              </div>
              <div className="p-3 bg-teal-950/60 rounded-xl border border-teal-600/30 text-teal-200">
                <strong>Kesimpulan Prinsip:</strong> Filtrasi bekerja memisahkan partikel padatan tak larut dari cairan murni berdasar perbedaan ukuran partikel.
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal('none')}
                className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                Kembali ke Lab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
