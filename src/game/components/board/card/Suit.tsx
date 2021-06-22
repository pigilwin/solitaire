interface SuitIconProps {
    large: boolean;
}

const smallClass: string = 'h-2 w-2 md:h-4 md:w-4';
const largeClass: string = 'h-6 w-6 md:h-16 md:w-16';

export const Heart = ({large}: SuitIconProps): JSX.Element => {
    const className = large ? largeClass : smallClass;
    return (
        <svg className={className} fill="red" xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" viewBox="0 0 600 600">
            <g transform="rotate(45,300,300)" >
                <rect x="150" y="150" height="350" width="350"/>
                <circle cx="150" cy="325" r="175"/>
                <circle cx="325" cy="150" r="175"/>
            </g>
        </svg>
    );
};

export const Diamond = ({large}: SuitIconProps): JSX.Element => {
    const className = large ? largeClass : smallClass;
    return (
        <svg className={className} fill="red" xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" viewBox="0 0 600 600">
            <rect x="100" y="100" width="400" height="400" transform="rotate(45,300,300)" />
        </svg>
    );
};

export const Spade = ({large}: SuitIconProps): JSX.Element => {
    const className = large ? largeClass : smallClass;
    return (
        <svg className={className} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1088.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M5386 12707 c-231 -387 -542 -770 -1021 -1256 -327 -332 -529 -522
                -1165 -1100 -300 -272 -639 -583 -755 -690 -824 -764 -1329 -1317 -1718 -1879
                -388 -560 -615 -1097 -698 -1652 -30 -199 -33 -535 -7 -700 78 -481 301 -914
                654 -1266 1014 -1009 2759 -1091 3884 -181 103 83 286 264 366 361 l41 50 -33
                -230 c-242 -1660 -713 -2902 -1350 -3563 -320 -332 -665 -519 -1075 -580 -123
                -19 -97 -19 2921 -19 1675 0 3014 4 2976 9 -1051 122 -1817 1146 -2276 3044
                -47 196 -128 593 -165 810 -28 168 -85 558 -82 562 1 1 34 -37 72 -83 211
                -258 542 -521 852 -678 1102 -554 2502 -363 3351 458 382 369 606 781 694
                1276 32 182 32 511 -1 730 -83 555 -310 1092 -698 1652 -391 565 -894 1115
                -1723 1884 -113 104 -450 413 -750 685 -638 580 -839 769 -1165 1100 -479 486
                -790 869 -1021 1256 -27 46 -51 83 -54 83 -3 0 -27 -37 -54 -83z"/>
            </g>
        </svg>
    );
};

export const Club = ({large}: SuitIconProps): JSX.Element => {
    const className = large ? largeClass : smallClass;
    return (
        <svg className={className} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"fill="#000000" stroke="none">
                <path d="M6210 12794 c-19 -2 -78 -9 -130 -15 -470 -53 -954 -260 -1350 -575
                -108 -86 -335 -313 -424 -424 -415 -519 -646 -1177 -646 -1841 0 -749 276
                -1472 957 -2507 56 -83 99 -152 96 -152 -3 0 -22 13 -42 29 -20 15 -90 64
                -156 108 -460 306 -891 479 -1385 554 -175 27 -554 33 -705 11 -490 -71 -891
                -234 -1265 -513 -729 -544 -1160 -1417 -1160 -2349 0 -932 431 -1805 1160
                -2349 374 -279 777 -443 1265 -513 147 -21 492 -16 660 10 540 83 1041 298
                1665 715 205 137 382 266 759 551 190 144 357 269 373 279 l28 19 0 -29 c0
                -34 -34 -396 -55 -583 -138 -1232 -405 -1939 -921 -2440 -370 -359 -804 -578
                -1514 -764 -48 -12 320 -14 2980 -14 2660 0 3028 2 2980 14 -710 186 -1144
                405 -1514 764 -474 460 -734 1089 -880 2125 -41 289 -102 874 -94 911 2 12 31
                -7 113 -76 322 -272 634 -509 915 -695 645 -428 1226 -670 1854 -772 618 -102
                1311 83 1866 498 729 544 1160 1417 1160 2349 0 932 -431 1805 -1160 2349
                -656 490 -1476 649 -2250 437 -352 -96 -706 -261 -1145 -531 -82 -51 -151 -92
                -153 -90 -2 2 31 50 74 107 246 330 493 759 643 1114 240 571 363 1210 322
                1673 -52 589 -275 1148 -637 1601 -89 111 -316 338 -424 424 -387 308 -827
                500 -1315 572 -96 14 -472 27 -545 18z"/>
            </g>
        </svg>
    );
};