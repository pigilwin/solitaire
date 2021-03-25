import { resolveLargeSuitIcon } from "../card/SuitBuilder";

interface EmptyFinalCardProps {
    type: string;
}
export const EmptyFinalCard = ({type}: EmptyFinalCardProps): JSX.Element => {
    
    const large = resolveLargeSuitIcon(type);

    return (
        <div className="playing-card-container flex flex-col justify-center">
            <div className="flex justify-center">
                {large}
            </div>
        </div>
    );
};