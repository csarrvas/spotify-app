import {
  MAKE_SEARCH_REQUEST,
  MAKE_SEARCH_SUCCESS,
  MAKE_SEARCH_ERROR,
  CLOSE_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAKE_SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    
    case MAKE_SEARCH_SUCCESS:
      return { ...state, data: action.payload.data, loading: false, error: false };
    
    case MAKE_SEARCH_ERROR:
      return { ...state, loading: false, error: true };
    
    case CLOSE_SESSION:
      return INITIAL_STATE;

    default:
      return state;
  }
}