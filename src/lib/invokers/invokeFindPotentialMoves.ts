import { releaseProxy, wrap } from "comlink";
import { Solitaire } from "types/game";
import { PotentialMovesFromWorker } from "types/worker";

export const invokeIsCardClickable = async (
  solitaire: Solitaire
): Promise<PotentialMovesFromWorker> => {
  /**
   * Here we create our worker and wrap it with comlink so we can interact with it
  */
  const worker = new Worker("../../workers/potentialMovesWorker", {
    name: "can-card-move-worker",
    type: "module",
  });

  const workerApi = wrap<import("../../workers/potentialMovesWorker").WorkerType>(worker);
  const cards = await workerApi.potentialMoves(solitaire);
  workerApi[releaseProxy]();
  worker.terminate();
  return cards;
};