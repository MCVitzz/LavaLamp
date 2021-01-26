import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChartLine, faUsers, faTasks, faCode, faCog, faPlus, faTrashAlt, faChevronDown, faChevronRight, faTimes, faSearch, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faChartLine, faUsers, faTasks, faCode, faCog, faPlus, faTrashAlt, faChevronDown, faChevronRight, faTimes, faSearch, faExchangeAlt);

Vue.component('FontAwesome', FontAwesomeIcon);
