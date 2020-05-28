import {
  START_SESSION_REQUEST,
  START_SESSION_SUCCESS,
  START_SESSION_ERROR,
  CLOSE_SESSION
} from './types';

import { userDetail } from '../apis/spotify';

export const startSessionAction = token => async dispatch => {
  localStorage.setItem('spotify-token', token);
  dispatch({
    type: START_SESSION_REQUEST,
  });
  userDetail()
  .then(response => {
    if (response.data) {
      dispatch({
        type: START_SESSION_SUCCESS,
        payload: {
          data: response.data
        }
      });
      
    } else {
      dispatch({
        type: START_SESSION_ERROR
      });
    }
  })
  .catch(() => {
    dispatch({
      type: START_SESSION_ERROR
    });
  });
}

export const closeSessionAction = () => {
  localStorage.removeItem('spotify-token');
  return {
    type: CLOSE_SESSION
  }
}