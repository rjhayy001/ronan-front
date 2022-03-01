// // import Vue from 'vue';
// // import { store } from '../src/store/index.js'

// Vue.use(store);

const config = {
    apiKey: "AIzaSyAvoeP7_E_GRPH7twQv6hiBtOeW78RuwVs",
    authDomain: "ronan-pensec.firebaseapp.com",
    projectId: "ronan-pensec",
    storageBucket: "ronan-pensec.appspot.com",
    messagingSenderId: "371760182349",
    appId: "1:371760182349:web:8ebef129cc1d3ef8091804",
    measurementId: "G-C1DGNQKJ9T"
};

console.log(config)


    // if(firebase.messaging.isSupported()) {
        firebase.initializeApp(config);

    //         const messaging = firebase.messaging();
    //     messaging.onMessage((payload) => {
    //         console.log(payload)

    //         const noteTitle = payload.notification.title;
    //         const noteOptions = {
    //             body: payload.notification.body,
    //             icon: payload.notification.icon,
    //         };
    //         new Notification(noteTitle, noteOptions);
    //     });
    // } else {
    //     console.log('else')
    // }
