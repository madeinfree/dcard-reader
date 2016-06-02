import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  fetchPosts,
  fetchPost,
  modalIs
} from '../../actions/posts-actions';

import './card.css';

import Modal from 'react-modal';

const imgReg = /(https?:\/\/.*\.(?:png|jpg))/g;
const imgurReg = /(https?:\/\/imgur.com\/(\w*\d\w*)+(\.[a-zA-Z]{3})?)/g;
const isMobile = navigator.userAgent.indexOf('Mobile') !== -1;

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openImage: false,
      onlyImage: false,
      firstIn: true
    };

    this.renderModalContent = (post) => {
      const {
        openImage,
        onlyImage
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
              <h4>
                <pre style={ { fontSize: 24, whiteSpace: 'pre-wrap' } }>
                  { pageShow }
                </pre>
              </h4>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' onClick={ () => { this.setState({ onlyImage: !this.state.onlyImage }); } }>只顯示圖片</button>
              <button type='button' className='btn btn-default' onClick={ () => { this.setState({ openImage: !this.state.openImage }); } }>顯示圖片</button>
              <button type='button' className='btn btn-default' onClick={ () => { this.props.modalIs(false); browserHistory.push('/'); } }>關閉</button>
            </div>
          </div>
        );
      }
      return null;
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.posts.posts.getIn([ 'posts' ]) !== this.props.posts.posts.getIn([ 'posts' ]) ||
          nextProps.posts.posts.getIn([ 'post' ]) !== this.props.posts.posts.getIn([ 'post' ]) ||
          nextProps.posts.posts.getIn([ 'modalIsOpen' ]) !== this.props.posts.posts.getIn([ 'modalIsOpen' ]) ||
          nextState.openImage !== this.state.openImage ||
          nextState.onlyImage !== this.state.onlyImage;
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.params.id !== undefined) && (nextProps.params.id !== this.props.params.id)) {
      this.props.fetchPost(nextProps.params.id);
    }
    if (this.props.params.id && this.state.firstIn) {
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
            this.props.posts.posts.getIn([ 'posts' ]).map((post) => (
              <div
                key={ `post-id-${post.getIn([ 'id' ])}` }>
                <CardView
                  post={ post }
                  onOpenModal={ this.props.modalIs } />
              </div>
          )) : (<div>Loading data..</div>)
    );
  }

  render() {
    return (
      <div className='text-center content-container' style={ { overflow: 'auto' } }>
        <div className='fb-like' data-href='http://dcard-reader.herokuapp.com/' data-width='200' data-layout='button_count' data-action='like' data-show-faces='true' data-share='true'></div>
        <h1>熱門文章</h1>
        <div className='cloumn-container'>
          { this.renderPosts() }
        </div>
        <div style={ { padding: 10, marginBottom: 30 } } className='fb-comments' data-href='http://dcard-reader.herokuapp.com/' data-mobile={ isMobile } data-width={ isMobile ? '200' : '600' } data-colorscheme='light' data-numposts='5'></div>
        <Modal
          className='Modal__Bootstrap modal-dialog'
          closeTimeoutMS={ 150 }
          isOpen={ this.props.posts.posts.getIn([ 'modalIsOpen' ]) }
          onRequestClose={ () => { this.props.modalIs(false); browserHistory.push('/'); } }>
          { this.renderModalContent(this.props.posts.posts.getIn([ 'post' ])) }
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
      () => { props.onOpenModal(true); browserHistory.push(`/post/${props.post.getIn([ 'id' ])}`); }
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
  modalIs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
