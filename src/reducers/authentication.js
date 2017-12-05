import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types.js'

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, user: action.payload, error: null };
        case UNAUTH_USER:
            return { ...state, user: null, error: null };
        case AUTH_ERROR:
            return { ...state, user: null, error: action.payload }
    }

    return state;
}
