'use client';

import React from 'react';
import FaqAccordion from '@/components/faq/FaqAccordion';

const FaqPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Foire Aux Questions</h1>
        <p className="mt-2 text-lg text-gray-600">Trouvez des réponses aux questions fréquentes</p>
      </header>
      <div className="max-w-4xl mx-auto">
        <FaqAccordion />
      </div>
    </div>
  );
};

export default FaqPage;
