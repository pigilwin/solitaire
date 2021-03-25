import { resolveLargeSuitIcon, resolveSmallSuitIcon } from "./SuitBuilder";

interface FaceProps {
    index: string;
    type: string;
}
export const Face = ({index, type}: FaceProps): JSX.Element => {
    
    const small = resolveSmallSuitIcon(type, false);
    const large = resolveLargeSuitIcon(type, false);
    
    return (
        <div className="playing-card relative flex flex-col justify-center">
            <div className="absolute top-0 left-0 p-2 m-1">
                <p className="text-center">{index}</p>
                {small}
            </div>
            <div className="flex justify-center">
                {large}
            </div>
            <div className="absolute bottom-0 right-0 p-2 m-1">
                {small}
                <p className="text-center transform-gpu rotate-180">{index}</p>
            </div>
        </div>
    );
};