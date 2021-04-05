interface SuitIconProps {
    width: number;
    height: number;
}

export const Heart = ({width, height}: SuitIconProps): JSX.Element => {    
    return (
        <svg fill="red" xmlns="http://www.w3.org/2000/svg" width={width} height={height} baseProfile="tiny" viewBox="0 0 600 600">
            <g transform="rotate(45,300,300)" >
                <rect x="150" y="150" height="350" width="350"/>
                <circle cx="150" cy="325" r="175"/>
                <circle cx="325" cy="150" r="175"/>
            </g>
        </svg>
    );
};

export const Diamond = ({width, height}: SuitIconProps): JSX.Element => {
    return (
        <svg fill="red" xmlns="http://www.w3.org/2000/svg" width={width} height={height} baseProfile="tiny" viewBox="0 0 600 600">
            <rect x="100" y="100" width="400" height="400" transform="rotate(45,300,300)" />
        </svg>
    );
};

export const Spade = ({width, height}: SuitIconProps): JSX.Element => {  
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} baseProfile="tiny" viewBox="0 0 600 600">
            <defs>
                <mask>
                    <rect width="100%" height="100%" fill="#fff"/>
                    <circle cx="180" cy="490" r="100" fill="#000"/>
                    <circle cx="420" cy="490" r="100" fill="#000"/>
                </mask>
            </defs>
            <rect x="200" y="400" height="200" width="200" fill="#000" mask="url(#stem-mask)" />
            <g transform="rotate(225,300,300)">
                <rect width="300" height="300" x="200" y="200"/>
                <circle cx="200" cy="350" r="150"/>
                <circle cx="350" cy="200" r="150"/>
            </g>
        </svg>
    );
};

export const Club = ({width, height}: SuitIconProps): JSX.Element => {    
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} baseProfile="tiny" viewBox="0 0 600 600">
            <defs>
                <mask id="stem-mask">
                    <rect width="100%" height="100%" fill="#fff"/>
                    <circle cx="180" cy="490" r="100" fill="#000"/>
                    <circle cx="420" cy="490" r="100" fill="#000"/>
                </mask>
            </defs>
            <rect x="200" y="400" height="200" width="200" fill="#000" mask="url(#stem-mask)" />
            <circle cx="180" cy="350" r="140"/>
            <circle cx="300" cy="150" r="140"/>
            <circle cx="420" cy="350" r="140"/>
        </svg>
    );
};