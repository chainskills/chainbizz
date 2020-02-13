import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { firebaseConfig } from './keys';

// setup of firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDB = firebaseApp.firestore();
export const firebaseStorage = firebaseApp.storage();

// collections
export const projectsRef = firebaseDB.collection('projects');
