interface MovesCountProps {
    count: number;
}
export const MovesCount = ({count}: MovesCountProps): JSX.Element => {
    return (
        <div className="flex flex-row">    
            <p>Moves: {count}</p>
        </div>
    );
}