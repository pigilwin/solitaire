import { releaseProxy, wrap } from "comlink";
import { useState, useEffect } from "react";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";
import { ReturnValueFromWorker } from "types/worker";

export const useIsTheCardClickable = (
  solitaire: Solitaire,
  card: LocationAwareSolitaireCard
): ReturnValueFromWorker<boolean> => {
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
    const worker = new Worker("../workers/canCardMoveWorker", {
      name: "can-card-move-worker",
      type: "module",
    });

    const workerApi =
      wrap<import("../workers/canCardMoveWorker").WorkerType>(worker);

    workerApi.canCardMove(solitaire, card).then((value: boolean) => {
      setData({ isCalculating: false, value });
      workerApi[releaseProxy]();
      worker.terminate();
    });
  }, [solitaire, card]);

  return [data.value, data.isCalculating];
};
