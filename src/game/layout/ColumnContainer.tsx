import { PropsWithChildren } from "react";

interface ColumnContainerProps {
    id: string;
}
export const ColumnContainer = ({id, children}: PropsWithChildren<ColumnContainerProps>): JSX.Element => {
    return (
        <div id={id} className="mt-10">
            <div className="flex flex-row space-x-5 justify-around">
                {children}
            </div>
        </div>
    );
}