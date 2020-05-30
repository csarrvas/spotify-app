import { closeSessionAction } from '../../actions/authenticationActions';
import { CLOSE_SESSION } from '../../actions/types';

test('should search albums action', () => {
  const action = closeSessionAction();
  expect(action).toEqual({
    type: CLOSE_SESSION
  });
});