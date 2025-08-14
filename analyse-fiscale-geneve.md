# Analyse Fiscale Complète - Canton de Genève 2024-2025

## Vue d'ensemble des réformes fiscales 2025

Le canton de Genève connaît en 2025 des réformes fiscales majeures qui impactent significativement la charge fiscale des contribuables. Cette analyse se concentre exclusivement sur les spécificités genevoises.

## 1. Réduction de l'Impôt Cantonal et Communal (ICC) - Réforme 2025

### Caractéristiques de la réforme
- **Entrée en vigueur** : 1er janvier 2025
- **Réduction moyenne** : 8,7% sur l'ensemble des contribuables
- **Bénéficiaires majeurs** : Plus de 50% des contribuables voient leur ICC baisser d'au moins 10%
- **Taux maximum** : Passage de 11,54% à 11,4% (taux effectif total)
- **Taux minimum effectif** : Abaissement à 5,3%

### Impact par catégorie de revenus
| Profil | Revenu imposable | Économie annuelle |
|--------|------------------|-------------------|
| Célibataire | 80'000 CHF | 400-600 CHF |
| Couple + 2 enfants | 140'000 CHF | 700-1'000 CHF |
| Classe moyenne | 60'000-150'000 CHF | Réduction la plus marquée |

### Application pratique
- **Acomptes 2025** : Ne reflètent pas encore la réduction
- **Calcul final** : Nouveau barème appliqué automatiquement
- **Remboursement** : Intérêts en cas de trop-versé

## 2. Barème ICC Genève 2024 - 18 Tranches Progressives

### Structure détaillée du barème (personnes seules)

| Revenu min (CHF) | Revenu max (CHF) | Taux (%) | Impôt cumulé (CHF) |
|------------------|------------------|----------|-------------------|
| 0 | 18'479 | 0.00 | 0.00 |
| 18'480 | 22'264 | 8.00 | 302.80 |
| 22'265 | 24'491 | 9.00 | 503.25 |
| 24'492 | 26'717 | 10.00 | 725.85 |
| 26'718 | 28'943 | 11.00 | 970.70 |
| 28'944 | 34'509 | 12.00 | 1'638.60 |
| 34'510 | 38'962 | 13.00 | 2'217.50 |
| 38'963 | 43'416 | 14.00 | 2'841.05 |
| 43'417 | 47'868 | 14.50 | 3'486.60 |
| 47'869 | 76'811 | 15.00 | 7'828.05 |
| 76'812 | 125'793 | 15.50 | 15'420.25 |
| 125'794 | 169'208 | 16.00 | 22'366.65 |
| 169'209 | 191'473 | 16.50 | 26'040.40 |
| 191'474 | 273'850 | 17.00 | 40'044.50 |
| 273'851 | 291'661 | 17.50 | 43'161.45 |
| 291'662 | 410'775 | 18.00 | 64'601.95 |
| 410'776 | 643'435 | 18.50 | 107'644.05 |
| 643'436+ | ∞ | 19.00 | - |

### Formule de calcul par tranche
```
SI revenu <= limite_tranche ALORS
    impot = impot_cumule_precedent + (revenu - limite_precedente) × taux_tranche
```

## 3. Centimes Additionnels Communaux 2025

### Impact géographique significatif

#### Communes fiscalement attractives
| Commune | Centimes (%) | Type de commune |
|---------|--------------|----------------|
| Genthod | 25.0 | Commune aisée |
| Cologny | 25.0 | Commune résidentielle |
| Vandœuvres | 27.0 | Commune résidentielle |
| Collonge-Bellerive | 28.0 | Commune aisée |
| Anières | 31.0 | Commune résidentielle |
| Pregny-Chambésy | 32.0 | Commune aisée |

#### Ville de Genève
- **Taux 2025** : 45,49%
- **Statut** : Taux moyen du canton

#### Communes les plus chères
| Commune | Centimes (%) | Caractéristiques |
|---------|--------------|------------------|
| Avully | 51.0 | Commune rurale |
| Chancy | 51.0 | Commune rurale |
| Onex | 50.5 | Commune urbaine |

### Calcul de l'impact géographique
- **Écart maximum** : 26 points (Genthod 25% vs Avully/Chancy 51%)
- **Pour un revenu de 100'000 CHF** : ~3'000 CHF d'écart d'impôt communal
- **Stratégie résidentielle** : Le choix de commune peut significativement impacter la fiscalité

## 4. Système de Splitting Fiscal

### Trois types de splitting disponibles

