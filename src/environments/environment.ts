// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.loire-atlantique.fr/opendata/1.0',
  apiUrlHoraire: 'https://api.loire-atlantique.fr/bacspsn_android/1.0/traficparameter?id=bacs_horaires',
  apiUrlBus: 'http://open.tan.fr/ewp/tempsattente.json/',
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
        codeBus: 'CBAC',
        codeHoraire: 'liaison1'
      },
      south: {
        name: 'Le Pellerin',
        webcamIds: ['coueron1', 'coueron2'],
        codeBus: 'LPBA',
        codeHoraire: 'liaison1'
      }
    },
    {
      id: 'bii',
      north: {
        name: 'Basse-Indre',
        webcamIds: ['indre1', 'indre2'],
        codeBus: 'BIND',
        codeHoraire: 'liaison2'
      },
      south: {
        name: 'Indret',
        webcamIds: ['indre1', 'indre2'],
        codeBus: 'BIND',
        codeHoraire: 'liaison2'
      }
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
