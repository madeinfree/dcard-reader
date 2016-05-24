import React, { Component } from 'react';
import { Map, fromJS } from 'immutable';
import ReactQuill from 'react-quill';

import './style.css';

import {
  Jumbotron,
  Button
} from 'react-bootstrap';

const imgReg = /(https?:\/\/.*\.(?:png|jpg))/g;

export default class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: new Map(),
      openImage: false
    }
  }

  componentWillMount() {

    console.log(this.props.params.id)
    fetch(`http://store.growth.tw:3001/api/post/${this.props.params.id}`).then((res) => {
      return res.json();
    }).then((data) => {
      this.setState({
        post: fromJS(data)
      })
    });
  }

  render() {

    const {
      post,
      openImage
    } = this.state;

    let imagePost, pageShow;

    if(post.getIn(['content'])) {
      imagePost = post.getIn(['content']).replace(imgReg, '<br /><img width=200 height=200 src=$1 /><br />');
      // imagePost = imagePost.replace(' ', '<br />');

      pageShow = openImage ? (
        <pre>
          <div dangerouslySetInnerHTML={ { __html: imagePost } } />
        </pre>
      ) : (
        <pre>
          { post.getIn(['content']) }
        </pre>
      )
    }
    //<div dangerouslySetInnerHTML={ { __html: imagePost } } />

    return (
      <div>

        <h2 className='text-center'>
          { `${post.getIn(['title'])} by - ${post.getIn(['school']) ? post.getIn(['school']) : '匿名'} - on - ${post.getIn(['createdAt'])}` }
        </h2>

        <div style={ { display: 'flex', justifyContent: 'center' } }>
          <div style={ { width: 800 } }>
            <button onClick={ () => { this.setState({ openImage: !this.state.openImage }) } }>圖文版</button>
            <h3 className='text-left'>
              <pre>
                { pageShow }
              </pre>
            </h3>
          </div>
          <div style={ { width: 400 } }>
            評論區
          </div>
        </div>

      </div>
    );
  }
};
