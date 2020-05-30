import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import {
  requestArtistDetailAction,
  requestArtistTopTracksAction,
  requestArtistRelatedArtistsAction } from '../actions/artistsActions';
import { Redirect } from 'react-router-dom';
import TrackCard from '../components/trackCard/TrackCard';
import ArtistCard from '../components/artistCard/ArtistCard';
import { addCommas } from '../helpers/helpers';
import Spinner from '../components/Spinner';
import './styles/artistDetail.scss';

const ArtistDetail = ({
  match,
  session,
  artist,
  topTracks,
  relatedArtists,
  searchedWord,
  loading,
  error,
  errorMessage,
  requestArtistDetail,
  requestArtistTopTracks,
  requestArtistRelatedArtists }) => {
  const prevSearchedWordRef = useRef();

  useEffect(() => {
    prevSearchedWordRef.current = searchedWord;
    requestArtistDetail(match.params.artistId);
    requestArtistTopTracks(match.params.artistId);
    requestArtistRelatedArtists(match.params.artistId);
  }, [match.params.artistId, requestArtistDetail, requestArtistTopTracks, requestArtistRelatedArtists, searchedWord]);

  const prevSearchedWord = prevSearchedWordRef.current;

  if (!session) {
    return <Redirect to="/"/>
  }

  const displayContent = () => {
    if (error) {
      return <div className="error"><p>{errorMessage}</p></div>
    } else if (loading) {
      return <Spinner/>
    } else if (artist.id && typeof topTracks !== 'undefined' && typeof relatedArtists !== 'undefined') {
      return (
        <Fragment>
          <div>
            <p>{artist.name}</p>
          </div>
          <figure>
            <img alt={`album ${artist.name}`} src={artist.images['0'].url}/>
          </figure>
          <div>
            <a target="_blank" rel="noopener noreferrer" href={artist.external_urls.spotify}>
              <i className="fas fa-play-circle"> Go to this artist on spotify</i>
            </a>
          </div>
          {artist.genres.length > 0
            ? <div>
                <p>{`Genres: ${(artist.genres.reduce((all, genre) => all + genre + ', ', '')).slice(0, -2)}`}</p>
              </div>
            : null
          }
          <div>
            <p>{`Followers: ${addCommas(artist.followers.total)}`}</p>
          </div>
          <div id="top-tracks">
            <p>Top Tracks:</p>
            {topTracks.map((track, i) =>
              <TrackCard track={track} fromAlbum={false} topNumber={i+1} key={track.id} />
            )}
          </div>
          <div id="artists-related">
            <p>Artists Related:</p>
              {relatedArtists.map(artist =>
                <ArtistCard artist={artist} key={artist.id} />
              )}
          </div>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      {(prevSearchedWord !== undefined) && (prevSearchedWord !== searchedWord)
        ? <Redirect to="/albums"/>
        : <div id="artist-detail">
            {displayContent()}
          </div>
      }
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    requestArtistDetail: artistId => dispatch(requestArtistDetailAction(artistId)),
    requestArtistTopTracks: artistId => dispatch(requestArtistTopTracksAction(artistId)),
    requestArtistRelatedArtists: artistId => dispatch(requestArtistRelatedArtistsAction(artistId))
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    artist: state.artist.artist,
    topTracks: state.artist.topTracks.tracks,
    relatedArtists: state.artist.relatedArtists.artists,
    searchedWord: state.search.searchedWord,
    loading: state.artist.loading,
    error: state.artist.error,
    errorMessage: state.artist.errorMessage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);