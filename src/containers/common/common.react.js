import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header/header.react';
import Footer from './footer/footer.react';

import {
  fetchPosts
} from '../../actions/posts-actions';

const styles = {
  padding: 0
}

class Common extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      fetchPosts
    } = this.props;

    fetch('http://store.growth.tw:3001/api').then((res) => {
      return res.json();
    }).then((data) => {
      fetchPosts(data);
    });
  }

  render() {
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
};

const mapStateToProps = (state) => {
  return {
    posts: state
  }
}

const mapDispatchToProps = {
  fetchPosts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Common)
