export const environment = {
  production: true,
  apiUrl: 'https://api.loire-atlantique.fr/opendata/1.0',
  firebaseConfig: {
    apiKey: 'AIzaSyB9cig_VWGYD9oGn5x6Gg-mY9kN6gORV-M',
    authDomain: 'hybride-bacs-de-loire.firebaseapp.com',
    databaseURL: 'https://hybride-bacs-de-loire.firebaseio.com',
    projectId: 'hybride-bacs-de-loire',
    storageBucket: 'hybride-bacs-de-loire.appspot.com',
    messagingSenderId: '449146789897',
    appId: '1:449146789897:web:4a76a721edfc535f1c98d8',
    measurementId: 'G-NCXJSBN15N'
  },
  liaisons: [
    {
      id: 'clp',
      north: {
        name: 'Couëron',
        webcamIds: ['coueron1', 'coueron2'],
        codeBus: 'CBAC'
      },
      south: {
        name: 'Le Pellerin',
        webcamIds: ['coueron1', 'coueron2'],
        codeBus: 'LPBA'
      }
    },
    {
      id: 'bii',
      north: {
        name: 'Basse-Indre',
        webcamIds: ['indre1', 'indre2'],
        codeBus: 'BIND'
      },
      south: {
        name: 'Indret',
        webcamIds: ['indre1', 'indre2'],
        codeBus: 'BIND'
      }
    }
  ]
};
