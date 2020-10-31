import {
  HIDE_FORM,
  SHOW_FORM,
  LOAD,
  ADD_JOINED_CHANNEL,
  SET_CURRENT_CHANNEL,
  ADD_CHANNELS
} from "../actions/channel";

const initialState = {
  channels: [],
  joinedChannels: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        channelList: action.channelList
      };
    }
    case HIDE_FORM: {
      return {
        ...state,
        formVisible: false,
      };
    }
    case SHOW_FORM: {
      return {
        ...state,
        formVisible: true,
      };
    }
    case ADD_CHANNELS: {
      return {
        ...state, channels: action.channels
      }
    }
    case SET_CURRENT_CHANNEL: {
      return {
        ...state, currentChannel: action.channel
      }
    }
    case ADD_JOINED_CHANNEL: {
      return {
        ...state,
        joinedChannels: [...state.joinedChannels, action.channel],
      }
    }

    default: return state;
  }
}
