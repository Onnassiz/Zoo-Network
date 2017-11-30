const UPDATE_SEARCH_KEYS = "UPDATE_SEARCH_KEYS";

function searchKeys(state = [], action) {
    switch(action.type){
        case UPDATE_SEARCH_KEYS:
            return {...state, searchKeys: action.searchKeys};
        default:
            return state;
    }
}

export default searchKeys;
