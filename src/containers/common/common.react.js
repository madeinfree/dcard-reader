import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './header/header.react';
import Footer from './footer/footer.react';

import {
  fetchPosts,
  loadingAction
} from '../../actions/posts-actions';

const styles = {
  padding: 0
};

class Common extends Component {

  componentWillMount() {}


  render() {
    if (window.FB && document.getElementsByClassName([ 'fb_iframe_widget' ])[0] === undefined) {
      window.FB.XFBML.parse();
    }

    const loadingMask = this.props.posts.posts.getIn([ 'loading' ]) ? (
      <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(81, 122, 111, 0.44)', zIndex: 999 } }>
        <svg width='188px' height='188px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' className='uil-default'><rect x='0' y='0' width='100' height='100' fill='none' className='bk'></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(0 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(30 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(60 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(90 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(120 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(150 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(180 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(210 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(240 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(270 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(300 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite' /></rect><rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#00b2ff' transform='rotate(330 50 50) translate(0 -30)'> <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite' /></rect></svg>
      </div>
    ) : null;

    return (
      <div>
        { loadingMask }
        <a href='https://github.com/madeinfree/dcard-reader'>
          <img
            style={ { position: 'absolute', top: 0, left: 0, border: 0, zIndex: 999 } }
            src='https://camo.githubusercontent.com/c6625ac1f3ee0a12250227cf83ce904423abf351/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677261795f3664366436642e706e67'
            alt='Fork me on GitHub'
            data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png' />
        </a>
        <Header />
        <div style={ styles }>
          { this.props.children }
        </div>
        <Footer />
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
  fetchPosts,
  loadingAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Common);
