import { useEffect, DependencyList } from "react";

type AsyncEffectCallback = () => Promise<void>;

export const useEffectAsync = (callback: AsyncEffectCallback, deps: DependencyList) => {
    useEffect(() => {
        const call = async () => {
            callback();
        };
        call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};