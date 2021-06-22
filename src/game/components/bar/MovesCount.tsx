interface MovesCountProps {
    count: number;
}
export const MovesCount = ({count}: MovesCountProps): JSX.Element => {
    return (
        <div className="flex flex-row px-4">
            <p>Moves: {count}</p>
        </div>
    );
}