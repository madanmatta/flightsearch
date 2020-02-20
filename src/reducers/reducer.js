
import * as actions from "../actions/actions";
import * as schedules from '../data/schedules.json';
import * as cities from '../data/cities.json';

/**
 * returns the array of flight details by providing the source & dest
 * @param {*} state - array of flight details
 * @param {*} action - unique action
 */
export const flightSchedules = (state = [], action) => {
    switch (action.type) {
        case actions.GET_FLIGHT_SCHEDULES:
            return filterSchedules(schedules.values, action.payload);
        default:
            return state;
    }
}

/**
 * returns the list of cities
 * @param {*} state - array
 * @param {*} action - action object
 */
export const citites = (state= [], action) => {
    switch (action.type) {
        case actions.GET_CITIES:            
            return cities.values;    
        default:
            return state;
    }
}

/**
 * returns filtered schedules from whole list schedules 
 * @param {*} schedules - all schedules
 * @param {*} payload - source & dest object
 */
const filterSchedules = (schedules, payload) => {
    return schedules.filter(i =>
        (i.Src === payload.source && i.Dest === payload.destination));
}
