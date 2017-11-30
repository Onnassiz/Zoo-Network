const SET_LOGIN_DETAILS = "SET_LOGIN_DETAILS";
const UNSET_LOGIN_DETAILS = "UNSET_LOGIN_DETAILS";


function loginDetails(state = [], action) {
    switch(action.type){
        case SET_LOGIN_DETAILS:
            return {...state, isLoggedIn: true, user: action.user};
        case UNSET_LOGIN_DETAILS:
            return {...state, isLoggedIn: false, user: {}};
        default:
            return state;
    }
}

export default loginDetails;
