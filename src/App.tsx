import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import { Game } from './game/index';

export const App = (): JSX.Element => {
  return (
    <main className="font-sans antialiased leading-normal tracking-wider bg-gray-100 dark:bg-gray-700 dark:text-white">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Game/>
          </Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}