const initialState = {
    locationData: {},
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOCATION_DATA':
        return {
          ...state,
          locationData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;