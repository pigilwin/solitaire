interface ToggleSwitchProps {
    value: boolean;
    title: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export const ToggleSwitch = ({title, onChange, value}: ToggleSwitchProps): JSX.Element => {
    return (
        <div className="flex flex-col">  
            <div className="ml-3 text-xl">{title}</div>
            <div className="toggle-switch flex flex-col p-4">
                <label className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input onChange={onChange} checked={value} type="checkbox" className="hidden" />
                        <div className="toggle__line w-10 h-4 bg-white rounded-full shadow-inner"></div>
                        <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                    </div>
                </label>
            </div>
        </div>
    );
}
