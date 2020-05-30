import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { searchAlbumsAction } from '../../actions/searchActions';
import { startSessionAction, closeSessionAction } from '../../actions/authenticationActions';
import { generateRandomString } from '../../helpers/helpers';
import swal from 'sweetalert';
import './header.scss';

const Header = ({ session, userName, errorMessage, searchAlbums, startSession, closeSession }) => {
  const [ searchedWord, setSearchedWord ] = useState('');

  useEffect(() => {
    if ((!session && window.location.hash) || (!session && localStorage.getItem('spotify-token'))) {
      if (window.location.hash) {
        const response = window.location.hash.slice(1).split('&');
        const data = {};
        response.forEach(item => {
          const keyAndValue = item.split('=');
          data[keyAndValue[0]] = keyAndValue[1];
        });
        if (data.access_token && data.state && localStorage.getItem('spotify-state') === data.state) {
          localStorage.removeItem('spotify-state');
          swal("Nice!", "Session started successfully", "success");
          startSession(data.access_token);
        } else {
          swal("Oops!", "Your state code is not the same, try again", "warning");
        }
      } else {
        if (errorMessage) {
          swal("Oops!", "Your session has expired, please login again", "error");
          localStorage.removeItem('spotify-token');
        } else {
          swal("Nice!", "You are already logged in", "success");
          startSession(localStorage.getItem('spotify-token'));
        }
      }
    }
  });

  const makeASearch = e => {
    e.preventDefault();
    if (session) {
      if (searchedWord.toLowerCase().trim()) {
        searchAlbums(searchedWord, 1);
        setSearchedWord('');
      } else {
        swal("Oops!", "Type something to start the search", "warning");
      }
    } else {
      swal("Wait!", "You have to be logged in to continue", "warning");
    }
  }

  const onInputChange = e => {
    setSearchedWord(e.target.value);
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
    const REDIRECT_URI = window.location.origin.replace(/:/g, '%3A').replace(/\//g, '%2F').replace(/\./g, '%2E');
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
          <Link to="/profile"><button>{userName}</button></Link>
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
          <img alt="logo" src="/images/app-logo.png"/>
        </Link>
      </figure>
      <div id="make-a-search">
        <form onSubmit={makeASearch}>
          <input
            onChange={onInputChange}
            type="text"
            placeholder="Search for an album"
            value={searchedWord}
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
    searchAlbums: (searchedWord, actualPage) => dispatch(searchAlbumsAction(searchedWord, actualPage)),
    startSession: token => dispatch(startSessionAction(token)),
    closeSession: () => dispatch(closeSessionAction())
  }
}

const mapStateToProps = state =>{
  return {
    session: state.session,
    userName: state.userProfile.data.display_name,
    errorMessage: state.userProfile.errorMessage
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Header);