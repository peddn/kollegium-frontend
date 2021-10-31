require('../scss/main.scss');


console.log(process.env.ROOT_URL);

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
} from '@fortawesome/free-solid-svg-icons'


import { createApp } from 'vue';

import router from './router';
import store from './store';

import App from './components/App.vue';

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

)

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');

dom.watch();
