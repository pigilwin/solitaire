interface ScoreCountProps {
    count: number;
}
export const ScoreCount = ({count}: ScoreCountProps) => {
    return (
        <div className="flex flex-row">    
            <p>Score: {count}</p>
        </div>
    );
};