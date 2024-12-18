import { 
    GET_DAPPS,
    SAVE_DAPP
} from "../types/dapps.types";

import myaxios from "src/provider/API"
// import Web3 from 'web3';
import axios from 'axios';
import { config } from "../../config";
import { redirect } from "react-router-dom";
import { useContractContext } from "src/provider/ContractProvider";
export const getDppList  = () => dispatch =>
{
    myaxios.dapps.getList().then((res)=>{
        dispatch({
            type: GET_DAPPS,
            payload: res.data
        })
    })
}


export const saveAppInfo = (data) => dispatch => {
    myaxios.dapps.saveAppInfo(data).then((res)=>{
        dispatch({
            type: SAVE_DAPP,
            payload: res.data
        })
    });
}

export const deleteRowById = (rId) => dispatch => {
    myaxios.dapps.deleteRowById(rId).then((res)=>{
        dispatch({
            type: SAVE_DAPP,
            payload: res.data
        })
    })
}

export const selectRowById = (rId) => dispatch => {
    
}