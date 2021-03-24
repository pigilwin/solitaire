import { MouseEventHandler } from "react";

interface GameButtonProps {
    buttonText: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const GameButton = ({buttonText, disabled, onClick}: GameButtonProps): JSX.Element => {
    return (
        <button
            disabled={disabled}
            className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100"
            onClick={onClick}
        >{buttonText}</button>
    );
};