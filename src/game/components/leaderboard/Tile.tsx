import { CompletedGame } from "../../../store/leaderboard/types";
import { Trophy } from "./Trophy";

interface TileProps {
    record: CompletedGame;
    index: number;
}
export const Tile = ({record, index}: TileProps): JSX.Element => {
    
    const classes = ['flex'];
    if (index === 0) {
        classes.push('text-2xl','rounded', 'shadow-md', 'bg-white', '-mx-3', 'mb-6' ,'h-24');
    } else {
        classes.push('h-16');
    }

    
    return (
        <div className={classes.join(" ")}>
            <div className="w-1/4 my-auto font-bold flex justify-center">
                <Trophy/>
            </div>
            <div className="w-1/2 my-auto">{record.name}</div>
            <div className="w-1/4 my-auto">{record.score} pts</div>
        </div>
    );
}