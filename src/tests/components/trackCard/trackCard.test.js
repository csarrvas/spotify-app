import React from 'react';
import { shallow } from 'enzyme';
import TrackCard from '../../../components/trackCard/TrackCard';
import { track } from '../../fixtures/data';

test('should render TrackCard correctly', () => {
  const wrapper = shallow(<TrackCard track={track}/>);
  expect(wrapper).toMatchSnapshot();
});