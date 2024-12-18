import { 
    GET_PARTNER,
    SAVE_PARTNER
} from "../types/partner.types";

const initialState = {
    partners: [],
    alert:""
  }

export function partnerState(state = initialState, action) 
{
    switch (action.type) {
        case GET_PARTNER:
            return {
                ...state, 
                partners: [ ...action.payload ] 
            }
        case SAVE_PARTNER:
            return {
                ...state,
                partners: [ ...action.payload ],
                alert: "saved"
            }
        default:
            return { ...state };
    }
}
