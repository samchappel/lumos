export const setLocationData = (locationId, locationData) => ({
  type: 'SET_LOCATION_DATA',
  payload: { locationId, locationData },
});

  export const setUserLoggedIn = (isLoggedIn) => ({
    type: 'SET_USER_LOGGED_IN',
    payload: isLoggedIn,
  });

  export const setLocations = (locations) => {
    return {
      type: 'SET_LOCATIONS',
      payload: locations,
    };
  };

  export const updateFavoriteStatus = (locationId, isFavorite) => {
    return {
      type: 'UPDATE_FAVORITE_STATUS',
      payload: { locationId, isFavorite },
    };
  };

  export const setFavorites = (favorites) => {
    return {
      type: 'SET_FAVORITES',
      payload: favorites,
    };
  };