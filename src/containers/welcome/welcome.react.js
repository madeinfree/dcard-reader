import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  Jumbotron,
  Button
} from 'react-bootstrap';

class Welcome extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const jumbotronInstance = (
      <Jumbotron>
        <h3 className='text-center'>Welcome.</h3>
      </Jumbotron>
    );

    const posts = this.props.posts.posts.getIn(['posts']).size > 0 ? this.props.posts.posts.getIn(['posts']).map((post) => {
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

export default connect(
  mapStateToProps
)(Welcome)
