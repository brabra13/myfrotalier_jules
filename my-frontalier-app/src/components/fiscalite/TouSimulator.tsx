import React from 'react';

interface TouSimulatorProps {
  onBack: () => void;
}

const TouSimulator: React.FC<TouSimulatorProps> = ({ onBack }) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-800 transition-colors">
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <i className="fas fa-balance-scale text-blue-600 text-xl"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Simulateur TOU vs Retenue à la Source</h2>
          <p className="text-gray-600">Comparez votre impôt avec la Retenue à la Source et la Taxation Ordinaire Unique (TOU)</p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p>Le simulateur de comparaison de régime fiscal sera implémenté ici.</p>
      </div>
    </div>
  );
};

export default TouSimulator;
