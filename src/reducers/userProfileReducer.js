import {
  START_SESSION_REQUEST,
  START_SESSION_SUCCESS,
  START_SESSION_ERROR,
  CLOSE_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_SESSION_REQUEST:
      return { ...state, loading: true, error: false };
    
    case START_SESSION_SUCCESS:
      return { ...state, data: action.payload.data, loading: false, error: false };
    
    case START_SESSION_ERROR:
      return { ...state, loading: false, error: true };
    
    case CLOSE_SESSION:
      return INITIAL_STATE;

    default:
      return state;
  }
}