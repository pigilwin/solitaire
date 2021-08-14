import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from "types/application";
import { CARD_BACK_GREEN } from "types/back";
import { RootState } from "../rootReducer";
import { deepCopy } from "lib/deepCopy";
import { localStorageKey } from "./constants";
import { BACKGROUND_GREEN } from "types/background";

export const initialState: ApplicationState =  {
    allowedToSeeTestingRoute: false,
    cardBack: CARD_BACK_GREEN,
    background: BACKGROUND_GREEN,
    finishGameAutomatically: false
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        allowedToSeeTestingRouteAction(state: ApplicationState, action: PayloadAction<boolean>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.allowedToSeeTestingRoute = action.payload;

            /**
             * Load the local storage item
             */
            localStorage.removeItem(localStorageKey);
            /* istanbul ignore else */
            if (action.payload) {
                localStorage.setItem(localStorageKey, 'YES');
            }

            return newState;
        },
        applyNewCardBackAction(state: ApplicationState, action: PayloadAction<string>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.cardBack = action.payload;
            return newState;
        },
        applyNewBackgroundColor(state: ApplicationState, action: PayloadAction<string>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.background = action.payload;
            return newState;
        },
        applyFinishGameAutomatically(state: ApplicationState, action: PayloadAction<boolean>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.finishGameAutomatically = action.payload;
            return newState;
        }
    }
});

export const reducer = applicationSlice.reducer;
export const {
    allowedToSeeTestingRouteAction,
    applyNewCardBackAction,
    applyNewBackgroundColor,
    applyFinishGameAutomatically
} = applicationSlice.actions;

export const areWeAllowedToSeeTestingRouteSelector = (state: RootState): boolean => state.applicationReducer.allowedToSeeTestingRoute;
export const currentlySelectedCardBackSelector = (state: RootState): string => state.applicationReducer.cardBack;
export const currentlySelectedBackgroundSelector = (state: RootState): string => state.applicationReducer.background;
export const shouldTheGameBeFinishedAutomaticallySelector = (state: RootState): boolean => state.applicationReducer.finishGameAutomatically;