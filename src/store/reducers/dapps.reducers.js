import { 
    GET_DAPPS,
    SAVE_DAPP 
} from "../types/dapps.types";

const initialState = {
    dappList: [],
    alert:""
  }

export function dappState(state = initialState, action) 
{
    switch (action.type) {
        case GET_DAPPS:
            return {
                ...state, 
                dappList: [ ...action.payload ] 
            }
        case SAVE_DAPP:
            return {
                ...state,
                dappList: [ ...action.payload ],
                // dappList:[
                //     ...state.dappList,
                //     {
                //         ...action.payload,
                //         mining_group: action.payload.mining_group_name
                //     }
                // ],
                alert: "saved"
            }
        default:
            return { ...state };
    }
}
