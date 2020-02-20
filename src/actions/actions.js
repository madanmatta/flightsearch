
export const GET_FLIGHT_SCHEDULES = 'flight_schedules';

export const GET_CITIES = 'get_cities';

/**
 * returns the get flights action
 * @param {*} payload - selected source & destinations
 */
export const getSchedules = payload => ({
    type: GET_FLIGHT_SCHEDULES,
    payload,
});


/**
 * returns the get cities action
 */
export const getCities = () => ({
    type: GET_CITIES
});
