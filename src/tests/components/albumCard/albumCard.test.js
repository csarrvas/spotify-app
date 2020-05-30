import React from 'react';
import { shallow } from 'enzyme';
import AlbumCard from '../../../components/albumCard/AlbumCard';
import { album } from '../../fixtures/data';

test('should render AlbumCard correctly', () => {
  const wrapper = shallow(<AlbumCard album={album}/>);
  expect(wrapper).toMatchSnapshot();
});