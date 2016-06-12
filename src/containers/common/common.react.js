import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header/header.react';
import Footer from './footer/footer.react';

import {
  fetchPosts,
  loadingAction
} from '../../actions/posts-actions';

const styles = {
  padding: 0
};

class Common extends Component {

  componentWillMount() {}


  render() {
    if (window.FB && document.getElementsByClassName([ 'fb_iframe_widget' ])[0] === undefined) {
      window.FB.XFBML.parse();
    }

    return (
      <div>
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
  fetchPosts,
  loadingAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Common);
