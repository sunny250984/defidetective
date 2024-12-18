import { 
    GET_TOKENS,
    SAVE_TOKEN 
} from "../types/tokens.types";

const initialState = {
    tokenList: [],
    alert:""
  }

export function tokenState(state = initialState, action) 
{
    switch (action.type) {
        case GET_TOKENS:
            return {
                ...state, 
                tokenList: [ ...action.payload ] 
            }
        case SAVE_TOKEN:
            return {
                ...state,
                tokenList: [ ...action.payload ],
                alert: "saved"
            }
        default:
            return { ...state };
    }
}
