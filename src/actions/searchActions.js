import {
  MAKE_SEARCH_REQUEST,
  MAKE_SEARCH_SUCCESS,
  MAKE_SEARCH_ERROR
} from './types';

import { searchAlbums } from '../apis/spotify';

export const searchAlbumsAction = (searchedWord, actualPage) => async dispatch => {
  dispatch({
    type: MAKE_SEARCH_REQUEST,
    payload: {
      searchedWord,
      actualPage
    }
  });
  searchAlbums(searchedWord, actualPage)
  .then(response => {
    if (response.status === 200) {
      dispatch({
        type: MAKE_SEARCH_SUCCESS,
        payload: {
          data: response.data
        }
      });
    } else {
      dispatch({
        type: MAKE_SEARCH_ERROR,
        payload: {
          error: `${response.status} ${response.statusText}`
        }
      });
    }
  })
  .catch(() => {
    dispatch({
      type: MAKE_SEARCH_ERROR,
      payload: {
        error: `There is a problem with the data`
      }
    });
  });
}