import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from "types/application";
import { CARD_BACK_GREEN } from "types/back";
import { RootState } from "../rootReducer";
import { deepCopy } from "lib/deepCopy";
import { localStorageKey } from "./constants";

export const initialState: ApplicationState =  {
    allowedToSeeTestingRoute: false,
    cardBack: CARD_BACK_GREEN
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
        }
    }
});

export const reducer = applicationSlice.reducer;
export const {
    allowedToSeeTestingRouteAction,
    applyNewCardBackAction
} = applicationSlice.actions;

export const areWeAllowedToSeeTestingRouteSelector = (state: RootState): boolean => state.applicationReducer.allowedToSeeTestingRoute;
export const currentlySelectedCardBackSelector = (state: RootState): string => state.applicationReducer.cardBack;