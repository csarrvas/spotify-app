import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import './styles/home.scss';

const Home = ({ session }) => {
  if (session) {
    return <Redirect to="/albums"/>
  }

  return (
    <div id="home">
      <i className="fas fa-music"></i>
      <p>Login to start</p>
      <i className="fas fa-headphones-alt"></i>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(Home);