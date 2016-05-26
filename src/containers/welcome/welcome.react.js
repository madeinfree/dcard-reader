import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  fetchPosts
} from '../../actions/posts-actions';

class Welcome extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.posts.posts.getIn([ 'posts' ]) !== this.props.posts.posts.getIn([ 'posts' ]);
  }


  render() {
    const posts = this.props.posts.posts.getIn([ 'posts', 'error' ]) === undefined &&
      this.props.posts.posts.getIn([ 'posts' ]) &&
      this.props.posts.posts.getIn([ 'posts' ]).size > 0 ?
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
        )) : (<div>Loading data..</div>);

    return (
      <div className='text-center' style={ { overflow: 'auto' } }>
        <div className='fb-like' data-href='http://dcard-reader.herokuapp.com/' data-width='200' data-layout='button_count' data-action='like' data-show-faces='true' data-share='true'></div>
        <h1>熱門文章</h1>
        { posts }
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
)(Welcome);
