'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FaArrowLeft, FaCalculator, FaRedo, FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';

interface TouSimulatorProps {
  onBack: () => void;
}

interface ResultData {
  withholdingTax: number;
  touTax: number;
  savings: number;
  bestOption: 'TOU' | 'Source';
  details: any;
}

const TouSimulator: React.FC<TouSimulatorProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    commune: 'GENEVE',
    familyStatus: 'single',
    childrenCount: '0',
    annualIncome: '80000',
    spouseIncome: '0',
    wealth: '0',
    alimony: '0',
    deductionOption: 'forfaitaire',
    isQuasiResident: false,
  });
  const [result, setResult] = useState<ResultData | null>(null);
  const [taxData, setTaxData] = useState<any>(null);
  const [baremesData, setBaremesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taxRes = await fetch('/simulateur_tou_geneve_complete.json');
        const baremesRes = await fetch('/baremes-2024-impot-source_complet.json');

        if (!taxRes.ok || !baremesRes.ok) {
          throw new Error('Failed to fetch tax data');
        }

        const taxJson = await taxRes.json();
        const baremesJson = await baremesRes.json();

        setTaxData(taxJson);
        setBaremesData(baremesJson.baremes);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? checked : value
    }));
  };

  const getWithholdingRate = (income: number, familyStatus: string, childrenCount: number): number => {
    if (!baremesData) return 0;

    const bracket = baremesData.find((b: any) => {
        const range = b.tranche.annee_fr.replace(/'/g, '');
        const [min, max] = range.split(' - ').map(Number);
        return income >= min && income <= max;
    });

    if (!bracket) return 0;

    let key;
    const childrenKey = `_${childrenCount}_enfants_pourcent`;
    if (familyStatus === 'single') {
        key = 'A0_seule_pourcent';
        return bracket[key] || 0;
    } else if (familyStatus.startsWith('married')) {
        const type = formData.spouseIncome > '0' ? 'C' : 'B';
        key = `${type}${childrenCount}${childrenKey}`;
        const rate = type === 'C' ? bracket.C_marie_2_conjoints_travaillent[key] : bracket.B_marie_conjoint_ne_travaille_pas[key];
        return rate || 0;
    } else { // divorced, widow
        key = `H${childrenCount}${childrenKey}`;
        return bracket.H_famille_monoparentale[key] || 0;
    }
  };

  const calculateTouTax = (income: number, profil: any) => {
    const { deductions, social_contributions } = taxData;

    // 1. Social Contributions
    let totalSocial = 0;
    const socialDetails: any = {};
    for (const [key, value] of Object.entries(social_contributions)) {
      if (typeof value === 'object' && value !== null && 'taux_employe' in value) {
        const rate = (value as any).taux_employe;
        const ceiling = (value as any).plafond_salaire;
        const contribution = Math.min(income, ceiling || income) * rate;
        totalSocial += contribution;
        socialDetails[key] = contribution;
      }
    }

    // 2. Deductions
    let totalDeductions = totalSocial;
    const deductionDetails: any = { ...socialDetails };

    if (formData.deductionOption === 'forfaitaire' || formData.deductionOption === 'optimize') {
        const fraisPro = Math.max(
            deductions.frais_professionnels.min,
            Math.min(income * deductions.frais_professionnels.taux, deductions.frais_professionnels.max)
        );
        totalDeductions += fraisPro;
        deductionDetails['Frais Professionnels (forfait)'] = fraisPro;
    }
    // A full implementation would handle 'reel' and 'optimize' options here

    const taxableIncome = income - totalDeductions;

    // 3. ICC Tax
    const iccBareme = taxData.icc_geneve.bareme;
    let iccTax = 0;
    let cumulative = 0;
    for (const tranche of iccBareme) {
        if (taxableIncome > tranche.min) {
            const taxableInTranche = Math.min(taxableIncome, tranche.max) - tranche.min;
            iccTax = cumulative + taxableInTranche * tranche.taux;
        } else {
            break;
        }
        cumulative = tranche.cumul;
    }
    const municipalRate = taxData.icc_geneve.centimes_additionnels[formData.commune] / 100;
    iccTax = iccTax * (1 + municipalRate);

    // 4. IFD Tax
    const ifdBareme = taxData.ifd.bareme[profil.etat_civil === 'marié' ? 'couple' : 'celibataire'];
    let ifdTax = 0;
    cumulative = 0;
    for (const tranche of ifdBareme) {
        if (taxableIncome > tranche.min) {
            const taxableInTranche = Math.min(taxableIncome, tranche.max === 'plus' ? Infinity : tranche.max) - tranche.min;
            ifdTax = cumulative + taxableInTranche * tranche.taux;
        } else {
            break;
        }
        cumulative = tranche.cumul;
    }

    return {
      total: iccTax + ifdTax,
      details: {
        taxableIncome,
        totalDeductions,
        deductionDetails,
        iccTax,
        ifdTax
      }
    };
  };

  const calculateTaxes = () => {
    if (!taxData || !baremesData) {
      setError("Les données fiscales ne sont pas chargées.");
      return;
    }

    const income = parseFloat(formData.annualIncome);
    const childrenCount = parseInt(formData.childrenCount);

    // Withholding Tax
    const withholdingRate = getWithholdingRate(income, formData.familyStatus, childrenCount) / 100;
    const withholdingTax = income * withholdingRate;

    // TOU Tax
    const profil = {
      revenu_brut_determinant: income,
      etat_civil: formData.familyStatus.startsWith('married') ? 'marié' : 'celibataire',
      nombre_enfants: childrenCount
    }
    const touResult = calculateTouTax(income, profil);

    setResult({
      withholdingTax,
      touTax: touResult.total,
      savings: withholdingTax - touResult.total,
      bestOption: touResult.total < withholdingTax ? 'TOU' : 'Source',
      details: touResult.details,
    });

    setStep(4);
  };

  const progress = useMemo(() => {
    if (step === 4) return 100;
    return ((step -1) / 3) * 100;
  }, [step]);

  const handleNextStep = () => setStep(s => Math.min(s + 1, 4));
  const handlePrevStep = () => setStep(s => Math.max(s - 1, 1));

  const renderStepContent = () => {
    // UI remains the same as previous step
    switch (step) {
        case 1:
          return (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Situation personnelle</h3>
              <div>
                <label htmlFor="commune" className="block text-sm font-medium text-gray-700">Commune de résidence</label>
                <select id="commune" name="commune" value={formData.commune} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  {taxData?.icc_geneve?.centimes_additionnels && Object.keys(taxData.icc_geneve.centimes_additionnels).map((commune:string) => (
                    <option key={commune} value={commune}>{commune}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="familyStatus" className="block text-sm font-medium text-gray-700">Situation familiale</label>
                <select id="familyStatus" name="familyStatus" value={formData.familyStatus} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  <option value="single">Célibataire</option>
                  <option value="married-no-income">Marié·e sans conjoint imposé</option>
                  <option value="married-with-income">Marié·e avec conjoint ayant un revenu</option>
                  <option value="divorced-single">Divorcé·e vivant seul·e</option>
                  <option value="divorced-with-children">Divorcé·e avec enfants à charge</option>
                  <option value="widow">Veuf/Veuve</option>
                </select>
              </div>
               <div>
                <label htmlFor="childrenCount" className="block text-sm font-medium text-gray-700">Nombre d'enfants à charge</label>
                <input type="number" id="childrenCount" name="childrenCount" value={formData.childrenCount} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>
          );
        case 2:
          return (
              <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">Revenus et patrimoine</h3>
                  <div>
                      <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">Revenu annuel (CHF)</label>
                      <input type="number" id="annualIncome" name="annualIncome" value={formData.annualIncome} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  {formData.familyStatus === 'married-with-income' && (
                      <div>
                          <label htmlFor="spouseIncome" className="block text-sm font-medium text-gray-700">Revenu annuel du conjoint (CHF)</label>
                          <input type="number" id="spouseIncome" name="spouseIncome" value={formData.spouseIncome} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                      </div>
                  )}
                  <div>
                      <label htmlFor="wealth" className="block text-sm font-medium text-gray-700">Fortune imposable (CHF)</label>
                      <input type="number" id="wealth" name="wealth" value={formData.wealth} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                      <label htmlFor="alimony" className="block text-sm font-medium text-gray-700">Pension alimentaire versée (CHF)</label>
                      <input type="number" id="alimony" name="alimony" value={formData.alimony} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
              </div>
          );
        case 3:
          return (
              <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800">Déductions fiscales</h3>
                  <div>
                      <label htmlFor="deductionOption" className="block text-sm font-medium text-gray-700">Option de déductions TOU</label>
                      <select id="deductionOption" name="deductionOption" value={formData.deductionOption} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                          <option value="forfaitaire">Déductions forfaitaires</option>
                          <option value="reel">Frais réels</option>
                          <option value="optimize">Optimiser automatiquement</option>
                      </select>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                          <input id="isQuasiResident" name="isQuasiResident" type="checkbox" checked={formData.isQuasiResident} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                      </div>
                      <div className="ml-3 text-sm">
                          <label htmlFor="isQuasiResident" className="font-medium text-gray-700">Je suis quasi-résident</label>
                          <p className="text-gray-500">Plus de 90% de mes revenus sont imposés en Suisse.</p>
                      </div>
                  </div>
              </div>
          );
      case 4:
          if (!result) return <p>Aucun résultat à afficher.</p>;
          return (
              <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Résultats de la simulation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-lg">Retenue à la Source</h4>
                          <p className="text-2xl font-bold">{result.withholdingTax.toLocaleString('fr-CH')} CHF</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold text-lg">Taxation Ordinaire (TOU)</h4>
                          <p className="text-2xl font-bold">{result.touTax.toLocaleString('fr-CH')} CHF</p>
                      </div>
                  </div>
                  <div className={`mt-6 p-4 rounded-lg ${result.savings > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <p className="text-lg font-semibold">
                          L'option <span className="font-bold">{result.bestOption}</span> est plus avantageuse.
                      </p>
                      <p>Économie potentielle: <span className="font-bold">{Math.abs(result.savings).toLocaleString('fr-CH')} CHF</span></p>
                  </div>
              </div>
          )
      default:
        return null;
    }
  }

  if (loading) return <p>Chargement des données fiscales...</p>;
  if (error) return <p className="text-red-500">Erreur: {error}</p>;

  return (
    <div>
        <div className="flex items-center mb-6">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FaArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Simulateur TOU vs Retenue à la Source</h2>
                <p className="text-gray-600">Comparez votre impôt avec la Taxation Ordinaire Unique (TOU)</p>
            </div>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
            {step < 4 && (
                <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-indigo-600">Étape {step} sur 3</p>
                    <p className="text-sm font-medium text-indigo-600">{Math.round(progress)}%</p>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
                    <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                </div>
                </div>
            )}
            <div className="min-h-[300px]">
                {renderStepContent()}
            </div>
             <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between items-center">
                <div>
                  {step > 1 && (
                    <button onClick={handlePrevStep} className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                      <FaChevronLeft className="mr-2" />
                      Précédent
                    </button>
                  )}
                </div>
                <div>
                  {step < 3 && (
                    <button onClick={handleNextStep} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                      Suivant
                      <FaChevronRight className="ml-2" />
                    </button>
                  )}
                  {step === 3 && (
                     <button onClick={calculateTaxes} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                      <FaCalculator className="mr-2" />
                      Calculer
                    </button>
                  )}
                  {step === 4 && (
                      <button onClick={() => setStep(1)} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                        <FaRedo className="mr-2" />
                        Nouvelle Simulation
                      </button>
                  )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default TouSimulator;
