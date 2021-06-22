import { useSelector, shallowEqual } from "react-redux";
import { currentlySelectedCardBackSelector } from "store/application/applicationSlice";
import { 
    BACK_BLUE, 
    BACK_GREEN,
    BACK_YELLOW,
    BACK_PURPLE,
    BACK_RED
} from "types/back";

export const Back = (): JSX.Element => {    
    const color = useSelector(currentlySelectedCardBackSelector, shallowEqual);

    switch (color) {
        case BACK_GREEN:
            return <Green/>;
        case BACK_BLUE:
            return <Blue/>;
        case BACK_RED:
            return <Red/>;
        case BACK_PURPLE:
            return <Purple/>;
        case BACK_YELLOW:
            return <Yellow/>;
    }

    throw new Error('Invalid color - ' + color);
};

export const Green = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-green-500 mx-auto"/>
        </div>
    );
}

export const Blue = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dashed playing-card-back-inner bg-blue-500 mx-auto"/>
        </div>
    );
}

export const Red = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-red-500 mx-auto"/>
        </div>
    );
}

export const Yellow = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-yellow-500 mx-auto"/>
        </div>
    );
}

export const Purple = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-purple-500 mx-auto"/>
        </div>
    );
}