import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import logo from './logo.svg';
import styles from './WrandomWrestlerPage.css';

import WrandomWrestlerCard from '../WrandomWrestlerCard.js';

import Layout from '../Layout.js';

// step 1 to convert this into a redux container component...
// import the 'connect'
import { connect } from 'react-redux';
import * as actions from '../../actions';

/**
 * @link https://css-tricks.com/intro-firebase-react/
 **/
class WrandomWrestlerPage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if(!this.props.wrestlers.length) {
      this.props.fetchWrestlersAndSetWrandomWrestler();
    }
  }

  render() {
    return (
      <Layout>
        {this.props.wrestler ? 
          <div>
              <WrandomWrestlerCard wrestler={this.props.wrestler}
            />
            <button className={styles['wrandom-wrestler-page__button']} onClick={this.props.setWrandomWrestler}>Get Wrandom Wrestler!</button>
          </div>
          : <div></div>
        }
      </Layout>
    );
  }
}

WrandomWrestlerPage.propTypes = {
  // used for existing wrestlers
  wrestlers: PropTypes.array,
  fetchWrestlersAndSetWrandomWrestler: PropTypes.func,
  setWrandomWrestler: PropTypes.func,
  wrestler: PropTypes.object
}

export default connect(function mapStateToProps(state) {
  return { 
    wrestlers: state.wrestlers.wrestlers,
    wrestler: state.wrestlers.wrandomWrestler 
  };
}, {
    fetchWrestlersAndSetWrandomWrestler: actions.fetchWrestlersAndSetWrandomWrestler,
    setWrandomWrestler: actions.setWrandomWrestler
})(WrandomWrestlerPage);
