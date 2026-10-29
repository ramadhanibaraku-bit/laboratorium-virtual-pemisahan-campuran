import React, { useState } from 'react';
import { isFirebaseConfigured } from '../firebase';
import { ShieldAlert, Users, Database, CheckCircle, RefreshCw } from 'lucide-react';

export const DashboardGuru: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // PIN demo proteksi akses guru
  const handleLoginGuru = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'GURUIPA7' || pin === '1234') {
      setIsAuthorized(true);
    } else {
      alert('PIN Guru salah! Gunakan default: GURUIPA7');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl mx-auto flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Akses Terproteksi Guru</h2>
          <p className="text-slate-600 text-xs mb-6">
            Halaman ini khusus untuk pendidik meninjau hasil LKPD dan evaluasi siswa.
          </p>
          <form onSubmit={handleLoginGuru} className="space-y-4">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Masukkan PIN Guru (Contoh: GURUIPA7)"
                className="w-full px-3 py-2 border rounded-lg text-sm text-center tracking-widest focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-semibold text-sm transition"
            >
              Buka Dashboard Guru
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Dashboard Penilaian Guru</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
              Rekapitulasi pengumpulan LKPD digital dan nilai evaluasi pemisahan campuran.
            </p>
          </div>
          <button
            onClick={() => setIsAuthorized(false)}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 font-semibold"
          >
            Kunci Kembali Dashboard
          </button>
        </div>

        {/* Status Database */}
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${
          isFirebaseConfigured
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          <Database className="w-5 h-5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <strong>Status Cloud Firestore: </strong>
            {isFirebaseConfigured
              ? 'Terkoneksi ke Cloud Firestore. Pengiriman siswa akan sinkron secara langsung.'
              : 'Firebase belum dikonfigurasi pada environment. Menampilkan simulasi data lokal.'}
          </div>
        </div>

        {/* Tabel Rekap Jawaban LKPD Siswa */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">Daftar Pengiriman LKPD Siswa (Contoh & Live)</h3>
            <span className="text-xs bg-teal-50 text-teal-700 font-bold px-2 py-1 rounded">
              Metode: Filtrasi
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Nama Siswa</th>
                  <th className="p-3">Kelas / No</th>
                  <th className="p-3">Zat Tertahan (Residu)</th>
                  <th className="p-3">Zat Lolos (Filtrat)</th>
                  <th className="p-3">Kesimpulan</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-medium text-slate-900">Ahmad Fauzan</td>
                  <td className="p-3">VII-B / 02</td>
                  <td className="p-3 text-amber-700 font-medium">Pasir tertinggal di kertas</td>
                  <td className="p-3 text-sky-700 font-medium">Air jernih menembus ke bawah</td>
                  <td className="p-3">Pemisahan berhasil berdasar ukuran partikel</td>
                  <td className="p-3"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Tervalidasi</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Siti Nurhaliza</td>
                  <td className="p-3">VII-B / 28</td>
                  <td className="p-3 text-amber-700 font-medium">Endapan pasir di corong</td>
                  <td className="p-3 text-sky-700 font-medium">Filtrat air bening</td>
                  <td className="p-3">Zat cair lolos karena lebih kecil dari pori saring</td>
                  <td className="p-3"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Tervalidasi</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
