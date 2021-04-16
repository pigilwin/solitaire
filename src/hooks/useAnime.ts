import anime, {AnimeInstance, AnimeParams} from "animejs";
import { MutableRefObject, useEffect, useRef } from "react";

export const useAnime = <T extends HTMLElement>(params: AnimeParams): [
    MutableRefObject<AnimeInstance | undefined>,
    MutableRefObject<T | null>
] => {
    const animationReference = useRef<AnimeInstance>();
    const elementReference = useRef<T>(null);

    useEffect(() => {
        if (elementReference.current) {

            const instanceParamsMerged: AnimeParams = {
                ...params,
                targets: elementReference.current,
                autoplay: false
            };

            animationReference.current = anime(instanceParamsMerged);
        }
    });

    return [animationReference, elementReference];
};

export const useAnimeSelector = (selector: string, params: AnimeParams, dependency: any): [
    MutableRefObject<AnimeInstance | null>
] => {
    const animationReference = useRef<AnimeInstance | null>(null);

    useEffect(() => {
        animationReference.current = anime({
            ...params,
            targets: selector
        });

        if (animationReference.current){
            animationReference.current.play();
        }

        return () => {
            if (animationReference.current){
                animationReference.current.restart();
            }
        };
        /**
         * I am removing the warning here as params can't be 
         * in the dependency list when having a function as
         * a value for the property, if I find a sutible 
         * solution I will remove the check
         */
        // eslint-disable-next-line
    }, [dependency, selector]);

    return [animationReference];
};