import React from 'react';
import { shallow } from 'enzyme';
import ArtistCard from '../../../components/artistCard/ArtistCard';
import { artist } from '../../fixtures/data';

test('should render ArtistCard correctly', () => {
  const wrapper = shallow(<ArtistCard artist={artist}/>);
  expect(wrapper).toMatchSnapshot();
});