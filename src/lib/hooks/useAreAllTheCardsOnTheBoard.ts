import { releaseProxy, wrap } from "comlink";
import { useState, useEffect } from "react";
import { Solitaire } from "typings/game";
import { AreAllCardsOnTheBoardFromWorker } from "typings/worker";

export const useAreAllTheCardsOnTheBoard = (
    solitaire: Solitaire
): AreAllCardsOnTheBoardFromWorker => {
    const value: string[] = [];
    /**
     * We'll want to expose a wrapping object so we know when a calculation is in progress
     */
    const [data, setData] = useState(value);
  
    useEffect(() => {
      /**
       * Here we create our worker and wrap it with comlink so we can interact with it
       */
      const worker = new Worker(new URL("../../workers/areAllCardsOnTheBoard?worker&url", import.meta.url), {
        name: "are-all-cards-on-the-board-worker",
        type: "module",
      });
  
      const workerApi = wrap<import("../../workers/areAllCardsOnTheBoard").WorkerType>(worker);
  
      workerApi.areAllCardsOnTheBoard(solitaire).then((value: string[]) => {
        setData(value);
        workerApi[releaseProxy]();
        worker.terminate();
      });
    }, [solitaire]);
  
    return data;
  };