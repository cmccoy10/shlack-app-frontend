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
export const ADD_CURRENT_CHANNEL = "ADD_CURRENT_CHANNEL";

export const load = (channelList) => ({ type: LOAD, channelList });
export const hideForm = () => ({ type: HIDE_FORM });
export const showForm = () => ({ type: SHOW_FORM });

export const addCurrentChannel = (channel) => {
  return {
    type: ADD_CURRENT_CHANNEL,
    channel
  }
}

export const addChannels = (channels) => {
  return {
    type: ADD_CHANNELS,
    channels,
  };
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
    // dispatch(hideForm());
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

export const getCurrentChannel = (id) => async (dispatch, getState) => {

  const response = await fetch(`${baseUrl}/channels/${id}`)

  if (response.ok) {
    const channelItem = await response.json();
    dispatch(addCurrentChannel(channelItem));
  }
}

export const modifyChannel = data => async (dispatch, getState) => {
  const id = window.localStorage.getItem(USER_ID);
  const channelId = data.id
  const {
    authentication: { token }
  } = getState();
  data.userId = id;
  const response = await fetch(`${baseUrl}/channels/${channelId}`, {
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

export const deleteChannel = data => async (dispatch, getState) => {
  const id = window.localStorage.getItem(USER_ID);
  const channelId = data.id
  const {
    authentication: { token }
  } = getState();
  data.userId = id;
  const response = await fetch(`${baseUrl}/channels/${channelId}`, {
    method: 'delete',
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

export const addChannelMember = data => async (dispatch, getState) => {
  // const { channelId } = data;
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/channels/:id/join`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const channelItem = await response.json();
    dispatch(addCurrentChannel(channelItem));
  }
}
