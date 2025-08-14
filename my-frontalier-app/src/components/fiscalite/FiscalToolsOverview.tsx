import React from 'react';

interface FiscalToolsOverviewProps {
  onSelectTou: () => void;
  onSelectQuasiResident: () => void;
}

const FiscalToolsOverview: React.FC<FiscalToolsOverviewProps> = ({ onSelectTou, onSelectQuasiResident }) => {
  return (
    <div>
      <header className="section-header">
        <h1 className="section-title font-display">Outils Fiscaux</h1>
        <p className="section-subtitle">Simulateurs et outils d'optimisation fiscale pour frontaliers</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* TOU vs Retenue à la Source Card */}
        <div className="fiscal-tool-card premium-card p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105" onClick={onSelectTou}>
          <div className="fiscal-card-header mb-6">
            <div className="fiscal-card-icon mb-4">
              <i className="fas fa-balance-scale text-4xl text-accent"></i>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">TOU vs Retenue à la Source</h3>
            <p className="text-text-secondary text-sm">Simulateur de comparaison fiscale</p>
          </div>
          <div className="fiscal-card-content mb-6">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Comparez votre impôt avec la Retenue à la Source et la Taxation Ordinaire Unique (TOU) pour optimiser votre situation fiscale.
            </p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li className="flex items-center"><i className="fas fa-check text-success mr-2"></i>Calcul précis basé sur les barèmes officiels</li>
              <li className="flex items-center"><i className="fas fa-check text-success mr-2"></i>Prise en compte des déductions</li>
              <li className="flex items-center"><i className="fas fa-check text-success mr-2"></i>Recommandation personnalisée</li>
            </ul>
          </div>
          <div className="fiscal-card-footer">
            <button className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
              <i className="fas fa-calculator mr-2"></i>
              Accéder au simulateur
            </button>
          </div>
        </div>

        {/* Quasi-Resident Status Card */}
        <div className="fiscal-tool-card premium-card p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105" onClick={onSelectQuasiResident}>
          <div className="fiscal-card-header mb-6">
            <div className="fiscal-card-icon mb-4">
              <i className="fas fa-user-check text-4xl text-success"></i>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Statut Quasi-Résident</h3>
            <p className="text-text-secondary text-sm">Vérification d'éligibilité</p>
          </div>
          <div className="fiscal-card-content mb-6">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Vérifiez si vous êtes éligible au statut de quasi-résident et découvrez les avantages fiscaux associés.
            </p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li className="flex items-center"><i className="fas fa-check text-success mr-2"></i>Test d'éligibilité automatique</li>
              <li className="flex items-center"><i className="fas fa-check text-success mr-2"></i>Calcul du seuil des 90%</li>
              <li className="flex items-center"><i className="fas fa-check text-success mr-2"></i>Conseils personnalisés</li>
            </ul>
          </div>
          <div className="fiscal-card-footer">
            <button className="w-full bg-success hover:bg-success/90 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
              <i className="fas fa-user-check mr-2"></i>
              Vérifier mon éligibilité
            </button>
          </div>
        </div>

        {/* Tax Declaration Assistant Card (Coming Soon) */}
        <div className="fiscal-tool-card premium-card p-8 opacity-75 cursor-not-allowed">
          <div className="fiscal-card-header mb-6">
            <div className="fiscal-card-icon mb-4">
              <i className="fas fa-file-invoice text-4xl text-purple-600"></i>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Assistant Déclaration</h3>
            <p className="text-text-secondary text-sm">Aide à la déclaration fiscale</p>
          </div>
          <div className="fiscal-card-content mb-6">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Assistant intelligent pour vous guider dans votre déclaration fiscale suisse et française.
            </p>
            <ul className="text-xs text-text-secondary space-y-1">
              <li className="flex items-center"><i className="fas fa-clock text-orange-500 mr-2"></i>Guide étape par étape</li>
              <li className="flex items-center"><i className="fas fa-clock text-orange-500 mr-2"></i>Vérification automatique</li>
              <li className="flex items-center"><i className="fas fa-clock text-orange-500 mr-2"></i>Export des documents</li>
            </ul>
          </div>
          <div className="fiscal-card-footer">
            <button className="w-full bg-gray-400 text-white font-medium py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center">
              <i className="fas fa-clock mr-2"></i>
              Bientôt disponible
            </button>
          </div>
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <i className="fas fa-info-circle text-accent text-xl"></i>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-medium text-accent mb-2">Expertise Fiscale Frontalière</h4>
            <p className="text-accent/80 text-sm leading-relaxed">
              Nos outils fiscaux sont spécialement conçus pour les travailleurs frontaliers. Ils prennent en compte
              les spécificités de la fiscalité franco-suisse et vous aident à optimiser votre situation fiscale
              en toute conformité avec les réglementations en vigueur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiscalToolsOverview;
