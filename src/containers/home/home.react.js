import React, { Component } from 'react';

import {
  Jumbotron,
  Button
} from 'react-bootstrap';

const Home = () => {

  const jumbotronInstance = (
    <Jumbotron>
      <h1 className='text-center'>Homess.</h1>
    </Jumbotron>
  );

  return (
    <div>
      { jumbotronInstance }
    </div>
  )
}

export default Home;
