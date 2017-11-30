const UPDATE_ZOOS = "UPDATE_ZOOS";


function zoos(state = [], action) {
    switch(action.type){
        case UPDATE_ZOOS:
            return {...state, zoos: action.zoos};
        default:
            return state;
    }
}

export default zoos;
