interface GameButtonProps {
    buttonText: string;
    disabled?: boolean;
}

export const GameButton = ({buttonText, disabled}: GameButtonProps): JSX.Element => {
    return (
        <button
            disabled={disabled}
            className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100"
        >{buttonText}</button>
    );
};