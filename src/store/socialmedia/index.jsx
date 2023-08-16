import { combineReducers } from "@reduxjs/toolkit";
import facebook from "./facebookSlice";

const reducer = combineReducers({
	facebook,
});

export default reducer;
