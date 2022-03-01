import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const prerenderRoot = document.getElementById('pre-render-root');
const appRoot = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  appRoot,
  () => {
    prerenderRoot!.style.opacity = '0';

    setTimeout(() => {
      prerenderRoot && document.body.removeChild(prerenderRoot);
    }, 500);
  }
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (registration: ServiceWorkerRegistration) => {
    registration.installing?.postMessage({ type: 'SKIP_WAITING' });

    window.dispatchEvent(new Event('updateready'));
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
