import React from 'react';
// import logo from './logo.svg';
import styles from './Header.css';

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles['main-header']}>
        <div className={styles['main-header__wrapper']}>
          <h1 className={styles['main-header__title']}>Wrestlermania</h1>
        </div>
        <div>
        <Link to='/'>Wrestlers</Link>
        <Link to='/about'>About</Link>
        </div>
    </header>
  );
}
