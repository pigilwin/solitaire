import { SUIT_TYPE_HEART } from "../store/game/suitTypes";
import { Face } from "./components/card/Face";

export const Game = (): JSX.Element => {
    return (
        <div className="flex min-h-screen">
            <div className="mx-auto h-1/2">
                <Face index={"8"} type={SUIT_TYPE_HEART}/>
            </div>
        </div>
    );
};