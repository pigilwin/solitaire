import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import { Game } from './game/index';
import { Testing } from './game/testing';
import { GameBar } from "./game/components/GameBar";
import { allowedToSeeTestingRouteAction } from './store/application/applicationSlice';
import { localStorageKey } from './store/application/constants';

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
        <GameBar/>
        <Switch>
          <Route path="/testing">
            <Testing/>
          </Route>
          <Route path="/">
            <Game/>
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}