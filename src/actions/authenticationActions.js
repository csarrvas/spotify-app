import { START_SESSION, CLOSE_SESSION } from './types';

export const startSessionAction = () => {
  return {
    type: START_SESSION
  }
}

export const closeSessionAction = () => {
  localStorage.removeItem('spotify-token');
  return {
    type: CLOSE_SESSION
  }
}