#### Splitting standard (50%)
- **Couples mariés** : Taux appliqué à 50% du revenu imposable, résultat multiplié par 2
- **Familles monoparentales** : Même traitement que couples mariés
- **Coefficient** : 0.5000

#### Splitting partiel (55,56%)
- **Situation** : Garde alternée sans pension alimentaire
- **Coefficient** : 0.5556 (taux appliqué à 55,56% du revenu)
- **Conditions** :
  - Célibataire, divorcé ou séparé
  - Garde alternée à parts égales
  - Aucune pension alimentaire versée
  - Faire ménage commun avec l'enfant

#### Procédure pour le splitting partiel
```
Pour les contribuables à l'impôt à la source :
1. Demander une TOU (Taxation Ordinaire Ultérieure)
2. Remplir formulaire DRIS/TOU
3. Déposer avant le 31 mars de l'année suivante
```

## 5. Calculs Spécifiques ICC Genève

### Structure complète de calcul

#### Étape 1 : Impôt de base
- Calculé selon le barème progressif à 18 tranches
- Application du splitting si éligible

#### Étape 2 : Réductions et ajouts
```
Impôt de base après réduction = Impôt_de_base × (1 - 0.12)  // -12%

Centimes cantonaux = Impôt_de_base × 0.475 × (1 - 0.12)    // 47.5% réduits de 12%

Centime aide domicile = Impôt_de_base × 0.01               // 1%

Centimes communaux = Impôt_de_base × (Taux_communal / 100)
```

#### Étape 3 : Calcul final
```
ICC_total = Impot_reduit + Centimes_cantonaux + Aide_domicile + Centimes_communaux
```

### Répartition géographique
- **Part privilégiée (domicile)** : 80%
- **Part lieu de travail** : 20%

## 6. Réforme LEFI 2025 - Fiscalité Immobilière

### Date d'entrée en vigueur
**1er janvier 2025** - Validée par le Tribunal Fédéral

### Mesures principales

#### Réduction de l'impôt sur la fortune
- **Baisse linéaire** : -15% du barème
- **Bénéficiaires** : Tous les contribuables avec fortune imposable
- **Objectif** : Compenser partiellement la revalorisation immobilière

#### Revalorisation des biens immobiliers
- **Augmentation** : +12% de la valeur fiscale
- **Concernés** : Immeubles acquis avant le 31 décembre 2014
- **Indexation future** : Maximum +1% par an (indice genevois des prix)

#### Impôt immobilier complémentaire (IIC)
- **Ancien taux** : 1‰ de la valeur fiscale
- **Nouveau taux** : 0,2‰ (division par 5)
- **Concernés** : Résidences principales uniquement

#### IBGI - Gains immobiliers
- **Nouveau taux** : 2% (au lieu de 0%)
- **Concernés** : Ventes d'immeubles détenus plus de 25 ans
- **Justification** : Mise en conformité avec le droit fédéral

### Recours possibles
- **Délai** : Dans les 60 jours suivant réception du bordereau
- **Motif** : Contestation de la revalorisation de 12%
- **Condition** : Démontrer que le bien n'a pas pris cette valeur

## 7. Déductions Fiscales 2025

### Frais professionnels forfaitaires
| Type d'impôt | Pourcentage | Minimum (CHF) | Maximum (CHF) |
|--------------|-------------|---------------|---------------|
| IFD | 3% | 2'000 | 4'000 |
| ICC | 3% | 609 | 1'725 |

### Déductions familiales et sociales

#### Déductions par personne (2025)
| Type de déduction | Montant (CHF) |
|-------------------|---------------|
| Déduction enfant | 6'800 |
| Déduction couple marié | 2'800 |
| Réduction impôt par enfant | 263 |
| Déduction personne à charge | 6'800 |

#### Autres déductions importantes
| Déduction | Montant maximum (CHF) |
|-----------|----------------------|
| Frais de déplacement (IFD) | 3'200 |
| Formation continue | 13'000 |
| Garde d'enfants (par enfant) | 25'800 |
| Primes assurance avec 2e pilier | 3'600 |
| Primes assurance sans 2e pilier | 5'400 |

## 8. Impôt à la Source 2025

### Barèmes disponibles
- **Barème A** : Personnes seules
- **Barème B** : Personnes mariées (conjoint sans revenu)
- **Barème C** : Couples mariés (deux revenus)
- **Barème H** : Ménages avec enfants
- **Barème G** : Assurances (accidents, invalidité, chômage, maternité)
- **Barèmes A1-A5** : Avec pension alimentaire

