import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deepCopy } from "../util";
import { ApplicationState } from "./type";

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
            return newState;
        }
    }
});

export const reducer = applicationSlice.reducer;
export const {
    allowedToSeeTestingRouteAction
} = applicationSlice.actions;