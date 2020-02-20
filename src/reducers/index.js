import { combineReducers } from 'redux';
import { flightSchedules, citites } from './reducer';

export default combineReducers({
    flightSchedules,
    citites,
});