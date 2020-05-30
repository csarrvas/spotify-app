import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addCommas } from '../helpers/helpers';
import Spinner from '../components/Spinner';

const Profile = ({ session, userProfile, searchedWord, loading, error, errorMessage }) => {
  const prevSearchedWordRef = useRef();

  useEffect(() => {
    prevSearchedWordRef.current = searchedWord;
  }, [searchedWord]);

  const prevSearchedWord = prevSearchedWordRef.current;

  if (!session) {
    return <Redirect to="/"/>
  }

  const displayContent = () => {
    if (error) {
      return <div className="error"><p>{errorMessage}</p></div>
    } else if (loading) {
      return <Spinner/>
    } else if (userProfile.id) {
      return (
        <Fragment>
          <figure>
            <img alt={`album ${userProfile.name}`} src={userProfile.images['0'].url}/>
          </figure>
          <div>
            <p><span>Name: </span>{userProfile.display_name}</p>
          </div>
          <div>
            <p><span>Country: </span>{userProfile.country}</p>
          </div>
          <div>
            <p><span>Email: </span>{userProfile.email}</p>
          </div>
          <div>
            <p><span>Username: </span>{userProfile.id}</p>
          </div>
          <div>
            <p><span>Followers: </span>{addCommas(userProfile.followers.total)}</p>
          </div>
          <div>
            <a target="_blank" rel="noopener noreferrer" href={userProfile.external_urls.spotify}>
              <i className="fas fa-play-circle">Go to my profile on spotify</i>
            </a>
          </div>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      {(prevSearchedWord !== undefined) && (prevSearchedWord !== searchedWord)
        ? <Redirect to="/albums"/>
        : <div id="user-profile">
            {displayContent()}
          </div>
      }
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    session: state.session,
    userProfile: state.userProfile.data,
    searchedWord: state.search.searchedWord,
    loading: state.userProfile.loading,
    error: state.userProfile.error,
    errorMessage: state.userProfile.errorMessage
  }
}

export default connect(mapStateToProps)(Profile);