import { Draw } from "./Draw/Draw";
import { Final } from "./Final/Final";

export const TopBar = (): JSX.Element => {
    return (
        <div className="flex flex-wrap">
            <Draw/>
            <Final/>
        </div>
    );
};