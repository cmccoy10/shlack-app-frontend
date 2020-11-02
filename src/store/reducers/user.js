import {
  ADD_USERS,
} from "../actions/user";

const initialState = {
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS: {
      return {
        ...state, users: action.users
      }
    }
    default: return state;
  }
}
