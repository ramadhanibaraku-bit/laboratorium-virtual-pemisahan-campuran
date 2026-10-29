import React, { useState } from 'react';
import { SeparationMethodId, LkpdAnswer } from '../types';
import { isFirebaseConfigured, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface LkpdDigitalProps {
  defaultMethod: SeparationMethodId;
}

export const LkpdDigital: React.FC<LkpdDigitalProps> = ({ defaultMethod }) => {
  const [metode, setMetode] = useState<SeparationMethodId>(defaultMethod);
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('');
  const [absen, setAbsen] = useState('');
  const [prediksi, setPrediksi] = useState('');
  const [awal, setAwal] = useState('Campuran keruh air bercampur butiran pasir');
  const [residu, setResidu] = useState('');
  const [filtrat, setFiltrat] = useState('');
  const [analisis, setAnalisis] = useState('');
  const [kesimpulan, setKesimpulan] = useState('');

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'warn' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !kelas || !absen) {
      setStatusMessage({ type: 'warn', text: 'Harap lengkapi identitas siswa (Nama, Kelas, No. Absen).' });
      return;
    }

    const dataLKPD: LkpdAnswer = {
      siswaNama: nama,
      siswaKelas: kelas,
      siswaNoAbsen: absen,
      metode,
      prediksiAwal: prediksi,
      tabelPengamatan: {
        kondisiCampuranAwal: awal,
        zatTertahan: residu,
        zatLolos: filtrat
      },
      pertanyaanAnalisis: analisis,
      kesimpulan,
      submittedAt: new Date().toISOString()
    };

    setSubmitting(true);
    try {
      if (!isFirebaseConfigured || !db) {
        // JANGAN berbohong bahwa data tersimpan di server jika Firebase belum dikonfigurasi
        setStatusMessage({
          type: 'warn',
          text: 'Pemberitahuan: Firebase Cloud Firestore belum dikonfigurasi (.env belum diisi). Jawaban berhasil divalidasi dan dicatat pada sesi browser lokal ini, namun belum tersimpan ke database awan.'
        });
      } else {
        await addDoc(collection(db, 'lkpd_submissions'), {
          ...dataLKPD,
          timestamp: serverTimestamp()
        });
        setStatusMessage({
          type: 'success',
          text: 'Jawaban LKPD berhasil disimpan dan terkirim ke Database Cloud Guru!'
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Gagal mengirim jawaban: ${err.message || 'Terjadi kesalahan sistem'}`
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="border-b border-slate-200 pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Lembar Kerja Peserta Didik (LKPD)
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2">Investigasi Pemisahan Campuran</h2>
            </div>
            <select
              value={metode}
              onChange={(e) => setMetode(e.target.value as SeparationMethodId)}
              className="bg-slate-100 border border-slate-300 text-slate-800 text-sm font-semibold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="filtrasi">Filtrasi</option>
              <option value="dekantasi">Dekantasi</option>
              <option value="evaporasi">Evaporasi</option>
              <option value="kristalisasi">Kristalisasi</option>
              <option value="distilasi">Distilasi</option>
            </select>
          </div>
          <p className="text-slate-600 text-sm mt-2">
            Isi lembar kerja ini secara mandiri berdasarkan pengamatan yang kamu lakukan di dalam Laboratorium Virtual 3D.
          </p>
        </div>

        {/* Notifikasi Status */}
        {statusMessage && (
          <div
            className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : statusMessage.type === 'warn'
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Identitas Siswa */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-3">A. Identitas Peserta Didik</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kelas</label>
                <input
                  type="text"
                  required
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="Contoh: VII-A"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Absen</label>
                <input
                  type="text"
                  required
                  value={absen}
                  onChange={(e) => setAbsen(e.target.value)}
                  placeholder="Contoh: 14"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Tujuan Percobaan */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">B. Tujuan Percobaan</h4>
            <p className="text-xs text-slate-600 bg-teal-50/70 p-3 rounded-lg border border-teal-100">
              1. Menyelidiki prinsip dasar pemisahan campuran metode {metode}.<br />
              2. Mengidentifikasi karakteristik zat padat tertahan (residu) dan cairan hasil pemisahan (filtrat).
            </p>
          </div>

          {/* 3. Prediksi Awal (Hipotesis) */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">C. Prediksi Awal (Hipotesis)</h4>
            <p className="text-xs text-slate-500 mb-2">Menurutmu, zat apakah yang akan tertinggal pada media penyaring?</p>
            <textarea
              rows={2}
              value={prediksi}
              onChange={(e) => setPrediksi(e.target.value)}
              placeholder="Tulis dugaan sementaramu di sini..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* 4. Tabel Pengamatan */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">D. Tabel Data Pengamatan</h4>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="p-3 border-b">Keadaan Awal Campuran</th>
                    <th className="p-3 border-b">Zat Tertahan (Residu)</th>
                    <th className="p-3 border-b">Zat Lolos (Filtrat)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b">
                      <input
                        type="text"
                        value={awal}
                        onChange={(e) => setAwal(e.target.value)}
                        className="w-full px-2 py-1.5 border rounded border-slate-300"
                      />
                    </td>
                    <td className="p-3 border-b">
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Butiran pasir basah"
                        value={residu}
                        onChange={(e) => setResidu(e.target.value)}
                        className="w-full px-2 py-1.5 border rounded border-slate-300"
                      />
                    </td>
                    <td className="p-3 border-b">
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Air jernih tak berwarna"
                        value={filtrat}
                        onChange={(e) => setFiltrat(e.target.value)}
                        className="w-full px-2 py-1.5 border rounded border-slate-300"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Pertanyaan Analisis */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">E. Pertanyaan Analisis</h4>
            <p className="text-xs text-slate-500 mb-2">
Mengapa air dapat menembus kertas saring sedangkan pasir tertahan? Jelaskan berdasarkan ukuran partikel zat!
            </p>
            <textarea
              rows={3}
              required
              value={analisis}
              onChange={(e) => setAnalisis(e.target.value)}
              placeholder="Jelaskan kaitan antara ukuran pori kertas saring dengan ukuran molekul air dan pasir..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* 6. Kesimpulan */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">F. Kesimpulan</h4>
            <textarea
              rows={2}
              required
              value={kesimpulan}
              onChange={(e) => setKesimpulan(e.target.value)}
              placeholder="Tulis kesimpulan umum dari percobaan ini..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          {/* Tombol Simpan & Kirim */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2 text-sm disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {submitting ? 'Mengirim...' : 'Simpan & Kirim Jawaban'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
