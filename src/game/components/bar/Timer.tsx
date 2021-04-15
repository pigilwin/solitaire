interface TimerProps {
    timer: number;
}
export const Timer = ({timer}: TimerProps): JSX.Element => {
    return (
        <div className="flex flex-row">
            Time: {timer}
        </div>
    );
}