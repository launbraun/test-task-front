import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import productReducer from "./product-reducer";


let reducers = combineReducers({
    products: productReducer,

});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;
