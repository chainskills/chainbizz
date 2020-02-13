/*
  Retrieve the Firebase settings that should be if the form:
  
  export const firebaseConfig = {
  apiKey: 'your key',
  authDomain: 'your key',
  databaseURL: 'your key',
  projectId: 'your key',
  storageBucket: 'your key',
  messagingSenderId: 'your key',
  appId: 'your key'
};
*/

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
