import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Game } from './game/index';
import { Testing } from './game/testing';
import { allowedToSeeTestingRouteAction } from './store/application/applicationSlice';
import { localStorageKey } from './store/application/constants';

import 'react-toastify/dist/ReactToastify.css';

export const App = (): JSX.Element => {
  
  const dispatch = useDispatch();
  useEffect(() => {
    /**
     * If we are using dispatch routes then allow them in
     */
    if (localStorage.getItem(localStorageKey) !== null) {
      dispatch(allowedToSeeTestingRouteAction(true));
    }
  });
  
  
  return (
    <main className="font-sans antialiased leading-normal tracking-wider bg-gray-100 dark:bg-gray-700 dark:text-white">
      <BrowserRouter>
        <Switch>
          <Route path="/testing">
            <Testing/>
          </Route>
          <Route path="/">
            <Game/>
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer/>
    </main>
  );
}