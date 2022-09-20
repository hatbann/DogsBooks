import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCumN8vJYR2Gy5Djrpmyb8JAbjnnaomXsQ",
    authDomain: "dogsbooks-9d37a.firebaseapp.com",
    projectId: "dogsbooks-9d37a",
    storageBucket: "dogsbooks-9d37a.appspot.com",
    messagingSenderId: "600789224313",
    appId: "1:600789224313:web:bdb5dd9db5b9ac6e787da8",
    measurementId: "G-3WT7F3M1YE"
};

const app = initializeApp(firebaseConfig);
const dbService = getFirestore();
const authService = getAuth();
const storageService = getStorage();

export default dbService;
export { authService, storageService };