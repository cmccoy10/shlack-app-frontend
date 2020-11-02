import { baseUrl } from '../../config/config';
export const TOKEN_KEY = "shlack/authentication/token";
export const SET_TOKEN = 'shlack/authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'shlack/authentication/REMOVE_TOKEN';
export const USER_ID = "shlack/authentication/USER_ID"
export const USER_USERNAME = "shlack/authentication/USER_USERNAME";
export const USER_IMG = "shlack/authentication/USER_IMG";

export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};

export const signUp = (user) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const { token, user, username, imgUrl } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_ID, user.id);
    window.localStorage.setItem(USER_USERNAME, username);
    window.localStorage.setItem(USER_IMG, imgUrl);
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/session`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token, user, username, imgUrl } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_ID, user.id);
    window.localStorage.setItem(USER_USERNAME, username);
    window.localStorage.setItem(USER_IMG, imgUrl);
    dispatch(setToken(token));
  }
};

export const logout = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/session`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    dispatch(removeToken());
  }
};
