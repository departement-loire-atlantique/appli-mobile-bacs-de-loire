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
      codeHoraire: 'liaison1',
      north: {
        name: 'Couëron',
        webcamId: 'coueron1',
        codeBus: 'CBAC',
        libelleBus: 'Bac de Couëron',
        location: {
          lat: '47.205729',
          lng: '-1.751960',
          placeQuery: 'Quai+du+bac+Couëron',
        },
        address: 'Quai du bac Couëron\n44640 Le Pellerin',
      },
      south: {
        name: 'Le Pellerin',
        webcamId: 'coueron2',
        codeBus: 'LPBA',
        libelleBus: 'Bac du Pellerin',
        location: {
          lat: '47.203055',
          lng: '-1.755171',
          placeQuery: 'Quai+du+bac+Le+Pellerin'
        },
        address: 'Quai du bac Le Pellerin\n44640 Le Pellerin',
      }
    },
    {
      id: 'bii',
      codeHoraire: 'liaison2',
      north: {
        name: 'Basse-Indre',
        webcamId: 'indre1',
        codeBus: 'BIND',
        libelleBus: 'Basse-Indre',
        location: {
          lat: '47.1961689',
          lng: '-1.6777476',
          placeQuery: 'Bac+de+Loire+:+Basse+Indre+>+Indret'
        },
        address: '24 Quai Victor Boquien\n 44610 Indre'
      },
      south: {
        name: 'Indret',
        webcamId: 'indre2',
        codeBus: 'BIND',
        libelleBus: 'Basse-Indre',
        location: {
          lat: '47.1951236',
          lng: '-1.6805797',
          placeQuery: 'Quai+du+bac+Indret',
        },
        address: 'Quai du bac Indret, 44610 Indre'
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
