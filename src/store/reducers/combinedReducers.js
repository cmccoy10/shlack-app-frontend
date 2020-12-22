import authentication from "./authentication";
import channel from "./channel";
import group from "./group";
import channelMessages from "./channelMessages";
import user from "./user";
import { LOGOUT_USER } from "../actions/authentication"
import { combineReducers } from 'redux';


const appReducer = combineReducers({
    authentication,
    channel,
    group,
    channelMessages,
    user
  });

export const rootReducer = (state, action) => {
    switch(action.type){
        case LOGOUT_USER:
            return state = undefined
        default:
            return appReducer(state, action)
    }
}
