import {
  FETCH_ARTIST_REQUEST,
  FETCH_ARTIST_SUCCESS,
  FETCH_ARTIST_ERROR,
  FETCH_ARTIST_TOP_TRACKS_REQUEST,
  FETCH_ARTIST_TOP_TRACKS_SUCCESS,
  FETCH_ARTIST_TOP_TRACKS_ERROR,
  FETCH_ARTIST_RELATED_ARTISTS_REQUEST,
  FETCH_ARTIST_RELATED_ARTISTS_SUCCESS,
  FETCH_ARTIST_RELATED_ARTISTS_ERROR,
  CLOSE_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  artist: {},
  topTracks: {},
  relatedArtists: {},
  loading: false,
  error: false,
  errorMessage: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ARTIST_REQUEST:
    case FETCH_ARTIST_TOP_TRACKS_REQUEST:
    case FETCH_ARTIST_RELATED_ARTISTS_REQUEST:
      return { ...state, loading: true, error: false, errorMessage: '' };
    
    case FETCH_ARTIST_SUCCESS:
      return { ...state, artist: action.payload.artist, loading: false, error: false };

    case FETCH_ARTIST_TOP_TRACKS_SUCCESS:
      return { ...state, topTracks: action.payload.topTracks, loading: false, error: false };
    
    case FETCH_ARTIST_RELATED_ARTISTS_SUCCESS:
      return { ...state, relatedArtists: action.payload.relatedArtists, loading: false, error: false };
    
    case FETCH_ARTIST_ERROR:
    case FETCH_ARTIST_TOP_TRACKS_ERROR:
    case FETCH_ARTIST_RELATED_ARTISTS_ERROR:
      return { ...state, loading: false, error: true, errorMessage: action.payload.error };

    case CLOSE_SESSION:
      return INITIAL_STATE;
    
    default:
      return state;
  }
}