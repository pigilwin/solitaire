export const Back = (): JSX.Element => {    
    return <Blue/>;
};

export const Green = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-green-500 mx-auto"></div>
        </div>
    );
}

export const Blue = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dashed playing-card-back-inner bg-blue-500 mx-auto"></div>
        </div>
    );
}

export const Red = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-red-500 mx-auto"></div>
        </div>
    );
}

export const Yellow = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-yellow-500 mx-auto"></div>
        </div>
    );
}

export const Purple = (): JSX.Element => {
    return (
        <div className="playing-card p-1">
            <div className="border-2 border-white border-dotted playing-card-back-inner bg-purple-500 mx-auto"></div>
        </div>
    );
}