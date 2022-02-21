import { releaseProxy, wrap } from "comlink";
import { Solitaire } from "types/game";
import { PotentialMovesFromWorker } from "types/worker";

export const invokeFindPotentialMoves = async (
  solitaire: Solitaire
): Promise<PotentialMovesFromWorker> => {
  /**
   * Here we create our worker and wrap it with comlink so we can interact with it
  */
  const worker = new Worker(new URL("../../workers/potentialMovesWorker", import.meta.url), {
    name: "potential-moves-worker",
    type: "module",
  });

  const workerApi = wrap<import("../../workers/potentialMovesWorker").WorkerType>(worker);
  const cards = await workerApi.potentialMoves(solitaire);
  workerApi[releaseProxy]();
  worker.terminate();
  return cards;
};