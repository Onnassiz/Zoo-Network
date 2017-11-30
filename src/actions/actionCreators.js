import axios from 'axios';

const DEACTIVATE_BUTTON = 'DEACTIVATE_BUTTON';
const ACTIVATE_BUTTON = 'ACTIVATE_BUTTON';
const SHOW_ALERT = "SHOW_ALERT";
const UNSET_ALERT = "UNSET_ALERT";
const SET_LOGIN_DETAILS = "SET_LOGIN_DETAILS";
const UNSET_LOGIN_DETAILS = "UNSET_LOGIN_DETAILS";
const UPDATE_ZOOS = "UPDATE_ZOOS";
const UPDATE_ZOOS_IMAGE_LINKS = "UPDATE_ZOOS_IMAGE_LINKS";
const UPDATE_ANIMALS = "UPDATE_ANIMALS";
const UPDATE_ANIMALS_IMAGE_LINKS = "UPDATE_ANIMALS_IMAGE_LINKS";
const UPDATE_ANIMAL_ZOOS = "UPDATE_ANIMAL_ZOOS";
const UPDATE_SEARCH_KEYS = "UPDATE_SEARCH_KEYS";

export function createNewAdmin(url, fields = []) {
    return dispatch => {
        dispatch({type : DEACTIVATE_BUTTON});
        return axios.post(url, fields);
    }
}

export function activateButton() {
    return dispatch => {
        dispatch({type : ACTIVATE_BUTTON});
    }
}

export function updateSearchKeys(searchKeys) {
    return dispatch => {
        dispatch({type : UPDATE_SEARCH_KEYS, searchKeys});
    }
}

export function showAlert(message, alertType) {
    return dispatch => {
        dispatch({
            type : SHOW_ALERT,
            message,
            alertType
        });
    }
}

export function unsetAlert() {
    return dispatch => {
        dispatch({
            type : UNSET_ALERT,
        });
    }
}

export function login(url, fields = []) {
    return dispatch => {
        dispatch({type : DEACTIVATE_BUTTON});
        return axios.post(url, fields);
    }
}

export function setLoginDetails(user = []) {
    return dispatch => {
        dispatch({
            type: SET_LOGIN_DETAILS,
            user
        });
    }
}

export function unsetLoginDetails() {
    return dispatch => {
        dispatch({
            type: UNSET_LOGIN_DETAILS,
        });
    }
}

export function addZoo(url, fields = []) {
    return dispatch => {
        dispatch({type : DEACTIVATE_BUTTON});
        delete fields['errors'];
        return axios.post(url, fields);
    }
}

export function addAnimal(url, fields = []) {
    return dispatch => {
        dispatch({type : DEACTIVATE_BUTTON});
        delete fields['errors'];
        return axios.post(url, fields);
    }
}

export function deactivateButton() {
    return dispatch => {
        dispatch({type : DEACTIVATE_BUTTON});
    }
}

export function fetchContents(url) {
    return dispatch => {
        return axios.get(url);
    }
}

export function updateZoos(zoos) {
    return dispatch => {
        dispatch({
            type : UPDATE_ZOOS,
            zoos
        });
    }
}

export function updateAnimals(animals) {
    return dispatch => {
        dispatch({
            type : UPDATE_ANIMALS,
            animals
        });
    }
}

export function updateanimalZoos(animalZoos) {
    return dispatch => {
        dispatch({
            type : UPDATE_ANIMAL_ZOOS,
            animalZoos
        });
    }
}

export function fetchZooImageLinks(link_url) {
    return dispatch => {
        return axios.get(link_url);
    }
}

export function updateZooImageLinks(zooImageLinks) {
    return dispatch => {
        dispatch({
            type : UPDATE_ZOOS_IMAGE_LINKS,
            zooImageLinks
        });
    }
}

export function updateAnimalImageLinks(animalImageLinks) {
    return dispatch => {
        dispatch({
            type : UPDATE_ANIMALS_IMAGE_LINKS,
            animalImageLinks
        });
    }
}

export function deleteItem(url) {
    return dispatch => {
        dispatch({type : DEACTIVATE_BUTTON});
        return axios.get(url);
    }
}



export function deleteAllZooUrl(url) {
    return dispatch => {
        dispatch({type : DEACTIVATE_BUTTON});
        return axios.get(url);
    }
}

export function saveZooImage(url, fields = []) {
    return dispatch => {
        return axios.post(url, fields);
    }
}

export function getZoosLatLong(url, fields = []) {
    return dispatch => {
        return axios.post(url, fields);
    }
}



