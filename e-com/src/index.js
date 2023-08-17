import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { productsFetch } from './redux/reducers/products/productReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(productsFetch());
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);


