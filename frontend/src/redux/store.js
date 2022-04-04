import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
    
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk))
    );
    export default store;