import Vue from 'vue';
import Toasted from 'vue-toasted';

//Register Toasted
Vue.use(Toasted);

let success = {
    type: 'success',
    duration: 3500
}

let error = {
    type: 'error',
    duration: 3500
}

Vue.toasted.register('success', (payload) => {
    if (!payload.message) return 'Something went wrong!';
    else return payload.message;
}, success);

Vue.toasted.register('error', (payload) => {
    if (!payload.message) return 'Something went wrong!';
    else return payload.message;
}, error);