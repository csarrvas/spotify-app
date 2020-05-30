import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { requestAlbumDetailAction } from '../actions/albumsActions';
import { Link, Redirect } from 'react-router-dom';
import TrackCard from '../components/trackCard/TrackCard';
import Spinner from '../components/Spinner';
import './styles/albumDetail.scss';

const AlbumDetail = ({ match, session, album, searchedWord, loading, error, errorMessage, requestAlbumDetail }) => {
  const prevSearchedWordRef = useRef();

  useEffect(() => {
    prevSearchedWordRef.current = searchedWord;
    requestAlbumDetail(match.params.albumId);
  }, [match.params.albumId, requestAlbumDetail, searchedWord]);

  const prevSearchedWord = prevSearchedWordRef.current;

  if (!session) {
    return <Redirect to="/"/>
  }

  const displayContent = () => {
    if (error) {
      return <div className="error"><p>{errorMessage}</p></div>
    } else if (loading) {
      return <Spinner/>
    } else if (album.id) {
      return (
        <Fragment>
          <div>
            {album.artists.length === 0
              ? <p>No artist found for this album</p>
              : <p>{(album.artists.reduce((all, artist) => all + artist.name + ', ', '')).slice(0, -2)}</p>
            }
          </div>
          <figure>
            <img alt={`album ${album.name}`} src={album.images['0'].url}/>
          </figure>
          <div>
            <p>{album.name}</p>
          </div>
          <div>
            <a target="_blank" rel="noopener noreferrer" href={album.external_urls.spotify}>
              <i className="fas fa-play-circle"> Go to this album on spotify</i>
            </a>
          </div>
          <div>
            {album.genres.length === 0
              ? <p>No genres found for this album</p>
              : <Fragment>
                  <p className="title">{album.genres.length > 1 ? 'Genres' : 'Genre'}</p>
                  <p>{(album.genres.reduce((all, genre) => all + genre + ', ', '')).slice(0, -2)}</p>
                </Fragment>
            }
          </div>
          <div id="tracks">
            {album.tracks.items.length === 0
              ? <div className="error"><p>No tracks found</p></div>
              : album.tracks.items.map(track => (
                <TrackCard key={track.id} track={track} />
              ))
            }
          </div>
          <div>
            {album.artists.length === 0
              ? null
              : <Fragment>
                  {album.artists.map(artist =>
                    <Link key={artist.id} to={`/artist/${artist.id}`}>
                      <button>{`More about ${artist.name}`}</button>
                    </Link>
                  )}
                </Fragment>
            }
          </div>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      {(prevSearchedWord !== undefined) && (prevSearchedWord !== searchedWord)
        ? <Redirect to="/albums"/>
        : <div id="album-detail">
            {displayContent()}
          </div>
      }
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    requestAlbumDetail: albumId => dispatch(requestAlbumDetailAction(albumId))
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    album: state.album.data,
    searchedWord: state.search.searchedWord,
    loading: state.album.loading,
    error: state.album.error,
    errorMessage: state.album.errorMessage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);