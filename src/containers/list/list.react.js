import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  fetchPosts
} from '../../actions/posts-actions';

class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      routePage: ''
    };
  }

  renderData() {
    if (window.location.pathname.split('/')[2] === undefined) return;
    fetch(`http://store.growth.tw:3001/api/forums/${window.location.pathname.split('/')[2]}`).then((res) =>
      res.json().then((data) => this.props.fetchPosts(data))
    );
  }

  componentWillMount() {
    // this.render_data();
  }

  componentDidMount() {
    browserHistory.listen(() => this.renderData());
  }

  renderPosts() {
    if (this.props.posts.posts.getIn([ 'posts', 'error' ]) === undefined &&
      this.props.posts.posts.getIn([ 'posts' ]).size === 0) {
      return (
        <h1 className='text-danger'>[ 目前此版沒有任何資訊提供 ]</h1>
      );
    }
    return (
      this.props.posts.posts.getIn([ 'posts', 'error' ]) === undefined &&
        this.props.posts.posts.getIn([ 'posts' ]).size > 0 &&
          !this.state.loadin ?
            this.props.posts.posts.getIn([ 'posts' ]).map((post) => (
              <div
                key={ `post-id-${post.getIn([ 'id' ])}` } >
                <Link to={ `post/${post.getIn([ 'id' ])}` }>
                  <h3>
                    [ { post.getIn([ 'forumName' ]) } ] { post.getIn([ 'title' ]) }
                    { ' ' } <i className='fa fa-comments-o'></i> { post.getIn([ 'commentCount' ]) }
                    { ' ' } <i className='fa fa-heart-o' aria-hidden='true'></i> { post.getIn([ 'likeCount' ]) }
                    { ' ' } <i className='fa fa-user' aria-hidden='true'></i> { post.getIn([ 'school' ]) ? post.getIn([ 'school' ]) : '匿名' }
                  </h3>
                </Link>
              </div>
            )
          ) : <div>載入中</div>
    );
  }

  render() {

    return (
      <div className='text-center' style={ { overflow: 'auto' } }>
        <h1>{ this.props.params.category }</h1>
        { this.renderPosts() }
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
)(List)
