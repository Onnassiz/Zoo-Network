const UPDATE_ANIMAL_ZOOS = "UPDATE_ANIMAL_ZOOS";


function animalZoos(state = [], action) {
    switch(action.type){
        case UPDATE_ANIMAL_ZOOS:
            return {...state, animalZoos: action.animalZoos};
        default:
            return state;
    }
}

export default animalZoos;
