import { useDrop } from "react-dnd";

export const EmptyCardSpace = (): JSX.Element => {
    
    /**
     * CollectionOptions is not used but is now disabled
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [CollectionOptions, drop] = useDrop(() => ({
        accept: 'card',
        drop: (i, monitor) => {
            console.log(i, monitor);
        },
        canDrop: (i, monitor) => {
            console.log(i, monitor);
            return true;
        }
    }), []);
    
    return (
        <div ref={drop} className="playing-card-container"></div>
    );
}