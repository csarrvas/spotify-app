import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SiteRoute from './SiteRoute';
import Home from './pages/Home';
import Login from './pages/user/Login';
import Albums from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';
import ArtistDetail from './pages/ArtistDetail';
import Profile from './pages/user/Profile';
import Error404 from './pages/Error404';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <SiteRoute exact path='/' component={Home} />
        <SiteRoute exact path='/login' component={Login} />
        <SiteRoute exact path='/albums' component={Albums} />
        <SiteRoute exact path='/albums/:albumId' component={AlbumDetail} />
        <SiteRoute exact path='/artist/:artistId' component={ArtistDetail} />
        <SiteRoute exact path='/profile' component={Profile} />
        <SiteRoute component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;