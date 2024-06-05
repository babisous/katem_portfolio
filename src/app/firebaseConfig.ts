import firebase from "firebase/app";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDA9lK4MKH480gXeNw1m-iWuuUgabClGSQ",
	authDomain: "portfolio-katem.firebaseapp.com",
	projectId: "portfolio-katem",
	storageBucket: "portfolio-katem.appspot.com",
	messagingSenderId: "322783072721",
	appId: "1:322783072721:web:91dcaa5c614216389ed0f0",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { firestore, storage, auth };
