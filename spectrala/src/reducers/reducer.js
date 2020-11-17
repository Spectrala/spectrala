import { combineReducers } from 'redux';
import adjustmentsReducer from '../reducers/adjustments';
import calibrationReducer from '../reducers/calibration/calibration';
const rootReducer = combineReducers({
    adjustments: adjustmentsReducer,
    calibration: calibrationReducer,
});

export default rootReducer;
