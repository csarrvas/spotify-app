import {
  FETCH_ALBUM_REQUEST,
  FETCH_ALBUM_SUCCESS,
  FETCH_ALBUM_ERROR,
  CLOSE_SESSION
} from '../../actions/types';
import { album } from '../fixtures/data';
import albumReducer from '../../reducers/albumReducer';

const INITIAL_STATE = {
  data: {},
  loading: false,
  error: false,
  errorMessage: ''
}

test('should update state album to loading reducer', () => {
  const action = {
    type: FETCH_ALBUM_REQUEST
  }
  const reducer = albumReducer(INITIAL_STATE, action);
  expect(reducer).toEqual({
    ...INITIAL_STATE, loading: true
  });
});

test('should update state album to error reducer', () => {
  const action = {
    type: FETCH_ALBUM_ERROR,
    payload: { error: 'Something' }
  }
  const reducer = albumReducer(INITIAL_STATE, action);
  expect(reducer).toEqual({
    ...INITIAL_STATE, error: true, errorMessage: action.payload.error
  });
});

test('should update state album to success reducer', () => {
  const action = {
    type: FETCH_ALBUM_SUCCESS,
    payload: { album }
  }
  const reducer = albumReducer(INITIAL_STATE, action);
  expect(reducer).toEqual({
    ...INITIAL_STATE, data: action.payload.album
  });
});

test('should update state album to init state reducer', () => {
  const action = {
    type: CLOSE_SESSION
  }
  const reducer = albumReducer(INITIAL_STATE, action);
  expect(reducer).toEqual({
    ...INITIAL_STATE
  });
});

test('should not do anything to state album', () => {
  const action = {
    type: 'ANOTHER ACTION'
  }
  const reducer = albumReducer(INITIAL_STATE, action);
  expect(reducer).toEqual({
    ...INITIAL_STATE
  });
});