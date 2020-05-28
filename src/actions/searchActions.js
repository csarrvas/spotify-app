import {
  MAKE_SEARCH_REQUEST,
  MAKE_SEARCH_SUCCESS,
  MAKE_SEARCH_ERROR
} from './types';

import { searchAlbums } from '../apis/spotify';

export const searchAlbumsAction = searchedWord => async dispatch => {
  dispatch({
    type: MAKE_SEARCH_REQUEST,
  });
  searchAlbums(searchedWord)
  .then(response => {
    if (response.data) {
      dispatch({
        type: MAKE_SEARCH_SUCCESS,
        payload: {
          data: response.data
        }
      });
      
    } else {
      dispatch({
        type: MAKE_SEARCH_ERROR
      });
    }
  })
  .catch(() => {
    dispatch({
      type: MAKE_SEARCH_ERROR
    });
  });
}