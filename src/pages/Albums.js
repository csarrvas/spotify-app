import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { searchAlbumsAction } from '../actions/searchActions';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import Spinner from '../components/Spinner';

const Albums = ({ session, search, searchAlbums }) => {
  if (!session) {
    swal("Wait!", "You have to be logged in to look this page", "warning");
    return <Redirect to="/"/>
  }

  const changePage = e => {
    searchAlbums(search.searchedWord, parseInt(e.target.value));
  }

  const displayPagination = total => {
    const numberOfPages = Math.ceil(total / 10);
    const pages = [];
    for (let page = 1; page <= numberOfPages; page++) {
      pages.push(
        <button value={page} onClick={changePage}>{page}</button>
      );
    }
    return pages;
  }

  const displayContent = () => {
    if (search.loading) {
      return <Spinner/>
    } else if (search.actualPage === 0) {
      return (
        <div>Look for something to start</div>
      );
    } else {
      if (search.data.albums.items.length === 0) {
        return (
          <div>No results found</div>
        );
      } else {
        return (
          <Fragment>
            <div id="albums">

            </div>
            <div id="pagination">
              {displayPagination(search.data.albums.total).map(page => page)}
            </div>
          </Fragment>
        );
      }
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

const mapStateToProps = state =>{
  return {
    session: state.session,
    search: state.search
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);