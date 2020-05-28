import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { searchAlbumsAction } from '../../actions/searchActions';
import { closeSessionAction } from '../../actions/authenticationActions';
import { generateRandomString } from '../../helpers/helpers';
import swal from 'sweetalert';
import './header.scss';

import logo from '../../assets/images/app-logo.png';

const Header = ({ session, searchAlbums, closeSession }) => {
  const [ searchedWord, setSearchedWord ] = useState('');

  const makeASearch = e => {
    e.preventDefault();
    console.log(searchedWord);
    if (session) {
      if (searchedWord) {
        searchAlbums(searchedWord);
      } else {
        swal("Oops!", "Type something to start the search", "warning");
      }
    } else {
      swal("Wait!", "You have to be logged in to continue", "warning");
    }
  }

  const onInputChange = e => {
    setSearchedWord(e.target.value.toLowerCase().trim());
  }

  const logout = () => {
    swal({
      title: "Are you sure?",
      text: "Your session will be closed",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        closeSession();
        swal("Your session was closed", {
          icon: "success",
        });
      }
    });
  }

  const login = () => {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = window.location.origin.replace(/:/g, '%3A').replace(/\//g, '%2F');
    const STATE = generateRandomString(16);
    localStorage.setItem('spotify-state', STATE);

    const URL = `https://accounts.spotify.com/authorize?
      client_id=${CLIENT_ID}&
      redirect_uri=${REDIRECT_URI}%2F&
      scope=user-read-private%20user-read-email&
      response_type=token&state=${STATE}`.replace(/ /g, '');
    
    window.location.href = URL;
  }

  const displayButtons = () => {
    if (session) {
      return (
        <Fragment>
          <Link to="/profile"><button>Profile</button></Link>
          <Link to="#"><button onClick={logout}>Logout</button></Link>
        </Fragment>
      );
    } else {
      return (
        <Link to="#"><button onClick={login}>Login</button></Link>
      );
    }
  }

  return (
    <header>
      <figure>
        <Link to="/">
          <img alt="logo" src={logo}/>
        </Link>
      </figure>
      <div id="make-a-search">
        <form onSubmit={makeASearch}>
          <input
            onChange={onInputChange}
            type="text"
            placeholder="Search for an album"
          />
        </form>
      </div>
      <div id="user-actions">
        {displayButtons()}
      </div>
    </header>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    searchAlbums: searchedWord => dispatch(searchAlbumsAction(searchedWord)),
    closeSession: () => dispatch(closeSessionAction())
  }
}

const mapStateToProps = state =>{
  return {
    session: state.session
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header);