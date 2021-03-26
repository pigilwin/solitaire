import { Droppable } from "react-beautiful-dnd";
import { Solitaire, SolitaireCard } from "../../../store/game/suitTypes";
import { Column } from "./Column";
import { EmptyCardSpace } from "./EmptyCardSpace";

interface ColumnsProps {
    solitaire: Solitaire;
}
export const Columns = ({solitaire}: ColumnsProps): JSX.Element => {
    return (
        <div id="columns" className="mt-10">
            <div className="flex flex-row space-x-5 justify-around">
                {getColumnContent(solitaire.one, 'one')}
                {getColumnContent(solitaire.two, 'two')}
                {getColumnContent(solitaire.three, 'three')}
                {getColumnContent(solitaire.four, 'four')}
                {getColumnContent(solitaire.five, 'five')}
                {getColumnContent(solitaire.six, 'six')}
                {getColumnContent(solitaire.seven, 'seven')}
            </div>
        </div>
    );
};

const getColumnContent = (cards: SolitaireCard[], column: string): JSX.Element => {

    if (cards.length === 0) {
        return (
            <Droppable droppableId={"column-index-" + column}>
                {(provided, snapshot) => (
                <div ref={provided.innerRef}{...provided.droppableProps}>
                    <EmptyCardSpace/>
                    {provided.placeholder}
                </div>
            )}
            </Droppable>
        );
    }

    return <Column cards={cards} column={column}/>

};