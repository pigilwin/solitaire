import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationState } from "types/application";
import { RootState } from "../rootReducer";
import { deepCopy } from "../util";
import { localStorageKey } from "./constants";

export const initialState: ApplicationState =  {
    allowedToSeeTestingRoute: false
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
            if (action.payload) {
                localStorage.setItem(localStorageKey, 'YES');
            }

            return newState;
        }
    }
});

export const reducer = applicationSlice.reducer;
export const {
    allowedToSeeTestingRouteAction
} = applicationSlice.actions;

export const areWeAllowedToSeeTestingRouteSelector = (state: RootState): boolean => state.applicationReducer.allowedToSeeTestingRoute;