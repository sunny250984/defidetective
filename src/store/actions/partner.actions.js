import { 
    GET_PARTNER,
    SAVE_PARTNER
} from "../types/partner.types";

import myaxios from "src/provider/API"

export const getData  = () => dispatch =>
{
    myaxios.partner.getData().then((res)=>{
        dispatch({
            type: GET_PARTNER,
            payload: res.data
        })
    })
}

export const saveData = (data) => dispatch => {
    myaxios.partner.saveData(data).then((res)=>{
        dispatch({
            type: SAVE_PARTNER,
            payload: res.data
        })
    });
}

export const deleteRowById = (rId) => dispatch => {
    myaxios.partner.deleteRowById(rId).then((res)=>{
        dispatch({
            type: SAVE_PARTNER,
            payload: res.data
        })
    })
}
