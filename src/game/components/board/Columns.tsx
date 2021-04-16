import anime from "animejs";
import { useAnimeSelector } from "../../../hooks/useAnime";
import { Solitaire } from "../../../store/game/types/game";
import { ConditionalColumn } from "./ConditionalColumn";
interface ColumnsProps {
    solitaire: Solitaire;
}
export const Columns = ({solitaire}: ColumnsProps): JSX.Element => {

    useAnimeSelector('#columns .animated-column', {
        'opacity': 1,
        delay: anime.stagger(100)
    }, solitaire.id);
    
    return (
        <div id="columns" className="mt-10">
            <div className="flex flex-row space-x-5 justify-around">
                <ConditionalColumn columnName='one' cards={solitaire.columns.one}/>
                <ConditionalColumn columnName='two' cards={solitaire.columns.two}/>
                <ConditionalColumn columnName='three' cards={solitaire.columns.three}/>
                <ConditionalColumn columnName='four' cards={solitaire.columns.four}/>
                <ConditionalColumn columnName='five' cards={solitaire.columns.five}/>
                <ConditionalColumn columnName='six' cards={solitaire.columns.six}/>
                <ConditionalColumn columnName='seven' cards={solitaire.columns.seven}/>
            </div>
        </div>
    );
};