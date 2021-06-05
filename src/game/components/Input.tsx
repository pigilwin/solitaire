import { ChangeEventHandler } from "react";
import { CypressTesting } from "types/test";

interface InputProps extends CypressTesting {
    placeholder: string;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
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