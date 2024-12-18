import { 
    GET_ADVERTISE,
    SAVE_ADVERTISE
} from "../types/advertise.types";

import myaxios from "src/provider/API"

export const getData  = () => dispatch =>
{
    myaxios.advertise.getData().then((res)=>{
        dispatch({
            type: GET_ADVERTISE,
            payload: res.data
        })
    })
}

export const saveData = (data) => dispatch => {
    myaxios.advertise.saveData(data).then((res)=>{
        dispatch({
            type: SAVE_ADVERTISE,
            payload: res.data
        })
    });
}

export const deleteRowById = (rId) => dispatch => {
    myaxios.advertise.deleteRowById(rId).then((res)=>{
        dispatch({
            type: SAVE_ADVERTISE,
            payload: res.data
        })
    })
}
