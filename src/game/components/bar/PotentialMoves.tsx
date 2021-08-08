import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invokeFindPotentialMoves } from "lib/invokers/invokeFindPotentialMoves";
import { currentGameSelector } from "store/game/gameSlice";

export const PotentialMoves = (): JSX.Element => {
    const dispatch = useDispatch();
    const solitare = useSelector(currentGameSelector);
    const onClickHandler = async (e: MouseEvent) => {
        e.stopPropagation();
        const cardsThatCanMove = await invokeFindPotentialMoves(solitare);
        console.log(cardsThatCanMove);
    };
    return (
        <div className="flex flex-row px-4 cursor-pointer" onClick={onClickHandler}>
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd" transform="translate(2 2)">
                    <circle cx="8.5" cy="8.5" r="8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="m8.5 9.5v-1l1.41421356-1.41421356c.37507274-.37507276.58578644-.88378059.58578644-1.41421356v-.17157288c0-.61286606-.3462631-1.17313156-.89442719-1.4472136l-.21114562-.1055728c-.56305498-.2815275-1.2257994-.2815275-1.78885438 0l-.10557281.0527864c-.61286606.30643303-1 .9328289-1 1.61803399v.88196601" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="8.5" cy="12.5" fill="currentColor" r="1"/>
                </g>
            </svg>
        </div>
    );
}