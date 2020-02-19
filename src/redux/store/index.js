import {createStore} from 'redux'
import myReducer from '../reducers'
import devToolsEnhancer from 'remote-redux-devtools';
export default createStore(myReducer, devToolsEnhancer())