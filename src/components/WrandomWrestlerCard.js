import React from 'react';
import PropTypes from 'prop-types';

import styles from './WrandomWrestlerCard.css';

function WrandomWrestlerCard(props) {
  const {title, description, facts, moves, finishers} = props.wrestler;
  return (
    <article className={styles['wrandom-wrestler-card']}>
      <h1 className={styles['wrandom-wrestler-card__title']}>
        {title}
      </h1>
      <p className={styles['wrandom-wrestler-card__description']}>
        {description}
      </p>
      <h2 className={styles['wrandom-wrestler-card__subtitle']}>
        Facts
      </h2>
      <ul className={styles['wrandom-wrestler-card__facts']}>
        {
          facts.map((item, iter) =>
            <li key={iter} className={styles['wrandom-wrestler-card__list-item']}>{item}</li>
          )
        }
      </ul>
      <h2 className={styles['wrandom-wrestler-card__subtitle']}>
        Moves
      </h2>
      <ul className={styles['wrandom-wrestler-card__list']}>
        {
          moves.map((item, iter) =>
            <li key={iter} className={styles['wrandom-wrestler-card__list-item']}>{item}</li>
          )
        }
      </ul>
      <h2 className={styles['wrandom-wrestler-card__subtitle']}>
        Finishers
      </h2>
      <ul className={styles['wrandom-wrestler-card__list']}>
        {
          finishers.map((item, iter) =>
            <li key={iter} className={styles['wrandom-wrestler-card__list-item']}>{item}</li>
          )
        }
      </ul>
    </article>
  )
}

WrandomWrestlerCard.propTypes = {
  // used for existing wrestlers
  wrestler: PropTypes.object.isRequired
}

export default WrandomWrestlerCard;
