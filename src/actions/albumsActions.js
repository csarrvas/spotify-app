import {
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_ERROR
} from './types';

import { requestAlbumDetail } from '../apis/spotify';

export const requestAlbumDetailAction = albumId => async dispatch => {
  dispatch({
    type: FETCH_ALBUM_REQUEST,
  });
  requestAlbumDetail(albumId)
  .then(response => {
    if (response.status === 200) {
      dispatch({
        type: FETCH_ALBUM_SUCCESS,
        payload: {
          album: response.data
        }
      });
      
    } else {
      dispatch({
        type: FETCH_ALBUM_ERROR,
        payload: {
          error: `${response.status} ${response.statusText}`
        }
      });
    }
  })
  .catch(() => {
    dispatch({
      type: FETCH_ALBUM_ERROR,
      payload: {
        error: `There is a problem with the data`
      }
    });
  });
}