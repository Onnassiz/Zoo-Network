const UPDATE_ZOOS_IMAGE_LINKS = "UPDATE_ZOOS_IMAGE_LINKS";


function zooImageLinks(state = [], action) {
    switch(action.type){
        case UPDATE_ZOOS_IMAGE_LINKS:
            return {...state, zooImageLinks: action.zooImageLinks};
        default:
            return state;
    }
}

export default zooImageLinks;
