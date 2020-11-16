import { combineReducers } from 'redux';
import adjustmentsReducer from '../reducers/adjustments';

const rootReducer = combineReducers({
    adjustments: adjustmentsReducer,
});

export default rootReducer;
