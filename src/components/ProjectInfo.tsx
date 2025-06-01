import React from 'react';

const ProjectInfo: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Proyek Akhir Semester Mata Kuliah
      </h2>
      <p className="text-lg text-gray-700 font-medium">Sistem Pakar</p>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        "EmoSense adalah situs yang membantu mahasiswa akhir mengukur tingkat depresi mereka dengan mengisi formulir pertanyaan. Kami percaya bahwa mengetahui tingkat depresi Anda adalah langkah pertama dalam menemukan solusi dan menangani masalah ini."
      </p>
    </div>
  );
};

export default ProjectInfo;