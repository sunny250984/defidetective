import { combineReducers } from "redux";
import { appState } from "./app.reducers";
import { dappState } from "./dapps.reducers";
import { tokenState } from "./tokens.reducers";
import { influencerState } from "./influencer.reducers";
import { partnerState } from "./partner.reducers";
import { advertiseState } from "./advertise.reducers"

const reducers = combineReducers({
    sapp: appState,
    dapps: dappState,
    tokens: tokenState,
    influencers: influencerState,
    partners: partnerState,
    adss: advertiseState
})

export default reducers;
