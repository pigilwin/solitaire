import { 
    BackgroundColorMap, 
    BACKGROUND_BLUE, 
    BACKGROUND_GREEN, 
    BACKGROUND_PURPLE, 
    BACKGROUND_RED, 
    BACKGROUND_YELLOW 
} from "types/background";

export const countToRevealTestingRoute: number = 7;
export const localStorageKey: string = 'USING_TESTING_ROUTES';
export const backgroundColors: BackgroundColorMap = {
    [BACKGROUND_GREEN]: 'bg-green-300',
    [BACKGROUND_YELLOW]: 'bg-yellow-300',
    [BACKGROUND_RED]: 'bg-red-300',
    [BACKGROUND_PURPLE]: 'bg-purple-300',
    [BACKGROUND_BLUE]: 'bg-blue-300'
};