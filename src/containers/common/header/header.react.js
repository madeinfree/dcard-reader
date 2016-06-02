import React, { Component } from 'react';

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import {
  fetchForums
} from '../../../actions/posts-actions';

import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';

import './header.css';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scrolled: false
    };

    this.onScroll = () => {
      const body = document.getElementsByTagName('body')[0];
      if (body.scrollTop > 100 && !this.state.scrolled) {
        window.removeEventListener('scroll', this.onScroll);
        this.setState({
          scrolled: true
        });
        return false;
      }
      return false;
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.props.fetchForums();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.forums.posts.getIn([ 'forums' ]) !== this.props.forums.posts.getIn([ 'forums' ]) ||
      this.state.scrolled !== nextState.scrolled;
  }
// className={ scrollTop < 20 ? 'navScroll0' : 'navScroll300' }
  render() {
    const {
      scrolled
    } = this.state;

    const {
      forums
    } = this.props;

    const renderForums = forums.posts.getIn([ 'forums' ]) ?
      forums.posts.getIn([ 'forums' ]).slice(0, 32).map((forum) => (
        <NavItem
          className='ani nave-item'
          key={ `forum-${forum.getIn([ 'name' ])}` }
          onClick={ () => browserHistory.push(`/forums/${forum.getIn([ 'alias' ])}`) } >
          { forum.getIn([ 'name' ]) }
        </NavItem>
      )) : (<div>Loading data..</div>);
    const navClassName = !scrolled ? 'navScroll0' : 'navScroll300';
    // const arrow = !scrolled ? (
    //   <div className='arrow bounce'></div>
    // ) : (null);
    return (
      <div
        className='navContainer'
        ref='navbar'
        style={ { width: '100%', zIndex: 100 } }>
        <Navbar inverse className={ navClassName } >
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Dcard - 熱門牆</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              { renderForums }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  forums: state
});

const mapDispatchToProps = {
  fetchForums
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
