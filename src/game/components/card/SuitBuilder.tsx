import { SUIT_TYPE_CLUB, SUIT_TYPE_DIAMOND, SUIT_TYPE_HEART, SUIT_TYPE_SPADE } from "../../../store/game/suitTypes";
import { Club, Diamond, Spade, Heart } from "./Suit";

const smallWidth: number = 20;
const smallHeight: number = 20;

const largeWidth: number = 80;
const largeHeight: number = 80;

export const resolveSmallSuitIcon = (type: string, opacity: boolean): JSX.Element => {

    let icon: JSX.Element | null = null;

    switch (type) {
        case SUIT_TYPE_SPADE:
            icon = <Spade width={smallWidth} height={smallHeight} usingOpacity={opacity}/>;
            break;
        case SUIT_TYPE_CLUB:
            icon = <Club width={smallWidth} height={smallHeight} usingOpacity={opacity}/>;
            break;
        case SUIT_TYPE_HEART:
            icon = <Heart width={smallWidth} height={smallHeight} usingOpacity={opacity}/>;
            break;
        case SUIT_TYPE_DIAMOND:
            icon = <Diamond width={smallWidth} height={smallHeight} usingOpacity={opacity}/>;
            break;
        default:
            throw new Error('No icon found for ' + type);
    }
    return icon;
};


export const resolveLargeSuitIcon = (type: string, opacity: boolean): JSX.Element => {

    let icon: JSX.Element | null = null;

    switch (type) {
        case SUIT_TYPE_SPADE:
            icon = <Spade width={largeWidth} height={largeHeight} usingOpacity={opacity}/>;
            break;
        case SUIT_TYPE_CLUB:
            icon = <Club width={largeWidth} height={largeHeight} usingOpacity={opacity}/>;
            break;
        case SUIT_TYPE_HEART:
            icon = <Heart width={largeWidth} height={largeHeight} usingOpacity={opacity}/>;
            break;
        case SUIT_TYPE_DIAMOND:
            icon = <Diamond width={largeWidth} height={largeHeight} usingOpacity={opacity}/>;
            break;
        default:
            throw new Error('No icon found for ' + type);
    }
    return icon;
};