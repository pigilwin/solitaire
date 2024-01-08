import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Game } from './game/index';
import { Leaderboard } from './game/leaderboard';
import { Testing } from './game/testing';
import { Settings } from './game/settings';

import { allowedToSeeTestingRouteAction } from './store/application/applicationSlice';
import { localStorageKey } from './store/application/constants';

import 'react-toastify/dist/ReactToastify.css';
import { loadLeaderboardAsync } from './store/leaderboard/thunk';
import { AppDispatch } from 'store';

export const App = (): JSX.Element => {
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    
    dispatch(loadLeaderboardAsync());

    /**
     * If we are using dispatch routes then allow them in
     */
    if (localStorage.getItem(localStorageKey) !== null) {
      dispatch(allowedToSeeTestingRouteAction(true));
    }
  });
  
  return (
    <main className="font-sans antialiased leading-normal tracking-wider bg-gray-100 dark:bg-gray-700 white">
      <BrowserRouter>
        <Routes>
          <Route path="/testing" element={<Testing/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/" element={<Game/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </main>
  );
}