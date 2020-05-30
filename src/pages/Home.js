import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

const Home = ({ session }) => {
  if (session) {
    return <Redirect to="/albums"/>
  }

  return (
    <div id="home">
      Home
    </div>
  );
}

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

export default connect(mapStateToProps)(Home);