import { releaseProxy, wrap } from "comlink";
import { useState, useEffect } from "react";
import { Solitaire } from "types/game";
import { AreAllCardsOnTheBoardFromWorker } from "types/worker";

export const useAreAllTheCardsOnTheBoard = (
    solitaire: Solitaire,
    hasAcceptedToCompleteGame: boolean
): AreAllCardsOnTheBoardFromWorker => {
    const value: string[] = [];
    /**
     * We'll want to expose a wrapping object so we know when a calculation is in progress
     */
    const [data, setData] = useState({
      isCalculating: false,
      value,
    });
  
    useEffect(() => {
      /**
       * Here we create our worker and wrap it with comlink so we can interact with it
       */
      const worker = new Worker("../../workers/areAllCardsOnTheBoard", {
        name: "are-all-cards-on-the-board-worker",
        type: "module",
      });
  
      const workerApi = wrap<import("../../workers/areAllCardsOnTheBoard").WorkerType>(worker);

      setData({isCalculating: true, value: []});
  
      workerApi.areAllCardsOnTheBoard(solitaire).then((value: string[]) => {
        setData({ isCalculating: false, value });
        workerApi[releaseProxy]();
        worker.terminate();
      });
    }, [solitaire, hasAcceptedToCompleteGame]);
  
    return [data.value, data.isCalculating];
  };