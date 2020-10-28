import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartLine, faUsers, faTasks, faCode, faCog } from '@fortawesome/free-solid-svg-icons';

library.add(faChartLine, faUsers, faTasks, faCode, faCog);

Vue.component('FontAwesome', FontAwesomeIcon);
