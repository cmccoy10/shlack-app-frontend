import { baseUrl } from '../../config/config';
import { USER_ID } from "../actions/authentication";
export const LOAD = "shlack/groups/LOAD";

export const load = (groupList) => ({ type: LOAD, groupList });

// export const createGroup = data => async (dispatch, getState) => {
//   const ownerId = window.localStorage.getItem(USER_ID)
//   const { authentication: { token } } = getState();
//   data.ownerId = ownerId;
//   const response = await fetch(`${baseUrl}/channels`, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });

//   if (response.ok) {
//     dispatch(getGroups());
//   }
// }

export const getGroups = () => async (dispatch, getState) => {
  const id = window.localStorage.getItem(USER_ID)
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/users/${id}/direct-groups`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.ok) {
    const groupList = await response.json();
    dispatch(load(groupList));
  }
}
