import { MouseEventHandler, forwardRef } from "react";
import { CypressTesting } from "@typings/test";

interface GameButtonProps extends CypressTesting {
    buttonText: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(({buttonText, disabled, onClick, testID}, ref): JSX.Element => {
    return (
        <button
            ref={ref}
            disabled={disabled}
            className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100"
            onClick={onClick}
            data-cy-test-id={testID}
        >{buttonText}</button>
    );
});

interface IconGameButtonProps extends GameButtonProps {
    icon: JSX.Element;
}

export const IconGameButton = ({buttonText, disabled, onClick, icon, testID}: IconGameButtonProps): JSX.Element => {
    return (
        <button
            disabled={disabled}
            className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100 inline-flex items-center"
            onClick={onClick}
            data-cy-test-id={testID}
        >
            {icon}
            <span className="ml-1">{buttonText}</span>
        </button>
    );
}