import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// import fr from 'vuetify/src/locale/fr'
import fr from 'vuetify/es5/locale/fr'
import en from 'vuetify/es5/locale/en'
Vue.use(Vuetify);



export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#008DD1',
        secondary: '#424242',
        tertiary: '#F6F6F6',
        quaternary: '#DCE0E8',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  lang: {
    locales: { fr,en },
    current:localStorage.getItem('language') || 'fr',
  },
});
