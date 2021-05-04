import { CompletedGame } from "../../../store/leaderboard/types";
import { Trophy } from "./Trophy";

interface TileProps {
    record: CompletedGame;
    index: number;
}
export const Tile = ({record, index}: TileProps): JSX.Element => {
    
    const colorMap: {[index: number]: string} = {
        0: 'yellow',
        1: 'gray',
        2: 'orange'
    };


    const classes = ['flex'];
    if (index === 0) {
        classes.push('text-1xl','rounded', 'shadow-md', 'bg-white', '-mx-3', 'mb-6' ,'h-24');
    } else {
        classes.push('h-16');
    }

    const date = new Date(0);
    date.setTime(Date.parse(record.date));
    const formatted = new Intl.DateTimeFormat().format(date);

    const fill = colorMap[index] ?? 'black';
    
    return (
        <div className={classes.join(" ")}>
            <div className="w-1/5 my-auto font-bold flex justify-center">
                <Trophy fill={fill}/>
            </div>
            <div className="w-1/5 my-auto">{record.name}</div>
            <div className="w-1/5 my-auto">{record.score} points</div>
            <div className="w-1/5 my-auto">{record.moves} moves</div>
            <div className="w-1/5 my-auto">{formatted}</div>
        </div>
    );
}