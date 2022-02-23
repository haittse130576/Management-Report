import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjQz7X5iOVlB7rsX4Nh_Q3AGnIdnnMkBs",
    authDomain: "auth-report-management.firebaseapp.com",
    projectId: "auth-report-management",
    storageBucket: "auth-report-management.appspot.com",
    messagingSenderId: "830163943717",
    appId: "1:830163943717:web:ab2a5064c7d4d9209c1acc"
};

initializeApp(firebaseConfig)
const projectAuth = getAuth()
const projectStorage = getStorage()

export { projectAuth, projectStorage }