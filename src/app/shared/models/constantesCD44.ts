
export const KEYCHOICE = 'choix_quai';
export const langFr = {
  COUERON: 'Coueron',
  BASSEINDRE: 'Basse-Indre',
  LEPELLERIN: 'Le Pellerin',
  INDRET: 'Indret',
  error: {
    titleHome: 'Informations',
    bodyHome: 'Une erreur est survenue. Pour continuer cliquer sur votre quai.',
  }
};

export const PICTO_EVENTS = [
  {picto: 'brume', event: 'Brume'},
  {picto: 'maree-basse', event: 'Marée basse'},
  {picto: 'marree', event: 'Marée haute'},
  {picto: 'panne', event: 'Panne'},
  {picto: 'vent-fort', event: 'Vent fort'},
  {picto: 'houle', event: 'Houle'},
  {picto: 'glaces', event: 'Glaces'},
  {picto: 'ravitaillement', event: 'Ravitaillement'},
  {picto: 'incident', event: 'Incident'},
  {picto: 'incident', event: 'Autre'},
];

export const EVENTS_BDL = [
  {
    identifiant: '1bac138634100043520929',
    datePublication: '2013-12-06T15:43:11 +0200',
    ligne1: 'Arrêt cause Ravitaillement',
    ligne2: 'Bacs de Loire',
    ligne3: 'Liaison : Basse-Indre / Indret',
    ligne4: 'Fin prévisible : 06/12/2013 18h00',
    rattachement: 'Bac de Loire Basse-Indre - Indret',
    nature: 'Bacs de Loire',
    type: 'Ravitaillement',
    statut: 'en cours',
    longitude: '346309.9563331381',
    latitude: '6687822.358774481'
  },
  {
    identifiant: '1bac138634084131941389',
    datePublication: '2013-12-06T16:40:43 +0200',
    ligne1: 'Arrêt cause Vent fort ',
    ligne2: 'Bacs de Loire',
    ligne3: 'Liaison : Couëron / Le Pellerin',
    ligne4: 'Reprise non prévisible',
    rattachement: 'Bac de Loire Coueron - Le Pellerin',
    nature: 'Bacs de Loire',
    type: 'Vent fort',
    statut: 'en cours',
    longitude: '340388.9858845473',
    latitude: '6689074.07272879'
  },
  {
    identifiant: '1bac138657999896338549',
    datePublication: '2013-12-09T10:06:43 +0200',
    ligne1: 'Risque d’arrêt cause Marée basse',
    ligne2: 'Bacs de Loire',
    ligne3: 'Liaison : Basse-Indre / Indret',
    ligne4: 'Le 24/12/2013 de 10h00 à 13h30',
    rattachement: 'Bac de Loire Basse-Indre - Indret',
    nature: 'Bacs de Loire',
    type: 'Marée basse',
    statut: 'prévisionnel',
    longitude: '346309.9563331381',
    latitude: '6687822.358774481'
  },
];
