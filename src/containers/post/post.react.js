import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { Link } from 'react-router';

import { Map, fromJS } from 'immutable';

import './style.css';

const imgReg = /(https?:\/\/.*\.(?:png|jpg))/g;
// const httpReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: new Map(),
      openImage: false,
      fontSize: 14
    };
  }

  componentWillMount() {
    fetch(`http://store.growth.tw:3001/api/post/${this.props.params.id}`).then((res) => (
      res.json().then((data) => this.setState({ post: fromJS(data) }))
    ));
  }

  render() {
    const {
      post,
      openImage
    } = this.state;

    let imagePost;
    let pageShow;

    if (post.getIn([ 'content' ])) {
      imagePost = post.getIn([ 'content' ]).replace(imgReg, '<br /><img height=500 src=$1 /><br />');

      pageShow = openImage ? (
        <pre style={ { fontSize: this.state.fontSize, whiteSpace: 'pre-wrap' } }>
          <div dangerouslySetInnerHTML={ { __html: imagePost } } />
        </pre>
      ) : (
        <pre style={ { fontSize: this.state.fontSize, whiteSpace: 'pre-wrap' } }>
          <div dangerouslySetInnerHTML={ { __html: post.getIn([ 'content' ]).replace(imgReg, '<div class="text-danger">[ 請點選圖文版後顯示圖片 ]</div>') } } />
        </pre>
      );
    }

    const contentHeader = post.getIn([ 'title' ]) ? (
      `${post.getIn([ 'title' ])} by - ${post.getIn([ 'school' ]) ? post.getIn([ 'school' ]) : '匿名'} - on - ${post.getIn([ 'createdAt' ])}`
    ) : <div>載入中</div>;

    return (
      <div>

        <h4 className='text-center'>
          { contentHeader }
        </h4>

        <div style={ { display: 'flex', justifyContent: 'center' } }>
          <div style={ { width: '100%' } }>
            <div>
              <Link className='btn btn-default' to={ `/forums/${post.getIn([ 'forumAlias' ])}` }>上一頁</Link>
            </div>
            <h3 className='text-left'>
              <button className='btn btn-default' onClick={ () => { this.setState({ openImage: !this.state.openImage }); } }>顯示圖文版</button>
              <button className='btn btn-default' onClick={ () => { this.setState({ fontSize: 14 }); } }>字體[小]</button>
              <button className='btn btn-default' onClick={ () => { this.setState({ fontSize: 20 }); } }>字體[中]</button>
              <button className='btn btn-default' onClick={ () => { this.setState({ fontSize: 32 }); } }>字體[大]</button>
              { pageShow }
            </h3>
          </div>
        </div>

        <div>
          <button className='btn btn-danger' style={ { position: 'fixed', bottom: 0, left: 0 } } onClick={ () => { window.scrollTo(0, 0); } }>回到頂端</button>
          <button className='btn btn-default' style={ { position: 'fixed', bottom: 0, left: 86 } } onClick={ () => { this.setState({ openImage: !this.state.openImage }); } }>顯示圖文版</button>
          <Link className='btn btn-default' style={ { position: 'fixed', bottom: 0, left: 186 } } to={ `/forums/${post.getIn([ 'forumAlias' ])}` }>上一頁</Link>
        </div>

      </div>
    );
  }
}
