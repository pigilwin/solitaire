import { TopBar } from "./components/board/Top/TopBar";
import { Columns } from "./components/board/Columns";
import { useSelector } from "react-redux";
import { currentGameSelector, potentialMoveLocationsSelector } from "store/game/gameSlice";
import { LocationAwareSolitaireCard } from "types/game";
import { columnFromLocation } from "store/game/builder/util";
import { Column } from "./components/board/Column";
import { ColumnContainer } from "./layout/ColumnContainer";

export const Board = (): JSX.Element => {
    
    const potentialMoves = useSelector(potentialMoveLocationsSelector);
    
    /**
     * If we have moves then show them
     */
    if (potentialMoves.length > 0) {
        return <ChooseLocation moves={potentialMoves}/>;
    }
    
    return (
        <div id="board">
            <TopBar/>
            <Columns/>
        </div>
    );
};

interface ChooseLocationProps {
    moves: LocationAwareSolitaireCard[];
}
const ChooseLocation = ({moves}: ChooseLocationProps): JSX.Element => {
    const solitaire = useSelector(currentGameSelector);
    const columnsBasedOnLocationsOfMoves = moves.map((card) => {
        return {
            location: card.location,
            cards: columnFromLocation(solitaire, card.location.namespace, card.location.area)
        };
    });
    return (
        <ColumnContainer id='location-of-moves'>
            {columnsBasedOnLocationsOfMoves.map((column) => {
                return (
                    <div>
                        <Column cards={column.cards} column={column.location.area}/>
                    </div>
                );
            })}
        </ColumnContainer>
    );
}