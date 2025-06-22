/*
  # Données initiales pour Promptly

  1. Flows de base par métier
    - RH : Réponse candidature, Fiche de poste, Entretien annuel
    - Juridique : Contrat prestation, Mise en demeure
    - Marketing : Stratégie contenu, Email marketing
    - Analyse : Rapport performance

  2. Catégories et métiers standards
  3. Exemples de variables pour chaque flow
*/

-- Insertion des flows de base (publics, créés par le système)
INSERT INTO flows (
  name, 
  description, 
  category, 
  icon_name, 
  prompt_template, 
  variables, 
  is_personal, 
  is_public,
  gradient_colors,
  bg_gradient_colors,
  created_by_user_id
) VALUES 
-- Flows RH
(
  'Réponse Candidature Pro',
  'Rédigez des emails de réponse professionnels aux candidatures',
  'RH',
  'Mail',
  'Rédigez un email professionnel pour répondre à {{candidat}} concernant sa candidature pour le poste de {{poste}}. Statut de la candidature: {{statut}}. Adoptez un ton {{ton}} et incluez {{elements_specifiques}}.',
  '[
    {"name": "candidat", "example": "Marie Dupont", "required": true},
    {"name": "poste", "example": "Développeur Frontend", "required": true},
    {"name": "statut", "example": "retenue/non retenue/en attente", "required": true},
    {"name": "ton", "example": "bienveillant", "required": false},
    {"name": "elements_specifiques", "example": "prochaines étapes, contact RH", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-blue-500 to-cyan-500',
  'from-blue-50/80 to-cyan-50/80',
  null
),
(
  'Fiche de Poste Expert',
  'Créez des fiches de poste détaillées et attractives',
  'RH',
  'Briefcase',
  'Créez une fiche de poste complète pour le poste de {{titre_poste}} dans le secteur {{secteur}}. Incluez les missions principales, le profil recherché, les compétences requises et les conditions. Niveau d''expérience: {{experience}}.',
  '[
    {"name": "titre_poste", "example": "Chef de Projet Digital", "required": true},
    {"name": "secteur", "example": "E-commerce", "required": true},
    {"name": "experience", "example": "3-5 ans", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-green-500 to-emerald-500',
  'from-green-50/80 to-emerald-50/80',
  null
),
(
  'Entretien Annuel 360°',
  'Préparez des entretiens d''évaluation complets',
  'RH',
  'Users',
  'Préparez un guide d''entretien annuel pour {{nom_employe}}, occupant le poste de {{poste}}. Objectifs de l''année: {{objectifs}}. Points à aborder: {{points_evaluation}}.',
  '[
    {"name": "nom_employe", "example": "Jean Martin", "required": true},
    {"name": "poste", "example": "Responsable Marketing", "required": true},
    {"name": "objectifs", "example": "Augmentation CA 15%, Formation équipe", "required": false},
    {"name": "points_evaluation", "example": "Performance, Collaboration, Innovation", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-purple-500 to-indigo-500',
  'from-purple-50/80 to-indigo-50/80',
  null
),

-- Flows Juridique
(
  'Contrat Prestation Pro',
  'Rédigez des contrats de prestation sécurisés',
  'Juridique',
  'Shield',
  'Rédigez un contrat de prestation de services entre {{client}} et {{prestataire}} pour {{service}}. Durée: {{duree}}. Montant: {{montant}}. Conditions particulières: {{conditions}}.',
  '[
    {"name": "client", "example": "Entreprise ABC SAS", "required": true},
    {"name": "prestataire", "example": "Consultant XYZ", "required": true},
    {"name": "service", "example": "Audit informatique", "required": true},
    {"name": "duree", "example": "3 mois", "required": false},
    {"name": "montant", "example": "15 000€ HT", "required": false},
    {"name": "conditions", "example": "Confidentialité, Propriété intellectuelle", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-red-500 to-pink-500',
  'from-red-50/80 to-pink-50/80',
  null
),
(
  'Mise en Demeure Express',
  'Rédigez des mises en demeure efficaces',
  'Juridique',
  'AlertCircle',
  'Rédigez une mise en demeure formelle à {{debiteur}} concernant {{objet}}. Montant dû: {{montant}}. Délai accordé: {{delai}}. Fondement juridique: {{fondement}}.',
  '[
    {"name": "debiteur", "example": "Société DEF SARL", "required": true},
    {"name": "objet", "example": "Facture impayée n°2024-001", "required": true},
    {"name": "montant", "example": "5 000€", "required": true},
    {"name": "delai", "example": "15 jours", "required": false},
    {"name": "fondement", "example": "Article 1231-1 du Code civil", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-orange-500 to-red-500',
  'from-orange-50/80 to-red-50/80',
  null
),

-- Flows Marketing
(
  'Stratégie Contenu 360°',
  'Créez des stratégies de contenu performantes',
  'Marketing',
  'Rocket',
  'Créez une stratégie de contenu complète pour {{marque}} sur {{plateforme}}. Audience cible: {{cible}}. Objectif principal: {{objectif}}. Ton de communication: {{ton}}.',
  '[
    {"name": "marque", "example": "TechStart", "required": true},
    {"name": "plateforme", "example": "LinkedIn", "required": true},
    {"name": "cible", "example": "Dirigeants PME", "required": true},
    {"name": "objectif", "example": "Génération de leads", "required": false},
    {"name": "ton", "example": "Expert et accessible", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-pink-500 to-rose-500',
  'from-pink-50/80 to-rose-50/80',
  null
),
(
  'Email Marketing Pro',
  'Rédigez des campagnes email qui convertissent',
  'Marketing',
  'Mail',
  'Créez un email marketing pour promouvoir {{produit}}. Audience: {{audience}}. Call-to-action principal: {{cta}}. Offre spéciale: {{offre}}.',
  '[
    {"name": "produit", "example": "Formation en ligne", "required": true},
    {"name": "audience", "example": "Entrepreneurs débutants", "required": true},
    {"name": "cta", "example": "S''inscrire maintenant", "required": true},
    {"name": "offre", "example": "-30% jusqu''au 31/12", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-yellow-500 to-orange-500',
  'from-yellow-50/80 to-orange-50/80',
  null
),

-- Flows Analyse
(
  'Rapport Performance Pro',
  'Analysez et présentez vos performances',
  'Analyse',
  'BarChart3',
  'Créez un rapport de performance détaillé pour {{periode}} concernant {{departement}}. KPIs analysés: {{kpis}}. Recommandations: {{recommandations}}.',
  '[
    {"name": "periode", "example": "Q4 2024", "required": true},
    {"name": "departement", "example": "Ventes", "required": true},
    {"name": "kpis", "example": "CA, Taux conversion, Satisfaction client", "required": true},
    {"name": "recommandations", "example": "Optimisation processus, Formation équipe", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-indigo-500 to-purple-500',
  'from-indigo-50/80 to-purple-50/80',
  null
),

-- Flows Commercial
(
  'Proposition Commerciale Pro',
  'Créez des propositions qui convertissent',
  'Commercial',
  'TrendingUp',
  'Rédigez une proposition commerciale pour {{prospect}} concernant {{solution}}. Budget estimé: {{budget}}. Délai de mise en œuvre: {{delai}}. Avantages clés: {{avantages}}.',
  '[
    {"name": "prospect", "example": "Startup Innovation", "required": true},
    {"name": "solution", "example": "CRM personnalisé", "required": true},
    {"name": "budget", "example": "25 000€", "required": false},
    {"name": "delai", "example": "3 mois", "required": false},
    {"name": "avantages", "example": "ROI 200%, Support 24/7", "required": false}
  ]'::jsonb,
  false,
  true,
  'from-emerald-500 to-teal-500',
  'from-emerald-50/80 to-teal-50/80',
  null
);

-- Mise à jour des compteurs d'utilisation avec des valeurs réalistes
UPDATE flows SET usage_count = 
  CASE 
    WHEN name LIKE '%Candidature%' THEN 245
    WHEN name LIKE '%Contenu%' THEN 423
    WHEN name LIKE '%Contrat%' THEN 312
    WHEN name LIKE '%Email Marketing%' THEN 267
    WHEN name LIKE '%Fiche%' THEN 189
    WHEN name LIKE '%Performance%' THEN 178
    WHEN name LIKE '%Entretien%' THEN 156
    WHEN name LIKE '%Proposition%' THEN 134
    WHEN name LIKE '%Mise en Demeure%' THEN 98
    ELSE 50
  END;