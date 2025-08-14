'use client';

import React from 'react';

const newsData = [
  {
    category: 'Fiscalité',
    date: '10 juillet 2025',
    title: 'Nouveaux seuils pour le télétravail des frontaliers à Genève',
    excerpt: 'Les autorités genevoises ont annoncé une augmentation du nombre de jours de télétravail autorisés...',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Social',
    date: '08 juillet 2025',
    title: 'Réforme des cotisations sociales pour les travailleurs frontaliers',
    excerpt: 'Une nouvelle convention entre la France et la Suisse modifie les règles de cotisation sociale...',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
    {
    category: 'Échéance',
    date: '05 juillet 2025',
    title: 'Déclaration fiscale 2025 : dates importantes à retenir',
    excerpt: 'Le calendrier des déclarations fiscales pour 2025 vient d\'être publié. Notez les dates limites...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
];

const NewsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsData.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group">
          <div className="relative h-48 w-full">
             <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-2">{item.date} - <span className="font-semibold text-blue-600">{item.category}</span></p>
            <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
