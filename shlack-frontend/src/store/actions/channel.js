import { baseUrl } from '../../config/config';
import { USER_ID } from "../actions/authentication";
export const HIDE_FORM = 'channel/authentication/HIDE_FORM';
export const SHOW_FORM = 'channel/authentication/SHOW_FORM';
export const LOAD = "shlack/channels/LOAD";
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGES';
export const load = (channelList) => ({ type: LOAD, channelList });
export const hideForm = () => ({ type: HIDE_FORM });
export const showForm = () => ({ type: SHOW_FORM });


export const addChannelMessage = (message) => {
    return ({
        type: ADD_MESSAGE,
        message
    });
}

export const setChannelMessages = (messages, channel) => {
    return ({
        type: SET_MESSAGES,
        messages,
        channel
    });
}

export const createChannel = data => async (dispatch, getState) => {
  const ownerId = window.localStorage.getItem(USER_ID)
  const { authentication: { token } } = getState();
  data.ownerId = ownerId;
  const response = await fetch(`${baseUrl}/channels`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    dispatch(getChannels());
  }
}

export const getChannels = () => async (dispatch, getState) => {
  const id = window.localStorage.getItem(USER_ID)
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/users/${id}/channels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.ok) {
    const channelList = await response.json();
    dispatch(load(channelList));
  }
}
