import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { searchAlbumsAction } from '../actions/searchActions';
import { Redirect } from 'react-router-dom';
import AlbumCard from '../components/albumCard/AlbumCard';
import Spinner from '../components/Spinner';
import './styles/albums.scss';

const Albums = ({ session, albums, searchedWord, actualPage, loading, error, errorMessage, searchAlbums }) => {
  if (!session) {
    return <Redirect to="/"/>
  }

  const changePage = e => {
    if (actualPage !== parseInt(e.target.value)) {
      searchAlbums(searchedWord, parseInt(e.target.value));
    }
  }

  const displayPagination = (total, actualPage) => {
    const numberOfPages = Math.ceil(total / 10);
    const pages = [];
    for (let page = 1; page <= numberOfPages; page++) {
      pages.push(
        <button key={`page-${page}`} value={page} onClick={changePage} className={page === actualPage ? 'selected' : ''}>{page}</button>
      );
    }
    return pages;
  }

  const displayContent = () => {
    if (error) {
      return <div className="error"><p>{errorMessage}</p></div>

    } else if (loading) {
      return <Spinner/>

    } else if (actualPage === 0) {
      return <div className="start"><p>Look for something to start</p></div>
      
    } else {
      return (
        <Fragment>
          <div id="albums">
            {albums.items.length === 0
              ? <div className="error"><p>No results found</p></div>
              : albums.items.map(album => (
                <AlbumCard key={album.id} album={album} />
              ))
            }
          </div>
          <div id="pagination">
            {displayPagination(albums.total, actualPage).map(page => page)}
          </div>
        </Fragment>
      );
    }
  }

  return (
    <div id="albums-content">
      {displayContent()}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    searchAlbums: (searchedWord, actualPage) => dispatch(searchAlbumsAction(searchedWord, actualPage))
  }
}

const mapStateToProps = state => {
  const { data, searchedWord, actualPage, loading, error, errorMessage } = state.search;
  return {
    session: state.session,
    albums: data.albums,
    searchedWord,
    actualPage,
    loading,
    error,
    errorMessage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);