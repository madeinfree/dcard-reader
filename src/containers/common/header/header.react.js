import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { List, fromJS } from 'immutable';

import {
  fetchForums
} from '../../../actions/posts-actions';

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem
} from 'react-bootstrap';

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchForums,
      params
    } = this.props;

    fetch(`http://store.growth.tw:3001/api/forums/`).then((res) => {
      return res.json();
    }).then((data) => {
      fetchForums(data);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.forums.posts.getIn(['forums']) !== this.props.forums.posts.getIn(['forums']);
  }

  render() {

    const {
      forums
    } = this.props;

    const render_forums = forums.posts.getIn(['forums']) ? forums.posts.getIn(['forums']).slice(0,32).map((forum) => {
      return <NavItem key={ `forum-${forum.getIn(['name'])}` } onClick={ () => { browserHistory.push(`/forums/${forum.getIn(['alias'])}`) } }>{ forum.getIn(['name']) }</NavItem>
    }) : <div>Loading data..</div>

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
              { render_forums }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    forums: state
  }
}

const mapDispatchToProps = {
  fetchForums
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
