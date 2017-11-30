
const SHOW_ALERT = "SHOW_ALERT";
const UNSET_ALERT = "UNSET_ALERT";

function alertReducer(state = [], action) {
    switch (action.type){
        case SHOW_ALERT:
            return { ...state, showAlert: true, alertMessage: action.message, alertType: action.alertType };
        case UNSET_ALERT:
            return { ...state, showAlert: false, alertMessage: "", alertType: "info" };
        default:
            return state;
    }
}

export default alertReducer;
