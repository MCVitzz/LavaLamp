import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartLine, faUsers, faTasks, faCode, faCog, faPlus, faTrashAlt, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faChartLine, faUsers, faTasks, faCode, faCog, faPlus, faTrashAlt, faChevronDown, faChevronRight);

Vue.component('FontAwesome', FontAwesomeIcon);
