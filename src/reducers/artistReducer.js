import {
  FETCH_ARTIST_REQUEST,
  FETCH_ARTIST_SUCCESS,
  FETCH_ARTIST_ERROR,
  CLOSE_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false,
  errorMessage: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARTIST_REQUEST:
      return { ...state, loading: true, error: false, errorMessage: '' };
    
    case FETCH_ARTIST_SUCCESS:
      return { ...state, data: action.payload.artist, loading: false, error: false };
    
    case FETCH_ARTIST_ERROR:
      return { ...state, loading: false, error: true, errorMessage: action.payload.error };

    case CLOSE_SESSION:
      return INITIAL_STATE;
    
    default:
      return state;
  }
}