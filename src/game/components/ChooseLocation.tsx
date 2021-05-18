import { useDispatch, useSelector } from "react-redux";

import { CanCardMoveFromWorker } from "types/worker";
import { cardWantingToBeMovedSelector, clearPossibleMovesAction } from "store/game/gameMoveSlice";

import { ColumnContainer } from '../layout/ColumnContainer';
import { GameButton } from './Button';
import { ChooseLocationColumn } from "./choose/ChooseLocationColumn";
import { LocationAwareSolitaireCard } from "types/game";
import { isAFullCard } from "lib/util";
import { ChooseEmptyColumn } from "./choose/ChooseEmptyColumn";
import { ChooseFinalColumn } from "./choose/ChooseFinalColumn";

interface ChooseLocationProps {
    moves: CanCardMoveFromWorker;
}
export const ChooseLocation = ({moves}: ChooseLocationProps): JSX.Element => {
    const dispatch = useDispatch();

    const cardWantingToBeMoved = useSelector(cardWantingToBeMovedSelector);

    const columnsBasedOnLocationsOfMoves: JSX.Element[] = [];

    let index = 0;
    for (const column in moves){
        const innerCard = moves[column];

        if (isAFullCard(innerCard) && innerCard.location.namespace === 'final') {
            columnsBasedOnLocationsOfMoves.push(
                <div key={index}>
                    <ChooseFinalColumn
                        cardWantingToBeMoved={cardWantingToBeMoved}
                        innerCard={innerCard as LocationAwareSolitaireCard}
                    />
                </div>
            );
            index++;
            continue;
        }

        /**
         * If the card is not a full card then its most likely a empty card space
         */
        if (!isAFullCard(innerCard) && innerCard.location.namespace === 'columns') {
            columnsBasedOnLocationsOfMoves.push(
                <div key={index}>
                    <ChooseEmptyColumn
                        cardWantingToBeMoved={cardWantingToBeMoved}
                        innerCard={innerCard}
                    />
                </div>
            );
            index++;
            continue;
        }

        columnsBasedOnLocationsOfMoves.push(
           <div key={index}>
                <ChooseLocationColumn 
                    cardWantingToBeMoved={cardWantingToBeMoved} 
                    innerCard={innerCard as LocationAwareSolitaireCard}
                />
           </div>
        );
        index++;
    }

    const goBackClickHandler = (): void => {
        dispatch(clearPossibleMovesAction());
    };

    return (
        <div>
            <div className="mx-auto">
                <h1 className="text-center text-2xl">Choose a column to add the card to.</h1>
            </div>
            <ColumnContainer id='location-of-moves'>
                {columnsBasedOnLocationsOfMoves}
            </ColumnContainer>
            <div className="flex justify-center items-center">
                <GameButton buttonText="Back" onClick={goBackClickHandler}/>
            </div>
        </div>
    );
}