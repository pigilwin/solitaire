import anime, {AnimeInstance} from "animejs";
import { MutableRefObject, useEffect, useRef } from "react";

export const useAnime = <T extends HTMLElement>(): [
    MutableRefObject<AnimeInstance | undefined>,
    MutableRefObject<T | null>
] => {
    const animationReference = useRef<AnimeInstance>();
    const elementReference = useRef<T>(null);

    useEffect(() => {
        if (elementReference.current) {
            animationReference.current = anime({
                targets: elementReference.current,
                autoplay: false,
                'translateY': 200
            });
        }
    });

    return [animationReference, elementReference];
};