'use client';

import React from 'react';
import NewsGrid from '@/components/news/NewsGrid';

const ActualitesPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Actualités</h1>
        <p className="mt-2 text-lg text-gray-600">Les dernières informations sur la fiscalité transfrontalière</p>
      </header>
      <NewsGrid />
    </div>
  );
};

export default ActualitesPage;
