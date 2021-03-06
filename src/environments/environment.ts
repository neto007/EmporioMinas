// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// import 'zone.js/dist/zone-error';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB_1iOhRSdRmEqWVEl8XtVZLSEM2r_cazY",
    authDomain: "electronapp-d2cb6.firebaseapp.com",
    databaseURL: "https://electronapp-d2cb6.firebaseio.com",
    projectId: "electronapp-d2cb6",
    storageBucket: "electronapp-d2cb6.appspot.com",
    messagingSenderId: "352468646900"
  }
};
