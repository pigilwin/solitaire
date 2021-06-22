import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "types/suit";
import { Club, Diamond, Spade, Heart } from "./Suit";

export const resolveSuitIcon = (type: string, large: boolean): JSX.Element | null => {
    let icon: JSX.Element | null = null;
    switch (type) {
        case SUIT_TYPE_SPADE:
            icon = <Spade large={large}/>;
            break;
        case SUIT_TYPE_CLUB:
            icon = <Club large={large}/>;
            break;
        case SUIT_TYPE_HEART:
            icon = <Heart large={large}/>;
            break;
        case SUIT_TYPE_DIAMOND:
            icon = <Diamond large={large}/>;
            break;
    }
    return icon;
};