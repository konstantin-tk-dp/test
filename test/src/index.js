import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './app/app.jsx';
import { store } from './store/store.js';

const update = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

update();
store.subscribe(update);