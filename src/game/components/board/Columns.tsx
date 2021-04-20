import { useTrail } from "@react-spring/core";
import { a, config } from "@react-spring/web";
import { Solitaire, SolitaireCard } from "../../../store/game/types/game";
import { ConditionalColumn } from "./ConditionalColumn";

interface ConditionalColumnProps {
    name: string;
    cards: SolitaireCard[];
}

interface ColumnsProps {
    solitaire: Solitaire;
}
export const Columns = ({solitaire}: ColumnsProps): JSX.Element => {

    const map: ConditionalColumnProps[] = [
        {name: 'one', cards: solitaire.columns.one},
        {name: 'two', cards: solitaire.columns.two},
        {name: 'three', cards: solitaire.columns.three},
        {name: 'four', cards: solitaire.columns.four},
        {name: 'five', cards: solitaire.columns.five},
        {name: 'six', cards: solitaire.columns.six},
        {name: 'seven', cards: solitaire.columns.seven}
    ];

    const [trail] = useTrail(Object.keys(solitaire.columns).length,{
        config: {
            ...config.default
        },
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    }, [solitaire.id]);
    
    return (
        <div id="columns" className="mt-10">
            <div className="flex flex-row space-x-5 justify-around">
                {trail.map((style, index) => {
                    return (
                        <a.div key={index} style={style}>
                            <ConditionalColumn columnName={map[index].name} cards={map[index].cards}/>
                        </a.div>
                    );
                })}
            </div>
        </div>
    );
};