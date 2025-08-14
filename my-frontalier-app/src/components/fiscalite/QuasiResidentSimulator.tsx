import React from 'react';

interface QuasiResidentSimulatorProps {
  onBack: () => void;
}

const QuasiResidentSimulator: React.FC<QuasiResidentSimulatorProps> = ({ onBack }) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-800 transition-colors">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <div className="bg-green-100 p-2 rounded-full mr-4">
          <i className="fas fa-user-check text-green-600 text-xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Vérification du Statut Quasi-Résident</h2>
          <p className="text-gray-600">Vérifiez votre éligibilité au statut de quasi-résident</p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p>Le simulateur de statut de quasi-résident sera implémenté ici.</p>
      </div>
    </div>
  );
};

export default QuasiResidentSimulator;
