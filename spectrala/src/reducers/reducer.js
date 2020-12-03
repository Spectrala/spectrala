import { combineReducers } from 'redux';
import adjustmentsReducer from './adjustments';
import calibrationReducer from './calibration/calibration';
import videoReducer from './video';
import spectrumReducer from './reference_spectrum';
import resultantSpectrumReducer from './resultant_spectrum'
const rootReducer = combineReducers({
    adjustments: adjustmentsReducer,
    calibration: calibrationReducer,
    video: videoReducer,
    reference: spectrumReducer,
    resultant: resultantSpectrumReducer,
});

export default rootReducer;
