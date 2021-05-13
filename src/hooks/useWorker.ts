import { releaseProxy, Remote, wrap } from "comlink";
import { useEffect, useMemo } from "react";

export const useWorker = <T>(location: string, name: string) => {
    const workerApiAndGarbageCollection = useMemo(() => makeWorkerApiAndGarbageCollection<T>(location, name), [location, name]);

    useEffect(() => {
        const { garbageCollection } = workerApiAndGarbageCollection;
        
        /**
         * Garbage collect our worker when we're done with it
         */
        return () => {
            garbageCollection();
        };

    }, [workerApiAndGarbageCollection]);
    
    return workerApiAndGarbageCollection;
}

interface MakeWorkerApiAndGarbageCollectionReturn<T> {
    garbageCollection: () => void;
    workerApi: Remote<T>
}
const makeWorkerApiAndGarbageCollection = <T>(location: string, name: string): MakeWorkerApiAndGarbageCollectionReturn<T> => {
    /**
     * Here we create our worker and wrap it with comlink so we can interact with it
     */
    const worker = new Worker(location, {
      name: name,
      type: "module"
    });

    const workerApi = wrap<T>(worker);
  
    /**
     * A Garbage Collection function that releases the comlink proxy and terminates the worker
     */
    const garbageCollection = () => {
      workerApi[releaseProxy]();
      worker.terminate();
    };

    return { workerApi, garbageCollection };
}