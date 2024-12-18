import {
    SIDEBAR_SET,
    SET_USER_INFO
} from "../types/app.types";

const initialState = {
    sidebarShow: true,
    userInfo: [],
    loginState: ''
}

export function appState(state = initialState, action) {
    switch (action.type) {
        case SIDEBAR_SET:
            if (typeof action.payload == 'object') {
                return {
                    ...state,
                    ...action.payload
                }
            } else return {
                ...state,
                sidebarShow: action.payload
            };
        case SET_USER_INFO:
            return {
                ...state,
                ...action.payload,
                loginState: action.payload.mtype,
            }
        default:
            return { ...state };
    }
}
