import { useState, useEffect } from 'react';
import { Solitaire } from 'types/game';
import { ReturnValueFromWorker } from 'types/worker';
import { useWorker } from './useWorker';

export const useIsTheGameComplete = (solitaire: Solitaire): ReturnValueFromWorker<boolean> => {

    /**
     * We'll want to expose a wrapping object so we know when a calculation is in progress
     */
    const [data, setData] = useState({
      isCalculating: false,
      value: false
    });
  
    // acquire our worker
    const { workerApi } = useWorker<import('../workers/isGameCompleteWorker').WorkerType>('../workers/isGameCompleteWorker', 'is-game-complete-worker');
  
    useEffect(() => {

        /**
         * Start the calculation defaulting to false
         */
        setData({ isCalculating: true, value: false });
  
        workerApi
            .isGameComplete(solitaire)
            .then((value: boolean) => setData({ isCalculating: false, value })); // We receive the result here
    }, [workerApi, setData, solitaire]);
  
    return [
      data.value,
      data.isCalculating
    ];
  }