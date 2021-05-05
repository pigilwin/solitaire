import { useDispatch } from "react-redux";
import { deleteCompletedGameAsync } from "store/leaderboard/thunk";
import { CompletedGame } from "store/leaderboard/types";

interface TileProps {
    record: CompletedGame;
    index: number;
}
export const Tile = ({record, index}: TileProps): JSX.Element => {
    
    const dispatch = useDispatch();

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

    const onDeleteRecord = () => {
        dispatch(deleteCompletedGameAsync(record.id));
    };
    
    return (
        <div className={classes.join(" ")}>
            <div className="w-1/6 my-auto font-bold flex justify-center">
                <Trophy fill={fill}/>
            </div>
            <div className="w-1/6 my-auto">{record.name}</div>
            <div className="w-1/6 my-auto">{record.score} points</div>
            <div className="w-1/6 my-auto">{record.moves} moves</div>
            <div className="w-1/6 my-auto">{formatted}</div>
            <div className="w-1/6 my-auto">
                <Trash onClick={onDeleteRecord}/>
            </div>
        </div>
    );
}

interface TrashProps {
    onClick: () => void;
}
const Trash = ({onClick}: TrashProps): JSX.Element => {
    return (
        <svg onClick={onClick} className="cursor-pointer" height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 2)">
                <path d="m2.5 2.5h10v12c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2zm5-2c1.0543618 0 1.91816512.81587779 1.99451426 1.85073766l.00548574.14926234h-4c0-1.1045695.8954305-2 2-2z"/>
                <path d="m.5 2.5h14"/>
                <path d="m5.5 5.5v8"/>
                <path d="m9.5 5.5v8"/>
            </g>
        </svg>
    );
}

interface TrophyProps {
    fill: string;
}
const Trophy = ({fill}: TrophyProps): JSX.Element => {
    return (
        <svg fill={fill} height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 3)">
                <path d="m4.5.5h6c.5522847 0 1 .44771525 1 1v5c0 2.209139-1.790861 4-4 4s-4-1.790861-4-4v-5c0-.55228475.44771525-1 1-1z"/>
                <path d="m7.5 10.5v3"/>
                <path d="m4.5 13.5h6c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1h-6c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1zm7-11h2c.5522847 0 1 .44771525 1 1v1c0 1.1045695-.8954305 2-2 2h-1zm-8 0h-2c-.55228475 0-1 .44771525-1 1v1c0 1.1045695.8954305 2 2 2h1z"/>
            </g>
        </svg>
    );
}