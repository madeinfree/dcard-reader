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

class Header extends Component {

  componentDidMount() {
    fetch('http://store.growth.tw:3001/api/forums/')
      .then((res) => (
        res.json().then((data) => (this.props.fetchForums(data)))
      )
    );
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.forums.posts.getIn([ 'forums' ]) !==
      this.props.forums.posts.getIn([ 'forums' ]);
  }

  render() {
    const {
      forums
    } = this.props;

    const renderForums = forums.posts.getIn([ 'forums' ]) ?
      forums.posts.getIn([ 'forums' ]).slice(0, 32).map((forum) => (
        <NavItem
          key={ `forum-${forum.getIn([ 'name' ])}` }
          onClick={ () => browserHistory.push(`/forums/${forum.getIn([ 'alias' ])}`) } >
          { forum.getIn([ 'name' ]) }
        </NavItem>
      )) : (<div>Loading data..</div>);

    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Dcard - 熱門好讀版</Link>
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
