import React from 'react';
import './styles/error404.scss';
import error from '../assets/images/error-404.png';

const Error404 = () => {
  return (
    <div id="error404">
      <img id="error-image" alt="error 404" src={error} />
      <p id="error-message">Page not found</p>
    </div>
  );
}
 
export default Error404;