import { apiUrl } from '../../config/config';
import { USER_ID } from "../actions/authentication";
import { TOKEN_KEY, USER_USERNAME, USER_IMG, logoutUser } from './authentication';

export const ADD_USERS = "ADD_USERS";


export const addUsers = (users) => {
  return {
    type: ADD_USERS,
    users,
  };
}

export const getUsers = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${apiUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    const users = await response.json();
    dispatch(addUsers(users));
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_ID);
    window.localStorage.removeItem(USER_USERNAME);
    window.localStorage.removeItem(USER_IMG);
    dispatch(logoutUser())
    window.location.href = "/"
  }
}
