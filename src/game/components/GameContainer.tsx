import { PropsWithChildren } from "react";

interface GameContainerProps {
    usingFlex?: boolean;
}
export const GameContainer = ({children, usingFlex}: PropsWithChildren<GameContainerProps>): JSX.Element => {
    
    const classes = ["min-h-screen", "bg-green-300", "pt-2"];
    if (usingFlex) {
        classes.push('flex');
    }

    return (
        <div className={classes.join(" ")}>
            {children}
        </div>
    );
};