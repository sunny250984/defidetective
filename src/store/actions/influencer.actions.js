import { 
    GET_INFLUENCER,
    SAVE_INFLUENCER
} from "../types/influencer.types";

import myaxios from "src/provider/API"

export const getData  = () => dispatch =>
{
    myaxios.influencer.getData().then((res)=>{
        dispatch({
            type: GET_INFLUENCER,
            payload: res.data
        })
    })
}

export const saveData = (data) => dispatch => {
    myaxios.influencer.saveData(data).then((res)=>{
        dispatch({
            type: SAVE_INFLUENCER,
            payload: res.data
        })
    });
}

export const deleteRowById = (rId) => dispatch => {
    myaxios.influencer.deleteRowById(rId).then((res)=>{
        dispatch({
            type: SAVE_INFLUENCER,
            payload: res.data
        })
    })
}
