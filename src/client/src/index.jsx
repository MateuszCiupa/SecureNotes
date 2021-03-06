import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from 'redux/store';
import { Provider } from 'react-redux';
import { checkLoggedIn } from './util/session';

const renderApp = preloadedState => {
    const store = configureStore(preloadedState);
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, 
        document.getElementById('root')
    );
};

(async () => renderApp(await checkLoggedIn()))();