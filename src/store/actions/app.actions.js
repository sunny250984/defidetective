import { 
    SIDEBAR_SET,
    SET_USER_INFO 
} from "../types/app.types";
import myaxios from "src/provider/API"

export const ctrlSidebar  = (set_state) => dispatch =>
{
    dispatch({
        type: SIDEBAR_SET,
        payload: set_state
    })
}

export const login = (user_info) => dispatch => {
    myaxios.auth.login({
        n: user_info.username,
        p: user_info.pwd
    }).then((res)=>{
        if(res.data.mtype==='success'){
            localStorage.setItem('app_token', res.data.token);
        }
        dispatch({
            type: SET_USER_INFO,
            payload: res.data
        })
    })
}

export const logout = (token) => dispatch => {
    myaxios.auth.logout(token).then(()=>{
        localStorage.removeItem("app_token");
        window.location.reload();
    })
}

export const checkLogin = (token) => dispatch => {
    myaxios.auth.checkToken({
        token
    }).then((res)=>{
        if(res.data.mtype==='error'){
            localStorage.removeItem("app_token");
        }
        dispatch({
            type: SET_USER_INFO,
            payload: res.data
        })
    })
}

export const changePwd = (data) => dispatch => {
    myaxios.auth.changePassword(data).then(()=>{
        
    })
}