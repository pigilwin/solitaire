import { useHistory } from "react-router-dom";
import { GameButton } from './components/Button';
import { Accordion } from "./layout/Accordion";
import { FullPageContainer } from "./layout/FullPageContainer";

import {
    Blue,
    Red,
    Green,
    Purple,
    Yellow,
} from './components/board/card/Back';
import { 
    CardBackMap,
    BACK_BLUE,
    BACK_GREEN,
    BACK_RED,
    BACK_YELLOW,
    BACK_PURPLE
} from "types/back";
import { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentlySelectedCardBackSelector, applyNewCardBackAction } from "store/application/applicationSlice";

export const Settings = (): JSX.Element => {
    const history = useHistory();
    const onClickHandler = () => {
        history.replace('/');
    };

    const cardBacks: CardBackMap = {
        [BACK_BLUE]: (<Blue/>),
        [BACK_GREEN]: (<Green/>),
        [BACK_PURPLE]: (<Purple/>),
        [BACK_RED]: (<Red/>),
        [BACK_YELLOW]: (<Yellow/>)
    };

    return (
        <FullPageContainer usingFlex={true}>
            <div className="m-auto w-1/2 bg-white flex flex-col justify-between space-y-4 rounded-md">
                <h1 className="text-center text-4xl mt-4">Settings</h1>
                <div className="my-2 text-center">
                    <GameButton testID="cy-settings-go-home" buttonText="Go Home" onClick={onClickHandler}/>
                </div>
                <div className="m-1 p-1">
                    <Accordion title="Choose a new card back" testID="new-card-back-chooser">
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

    const classes = ['w-36', 'h-46', 'mx-auto', 'cursor-pointer'];
    if (useSelector(currentlySelectedCardBackSelector) === id) {
        classes.push('border-8', 'border-blue-200');
    }

    return (
        <div data-cy-test-id={"card-back-color-" + id} className={classes.join(' ')} onClick={onClickHandler}>
            {children}
        </div>
    );
}