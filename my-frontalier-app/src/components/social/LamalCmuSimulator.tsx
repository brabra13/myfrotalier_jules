'use client';

import React, { useState } from 'react';

const LamalCmuSimulator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    familySituation: 'single',
    childrenCount: '0',
    spouseIncome: 'no',
    canton: 'geneve',
    age: '35',
    salary: '80000',
    rfr: '35000',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    // Simplified calculation logic
    const salary = parseFloat(formData.salary);
    const rfr = parseFloat(formData.rfr);

    const lamalCost = (150 * 12);
    const cmuCost = (rfr - 9000) * 0.08;

    setResult({ lamalCost, cmuCost } as any);
    setStep(4);
  }

  const renderForm = () => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Situation familiale</label>
            <select name="familySituation" value={formData.familySituation} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option value="single">Célibataire</option>
                <option value="married">Marié/Pacsé</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Nombre d'enfants à charge</label>
            <input type="number" name="childrenCount" value={formData.childrenCount} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Salaire Brut Annuel en CHF</label>
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Revenu Fiscal de Référence (RFR) N-2</label>
            <input type="number" name="rfr" value={formData.rfr} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <button onClick={calculate} className="w-full bg-blue-600 text-white py-2 rounded-md">Calculer</button>
    </div>
  );

  const renderResult = () => (
    <div className="text-center">
        <h3 className="text-xl font-bold">Résultats</h3>
        {result && (
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 border rounded">
                    <h4 className="font-semibold">Coût LAMal / an</h4>
                    <p className="text-2xl">{(result as any).lamalCost.toLocaleString('fr-CH')} €</p>
                </div>
                <div className="p-4 border rounded">
                    <h4 className="font-semibold">Coût CMU / an</h4>
                    <p className="text-2xl">{(result as any).cmuCost.toLocaleString('fr-CH')} €</p>
                </div>
            </div>
        )}
        <button onClick={() => setStep(1)} className="mt-4 bg-gray-200 text-black py-2 px-4 rounded-md">Nouvelle simulation</button>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Simulateur LAMal vs. CMU</h2>
      {step < 4 ? renderForm() : renderResult()}
    </div>
  );
};

export default LamalCmuSimulator;
