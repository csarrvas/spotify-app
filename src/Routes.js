import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SiteRoute from './SiteRoute';
import Home from './pages/Home';
import Albums from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';
import ArtistDetail from './pages/ArtistDetail';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <SiteRoute exact path='/' component={Home} />
        <SiteRoute exact path='/albums' component={Albums} />
        <SiteRoute path='/albums/:albumId' component={AlbumDetail} />
        <SiteRoute path='/artist/:artistId' component={ArtistDetail} />
        <SiteRoute path='/profile' component={Profile} />
        <SiteRoute component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;