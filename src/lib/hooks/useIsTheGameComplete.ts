import { releaseProxy, wrap } from "comlink";
import { useState, useEffect } from "react";
import { Solitaire } from "types/game";
import { IsGameCompleteFromWorker } from "types/worker";

export const useIsTheGameComplete = (
  solitaire: Solitaire
): IsGameCompleteFromWorker => {
  /**
   * We'll want to expose a wrapping object so we know when a calculation is in progress
   */
  const [data, setData] = useState({
    isCalculating: false,
    value: false,
  });

  useEffect(() => {
    /**
     * Here we create our worker and wrap it with comlink so we can interact with it
     */
    const worker = new Worker("../../workers/isGameCompleteWorker", {
      name: "is-game-complete-worker",
      type: "module",
    });

    const workerApi = wrap<import("../../workers/isGameCompleteWorker").WorkerType>(worker);

    workerApi.isGameComplete(solitaire).then((value: boolean) => {
      setData({ isCalculating: false, value });
      workerApi[releaseProxy]();
      worker.terminate();
    });
  }, [solitaire]);

  return [data.value, data.isCalculating];
};
