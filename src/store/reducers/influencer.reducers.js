import { 
    GET_INFLUENCER,
    SAVE_INFLUENCER
} from "../types/influencer.types";

const initialState = {
    influencers: [],
    alert:""
  }

export function influencerState(state = initialState, action) 
{
    switch (action.type) {
        case GET_INFLUENCER:
            return {
                ...state, 
                influencers: [ ...action.payload ] 
            }
        case SAVE_INFLUENCER:
            return {
                ...state,
                influencers: [ ...action.payload ],
                alert: "saved"
            }
        default:
            return { ...state };
    }
}
