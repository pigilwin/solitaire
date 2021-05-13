import { wrap, releaseProxy } from 'comlink';
import { LocationAwareSolitaireCard, Solitaire } from 'types/game';

export const isTheGameComplete = async (solitaire: Solitaire): Promise<boolean> => {
  const worker = new Worker('workers/isGameCompleteWorker', { name: 'is-game-complete-worker', type: 'module' });
  const api = wrap<import('workers/isGameCompleteWorker').WorkerType>(worker);
  const result = await api.isGameComplete(solitaire);
  api[releaseProxy]();
  worker.terminate();
  return result;
}

export const canCardMove = async (solitaire: Solitaire, card: LocationAwareSolitaireCard): Promise<boolean> => {
  const worker = new Worker('workers/canCardMoveWorker', { name: 'can-card-move-worker', type: 'module' });
  const api = wrap<import('workers/canCardMoveWorker').WorkerType>(worker);
  const result = await api.canCardMove(solitaire, card);
  api[releaseProxy]();
  worker.terminate();
  return result;
}