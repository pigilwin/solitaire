import { StrictMode } from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { reportWebVitals } from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';

import './assets/index.css';

import { wrap } from 'comlink';
function takeALongTimeToDoSomething() {
  const worker = new Worker('./workers/worker', { name: 'my-first-worker', type: 'module' });
  const workerApi = wrap<import('./workers/worker').MyFirstWorker>(worker);
  workerApi.callMe().then((v) => {
    console.log(v);
  });    
}
takeALongTimeToDoSomething();

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
