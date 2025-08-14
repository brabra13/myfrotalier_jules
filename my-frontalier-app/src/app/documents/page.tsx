'use client';

import React from 'react';
import DocumentUploader from '@/components/documents/DocumentUploader';

const DocumentsPage: React.FC = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Dépôt de Documents</h1>
        <p className="mt-2 text-lg text-gray-600">Téléchargez et gérez vos documents en toute sécurité</p>
      </header>
      <DocumentUploader />
    </div>
  );
};

export default DocumentsPage;
