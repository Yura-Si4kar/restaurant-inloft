import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers/reducer";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(
    thunk,
        createLogger({
           collapsed: true, 
        })
    )
);

export default store;