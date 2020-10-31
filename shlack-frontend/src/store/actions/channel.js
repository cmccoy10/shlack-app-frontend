import { baseUrl } from '../../config/config';
import { USER_ID } from "../actions/authentication";
export const HIDE_FORM = 'channel/authentication/HIDE_FORM';
export const SHOW_FORM = 'channel/authentication/SHOW_FORM';
export const LOAD = "shlack/channels/LOAD";
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_CHANNELS = "ADD_CHANNELS";
export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
export const ADD_JOINED_CHANNEL = "ADD_JOINED_CHANNEL";
export const EDIT_CHANNEL = "EDIT_CHANNEL";

export const load = (channelList) => ({ type: LOAD, channelList });
export const hideForm = () => ({ type: HIDE_FORM });
export const showForm = () => ({ type: SHOW_FORM });

export const addChannels = (channels) => {
  return {
    type: ADD_CHANNELS,
    channels,
  };
}

export const editChannel = (channel) => {
  return {
    type: EDIT_CHANNEL,
    channel
  }
}

export const setCurrentChannel = (channel) => {
    return {
        type: SET_CURRENT_CHANNEL,
        channel
    };
}

export const addJoinedChannel = (channel) => {
    return {
        type: ADD_JOINED_CHANNEL,
        channel
    }
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

export const modifyChannel = data => async (dispatch, getState) => {
  const id = window.localStorage.getItem(USER_ID);
  const {
    authentication: { token }
  } = getState();
  data.userId = id;
  const response = await fetch(`${baseUrl}/channels`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const channelList = await response.json();
    dispatch(load(channelList));
  }
}
