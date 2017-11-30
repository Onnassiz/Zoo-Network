const UPDATE_ANIMALS_IMAGE_LINKS = "UPDATE_ANIMALS_IMAGE_LINKS";


function animalImageLinks(state = [], action) {
    switch(action.type){
        case UPDATE_ANIMALS_IMAGE_LINKS:
            return {...state, animalImageLinks: action.animalImageLinks};
        default:
            return state;
    }
}

export default animalImageLinks;
