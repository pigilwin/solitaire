import { useTrail } from "@react-spring/core";
import { a, config } from "@react-spring/web";
import { ColumnContainer } from "game/layout/ColumnContainer";
import { useSelector } from "react-redux";

import { currentGameSelector } from "store/game/gameSlice";

import { SolitaireCard } from "types/game";

import { ConditionalColumn } from "./ConditionalColumn";

interface ConditionalColumnProps {
    name: string;
    cards: SolitaireCard[];
}

export const Columns = (): JSX.Element => {

    const solitaire = useSelector(currentGameSelector);

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
        <ColumnContainer id="columns">
            {trail.map((style, index) => {
                return (
                    <a.div key={index} style={style}>
                        <ConditionalColumn columnName={map[index].name} cards={map[index].cards}/>
                    </a.div>
                );
            })}
        </ColumnContainer>
    );
};