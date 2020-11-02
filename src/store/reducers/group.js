import { LOAD } from "../actions/group";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        groupList: action.groupList
      };
    }

    default: return state;
  }
}
