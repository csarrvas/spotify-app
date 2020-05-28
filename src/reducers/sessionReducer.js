import { START_SESSION, CLOSE_SESSION } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case START_SESSION:
      return true;
    
    case CLOSE_SESSION:
      return false;
      
    default:
      return state;
  }
}