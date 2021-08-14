import { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { GameButton } from './components/Button';
import {
    Blue,
    Red,
    Green,
    Purple,
    Yellow,
} from './components/board/card/Back';

import { Accordion } from "./layout/Accordion";
import { FullPageContainer } from "./layout/FullPageContainer";

import { 
    CardBackMap,
    CARD_BACK_BLUE,
    CARD_BACK_GREEN,
    CARD_BACK_RED,
    CARD_BACK_YELLOW,
    CARD_BACK_PURPLE
} from "types/back";

import { 
    currentlySelectedCardBackSelector, 
    applyNewCardBackAction, 
    applyNewBackgroundColor, 
    currentlySelectedBackgroundSelector, 
    shouldTheGameBeFinishedAutomaticallySelector,
    applyFinishGameAutomatically
} from "store/application/applicationSlice";
import { backgroundColors } from "store/application/constants";
import { ToggleSwitch } from "./layout/inputs";

export const Settings = (): JSX.Element => {

    const shouldTheGameBeFinishedAutomatically = useSelector(shouldTheGameBeFinishedAutomaticallySelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const onClickHandler = () => {
        history.replace('/');
    };

    const cardBacks: CardBackMap = {
        [CARD_BACK_BLUE]: (<Blue/>),
        [CARD_BACK_GREEN]: (<Green/>),
        [CARD_BACK_PURPLE]: (<Purple/>),
        [CARD_BACK_RED]: (<Red/>),
        [CARD_BACK_YELLOW]: (<Yellow/>)
    };

    return (
        <FullPageContainer usingFlex={true}>
            <div className="m-auto w-2/3 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl mt-4">Settings</h1>
                <div className="my-2 text-center">
                    <GameButton testID="cy-settings-go-home" buttonText="Go Home" onClick={onClickHandler}/>
                </div>
                <div className="my-1 p-1">
                    <Accordion title="Gameplay Settings" testID="gameplay-settings">
                        <ToggleSwitch 
                            title="Should the game be finished automatically?" 
                            value={shouldTheGameBeFinishedAutomatically}
                            onChange={(e) => {
                                dispatch(applyFinishGameAutomatically(e.currentTarget.checked));
                            }}
                        />
                    </Accordion>
                </div>
                <div className="my-1 p-1">
                    <Accordion title="Choose a card back" testID="new-card-back-chooser">
                        <div className="grid grid-cols-3 gap-4">
                            {Object.keys(cardBacks).map((id) => {
                                return (
                                   <SelectableCardBack key={id} id={id}>
                                       {cardBacks[id]}
                                   </SelectableCardBack>
                                );
                            })}
                        </div>
                    </Accordion>
                </div>
                <div className="my-1 p-1">
                    <Accordion title="Choose a background color" testID="new-back-ground-chooser">
                        <div className="grid grid-cols-3 gap-4">
                            {Object.keys(backgroundColors).map((id) => {
                                return (
                                    <SelectableBackground 
                                        key={id} 
                                        id={id} 
                                        color={backgroundColors[id]} 
                                    />
                                );
                            })}
                        </div>
                    </Accordion>
                </div>
            </div>
        </FullPageContainer>
    );
}

interface SelectableCardBackProps {
    id: string;
}
const SelectableCardBack = ({id, children}: PropsWithChildren<SelectableCardBackProps>): JSX.Element => {
    
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(applyNewCardBackAction(id));
    };

    const classes = ['mx-auto', 'cursor-pointer'];
    if (useSelector(currentlySelectedCardBackSelector) === id) {
        classes.push('border-2', 'border-blue-200');
    }

    return (
        <div data-cy-test-id={"card-back-color-" + id} className={classes.join(' ')} onClick={onClickHandler}>
            {children}
        </div>
    );
}

interface SelectableBackgroundProps {
    id: string;
    color: string;
}
const SelectableBackground = ({id, color}: SelectableBackgroundProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(applyNewBackgroundColor(id));
    };

    const classes = ['mx-auto', 'cursor-pointer', 'playing-card-dimensions', color];
    if (useSelector(currentlySelectedBackgroundSelector) === id) {
        classes.push('border-2', 'border-blue-200');
    }

    return (
        <div data-cy-test-id={"background-color-" + id} className={classes.join(' ')} onClick={onClickHandler}></div>
    );
}