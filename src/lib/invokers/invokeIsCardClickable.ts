import { releaseProxy, wrap } from "comlink";
import { LocationAwareSolitaireCard, Solitaire } from "types/game";

export const invokeIsCardClickable = async (
  solitaire: Solitaire,
  card: LocationAwareSolitaireCard
): Promise<LocationAwareSolitaireCard[]> => {
  /**
   * Here we create our worker and wrap it with comlink so we can interact with it
  */
  const worker = new Worker("../../workers/canCardMoveWorker", {
    name: "can-card-move-worker",
    type: "module",
  });

  const workerApi = wrap<import("../../workers/canCardMoveWorker").WorkerType>(worker);
  const cards = await workerApi.canCardMove(solitaire, card);
  workerApi[releaseProxy]();
  worker.terminate();
  return cards;
};
