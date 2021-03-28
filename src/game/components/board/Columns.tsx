import { Solitaire, SolitaireCard } from "../../../store/game/types/game";
import { Column } from "./Column";
import { EmptyCardSpace } from "./EmptyCardSpace";

interface ColumnsProps {
    solitaire: Solitaire;
}
export const Columns = ({solitaire}: ColumnsProps): JSX.Element => {
    return (
        <div id="columns" className="mt-10">
            <div className="flex flex-row space-x-5 justify-around">
                {getColumnContent(solitaire.columns.one, 'one')}
                {getColumnContent(solitaire.columns.two, 'two')}
                {getColumnContent(solitaire.columns.three, 'three')}
                {getColumnContent(solitaire.columns.four, 'four')}
                {getColumnContent(solitaire.columns.five, 'five')}
                {getColumnContent(solitaire.columns.six, 'six')}
                {getColumnContent(solitaire.columns.seven, 'seven')}
            </div>
        </div>
    );
};

const getColumnContent = (cards: SolitaireCard[], column: string): JSX.Element => {

    if (cards.length === 0) {
        return <EmptyCardSpace column={column}/>;
    }

    return <Column cards={cards} column={column}/>

};