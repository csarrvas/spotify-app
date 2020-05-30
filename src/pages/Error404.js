import React from 'react';
import './styles/error404.scss';
import error from '../assets/images/error-404.png';
import './styles/error404.scss';

const Error404 = () => {
  return (
    <div id="error404">
      <img alt="error 404" src={error} />
      <p>Page not found</p>
    </div>
  );
}
 
export default Error404;