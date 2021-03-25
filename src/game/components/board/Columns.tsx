import { EmptyCardSpace } from "./EmptyCardSpace"

export const Columns = (): JSX.Element => {
    return (
        <div id="columns" className="mt-10">
            <div className="flex flex-row space-x-5 justify-around">
                <EmptyCardSpace/>
                <EmptyCardSpace/>
                <EmptyCardSpace/>
                <EmptyCardSpace/>
                <EmptyCardSpace/>
                <EmptyCardSpace/>
                <EmptyCardSpace/>
            </div>
        </div>
    );
};