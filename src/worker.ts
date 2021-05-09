import { expose } from 'comlink';

const exports = {
    callMe: () => {
        return 22;
    }
};
export type MyFirstWorker = typeof exports;

expose(exports);