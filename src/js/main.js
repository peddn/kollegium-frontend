require('../scss/main.scss');

// import icons from fontawesome
import { library, dom } from '@fortawesome/fontawesome-svg-core'

import {
  faAngleRight,
  faCheckCircle,
  faEye,
  faSync,
  faList,
  faFile,
  faFileAlt,
  faUpload,
  faDownload,
  faCheck,
  faExclamationTriangle,
  faTrash,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleRight,
  faCheckCircle,
  faEye,
  faSync,
  faList,
  faFile,
  faFileAlt,
  faUpload,
  faDownload,
  faCheck,
  faExclamationTriangle,
  faTrash,
  faEdit,

);

// create vue Application with store and router
import { createApp } from 'vue';

import router from './router';
import store from './store';

import App from './components/App.vue';



createApp(App)
  .use(router)
  .use(store)
  .mount('#app');

dom.watch();
