import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from '../Layout.js';

import * as actions from '../../actions';

class LogoutPage extends Component {
    componentWillMount() {
        this.props.logout();
    }

    render() {
        return <Layout><div>Sorry to see you go!</div></Layout>;
    }
}

LogoutPage.propTypes = {
  logout: PropTypes.func
}

export default connect(null, actions)(LogoutPage);
