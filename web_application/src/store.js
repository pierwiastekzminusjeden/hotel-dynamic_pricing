import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import index from './reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  index,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
    ['Use Redux']
);

export default store;