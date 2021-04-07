import { signInWithGoogle, signOut, signInWithFacebook } from '../../apis/firebase/firebase';
import { START_LOADING, UPDATE_USER_DATA, UPDATE_USER_ERROR } from './userConstants';

function startLoading() {
    return {
        type: START_LOADING
    }
}
function updateUserData(payload) {
    return {
        type: UPDATE_USER_DATA,
        payload
    }
}
function updateUserError(payload) {
    return {
        type: UPDATE_USER_ERROR,
        payload
    }
}

export function loginUser() {
    return (dispatch) => {
        dispatch(startLoading());

        signInWithGoogle().then(userData => {
            dispatch(updateUserData(userData.user));
        }).catch(error => {
            dispatch(updateUserError(error));
        });
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(startLoading());

        signOut().then(() => {
            dispatch(updateUserData(null));
        }).catch((error) => {
            dispatch(updateUserError(error));
        });
    }
}

export function loginFacebookUser() {
    return (dispatch) => {
        dispatch(startLoading());

        signInWithFacebook().then(userData => {
            dispatch(updateUserData(userData.user));
        }).catch(error => {
            dispatch(updateUserError(error));
        });
    }
}
