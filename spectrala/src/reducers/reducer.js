import { combineReducers } from 'redux';
import adjustmentsReducer from './adjustments';
import calibrationReducer from './calibration/calibration';
import videoReducer from './video';

const rootReducer = combineReducers({
    adjustments: adjustmentsReducer,
    calibration: calibrationReducer,
    video: videoReducer,
});

export default rootReducer;
