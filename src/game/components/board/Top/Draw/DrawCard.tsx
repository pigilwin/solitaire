import { SolitaireCard } from "../../../../../store/game/suitTypes";

interface DrawCardProps {
    draw: SolitaireCard[];
}
export const DrawCard = ({draw}: DrawCardProps): JSX.Element => {
    
    /**
     * If no draws have been found then show a empty card space
     */
    if (draw.length === 0) {
        return (<div className="playing-card-container"></div>);
    }

    return (
        <div></div>
    );
};