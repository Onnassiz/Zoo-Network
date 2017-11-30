import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
//noinspection JSUnresolvedVariable
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//import the root reducer
import rootReducer from './reducers/index';


//create an object for the default state
const defaultState = {
    formState: {
        isLoading: false
    },
    alert: {
        showAlert: false,
        alertType: "info",
        alertMessage: ""
    },
    serverUrl: {
        serverUrl: "https://polar-scrubland-37974.herokuapp.com/rest/"
        // serverUrl: "http://localhost:8080/rest/"
    },
    loginDetails: {
        isLoggedIn: false,
        user: {}
    },
    zoos: {
        zoos:{}
    },
    zooImageLinks:{
        zooImageLinks: {}
    },
    animals:{
        animals:{}
    },
    animalImageLinks:{
        animalImageLinks:{}
    },
    animalZoos:{
        animalZoos:{}
    },
    searchKeys:{
        searchKeys:[]
    }
};


const store = createStore(rootReducer, defaultState, applyMiddleware(thunk, logger));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
