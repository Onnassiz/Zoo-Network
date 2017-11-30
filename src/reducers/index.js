import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import formState from './formState';
import alert from './alert';
import serverUrl from './severUrl';
import loginDetails from './loginDetails';
import zoos from './zoos';
import zooImageLinks from './zooImageLinks';
import animalImageLinks from './animalImageLinks';
import animals from './animals';
import animalZoos from './animalZoos';
import searchKeys from './searchKeys';

const rootReducer = combineReducers({
    formState,
    alert,
    serverUrl,
    loginDetails,
    zoos,
    zooImageLinks,
    animals,
    animalImageLinks,
    animalZoos,
    searchKeys,
    routing: routerReducer});

export default rootReducer;
