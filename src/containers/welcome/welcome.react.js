import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  Jumbotron,
  Button
} from 'react-bootstrap';

import {
  fetchPosts
} from '../../actions/posts-actions';

class Welcome extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchPosts
    } = this.props;

    fetch('http://localhost:3001/api/news/').then((res) => {
      return res.json();
    }).then((data) => {
      fetchPosts(data);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.posts.posts.getIn(['posts'])!== this.props.posts.posts.getIn(['posts']);
  }


  render() {

    const posts = this.props.posts.posts.getIn(['posts', 'error']) === undefined && this.props.posts.posts.getIn(['posts']) && this.props.posts.posts.getIn(['posts']).size > 0 ? this.props.posts.posts.getIn(['posts']).map((post) => {
      return (
        <div
          key={ `post-id-${ post.getIn(['id']) }` }
        >
          <Link to={ `post/${post.getIn(['id'])}` }><h3>[ { post.getIn(['forumName']) } ] { post.getIn(['title']) } 回覆 { post.getIn(['commentCount']) } 則 - by { post.getIn(['school']) ? post.getIn(['school']) : '匿名' } 人氣 - { post.getIn(['likeCount']) }</h3></Link>
        </div>
      )
    }) : <div>Loading data..</div>

    return (
      <div className='text-center' style={ { overflow: 'auto' } }>
        <h1>熱門文章</h1>
        { posts }
      </div>
    )
  }

}

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
)(Welcome)
