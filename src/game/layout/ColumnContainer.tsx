import { PropsWithChildren } from "react";

interface ColumnContainerProps {
    id: string;
}
export const ColumnContainer = ({id, children}: PropsWithChildren<ColumnContainerProps>): JSX.Element => {
    return (
        <div id={id} className="flex flex-row space-x-2 md:space-x-5 justify-around px-1 mt-10">
            {children}
        </div>
    );
}