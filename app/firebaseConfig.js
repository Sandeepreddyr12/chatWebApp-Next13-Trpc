// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdx711Vit7uDcq-8J9A2aZ3kHFKdh-JPA',
  authDomain: 'trpcchatphotobucket.firebaseapp.com',
  projectId: 'trpcchatphotobucket',
  storageBucket: 'trpcchatphotobucket.appspot.com',
  messagingSenderId: '203638798737',
  appId: '1:203638798737:web:0022e897c3ef9cfda4c230',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getStorage(app);
