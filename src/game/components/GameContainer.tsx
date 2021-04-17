import { PropsWithChildren } from "react";

export const GameContainer = ({children}: PropsWithChildren<{}>): JSX.Element => {
    return (
        <div className="min-h-screen bg-green-300">
            {children}
        </div>
    );
};