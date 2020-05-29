import {
  MAKE_SEARCH_REQUEST,
  MAKE_SEARCH_SUCCESS,
  MAKE_SEARCH_ERROR,
  CLOSE_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  data: {},
  searchedWord: '',
  actualPage: 0,
  loading: false,
  error: false,
  errorMessage: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAKE_SEARCH_REQUEST:
      return {
        ...state,
        searchedWord: action.payload.searchedWord,
        actualPage: action.payload.actualPage,
        loading: true,
        error: false,
        errorMessage: '' };
    
    case MAKE_SEARCH_SUCCESS:
      return { ...state, data: action.payload.data, loading: false, error: false };
    
    case MAKE_SEARCH_ERROR:
      return { ...INITIAL_STATE, error: true, errorMessage: action.payload.error };
    
    case CLOSE_SESSION:
      return INITIAL_STATE;

    default:
      return state;
  }
}