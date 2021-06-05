import { ChangeEventHandler } from "react";

interface InputProps {
    placeholder: string;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
    testID: string;
}
export const Input = ({placeholder, onChangeHandler, testID}: InputProps): JSX.Element => {
    return (
        <input
            data-cy-test-id={testID}
			type="text"
            onChange={onChangeHandler}
			placeholder={placeholder}
			className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 p-2"/>
    );
}