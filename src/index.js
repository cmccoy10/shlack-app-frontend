import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { socketUrl } from './config/config';
import io from "socket.io-client";

const socket = io.connect(socketUrl);

socket.on('error', (error) => {
  console.error(error);
});

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socket={socket}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