### Nouveautés 2025
- **Intégration automatique** de la réduction ICC dès janvier 2025
- **Changement automatique** de barème en cas de séparation/divorce
- **Splitting partiel** disponible via TOU

### Cas particuliers
- **Frontaliers** : Soumis à l'impôt à la source jusqu'à obtention permis C
- **Couples séparés** : Imposition séparée dès l'année de séparation
- **Divorce** : Répartition des acomptes selon convention

## 9. Particularités Fiscales Genevoises

### Taxation forfaitaire
- **Base minimale fédérale** : 421'700 CHF
- **Base minimale cantonale** : 406'651 CHF
- **Calcul** : Maximum entre 7× valeur locative, dépenses effectives, revenus suisses
- **Majoration fortune** : +10% de la base pour l'ICC

### Taxes spéciales
- **Taxe personnelle** : 25 CHF par foyer fiscal majeur
- **Financement** : Assistance publique médicale
- **Exonération** : Possible pour contribuables à faibles revenus

### Bouclier fiscal (Article 60 LIPP)
```
ICC + Impôt_fortune ≤ 60% du revenu_net_imposable
```

### Spécificités genevoises
- **Absence d'impôt ecclésiastique**
- **Forte densité de services publics**
- **Concurrence fiscale intercantonale**

## 10. Nouveautés Administratives 2025

### Paiement des acomptes
- **Nouveau système** : 12 mensualités (au lieu de 10)
- **Avantage** : Meilleure répartition de la charge fiscale
- **Flexibilité** : Possibilité d'ajustement en cours d'année

### Outils numériques
- **Calculateur en ligne** : Estimation des impôts et ajustement des acomptes
- **Formulaires numériques** : Dématérialisation des démarches
- **Suivi en temps réel** : Possibilité de modifier les acomptes

## 11. Stratégies d'Optimisation Fiscale

### Choix de résidence
| Stratégie | Impact | Considérations |
|-----------|--------|----------------|
| Commune à bas centimes | -3'000 CHF/an pour 100k revenus | Coût immobilier plus élevé |
| Part privilégiée | Optimisation 80%/20% | Lieu de domicile vs travail |

### Optimisation familiale
- **Mariage** : Bénéfice du splitting (50%)
- **Garde alternée** : Splitting partiel (55,56%)
- **Déductions enfants** : 6'800 CHF + 263 CHF de réduction

### Optimisation patrimoniale 2025
- **Avant LEFI** : Vendre avant revalorisation +12%
- **Après LEFI** : Profiter de la réduction fortune -15%
- **IIC résidences principales** : Économie 80% (1‰ → 0,2‰)

## 12. Données pour Intégration Logicielle

### Structure JSON recommandée
```json
{
  "baremes_icc_2024": {
    "tranches": [18 tranches avec min, max, taux, cumul]
  },
  "centimes_communaux_2025": {
    "45 communes avec taux exacts"
  },
  "splitting_coefficients": {
    "marie": 0.5,
    "monoparental": 0.5,
    "partiel": 0.5556
  },
  "calculs_icc": {
    "reduction_base": 0.12,
    "centimes_cantonaux": 0.475,
    "aide_domicile": 0.01
  }
}
```

### Formules de calcul clés
```python
def calculer_icc_geneve(revenu, commune, situation_familiale):
    # 1. Calcul impôt de base selon barème
    impot_base = calculer_selon_bareme(revenu, situation_familiale)
    
    # 2. Réductions et ajouts
    impot_reduit = impot_base * (1 - 0.12)
    centimes_cantonaux = impot_base * 0.475 * (1 - 0.12)
    aide_domicile = impot_base * 0.01
    centimes_communaux = impot_base * (taux_commune / 100)
    
    # 3. Total ICC
    return impot_reduit + centimes_cantonaux + aide_domicile + centimes_communaux
```

## 13. Sources et Validation

### Sources officielles
- **Loi sur l'imposition des personnes physiques (LIPP)**
- **Administration fiscale cantonale Genève**
- **Délibérations communales 2025**
- **Arrêts Tribunal Fédéral (LEFI)**

### Outils de validation
- **Calculateur AFC Genève** : ge.ch
- **GeTax** : Validation pour Genève
- **Simulateurs communaux**

### Mise à jour des données
- **Barèmes ICC** : Annuelle (janvier)
- **Centimes communaux** : Mars (délibérations)
- **Déductions** : Adaptation inflation
- **LEFI** : Indexation annuelle maximum 1%

---

Cette analyse fournit toutes les données nécessaires pour implémenter un système de calcul fiscal spécifique au canton de Genève, en tenant compte de toutes les réformes 2025 et particularités locales.