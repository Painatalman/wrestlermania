import React from 'react';
import PropTypes from 'prop-types';

import styles from './WrestlerCard.css';

// import the 'connect'
import { connect } from 'react-redux';
import * as actions from '../actions';

WrestlerCard.propTypes = {
  // used for existing wrestlers
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  deleteWrestler: PropTypes.func.isRequired,
  toggleEditingWrestler: PropTypes.func.isRequired
}

function WrestlerCard(props) {
  return (
    <li className={styles['wrestler-card']}>
      <h3 className={styles['wrestler-card__title']}>
        {props.title}
      </h3>
      <p className={styles['wrestler-card__description']}>
        {props.description ? props.description : ''}
      </p>
      <button className={styles['wrestler-card__button']} onClick={() => props.deleteWrestler(props.id)}>Remove Item</button>
      <button className={styles['wrestler-card__button']} onClick={() => props.toggleEditingWrestler(props.id)}>Edit Item</button>
    </li>
  )
}

export default connect(null, {
  deleteWrestler: actions.deleteWrestler,
  toggleEditingWrestler: actions.toggleEditingWrestler
})(WrestlerCard);
