import React, { useState, useEffect } from 'react';
import { fetchSymptoms, fetchCfOptions, submitDiagnosis } from '../services/api';

interface Symptom {
  id: string;
  name: string;
  expert_cf: number;
}

interface CfOption {
  label: string;
  value: number;
}

interface Result {
  name: string;
  cf: number;
}

const DiagnosePage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [cfOptions, setCfOptions] = useState<CfOption[]>([]);
  const [userInputs, setUserInputs] = useState<{ [key: string]: number }>({});
  const [results, setResults] = useState<Result[]>([]);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [symptomsRes, cfOptionsRes] = await Promise.all([
          fetchSymptoms(),
          fetchCfOptions(),
        ]);
        setSymptoms(Object.values(symptomsRes.data));
        setCfOptions(Object.values(cfOptionsRes.data));
      } catch (err) {
        setError('Gagal mengambil data dari server. Pastikan backend berjalan.');
      }
    };
    fetchData();
  }, []);

  const handleSelect = (id: string, value: number) => {
    setUserInputs((prev) => {
      const key = `symptom_${id}`;
      if (prev[key] === value) {
        const { [key]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [key]: value,
        };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const validInputs = Object.fromEntries(
        Object.entries(userInputs).filter(([key]) => key.startsWith('symptom_'))
          .map(([key, value]) => [key.replace('symptom_', ''), value])
      );
      const res = await submitDiagnosis(validInputs);
      setResults(Object.entries(res.data.results || {}).map(([_, value]: [string, any]) => ({
        name: value.name,
        cf: value.cf / 100,
      })));
      setDiagnosis(res.data.diagnosis || 'Tidak ada diagnosis yang dominan.');
      setConfidence(res.data.confidence ? res.data.confidence / 100 : null);
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Terjadi kesalahan saat menghubungi server.');
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (newStep: number) => {
    if (newStep < 1 || newStep > 3) return;
    setLoading(true);
    setError(null);
    if (newStep === 1) {
      setUserInputs({});
      setResults([]);
      setDiagnosis(null);
      setConfidence(null);
    }
    setStep(newStep);
    setTimeout(() => setLoading(false), 300);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Informasi Tes</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              EmoSense adalah alat untuk membantu Anda menilai tingkat emosi melalui serangkaian pertanyaan. Tes ini dirancang untuk memberikan wawasan tentang kondisi emosional Anda berdasarkan jawaban yang Anda berikan. Hasil ini bukan diagnosis klinis, dan kami menyarankan konsultasi dengan profesional jika diperlukan.
            </p>
            <div className="text-center">
              <button
                onClick={() => goToStep(2)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Berikutnya
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Masukkan Tingkat Keyakinan untuk Setiap Gejala</h2>
            <div className="space-y-6">
              {symptoms.map((symptom) => (
                <div key={symptom.id} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{symptom.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {cfOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(symptom.id, option.value)}
                        className={`flex-1 min-w-[100px] px-4 py-2 rounded-lg transition duration-200 ${
                          userInputs[`symptom_${symptom.id}`] === option.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 flex justify-center gap-4">
              <button
                onClick={() => goToStep(1)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Kembali
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Diagnosa Sekarang
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hasil Diagnosa</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kondisi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Keyakinan (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result) => (
                    <tr key={result.name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(result.cf * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {diagnosis && (
              <p className="mt-6 text-lg font-semibold text-gray-800">
                Diagnosis Akhir: {diagnosis} dengan tingkat keyakinan{' '}
                {confidence !== null ? (confidence * 100).toFixed(2) : '0'}%
              </p>
            )}
            <div className="text-center mt-6">
              <button
                onClick={() => goToStep(2)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Kembali
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
            {error}
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Diagnosa dengan EmoSense</h1>
        <div className="relative w-full max-w-3xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Informasi Tes</span>
            <span className="text-sm text-gray-600">Pertanyaan Tes</span>
            <span className="text-sm text-gray-600">Hasil Anda</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step >= s ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default DiagnosePage;