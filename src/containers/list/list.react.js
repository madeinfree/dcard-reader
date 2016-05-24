import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Map, fromJS } from 'immutable';

import {
  fetchPosts
} from '../../actions/posts-actions';

export default class List extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      routePage: ''
    }
  }

  render_data() {
    const {
      fetchPosts,
      params
    } = this.props;

    if(window.location.pathname.split('/')[2] === undefined) return;

    fetch(`http://store.growth.tw:3001/api/forums/${window.location.pathname.split('/')[2]}`).then((res) => {
      return res.json();
    }).then((data) => {
      fetchPosts(data);
    });
  }

  componentWillMount() {
    // this.render_data();
  }

  componentDidMount() {
    browserHistory.listen(() => { this.render_data() });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    // return this.props.posts.posts.getIn(['posts']) !== nextProps.posts.posts.getIn(['posts'])
  }

  render_posts() {
    if(this.props.posts.posts.getIn(['posts', 'error']) === undefined && this.props.posts.posts.getIn(['posts']).size === 0) {
      return (
        <h1 className='text-danger'>[ 目前此版沒有任何資訊提供 ]</h1>
      )
    }
    return (
      this.props.posts.posts.getIn(['posts', 'error']) === undefined && this.props.posts.posts.getIn(['posts']).size > 0 && !this.state.loadin ? this.props.posts.posts.getIn(['posts']).map((post) => {
        return (
          <div
            key={ `post-id-${ post.getIn(['id']) }` }
          >
            <Link to={ `post/${post.getIn(['id'])}` }><h3>[ { post.getIn(['forumName']) } ] { post.getIn(['title']) } 回覆 { post.getIn(['commentCount']) } 則 - by { post.getIn(['school']) ? post.getIn(['school']) : '匿名' } 人氣 - { post.getIn(['likeCount']) }</h3></Link>
          </div>
        )
      }) : <div>載入中</div>
    )
  }

  render() {

    return (
      <div className='text-center' style={ { overflow: 'auto' } }>
        <h1>{ this.props.params.category }</h1>
        { this.render_posts() }
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
