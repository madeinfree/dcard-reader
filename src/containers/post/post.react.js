import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  fetchPost,
  fetchComment
} from '../../actions/posts-actions';

import './style.css';

const imgReg = /(https?:\/\/.*\.(?:png|jpg))/g;

class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openImage: false,
      onlyImage: false,
      fontSize: 26
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchPost(this.props.params.id);
    this.props.fetchComment(this.props.params.id);
  }

  render() {
    const {
      openImage,
      onlyImage
    } = this.state;

    const {
      post
    } = this.props;

    let imagePost;
    let pageShow;

    if (post.posts.getIn([ 'post', 'content' ])) {
      imagePost = post.posts.getIn([ 'post', 'content' ]).replace(imgReg, '<br /><img height=500 src=$1 /><br />');

      pageShow = openImage ? (
        // <pre style={ { fontSize: this.state.fontSize, whiteSpace: 'pre-wrap', height: 500, overflow: 'auto' } }>
        <div dangerouslySetInnerHTML={ { __html: imagePost } } />
        // </pre>
      ) : (
        // <pre style={ { fontSize: this.state.fontSize, whiteSpace: 'pre-wrap', height: 500, overflow: 'auto' } }>
        <div dangerouslySetInnerHTML={ { __html: post.posts.getIn([ 'post', 'content' ]).replace(imgReg, '<div class="text-danger">[ 請點選圖文版後顯示圖片 ]</div>') } } />
        // </pre>
      );
      if (onlyImage) {
        const totalImage = post.posts.getIn([ 'post', 'content' ]).match(imgReg);
        if (totalImage) {
          pageShow = totalImage.map((image) => (
            <div>{ image }</div>
            // <pre style={ { fontSize: this.state.fontSize, whiteSpace: 'pre-wrap', height: 500, overflow: 'auto' } }>
            // <img height='500' src={ `${image}` } role='presentation' />
            // </pre>
          ));
        }
        if (totalImage & totalImage.length === 0) {
          pageShow = (
            <div>[ 此文章沒有任何圖片 ]</div>
          );
        }
      }
    }

    const contentHeader = post.posts.getIn([ 'post', 'title' ]) ? (
      <div>
        <i className='fa fa-globe' aria-hidden='true'></i> { post.posts.getIn([ 'post', 'title' ]) }
        { ' ' }
        <i className='fa fa-graduation-cap' aria-hidden='true'></i> { post.posts.getIn([ 'post', 'school' ]) ? post.posts.getIn([ 'post', 'school' ]) : '匿名' }
        { ' ' }<i className='fa fa-clock-o' aria-hidden='true'></i> { post.posts.getIn([ 'post', 'createdAt' ]) }
      </div>
      // `${post.posts.getIn([ 'post', 'title' ])} ${post.posts.getIn([ 'post', 'school' ]) ? post.posts.getIn([ 'post', 'school' ]) : '匿名'} - on - ${post.posts.getIn([ 'post', 'createdAt' ])}`
    ) : <div>載入中</div>;
    const commentsContainer = post.posts.getIn([ 'comments' ]).size > 0 ? post.posts.getIn([ 'comments' ]).map((comment, index) => (
      <div
        key={ `comments-index-${comment.getIn([ 'id' ])}` } >
        <div> <i className='fa fa-graduation-cap' aria-hidden='true'></i> { comment.getIn([ 'school' ]) } B-{ index + 1 } <h2>{ comment.getIn([ 'content' ]) }</h2></div>
        <hr style={ { borderColor: '#C7C7C7' } } />
      </div>
    )) : null;

    return (
      <div>

        <h4 className='text-center'>
          { contentHeader }
        </h4>

        <div className='text-center'>
          <div>
            <Link className='btn btn-default' to={ `/forums/${post.posts.getIn([ 'post', 'forumAlias' ])}` }>上一頁</Link>
          </div>
          <h3>
            <button className='btn btn-default' onClick={ () => { this.setState({ openImage: !this.state.openImage }); } }>顯示圖文版</button>
            <button className='btn btn-default' onClick={ () => { this.setState({ onlyImage: !this.state.onlyImage }); } }>只顯示圖</button>
            <button className='btn btn-default' onClick={ () => { this.setState({ fontSize: 14 }); } }>字體[小]</button>
            <button className='btn btn-default' onClick={ () => { this.setState({ fontSize: 20 }); } }>字體[中]</button>
            <button className='btn btn-default' onClick={ () => { this.setState({ fontSize: 32 }); } }>字體[大]</button>
          </h3>
        </div>

        <div style={ { display: 'flex' } }>
          <div style={ { flex: 1 } }>
            <pre
              style={ {
                fontSize: this.state.fontSize,
                height: 500, overflow: 'auto', border: '1px solid #ccc', backgroundColor: '#f5f5f5', wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-wrap'
              } }>
              { pageShow }
            </pre>
          </div>
          <div style={ { flex: 1 } }>
            <pre
              style={ {
                fontSize: this.state.fontSize,
                height: 500, width: '100%', overflow: 'auto', border: '1px solid #ccc', backgroundColor: '#f5f5f5', wordBreak: 'break-all', wordWrap: 'break-word', whiteSpace: 'pre-wrap' } }>
              { commentsContainer }
            </pre>
          </div>
          <div>
            <button className='btn btn-danger' style={ { position: 'fixed', bottom: 0, left: 0 } } onClick={ () => { window.scrollTo(0, 0); } }>回到頂端</button>
            <button className='btn btn-default' style={ { position: 'fixed', bottom: 0, left: 86 } } onClick={ () => { this.setState({ openImage: !this.state.openImage }); } }>顯示圖文版</button>
            <Link className='btn btn-default' style={ { position: 'fixed', bottom: 0, left: 186 } } to={ `/forums/${post.posts.getIn([ 'post', 'forumAlias' ])}` }>上一頁</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    post: state
  }
);

const mapDispatchToProps = {
  fetchPost,
  fetchComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
