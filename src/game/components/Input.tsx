import { forwardRef } from "react";

interface InputProps {
    placeholder: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({placeholder}, ref): JSX.Element => {
    return (
        <input 
            ref={ref}
			type="text"
			placeholder={placeholder}
			className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2 p-2"/>
    );
});