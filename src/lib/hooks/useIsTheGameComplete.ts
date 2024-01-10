import { releaseProxy, wrap } from "comlink";
import { useState, useEffect } from "react";
import { Solitaire } from "@typings/game";
import { IsGameCompleteFromWorker } from "@typings/worker";

export const useIsTheGameComplete = (
  solitaire: Solitaire
): IsGameCompleteFromWorker => {
  /**
   * We'll want to expose a wrapping object so we know when a calculation is in progress
   */
  const [data, setData] = useState(false);

  useEffect(() => {
    /**
     * Here we create our worker and wrap it with comlink so we can interact with it
     */
    const worker = new Worker(new URL("../../workers/isGameCompleteWorker", import.meta.url), {
      name: "is-game-complete-worker",
      type: "module",
    });

    const workerApi = wrap<import("../../workers/isGameCompleteWorker").WorkerType>(worker);

    workerApi.isGameComplete(solitaire).then((value: boolean) => {
      setData(value);
      workerApi[releaseProxy]();
      worker.terminate();
    });
  }, [solitaire]);

  return data;
};
