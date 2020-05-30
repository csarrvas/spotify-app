import React from 'react';
import { shallow } from 'enzyme';
import Error404 from '../../pages/Error404';

test('should render Error404 correctly', () => {
  const wrapper = shallow(<Error404/>);
  expect(wrapper).toMatchSnapshot();
});