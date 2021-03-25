import { EmptyCardSpace } from "./EmptyCardSpace";

export const TopBar = (): JSX.Element => {

    return (
        <div className="flex flex-wrap mt-5">
            <div className="w-1/2 overflow-hidden flex flex-row justify-center">
                <div className="px-2">
                    <EmptyCardSpace/>
                </div>
                <div className="px-2">
                    <EmptyCardSpace/>
                </div>
            </div>
            <div className="w-1/2 overflow-hidden flex flex-row justify-center">
                <div className="px-2">
                    <EmptyCardSpace/>
                </div>
                <div className="px-2">
                    <EmptyCardSpace/>
                </div>
                <div className="px-2">
                    <EmptyCardSpace/>
                </div>
                <div className="px-2">
                    <EmptyCardSpace/>
                </div>
            </div>
        </div>
    );
};