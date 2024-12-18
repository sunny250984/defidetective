import { 
    GET_ADVERTISE,
    SAVE_ADVERTISE
} from "../types/advertise.types";

const initialState = {
    advertises: [],
    alert:""
  }

export function advertiseState(state = initialState, action) 
{
    switch (action.type) {
        case GET_ADVERTISE:
            return {
                ...state, 
                advertises: [ ...action.payload ] 
            }
        case SAVE_ADVERTISE:
            return {
                ...state,
                advertises: [ ...action.payload ],
                alert: "saved"
            }
        default:
            return { ...state };
    }
}
