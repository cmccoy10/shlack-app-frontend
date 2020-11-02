import { baseUrl } from '../../config/config';
import { USER_ID } from "../actions/authentication";
export const ADD_USERS = "ADD_USERS";


export const addUsers = (users) => {
  return {
    type: ADD_USERS,
    users,
  };
}

export const getUsers = () => async (dispatch, getState) => {
  const id = window.localStorage.getItem(USER_ID);
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    const users = await response.json();
    dispatch(addUsers(users));
  }
}
