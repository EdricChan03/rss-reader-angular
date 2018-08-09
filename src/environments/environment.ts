// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  swLocation: '',
  firebase: {
    apiKey: "AIzaSyB70FnAVNaxg33vyY4tlPKZ5x00QY80mTc",
    authDomain: "rss-reader-a5b4b.firebaseapp.com",
    databaseURL: "https://rss-reader-a5b4b.firebaseio.com",
    projectId: "rss-reader-a5b4b",
    storageBucket: "",
    messagingSenderId: "870397667989"
  }
};
