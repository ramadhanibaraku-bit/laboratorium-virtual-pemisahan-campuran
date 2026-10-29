import React, { useState } from 'react';
import { EvaluasiQuestion } from '../types';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const SOAL_EVALUASI: EvaluasiQuestion[] = [
  {
    id: 1,
    soal: 'Metode pemisahan campuran yang didasarkan pada perbedaan ukuran partikel zat padat yang tidak larut dari pelarut cairnya disebut...',
    pilihan: ['A. Distilasi', 'B. Evaporasi', 'C. Filtrasi', 'D. Kromatografi'],
    kunciJawaban: 2,
    pembahasan: 'Filtrasi (penyaringan) bekerja memisahkan partikel padatan berukuran lebih besar dari pori-pori kertas saring.'
  },
  {
    id: 2,
    soal: 'Zat padat yang tertahan pada kertas saring setelah proses penyaringan selesai dinamakan...',
    pilihan: ['A. Filtrat', 'B. Residu', 'C. Solven', 'D. Distilat'],
    kunciJawaban: 1,
    pembahasan: 'Zat padatan yang tertahan di atas penyaring disebut residu, sedangkan cairan yang lolos menembus saringan disebut filtrat.'
  },
  {
    id: 3,
    soal: 'Jika kamu ingin memperoleh kristal garam dapur murni dari air laut dengan cara yang lebih teratur strukturnya dan lebih murni, metode yang lebih tepat dibandingkan penguapan biasa adalah...',
    pilihan: ['A. Dekantasi', 'B. Kristalisasi', 'C. Sublimasi', 'D. Filtrasi'],
    kunciJawaban: 1,
    pembahasan: 'Kristalisasi bertujuan memperoleh padatan zat terlarut dengan tingkat kemurnian dan struktur kisi kristal tinggi, bukan sekadar membuang pelarut.'
  },
  {
    id: 4,
    soal: 'Pada rangkaian alat distilasi, fungsi dari kondensor berpendingin air adalah...',
    pilihan: ['A. Memanaskan larutan garam', 'B. Menyaring kotoran padat', 'C. Mendinginkan dan mengembunkan uap kembali menjadi cairan', 'D. Mengukur suhu larutan'],
    kunciJawaban: 2,
    pembahasan: 'Kondensor Liebig berfungsi menyerap kalor uap panas sehingga uap mengembun kembali menjadi tetesan cairan murni (distilat).'
  }
];

export const EvaluasiSiswa: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: number, choiceIdx: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: choiceIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    SOAL_EVALUASI.forEach((q) => {
      if (userAnswers[q.id] === q.kunciJawaban) {
        correct++;
      }
    });
    return Math.round((correct / SOAL_EVALUASI.length) * 100);
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Evaluasi Pemahaman Mandiri
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Uji Kompetensi Pemisahan Campuran</h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Jawab soal pilihan ganda berikut untuk menguji pemahaman konsep IPA yang telah kamu pelajari di laboratorium virtual.
          </p>
        </div>

        {submitted && (
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-teal-800 uppercase">Hasil Evaluasimu</div>
              <div className="text-3xl font-extrabold text-teal-700 mt-0.5">{calculateScore()} / 100</div>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Coba Lagi
            </button>
          </div>
        )}

        <div className="space-y-6">
          {SOAL_EVALUASI.map((q, idx) => {
            const isSelected = userAnswers[q.id] !== undefined;
            const selectedChoice = userAnswers[q.id];
            return (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <p className="font-semibold text-slate-900 text-sm mb-3">
                  {idx + 1}. {q.soal}
                </p>
                <div className="space-y-2">
                  {q.pilihan.map((pilih, cIdx) => {
                    const isThisChoice = selectedChoice === cIdx;
                    let btnStyle = 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800';
                    if (submitted) {
                      if (cIdx === q.kunciJawaban) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                      } else if (isThisChoice) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                      }
                    } else if (isThisChoice) {
                      btnStyle = 'border-teal-500 bg-teal-50 text-teal-900 font-medium';
                    }

                    return (
                      <button
                        key={cIdx}
                        onClick={() => handleSelect(q.id, cIdx)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition ${btnStyle}`}
                      >
                        <span>{pilih}</span>
                        {submitted && cIdx === q.kunciJawaban && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        )}
                        {submitted && isThisChoice && cIdx !== q.kunciJawaban && (
                          <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-lg text-xs border border-blue-200">
                    <strong>Pembahasan:</strong> {q.pembahasan}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(userAnswers).length < SOAL_EVALUASI.length}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl shadow text-sm disabled:opacity-50 transition"
            >
              Selesai & Periksa Jawaban
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
