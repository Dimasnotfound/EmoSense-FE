import React, { useState, useEffect } from 'react';
import { fetchDiagnoses } from '../services/api';

interface Diagnosis {
  id: number;
  created_at: string;
  user_inputs: { [key: string]: number };
  results: { [key: string]: { name: string; cf: number } };
  diagnosis: string;
  confidence: number | null;
}

const DashboardPage: React.FC = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetchDiagnoses();
      setDiagnoses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const handleDetailClick = (diagnosis: Diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDiagnosis(null);
  };

  const currentDateTime = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard EmoSense
          </h1>
          <p className="text-sm text-gray-600">
            Terakhir diperbarui: {currentDateTime} WIB
          </p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
          </div>
        ) : diagnoses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-xl text-gray-600">Belum ada data diagnosis.</p>
            <p className="text-sm text-gray-500 mt-2">Silakan lakukan diagnosis untuk melihat riwayat.</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
              Riwayat Diagnosis Anda
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Diagnosis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Keyakinan (%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {diagnoses.map((diagnosis) => (
                    <tr
                      key={diagnosis.id}
                      className="hover:bg-gray-50 transition duration-200 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(diagnosis.created_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {diagnosis.diagnosis}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {diagnosis.confidence !== null ? diagnosis.confidence.toFixed(2) : 'N/A'}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDetailClick(diagnosis)}
                          className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showModal && selectedDiagnosis && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Detail Diagnosis</h3>
              <pre className="text-sm text-gray-700 overflow-auto max-h-96 bg-gray-50 p-4 rounded">
                {JSON.stringify(selectedDiagnosis, null, 2)}
              </pre>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;