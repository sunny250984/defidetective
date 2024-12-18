import { 
    GET_TOKENS,
    SAVE_TOKEN
} from "../types/tokens.types";

import myaxios from "src/provider/API"

export const getData  = () => dispatch =>
{
    myaxios.tokens.getData().then((res)=>{
        dispatch({
            type: GET_TOKENS,
            payload: res.data
        })
    })
}

export const saveData = (data) => dispatch => {
    myaxios.tokens.saveData(data).then((res)=>{
        dispatch({
            type: SAVE_TOKEN,
            payload: res.data
        })
    });
}

export const deleteRowById = (rId) => dispatch => {
    myaxios.tokens.deleteRowById(rId).then((res)=>{
        dispatch({
            type: SAVE_TOKEN,
            payload: res.data
        })
    })
}
