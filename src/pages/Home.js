import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/albums"><button>Go to albums</button></Link>
    </div>
  );
}
 
export default Home;