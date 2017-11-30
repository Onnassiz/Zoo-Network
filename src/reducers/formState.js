
const DEACTIVATE_BUTTON = "DEACTIVATE_BUTTON";
const ACTIVATE_BUTTON = "ACTIVATE_BUTTON";

function formState(state = [], action) {
    switch (action.type){
        case DEACTIVATE_BUTTON:
            return { ...state, isLoading:true };
        case ACTIVATE_BUTTON:
            return { ...state, isLoading:false };
        default:
            return state;
    }
}

export default formState;
