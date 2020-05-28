import React, { Fragment } from 'react';
import './styles/error404.scss';
import error from '../assets/images/error-404.png';

const Error404 = () => {
  return (
    <Fragment>
      <img id="error-image" alt="error 404" src={error} />
      <p id="error-message">Page not found</p>
    </Fragment>
  );
}
 
export default Error404;