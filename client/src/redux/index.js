import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {persistStore} from 'redux-persist'
import {rootReducer} from './reducers/index'


const initialState = {}

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

let persist = persistStore(store);

export {store, persist}