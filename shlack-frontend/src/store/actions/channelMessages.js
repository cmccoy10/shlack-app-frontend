export const ADD_CHANNEL_MESSAGE = 'ADD_CHANNEL_MESSAGE';
export const SET_CHANNEL_MESSAGE = 'SET_CHANNEL_MESSAGE';

export const addMessage = (message) => {
    return ({
        type: ADD_CHANNEL_MESSAGE,
        message
    });
}

export const setMessages = (messages, channel) => {
    return ({
        type: SET_CHANNEL_MESSAGE,
        messages,
        channel
    });
}
