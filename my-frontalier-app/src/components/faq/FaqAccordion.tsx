'use client';

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqData = [
  {
    question: 'Quelles sont les conditions pour bénéficier du statut de quasi-résident à Genève ?',
    answer: 'Pour bénéficier du statut de quasi-résident, au moins 90% de vos revenus mondiaux bruts doivent être imposables en Suisse. Cela vous permet de déduire vos frais effectifs.'
  },
  {
    question: 'Comment déclarer mes revenus suisses en France ?',
    answer: 'Vos revenus suisses doivent être déclarés sur le formulaire 2047-SUISSE, puis reportés sur votre déclaration 2042. Le montant à déclarer est votre salaire brut moins les cotisations sociales obligatoires.'
  },
  {
    question: 'Quelle assurance maladie choisir en tant que frontalier ?',
    answer: 'Vous avez le choix entre la LAMal (assurance suisse) et la CMU (via l\'URSSAF en France). Le choix dépend de votre situation familiale, de vos revenus et de vos besoins en matière de santé. Notre simulateur peut vous aider à comparer les coûts.'
  },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg">
      {faqData.map((item, index) => (
        <div key={index} className="border-b last:border-b-0">
          <button
            onClick={() => toggleFaq(index)}
            className="w-full flex justify-between items-center p-6 text-left"
          >
            <span className="font-semibold text-gray-800">{item.question}</span>
            <FaChevronDown className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-6 text-gray-600">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
