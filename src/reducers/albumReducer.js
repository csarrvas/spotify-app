import {
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_ERROR,
  CLOSE_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALBUM_REQUEST:
      return { ...state, loading: true, error: false };
    
    case FETCH_ALBUM_SUCCESS:
      return { ...state, data: action.payload.album, loading: false, error: false };
    
    case FETCH_ALBUM_ERROR:
      return { ...state, loading: false, error: true };

    case CLOSE_SESSION:
      return INITIAL_STATE;
    
    default:
      return state;
  }
}