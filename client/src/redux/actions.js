export const setLocationData = (locationData) => ({
    type: 'SET_LOCATION_DATA',
    payload: locationData,
  });

  export const setUserLoggedIn = (isLoggedIn) => ({
    type: 'SET_USER_LOGGED_IN',
    payload: isLoggedIn,
  });