import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './style/init.scss';
import './style/Fonts.scss';
import './style/Animations.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      {/* <GoogleOAuthProvider clientId="343490261508-6qvvicphlepef0i4t9s3t762l0schcmc.apps.googleusercontent.com"> */}
        <App />
      {/* </GoogleOAuthProvider> */}
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();
