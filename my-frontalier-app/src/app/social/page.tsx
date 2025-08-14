'use client';

import React from 'react';
import LamalCmuSimulator from '@/components/social/LamalCmuSimulator';

const SocialPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Social</h1>
        <p className="mt-2 text-lg text-gray-600">Comparateurs et outils pour la protection sociale</p>
      </header>
      <LamalCmuSimulator />
    </div>
  );
};

export default SocialPage;
