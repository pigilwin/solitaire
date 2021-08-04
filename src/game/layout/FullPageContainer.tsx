import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { currentlySelectedBackgroundSelector } from "store/application/applicationSlice";
import { backgroundColors } from "store/application/constants";

interface FullPageContainerProps {
    usingFlex?: boolean;
}
export const FullPageContainer = ({children, usingFlex}: PropsWithChildren<FullPageContainerProps>): JSX.Element => {
    
    const color = useSelector(currentlySelectedBackgroundSelector);
    const classes = ["min-h-screen", backgroundColors[color]];
    if (usingFlex) {
        classes.push('flex');
    }

    return (
        <div className={classes.join(" ")}>
            {children}
        </div>
    );
};