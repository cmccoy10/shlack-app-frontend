import { HIDE_FORM, SHOW_FORM, LOAD } from "../actions/channel";

export default function reducer(state = {}, action) {
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

    default: return state;
  }
}
