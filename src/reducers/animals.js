const UPDATE_ANIMALS = "UPDATE_ANIMALS";


function animals(state = [], action) {
    switch(action.type){
        case UPDATE_ANIMALS:
            return {...state, animals: action.animals};
        default:
            return state;
    }
}

export default animals;
