import { PropsWithChildren } from "react";

interface FullPageContainerProps {
    usingFlex?: boolean;
}
export const FullPageContainer = ({children, usingFlex}: PropsWithChildren<FullPageContainerProps>): JSX.Element => {
    
    const classes = ["min-h-screen", "bg-green-300"];
    if (usingFlex) {
        classes.push('flex');
    }

    return (
        <div className={classes.join(" ")}>
            {children}
        </div>
    );
};