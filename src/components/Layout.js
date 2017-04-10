import React from 'react';
import PropTypes from 'prop-types';

import styles from './Layout.css';

import Header from './Header.js';

const Layout = (props) => {
  return (
    <div>
      <Header></Header>
      <div className={styles['l-container']}>
        {props.children}
      </div>
    </div>
  )
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
