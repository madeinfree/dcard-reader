import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header/header.react';
import Footer from './footer/footer.react';

import {
  fetchPosts
} from '../../actions/posts-actions';

const styles = {
  padding: 0
};

class Common extends Component {

  componentWillMount() {}


  render() {
    return (
      <div>
        <a href='https://github.com/madeinfree/dcard-reader'>
          <img
            style={ { position: 'absolute', top: 0, left: 0, border: 0, zIndex: 999 } }
            src='https://camo.githubusercontent.com/c6625ac1f3ee0a12250227cf83ce904423abf351/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677261795f3664366436642e706e67'
            alt='Fork me on GitHub'
            data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png' />
        </a>
        <Header />
        <div style={ styles }>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    posts: state
  }
);

const mapDispatchToProps = {
  fetchPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Common);
