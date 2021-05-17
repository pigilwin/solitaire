import { useDispatch, useSelector } from "react-redux";

import { LocationAwareSolitaireCard } from "types/game";

import { currentGameSelector } from "store/game/gameSlice";
import { columnFromLocation } from "lib/util";
import { makeCardLocationAware } from "store/game/locationHelper";
import { moveCardToColumnAsync } from "store/game/thunk";
import { cardWantingToBeMovedSelector, clearPossibleMovesAction } from "store/game/gameMoveSlice";

import { Column } from './board/Column';
import { ColumnContainer } from '../layout/ColumnContainer';
import { GameButton } from './Button';

interface ChooseLocationProps {
    moves: LocationAwareSolitaireCard[];
}
export const ChooseLocation = ({moves}: ChooseLocationProps): JSX.Element => {
    const dispatch = useDispatch();
    
    const solitaire = useSelector(currentGameSelector);
    const cardWantingToBeMoved = useSelector(cardWantingToBeMovedSelector);


    const columnsBasedOnLocationsOfMoves = moves.map((card) => {
        return {
            location: card.location,
            cards: columnFromLocation(solitaire, card.location.namespace, card.location.area)
        };
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
                {columnsBasedOnLocationsOfMoves.map((column, index) => {

                    const chooseColumnClickHandler = (): void => {
                        const card = makeCardLocationAware(
                            column.cards[column.cards.length - 1], 
                            column.location.namespace, 
                            column.location.area
                        );
                        dispatch(moveCardToColumnAsync({
                            drag: cardWantingToBeMoved,
                            drop: card
                        }));
                        dispatch(clearPossibleMovesAction());
                    };

                    return (
                        <div className="cursor-pointer" key={index} onClick={chooseColumnClickHandler}>
                            <Column cards={column.cards} column={column.location.area}/>
                        </div>
                    );
                })}
            </ColumnContainer>
            <div className="flex justify-center items-center">
                <GameButton buttonText="Back" onClick={goBackClickHandler}/>
            </div>
        </div>
    );
}