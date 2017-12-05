import React, { Component } from 'react';
import styles from './Header.css';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  getAuthRelatedLinks() {
    if (this.props.user) {
      return [
        (<li key="signout" className="nav-item">
          <Link to="/logout">Logout</Link>
        </li>),
        (<li key="generate" className="nav-item">
          <Link to="/generate">Create/Edit</Link>
        </li>)
      ];
    } else {
      return [(
        <li key="signin" className="nav-item">
          <Link to="/login">Login</Link>
        </li>)
        ];
    }
  }
  render() {
    return (
      <header className={styles['main-header']}>
          <div className={styles['main-header__wrapper']}>
            <h1 className={styles['main-header__title']}>Wrestlermania</h1>
          </div>
          <div>
          <Link to='/'>Wrandom Wrestler</Link>
          {this.getAuthRelatedLinks().map((link) => link)}
          <Link to='/about'>About</Link>
          </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

export default connect(function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
})(Header);
