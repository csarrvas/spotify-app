import {
  FETCH_ARTIST_REQUEST,
  FETCH_ARTIST_SUCCESS,
  FETCH_ARTIST_ERROR
} from './types';

import { requestArtistDetail } from '../apis/spotify';

export const requestArtistDetailAction = artistId => async dispatch => {
  dispatch({
    type: FETCH_ARTIST_REQUEST,
  });
  requestArtistDetail(artistId)
  .then(response => {
    if (response.data) {
      dispatch({
        type: FETCH_ARTIST_SUCCESS,
        payload: {
          album: response.data
        }
      });
      
    } else {
      dispatch({
        type: FETCH_ARTIST_ERROR
      });
    }
  })
  .catch(() => {
    dispatch({
      type: FETCH_ARTIST_ERROR
    });
  });
}