import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  fetchPosts
} from '../../actions/posts-actions';

import './card.css';

class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      routePage: '',
      windowSIze: {
        width: ''
      }
    };
  }

  componentWillMount() {}

  componentWillReceiveProps() {
    this.componentDidMount();
  }

  componentDidMount() {
    if (window.FB && document.getElementsByClassName([ 'fb_iframe_widget' ])[0] === undefined) {
      window.FB.XFBML.parse();
    }

    const shouldUpdate = window.location.pathname.split('/')[2] !== undefined && this.props.posts.posts.getIn([ 'forumsRoute' ]) !== window.location.pathname.split('/')[2];
    this.props.fetchPosts(window.location.pathname.split('/')[2], shouldUpdate);
  }

  componentWillUnmount() {}

  shouldComponentUpdate(nextProps) {
    return nextProps.posts.posts.getIn([ 'posts' ]) !== this.props.posts.posts.getIn([ 'posts' ]);
  }

  renderPosts() {
    if (this.props.posts.posts.getIn([ 'posts', 'error' ]) === undefined &&
      this.props.posts.posts.getIn([ 'posts' ]).size === 0) {
      return (
        <h1 className='text-danger'></h1>
      );
    }
    return (
      this.props.posts.posts.getIn([ 'posts', 'error' ]) === undefined &&
        this.props.posts.posts.getIn([ 'posts' ]).size > 0 &&
          !this.state.loading ?
            this.props.posts.posts.getIn([ 'posts' ]).map((post) => (
              <div
                key={ `post-id-${post.getIn([ 'id' ])}` }>
                <CardView
                  post={ post } />
              </div>
          )) : null
    );
  }

  render() {
    return (
      <div className='text-center' style={ { overflow: 'auto' } }>
        <div className='fb-like' data-href='http://dcard-reader.herokuapp.com/' data-width='200' data-layout='button_count' data-action='like' data-show-faces='true' data-share='true'></div>
        <h1>{ this.props.params.category }</h1>
        <div className='cloumn-container'>
          { this.renderPosts() }
        </div>
      </div>
    );
  }
}

const CardView = (props) => (
  <Link style={ { color: '#000' } } to={ `post/${props.post.getIn([ 'id' ])}` }>
    <div
      className='card'>
      <div
        style={ {
          padding: 10,
          marginTop: 16
        } }>
        <div
          style={ {
            textAlign: 'left',
            fontWeight: '700',
            fontSize: '1.2em'
          } }>
          { props.post.getIn([ 'title' ]) }
        </div>
        <div
          style={ {
            textAlign: 'left',
            fontSize: '1em',
            color: 'rgba(0, 0, 0, .4)'
          } }>
          <div>
            <i className='fa fa-tags' aria-hidden='true'></i> { props.post.getIn([ 'tags' ]).map((tag) => (
              <span>{ tag.replace('#', ', ') }</span>
            )) }
          </div>
          <div>
            <i className='fa fa-calendar-times-o' aria-hidden='true'></i> { props.post.getIn([ 'createdAt' ]) }
          </div>
        </div>
      </div>
      <div
        style={ {
          textAlign: 'left',
          padding: 10
        } }>
        { props.post.getIn([ 'excerpt' ]) }...
      </div>
      <div
        style={ {
          borderTop: '1px solid rgba(0,0,0,.05)'
        } }>
        <h5 className='text-right' style={ { paddingRight: 10, marginTop: 16, marginBottom: 16 } }>
          { ' ' } <i className='fa fa-comments-o'></i> { props.post.getIn([ 'commentCount' ]) }
          { ' ' } <i style={ { color: '#D50000' } } className='fa fa-heart' aria-hidden='true'></i> { props.post.getIn([ 'likeCount' ]) }
          { ' ' } <i
            style={ props.post.getIn([ 'gender' ]) === 'M' ?
              { color: '#90CAF9' } : { color: '#F48FB1' } } className='fa fa-user' aria-hidden='true'></i> { props.post.getIn([ 'school' ]) ? props.post.getIn([ 'school' ]) : '匿名' }
        </h5>
      </div>
    </div>
  </Link>
);

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
)(List);
