import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import logo from './logo.svg';
import styles from './WrestlersPage.css';

import WrestlerCard from '../WrestlerCard.js';
import WrestlerForm from '../WrestlerForm.js';

import Layout from '../Layout.js';

// step 1 to convert this into a redux container component...
// import the 'connect'
import { connect } from 'react-redux';
import * as actions from '../../actions';

/**
 * @link https://css-tricks.com/intro-firebase-react/
 **/
class WrestlersPage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchWrestlers();
  }

  render() {
    return (
      <Layout>
          <div>
            <WrestlerForm/>
            <ul className={styles['wrestler-page__cards']}>
              {this.props.wrestlers.map((wrestler) => {
                return (
                  <WrestlerCard
                    key={wrestler.id}
                    id={wrestler.id}
                    title={wrestler.title}
                    description={wrestler.description}
                    // removeItem={this.removeItem.bind(this)}
                    // toggleEditingMode={this.toggleEditingMode.bind(this)}
                  />
                )
              })}
            </ul>
          </div>
      </Layout>
    );
  }
}

WrestlersPage.propTypes = {
  // used for existing wrestlers
  wrestlers: PropTypes.array,
  fetchWrestlers: PropTypes.func
}

export default connect(function mapStateToProps(state) {
  return { wrestlers: state.wrestlers.wrestlers };
}, {
  fetchWrestlers: actions.fetchWrestlers
})(WrestlersPage);
