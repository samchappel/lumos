import React from "react";
import Header from './Header';
import { connect } from 'react-redux';
import { setLocationData } from './redux/actions';

function Home({ handleSearch, setLocationData }) {
  

  return (
    <Header handleSearch={handleSearch} setLocationData={setLocationData}/>
  )
}

const mapDispatchToProps = {
  setLocationData,
};

export default connect(null, mapDispatchToProps)(Home);