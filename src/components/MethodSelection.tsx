import React from 'react';
import { SeparationMethodId } from '../types';
import { Filter, Waves, Flame, Sparkles, Binary } from 'lucide-react';

interface MethodSelectionProps {
  onSelectMethod: (id: SeparationMethodId) => void;
}

export const methodList = [
  {
    id: 'filtrasi' as SeparationMethodId,
    nama: 'Filtrasi (Penyaringan)',
    campuran: 'Pasir dan Air (Suspensi)',
    deskripsi: 'Memisahkan zat padat berbutir kasar yang tidak larut dari zat cair menggunakan media berpori (kertas saring).',
    icon: Filter,
    status: 'Tersedia Lengkap (Tahap 1)'
  },
  {
    id: 'dekantasi' as SeparationMethodId,
    nama: 'Dekantasi (Penuangan Langsung)',
    campuran: 'Endapan Pasir & Air',
    deskripsi: 'Pemisahan zat padat yang mengendap di dasar wadah dengan menuangkan cairan bagian atas secara hati-hati.',
    icon: Waves,
    status: 'Tahap 3'
  },
  {
    id: 'evaporasi' as SeparationMethodId,
    nama: 'Evaporasi (Penguapan)',
    campuran: 'Larutan Garam Dapur',
    deskripsi: 'Pemisahan zat padat terlarut homogen dengan memanaskan larutan hingga seluruh pelarut menguap.',
    icon: Flame,
    status: 'Tahap 3'
  },
  {
    id: 'kristalisasi' as SeparationMethodId,
    nama: 'Kristalisasi',
    campuran: 'Larutan Garam Jenuh',
    deskripsi: 'Pemisahan zat terlarut murni melalui pembentukan struktur kristal padat teratur dari larutan jenuh.',
    icon: Sparkles,
    status: 'Tahap 3'
  },
  {
    id: 'distilasi' as SeparationMethodId,
    nama: 'Distilasi (Penyulingan)',
    campuran: 'Campuran Air dan Garam / Alkohol',
    deskripsi: 'Pemisahan campuran berdasarkan perbedaan titik didih melalui siklus penguapan terarah dan kondensasi pendinginan.',
    icon: Binary,
    status: 'Tahap 3'
  }
];

export const MethodSelection: React.FC<MethodSelectionProps> = ({ onSelectMethod }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Pilih Metode Pemisahan Campuran</h2>
          <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
            Pilih salah satu percobaan di bawah ini untuk memulai investigasi di dalam laboratorium virtual 3D.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodList.map((item) => {
            const Icon = item.icon;
            const isReady = item.id === 'filtrasi';
            return (
              <div
                key={item.id}
                onClick={() => onSelectMethod(item.id)}
                className={`bg-white rounded-2xl border-2 transition p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg ${
                  isReady
                    ? 'border-teal-500 hover:border-teal-600 ring-2 ring-teal-50'
                    : 'border-slate-200 hover:border-slate-300 opacity-90'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${isReady ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isReady ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-slate-100 text-slate-600'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.nama}</h3>
                  <div className="text-xs font-semibold text-teal-700 mb-3">Bahan: {item.campuran}</div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.deskripsi}</p>
                </div>
                <button
                  className={`w-full py-2.5 rounded-xl font-medium text-sm transition ${
                    isReady
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  {isReady ? 'Masuk ke Lab 3D' : 'Buka Pratinjau'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
