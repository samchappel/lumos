import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import persistConfig from './persistConfig';

const initialState = {
  locationData: {
    city: '',
    state: ''
  },
  isLoggedIn: false,
  favorites: [],
  user: {
    first_name: '',
  },
};

const locationReducer = (state = initialState.locationData, action) => {
  switch (action.type) {
    case 'SET_LOCATION_DATA':
      return {
        ...state,
        city: action.payload.city,
        state: action.payload.state
      };
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

const favoritesReducer = (state = initialState.favorites, action) => {
  switch (action.type) {
    case 'UPDATE_FAVORITE_STATUS':
      const { locationId, isFavorite } = action.payload;
      if (isFavorite) {
        return [...state, { id: locationId, isFavorite }];
      } else {
        return state.filter(location => location.id !== locationId);
      }
    case 'SET_FAVORITES':
      return action.payload;
    default:
      return state;
  }
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  locationData: locationReducer,
  isLoggedIn: isLoggedInReducer,
  favorites: favoritesReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);