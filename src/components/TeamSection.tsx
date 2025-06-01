import React from 'react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dimas Juli Pratama',
      role: 'YTTA',
    },
    {
      name: 'M. Zulfan Mizan K',
      role: 'YTTA',
    },
    {
      name: 'Yanata Ikhtiaruci W.',
      role: 'YTTA',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Tim Kami
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <div className="w-32 h-32 bg-gray-300 mx-auto rounded-full mb-4 shadow-md"></div>
            <h3 className="font-semibold text-lg text-gray-800">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;