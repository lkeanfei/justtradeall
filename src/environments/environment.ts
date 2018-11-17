// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyBAnNt1TYYvnjQv4lcN29z1sp0l8rSRJkk",
    authDomain: "justtradeallproduction.firebaseapp.com",
    databaseURL: "https://justtradeallproduction.firebaseio.com",
    projectId: "justtradeallproduction",
    storageBucket: "justtradeallproduction.appspot.com",
    messagingSenderId: "1037655417356"
  }

};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
