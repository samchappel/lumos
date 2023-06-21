import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import persistConfig from './persistConfig';

const initialState = {
  locationData: {},
  isLoggedIn: false,
};

const locationReducer = (state = initialState.locationData, action) => {
  switch (action.type) {
    case 'SET_LOCATION_DATA':
      return action.payload;
    default:
      return state;
  }
};

const isLoggedInReducer = (state = initialState.isLoggedIn, action) => {
  switch (action.type) {
    case 'SET_USER_LOGGED_IN':
      return action.payload;
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  locationData: locationReducer,
  isLoggedIn: isLoggedInReducer,
});

export default persistReducer(persistConfig, rootReducer);