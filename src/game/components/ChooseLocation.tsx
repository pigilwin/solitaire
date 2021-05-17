import { useDispatch, useSelector } from "react-redux";

import { CanCardMoveFromWorker } from "types/worker";

import { columnFromLocation, isAFullCard } from "lib/util";

import { currentGameSelector } from "store/game/gameSlice";
import { makeCardLocationAware } from "store/game/locationHelper";
import { moveCardToColumnAsync } from "store/game/thunk";
import { cardWantingToBeMovedSelector, clearPossibleMovesAction } from "store/game/gameMoveSlice";

import { Column } from './board/Column';
import { ColumnContainer } from '../layout/ColumnContainer';
import { GameButton } from './Button';

interface ChooseLocationProps {
    moves: CanCardMoveFromWorker;
}
export const ChooseLocation = ({moves}: ChooseLocationProps): JSX.Element => {
    const dispatch = useDispatch();
    
    const solitaire = useSelector(currentGameSelector);
    const cardWantingToBeMoved = useSelector(cardWantingToBeMovedSelector);

    const columnsBasedOnLocationsOfMoves: JSX.Element[] = [];

    Object.keys(moves).forEach((column, index) => {
        const innerCard = moves[column];

        /**
         * If the card
         */
        if (!isAFullCard(innerCard)) {
            columnsBasedOnLocationsOfMoves.push(<p>Foo</p>);
            return;
        }

        const cards = columnFromLocation(solitaire, innerCard.location.namespace, innerCard.location.area);
        
        const chooseColumnClickHandler = (): void => {
            const card = makeCardLocationAware(
                cards[cards.length - 1], 
                innerCard.location.namespace, 
                innerCard.location.area
            );
            dispatch(moveCardToColumnAsync({
                drag: cardWantingToBeMoved,
                drop: card
            }));
            dispatch(clearPossibleMovesAction());
        };

        columnsBasedOnLocationsOfMoves.push(
            <div className="cursor-pointer" key={index} onClick={chooseColumnClickHandler}>
                <Column cards={cards} column={innerCard.location.area}/>
            </div>
        );
    });

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