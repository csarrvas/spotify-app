import {
  FETCH_ARTIST_REQUEST,
  FETCH_ARTIST_SUCCESS,
  FETCH_ARTIST_ERROR,
  FETCH_ARTIST_TOP_TRACKS_REQUEST,
  FETCH_ARTIST_TOP_TRACKS_SUCCESS,
  FETCH_ARTIST_TOP_TRACKS_ERROR,
  FETCH_ARTIST_RELATED_ARTISTS_REQUEST,
  FETCH_ARTIST_RELATED_ARTISTS_SUCCESS,
  FETCH_ARTIST_RELATED_ARTISTS_ERROR
} from './types';

import {
  requestArtistDetail,
  requestArtistTopTracks,
  requestArtistRelatedArtists } from '../apis/spotify';

export const requestArtistDetailAction = artistId => async dispatch => {
  dispatch({
    type: FETCH_ARTIST_REQUEST,
  });
  requestArtistDetail(artistId)
  .then(response => {
    if (response.status === 200) {
      dispatch({
        type: FETCH_ARTIST_SUCCESS,
        payload: {
          artist: response.data
        }
      });
      
    } else {
      dispatch({
        type: FETCH_ARTIST_ERROR,
        payload: {
          error: `${response.status} ${response.statusText}`
        }
      });
    }
  })
  .catch(() => {
    dispatch({
      type: FETCH_ARTIST_ERROR,
      payload: {
        error: `There is a problem with the data`
      }
    });
  });
}

export const requestArtistTopTracksAction = artistId => async dispatch => {
  dispatch({
    type: FETCH_ARTIST_TOP_TRACKS_REQUEST,
  });
  requestArtistTopTracks(artistId)
  .then(response => {
    if (response.status === 200) {
      dispatch({
        type: FETCH_ARTIST_TOP_TRACKS_SUCCESS,
        payload: {
          topTracks: response.data
        }
      });
      
    } else {
      dispatch({
        type: FETCH_ARTIST_TOP_TRACKS_ERROR,
        payload: {
          error: `${response.status} ${response.statusText}`
        }
      });
    }
  })
  .catch(() => {
    dispatch({
      type: FETCH_ARTIST_TOP_TRACKS_ERROR,
      payload: {
        error: `There is a problem with the data`
      }
    });
  });
}

export const requestArtistRelatedArtistsAction = artistId => async dispatch => {
  dispatch({
    type: FETCH_ARTIST_RELATED_ARTISTS_REQUEST,
  });
  requestArtistRelatedArtists(artistId)
  .then(response => {
    if (response.status === 200) {
      dispatch({
        type: FETCH_ARTIST_RELATED_ARTISTS_SUCCESS,
        payload: {
          relatedArtists: response.data
        }
      });
      
    } else {
      dispatch({
        type: FETCH_ARTIST_RELATED_ARTISTS_ERROR,
        payload: {
          error: `${response.status} ${response.statusText}`
        }
      });
    }
  })
  .catch(() => {
    dispatch({
      type: FETCH_ARTIST_RELATED_ARTISTS_ERROR,
      payload: {
        error: `There is a problem with the data`
      }
    });
  });
}