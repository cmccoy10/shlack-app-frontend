import { ADD_CHANNEL_MESSAGE } from "../actions/channelMessages";
import { SET_CHANNEL_MESSAGE } from "../actions/channelMessages";

const initialState = {};

// Shape of state:
// {
//     <channelId>: [
//         {
//             id: ...
//             userId ...
//             body: ...,
//             ChannelId: ...,
//             updatedAt: ...
//             createdAt: ...
//         },
//         ...
//     ]
// }

const messagesReducer = (state = initialState, action) => {
  console.log(action.message)
  Object.freeze(state);
  switch (action.type) {
    // Adds a single message to state.<channelId> array.
    // This allows us to keep track of messages per channel
    case ADD_CHANNEL_MESSAGE:
      const { message } = action;
      const oldMessages = state[message.channelId]
        ? state[message.channelId]
        : [];
      return {
        ...state,
        [message.channelId]: [...oldMessages, message]
      };
    // This sets all the messages for a channel.
    // Used on first load
    case SET_CHANNEL_MESSAGE:
      const { messages, channel } = action;
      return {
        ...state,
        [channel.id]: [...messages]
      };
    default:
      return state;
  }
};

export default messagesReducer;
