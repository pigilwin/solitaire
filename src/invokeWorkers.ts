import { wrap } from 'comlink';
import { Solitaire } from 'types/game';

export const isTheGameComplete = async (solitaire: Solitaire): Promise<boolean> => {
  const worker = new Worker('workers/isGameCompleteWorker', { name: 'is-game-complete-worker', type: 'module' });
  const api = wrap<import('workers/isGameCompleteWorker').WorkerType>(worker);
  return await api.isGameComplete(solitaire);
}

export const canCardMove = async (solitaire: Solitaire): Promise<boolean> => {
  const worker = new Worker('workers/canCardMoveWorker', { name: 'can-card-move-worker', type: 'module' });
  const api = wrap<import('workers/canCardMoveWorker').WorkerType>(worker);
  return await api.canCardMove(solitaire);
}