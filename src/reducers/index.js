import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import searchReducer from './searchReducer';
import albumReducer from './albumReducer';
import artistReducer from './artistReducer';
import userProfileReducer from './userProfileReducer';

export default combineReducers({
  session: sessionReducer,
  search: searchReducer,
  album: albumReducer,
  artist: artistReducer,
  userProfile: userProfileReducer
});