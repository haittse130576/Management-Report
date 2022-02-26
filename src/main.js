import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap"
import { initializeApp } from "firebase/app";
// import firebase from './config/firebase'
import {getStorage} from 'firebase/storage'

const app = createApp(App)

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjQz7X5iOVlB7rsX4Nh_Q3AGnIdnnMkBs",
    authDomain: "auth-report-management.firebaseapp.com",
    projectId: "auth-report-management",
    storageBucket: "auth-report-management.appspot.com",
    messagingSenderId: "830163943717",
    appId: "1:830163943717:web:ab2a5064c7d4d9209c1acc"
  };

  const firebaseApp  = initializeApp(firebaseConfig)
  const storage = getStorage(firebaseApp)

app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(ElementPlus)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)

app.mount('#app')
