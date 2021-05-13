import { releaseProxy, wrap } from 'comlink';
import { useState, useMemo, useEffect } from 'react';
import { Solitaire } from 'types/game';
import { ReturnValueFromWorker } from 'types/worker';

export const useIsTheGameComplete = (solitaire: Solitaire): ReturnValueFromWorker<boolean> => {
  /**
   * We'll want to expose a wrapping object so we know when a calculation is in progress
  */
  const [data, setData] = useState({
    isCalculating: false,
    value: false
  });

  const workerApiAndGarbageCollection = useMemo(() => {
    console.log('memo called');
    /**
     * Here we create our worker and wrap it with comlink so we can interact with it
     */
    const worker = new Worker('../workers/isGameCompleteWorker', {
        name: 'is-game-complete-worker',
        type: "module"
    });

    const workerApi = wrap<import('../workers/isGameCompleteWorker').WorkerType>(worker);
    
    /**
     * A Garbage Collection function that releases the comlink proxy and terminates the worker
     */
    const garbageCollection = () => {
        workerApi[releaseProxy]();
        worker.terminate();
    };

    return { workerApi, garbageCollection };
  },[]);

  useEffect(() => {
    const { workerApi, garbageCollection } = workerApiAndGarbageCollection;
    
    setData({ isCalculating: true, value: false });
    
    workerApi.isGameComplete(solitaire).then((value: boolean) => {
      setData({ isCalculating: false, value });
    });

    return () => {
      garbageCollection();
    }
  }, [solitaire, workerApiAndGarbageCollection]);
  
  return [
    data.value,
    data.isCalculating
  ];
}