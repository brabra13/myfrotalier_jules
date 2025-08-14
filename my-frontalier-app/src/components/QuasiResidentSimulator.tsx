'use client';

import { useState, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight, FaCalculator, FaRedo, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaStar, FaLightbulb } from 'react-icons/fa';

// Constants
const EXCHANGE_RATES = {
  CHF_TO_EUR: 0.92,
  EUR_TO_CHF: 1.087,
};

// Types
type Currency = 'CHF' | 'EUR';

interface FormData {
  familyStatus: string;
  incomeDependent: string;
  incomeIndependent: string;
  incomeSpouse: string;
  incomeForeign: string;
  rentalPrimary: string;
  rentalSecondary: string;
  incomeLmnp: string;
  incomeOther: string;
}

interface CurrencyStates {
  incomeDependent: Currency;
  incomeIndependent: Currency;
  incomeSpouse: Currency;
  incomeForeign: Currency;
  rentalPrimary: Currency;
  rentalSecondary: Currency;
  incomeLmnp: Currency;
  incomeOther: Currency;
}

interface ResultData {
  eligible: boolean;
  ratio: number;
  totalSwissIncome: number;
  totalWorldIncome: number;
}

const QuasiResidentSimulator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    familyStatus: 'single',
    incomeDependent: '120000',
    incomeIndependent: '0',
    incomeSpouse: '0',
    incomeForeign: '5000',
    rentalPrimary: '0',
    rentalSecondary: '0',
    incomeLmnp: '0',
    incomeOther: '0',
  });
  const [currencyStates, setCurrencyStates] = useState<CurrencyStates>({
    incomeDependent: 'CHF',
    incomeIndependent: 'CHF',
    incomeSpouse: 'CHF',
    incomeForeign: 'CHF',
    rentalPrimary: 'CHF',
    rentalSecondary: 'CHF',
    incomeLmnp: 'CHF',
    incomeOther: 'CHF',
  });
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getValueInCHF = (field: keyof FormData): number => {
    const value = parseFloat(formData[field]) || 0;
    return currencyStates[field] === 'EUR' ? value * EXCHANGE_RATES.EUR_TO_CHF : value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCurrencyToggle = (field: keyof CurrencyStates) => {
    const currentCurrency = currencyStates[field];
    const newCurrency = currentCurrency === 'CHF' ? 'EUR' : 'CHF';
    const currentValue = parseFloat(formData[field as keyof FormData]) || 0;
    const conversionRate = newCurrency === 'EUR' ? EXCHANGE_RATES.CHF_TO_EUR : EXCHANGE_RATES.EUR_TO_CHF;

    setCurrencyStates(prev => ({ ...prev, [field]: newCurrency }));
    setFormData(prev => ({
      ...prev,
      [field]: (currentValue * conversionRate).toFixed(2),
    }));
  };

  const convertedValue = (field: keyof FormData) => {
      const value = parseFloat(formData[field]) || 0;
      if (value === 0) return '';
      const currentCurrency = currencyStates[field];
      const targetCurrency = currentCurrency === 'CHF' ? 'EUR' : 'CHF';
      const rate = currentCurrency === 'CHF' ? EXCHANGE_RATES.CHF_TO_EUR : EXCHANGE_RATES.EUR_TO_CHF;
      return `≈ ${(value * rate).toLocaleString('fr-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${targetCurrency}`;
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1 && !formData.familyStatus) {
      newErrors.familyStatus = 'Veuillez sélectionner une situation familiale.';
    }
    if (currentStep === 2) {
      const swissIncome = getValueInCHF('incomeDependent') + getValueInCHF('incomeIndependent');
      if (swissIncome <= 0) {
        newErrors.incomeDependent = 'Veuillez saisir au moins un revenu en Suisse.';
        newErrors.incomeIndependent = 'Veuillez saisir au moins un revenu en Suisse.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const calculateEligibility = () => {
    if (!validateStep(3)) return;

    setLoading(true);
    setStep(4);

    setTimeout(() => {
      const swissIncome = getValueInCHF('incomeDependent') + getValueInCHF('incomeIndependent');
      let totalSwissIncome = swissIncome;
      if (formData.familyStatus === 'married') {
        totalSwissIncome += getValueInCHF('incomeSpouse');
      }

      const worldIncome =
        totalSwissIncome +
        getValueInCHF('incomeForeign') +
        getValueInCHF('rentalPrimary') +
        getValueInCHF('rentalSecondary') +
        getValueInCHF('incomeLmnp') +
        getValueInCHF('incomeOther');

      const ratio = worldIncome > 0 ? (totalSwissIncome / worldIncome) * 100 : 0;

      setResult({
        eligible: ratio >= 90,
        ratio: Math.round(ratio),
        totalSwissIncome,
        totalWorldIncome: worldIncome,
      });
      setLoading(false);
    }, 1500);
  };

  const startNewSimulation = () => {
    setStep(1);
    setFormData({
        familyStatus: 'single',
        incomeDependent: '120000',
        incomeIndependent: '0',
        incomeSpouse: '0',
        incomeForeign: '5000',
        rentalPrimary: '0',
        rentalSecondary: '0',
        incomeLmnp: '0',
        incomeOther: '0',
    });
    setCurrencyStates({
        incomeDependent: 'CHF',
        incomeIndependent: 'CHF',
        incomeSpouse: 'CHF',
        incomeForeign: 'CHF',
        rentalPrimary: 'CHF',
        rentalSecondary: 'CHF',
        incomeLmnp: 'CHF',
        incomeOther: 'CHF',
    });
    setResult(null);
    setErrors({});
  };

  const progress = useMemo(() => {
    if (step === 4) return 100;
    return (step / 3) * 100;
  }, [step]);

  const CurrencyInput = ({ field, label, helpText }: { field: keyof FormData, label: string, helpText?: string }) => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{currencyStates[field]}</span>
        </div>
        <input
          type="number"
          name={field}
          id={field}
          value={formData[field]}
          onChange={handleChange}
          className={`w-full pl-10 pr-16 py-2 border rounded-md ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button type="button" onClick={() => handleCurrencyToggle(field)} className="px-3 py-1 text-sm bg-gray-200 rounded-r-md">
            {currencyStates[field] === 'CHF' ? 'EUR' : 'CHF'}
          </button>
        </div>
      </div>
      {convertedValue(field) && <p className="text-xs text-gray-500 mt-1">{convertedValue(field)}</p>}
      {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Votre situation familiale</h3>
            <p className="text-gray-600 mb-6">Le statut familial détermine si les revenus de votre conjoint doivent être pris en compte dans le calcul.</p>
            <div>
              <label htmlFor="familyStatus" className="block text-sm font-medium text-gray-700">Situation familiale</label>
              <select
                id="familyStatus"
                name="familyStatus"
                value={formData.familyStatus}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border rounded-md ${errors.familyStatus ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="single">Célibataire</option>
                <option value="married">Marié/Pacsé</option>
                <option value="divorced">Divorcé/Séparé</option>
                <option value="widowed">Veuf/Veuve</option>
              </select>
              {errors.familyStatus && <p className="text-xs text-red-500 mt-1">{errors.familyStatus}</p>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-4">Vos revenus imposables en Suisse</h3>
            <p className="text-gray-600 mb-6">Inclure tous les revenus soumis à l'impôt à la source en Suisse (salaires, primes, bonus).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CurrencyInput field="incomeDependent" label="Revenu brut de l'activité dépendante" />
              <CurrencyInput field="incomeIndependent" label="Bénéfice net de l'activité indépendante" />
              {formData.familyStatus === 'married' && (
                <CurrencyInput field="incomeSpouse" label="Revenus bruts annuels de votre conjoint" />
              )}
            </div>
          </>
        );
      case 3:
        return (
            <>
              <h3 className="text-xl font-semibold mb-4">Vos autres revenus mondiaux</h3>
              <p className="text-gray-600 mb-6">Tous revenus perçus hors de Suisse (salaires étrangers, dividendes, intérêts, pensions, etc.)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CurrencyInput field="incomeForeign" label="Revenus hors Suisse" />
                <CurrencyInput field="rentalPrimary" label="Valeur locative résidence principale" />
                <CurrencyInput field="rentalSecondary" label="Valeur locative résidence secondaire" />
                <CurrencyInput field="incomeLmnp" label="Revenus LMNP" />
                <CurrencyInput field="incomeOther" label="Autres revenus" />
              </div>
            </>
          );
      case 4:
        if (loading) {
          return (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-lg font-semibold">Calcul en cours...</p>
            </div>
          );
        }
        if (result) {
          return result.eligible ? <EligibleResult result={result} /> : <NotEligibleResult result={result} />;
        }
        return null;
      default:
        return null;
    }
  };

  const EligibleResult = ({ result }: { result: ResultData }) => (
    <div className="p-6 bg-green-50 border-l-4 border-green-500">
      <div className="flex">
        <div className="flex-shrink-0">
          <FaCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-green-800">Félicitations ! Vous êtes éligible au statut de quasi-résident.</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>Votre ratio de revenus suisses est de <strong>{result.ratio}%</strong>, ce qui dépasse le seuil de 90%.</p>
            <p className="mt-2">Total des revenus suisses: {result.totalSwissIncome.toLocaleString('fr-CH')} CHF</p>
            <p>Total des revenus mondiaux: {result.totalWorldIncome.toLocaleString('fr-CH')} CHF</p>
          </div>
        </div>
      </div>
    </div>
  );

  const NotEligibleResult = ({ result }: { result: ResultData }) => (
    <div className="p-6 bg-red-50 border-l-4 border-red-500">
      <div className="flex">
        <div className="flex-shrink-0">
          <FaTimesCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-red-800">Vous n'êtes pas éligible au statut de quasi-résident.</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>Votre ratio de revenus suisses est de <strong>{result.ratio}%</strong>, ce qui est inférieur au seuil de 90%.</p>
            <p className="mt-2">Total des revenus suisses: {result.totalSwissIncome.toLocaleString('fr-CH')} CHF</p>
            <p>Total des revenus mondiaux: {result.totalWorldIncome.toLocaleString('fr-CH')} CHF</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Vérification du Statut Quasi-Résident</h2>
            <p className="text-gray-600 mt-2">Vérifiez votre éligibilité pour optimiser vos déductions fiscales.</p>
        </div>

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

      <div className="min-h-[250px]">
        {renderStepContent()}
      </div>

      <div className="mt-8 pt-5 border-t border-gray-200 flex justify-between items-center">
        <div>
          {step > 1 && (
            <button onClick={handlePrevStep} className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
              <FaArrowLeft className="mr-2" />
              Précédent
            </button>
          )}
        </div>
        <div>
          {step < 3 && (
            <button onClick={handleNextStep} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Suivant
              <FaArrowRight className="ml-2" />
            </button>
          )}
          {step === 3 && (
            <button onClick={calculateEligibility} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              <FaCalculator className="mr-2" />
              Calculer l'éligibilité
            </button>
          )}
          {step === 4 && (
            <button onClick={startNewSimulation} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              <FaRedo className="mr-2" />
              Nouvelle Simulation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuasiResidentSimulator;
