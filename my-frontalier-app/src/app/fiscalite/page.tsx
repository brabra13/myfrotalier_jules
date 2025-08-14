'use client';

import React, { useState } from 'react';
import FiscalToolsOverview from '@/components/fiscalite/FiscalToolsOverview';
import TouSimulator from '@/components/fiscalite/TouSimulator';
import QuasiResidentSimulator from '@/components/fiscalite/QuasiResidentSimulator';

type ActiveSimulator = 'overview' | 'tou' | 'quasi-resident';

const FiscalitePage: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState<ActiveSimulator>('overview');

  const renderActiveSimulator = () => {
    switch (activeSimulator) {
      case 'tou':
        return <TouSimulator onBack={() => setActiveSimulator('overview')} />;
      case 'quasi-resident':
        return <QuasiResidentSimulator onBack={() => setActiveSimulator('overview')} />;
      case 'overview':
      default:
        return (
          <FiscalToolsOverview
            onSelectTou={() => setActiveSimulator('tou')}
            onSelectQuasiResident={() => setActiveSimulator('quasi-resident')}
          />
        );
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12">
      {renderActiveSimulator()}
    </div>
  );
};

export default FiscalitePage;
