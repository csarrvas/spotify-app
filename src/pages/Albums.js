import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { searchAlbumsAction } from '../actions/searchActions';
import { Redirect } from 'react-router-dom';
import AlbumCard from '../components/albumCard/AlbumCard';
import Spinner from '../components/Spinner';

const Albums = ({ session, albums, searchedWord, actualPage, loading, error, errorMessage, searchAlbums }) => {
  if (!session) {
    return <Redirect to="/"/>
  }

  const changePage = e => {
    if (actualPage !== parseInt(e.target.value)) {
      searchAlbums(searchedWord, parseInt(e.target.value));
    }
  }

  const displayPagination = total => {
    const numberOfPages = Math.ceil(total / 10);
    const pages = [];
    for (let page = 1; page <= numberOfPages; page++) {
      pages.push(
        <button key={`page-${page}`} value={page} onClick={changePage}>{page}</button>
      );
    }
    return pages;
  }

  const displayContent = () => {
    if (loading) {
      return <Spinner/>
    } else if (actualPage === 0) {
      return (
        <div>Look for something to start</div>
      );
    } else {
      return (
        <Fragment>
          <div id="albums">
            {albums.items.length === 0
              ? <div className="error">No results found</div>
              : albums.items.map(album => (
                <AlbumCard key={album.id} album={album} />
              ))
            }
          </div>
          <div id="pagination">
            {displayPagination(albums.total).map(page => page)}
          </div>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      {displayContent()}
    </Fragment>
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