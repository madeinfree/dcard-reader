import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  fetchPosts,
  fetchPost,
  fetchComment,
  modalIs
} from '../../actions/posts-actions';

import './card.css';

import Modal from 'react-modal';

const imgReg = /(https?:\/\/.*\.(?:png|jpg))/g;
const imgurReg = /(https?:\/\/imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?)/g;
const commentsHashReg = /B([0-9]*)/;
const isMobile = navigator.userAgent.indexOf('Mobile') !== -1;

let openCardViewIndex = 0;

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openImage: false,
      onlyImage: false,
      firstIn: true,
      openComments: false,
      filter: ''
    };

    this.renderModalContent = (posts, post, comments) => {
      const {
        openImage,
        onlyImage,
        openComments
      } = this.state;
      let pageShow;
      if (post.getIn && !post.getIn([ 'error' ]) && this.props.params.id) {
        let imagePost = post.getIn([ 'content' ]).replace(imgReg, '<br /><img width="50%" src=$1 /><br />');
        imagePost = imagePost.replace(imgurReg, '<br /><img width="50%" src=https://imgur.dcard.tw/$2.jpg /><br />');
        if (onlyImage) {
          let totalImage = [];
          totalImage = post.getIn([ 'content' ]).match(imgReg) !== null ? totalImage.concat(post.getIn([ 'content' ]).match(imgReg)) : totalImage;
          totalImage = post.getIn([ 'content' ]).match(imgurReg) !== null ? totalImage.concat(post.getIn([ 'content' ]).match(imgurReg)) : totalImage;
          if (totalImage) {
            pageShow = totalImage.map((image, index) => {
              image = image.replace(imgurReg, 'https://imgur.dcard.tw/$2.jpg');
              return (
                <img key={ `post-${index}-${post.getIn([ 'id' ])}` } style={ { padding: 10 } } width='50%' src={ `${image}` } role='presentation' />
              );
            });
          }
          if (totalImage.length === 0) {
            pageShow = <div className='text-danger'>[ 此文章沒有任何圖片, 如需觀看請切回文字模式 ]</div>;
          }
        }
        if (!onlyImage) {
          pageShow = openImage && !onlyImage ? (
            <div dangerouslySetInnerHTML={ { __html: imagePost } } />
          ) : (
            <div
              dangerouslySetInnerHTML={ { __html: post.getIn([ 'content' ])
                .replace(imgurReg, '<div class="text-danger">[ 請點選圖文版後顯示圖片 ]</div>')
                .replace(imgReg, '<div class="text-danger">[ 請點選圖文版後顯示圖片 ]</div>') }
            } />
          );
          if (openComments) {
            if (comments.size > 0) {
              pageShow = comments.map((comment, index) => {
                if (comment.getIn([ 'content' ]) !== undefined) {
                  const commentHash = comment.getIn([ 'content' ]).replace(commentsHashReg, '<a href=#comment-$1>B-$1</a>');
                  return (
                    <div key={ `comment-${comment.getIn([ 'id' ])}` }>
                      <div id={ `comment-${index + 1}` }>
                        <a href={ `#comment-${index + 1}` }>{ `B-${parseInt(index + 1, 10)}` }</a>
                      </div>
                      <div>
                        { comment.getIn([ 'school' ]) }
                      </div>
                      <div dangerouslySetInnerHTML={ { __html: commentHash } }>
                      </div>
                      <div>
                        { comment.getIn([ 'updateAt' ]) }
                      </div>
                      <hr />
                    </div>
                  );
                }
                return null;
              });
            }
          }
        }
        return (
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' onClick={ () => { this.props.modalIs(false); browserHistory.push('/'); } }>
                <span aria-hidden='true'>&times;</span>
                <span className='sr-only'>Close</span>
              </button>
              <h4 className='modal-title'>{ post.getIn([ 'title' ]) }</h4>
            </div>
            <div className='modal-body'>
              <div style={ { display: 'flex', justifyContent: 'space-between' } }>
                <div>
                  <a className='btn btn-default' target='_blank' href={ `https://www.dcard.tw/f/dcard/p/${post.getIn([ 'id' ])}` }>原文</a>
                  <button
                    className='btn btn-default'
                    onClick={ () => { browserHistory.push(`/post/${posts.getIn([ openCardViewIndex - 1, 'id' ])}`); openCardViewIndex = openCardViewIndex - 1; } }>上一篇</button>
                  <button
                    className='btn btn-default'
                    onClick={ () => { browserHistory.push(`/post/${posts.getIn([ openCardViewIndex + 1, 'id' ])}`); openCardViewIndex = openCardViewIndex + 1; } }>下一篇</button>
                </div>
                <div>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={ () => { this.setState({ onlyImage: !this.state.onlyImage, openImage: false }); } }>{ !this.state.onlyImage ? '只顯示圖片' : '關閉只顯示圖片' }</button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={ () => { this.setState({ openImage: !this.state.openImage, onlyImage: false }); } }>{ !this.state.openImage ? '顯示圖片' : '關閉顯示圖片' }</button>
                  <button type='button' className='btn btn-primary' onClick={ () => { this.setState({ openComments: !this.state.openComments }); } }>觀看回覆</button>
                </div>
              </div>
              <h4>
                <pre style={ { fontSize: 24, whiteSpace: 'pre-wrap' } }>
                  { pageShow }
                </pre>
              </h4>
            </div>
            <div className='text-center'>
              <div style={ { padding: 10, marginBottom: 30 } } className='fb-comments' data-href={ `http://dcard-reader.herokuapp.com/${window.location.pathname}` } data-mobile={ isMobile } data-width={ isMobile ? '200' : '600' } data-colorscheme='light' data-numposts='5'></div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-default'
                onClick={ () => { this.setState({ onlyImage: !this.state.onlyImage, openImage: false }); } }>{ !this.state.onlyImage ? '只顯示圖片' : '關閉只顯示圖片' }</button>
              <button
                type='button'
                className='btn btn-default'
                onClick={ () => { this.setState({ openImage: !this.state.openImage, onlyImage: false }); } }>{ !this.state.openImage ? '顯示圖片' : '關閉顯示圖片' }</button>
              <button type='button' className='btn btn-default' onClick={ () => { this.props.modalIs(false); browserHistory.push('/'); } }>關閉</button>
            </div>
          </div>
        );
      }
      return null;
    };

    this.onFilter = (ev) => {
      if (ev.keyCode === 13) {
        this.setState({ filter: ev.target.value });
      }
    };
  }

  componentDidMount() {
    if (window.location.hash.indexOf('#') !== -1 && this.state.firstIn) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    this.props.fetchPosts();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (window.location.hash.indexOf('#') !== -1) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
      return false;
    }
    return nextProps.posts.posts.getIn([ 'posts' ]) !== this.props.posts.posts.getIn([ 'posts' ]) ||
          nextProps.posts.posts.getIn([ 'post' ]) !== this.props.posts.posts.getIn([ 'post' ]) ||
          nextProps.posts.posts.getIn([ 'modalIsOpen' ]) !== this.props.posts.posts.getIn([ 'modalIsOpen' ]) ||
          nextState.openImage !== this.state.openImage ||
          nextState.onlyImage !== this.state.onlyImage ||
          nextState.openComments !== this.state.openComments ||
          nextState.filter !== this.state.filter;
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.params.id !== undefined) && (nextProps.params.id !== this.props.params.id)) {
      this.props.fetchComment(nextProps.params.id);
      this.props.fetchPost(nextProps.params.id);
      this.setState({
        openComments: false
      });
    }
    if (this.props.params.id && this.state.firstIn) {
      this.props.fetchComment(this.props.params.id);
      this.props.fetchPost(this.props.params.id);
      this.props.modalIs(true);
      this.state.firstIn = false;
    }
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
        this.props.posts.posts.getIn([ 'posts' ]).size > 0 ?
            this.props.posts.posts.getIn([ 'posts' ]).map((post, index) => (
              post.getIn([ 'title' ]).indexOf(this.state.filter) !== -1 ? (
                <div
                  key={ `post-id-${post.getIn([ 'id' ])}` }>
                  <CardView
                    post={ post }
                    idx={ index }
                    onOpenModal={ this.props.modalIs } />
                </div>
              ) : (null)
          )) : (<div>Loading data..</div>)
    );
  }

  render() {
    if (window.FB && document.getElementsByClassName([ 'fb_iframe_widget' ])[0] !== undefined) {
      window.FB.XFBML.parse();
    }
    return (
      <div className='text-center content-container' style={ { overflow: 'auto' } }>
        <div className='social-media'>
          <div className='fb-like' data-href='http://dcard-reader.herokuapp.com/' data-width='200' data-layout='button_count' data-action='like' data-show-faces='true' data-share='true'></div>
        </div>
        <h1>熱門文章</h1>
        <div>
          <input
            style={ { margin: '0 auto', width: '50%' } }
            type='text'
            className='form-control'
            placeholder='搜尋標題'
            onKeyDown={ this.onFilter } />
        </div>
        <div className='cloumn-container'>
          { this.renderPosts() }
        </div>
        <div style={ { padding: 10, marginBottom: 30 } } className='fb-comments' data-href='http://dcard-reader.herokuapp.com/' data-mobile={ isMobile } data-width={ isMobile ? '200' : '600' } data-colorscheme='light' data-numposts='5'></div>
        <Modal
          className='Modal__Bootstrap modal-dialog'
          closeTimeoutMS={ 150 }
          isOpen={ this.props.posts.posts.getIn([ 'modalIsOpen' ]) }
          onRequestClose={ () => { this.props.modalIs(false); browserHistory.push('/'); } }>
          { this.renderModalContent(this.props.posts.posts.getIn([ 'posts' ]), this.props.posts.posts.getIn([ 'post' ]), this.props.posts.posts.getIn([ 'comments' ])) }
        </Modal>
      </div>
    );
  }
}

const CardView = (props) => (
  <div
    style={ { cursor: 'pointer' } }
    className='card'
    onClick={
      () => { props.onOpenModal(true); browserHistory.push(`/post/${props.post.getIn([ 'id' ])}`); openCardViewIndex = props.idx; }
  }>
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
          <i className='fa fa-tags' aria-hidden='true'></i> { props.post.getIn([ 'tags' ]).map((tag, index) => (
            <span key={ `tag-${index}-${props.post.getIn([ 'id' ])}` }>{ tag.replace('#', ', ') }</span>
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
            { color: '#90CAF9' } : { color: '#F48FB1' } } className='fa fa-user' aria-hidden='true'></i> { props.post.getIn([ 'school' ]) ? props.post.getIn([ 'school' ]) : '匿名' } -{ ' ' }
            { props.post.getIn([ 'department' ]) && props.post.getIn([ 'department' ]).trim() !== '' ? props.post.getIn([ 'department' ]) : ' ' }
      </h5>
    </div>
  </div>
);

const mapStateToProps = (state) => (
  {
    posts: state
  }
);

const mapDispatchToProps = {
  fetchPosts,
  fetchPost,
  fetchComment,
  modalIs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
