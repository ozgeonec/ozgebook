import cellReducer from "./cellReducer";
import {combineReducers} from "redux";
import bundlesReducer from "./bundlesReducer";

const reducers = combineReducers({
    cells: cellReducer,
    bundles: bundlesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;