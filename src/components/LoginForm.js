/**
 * User sign-in form
 *
 * - must have an input for username
 * - must have an input for password
 * - must send a valid username and password
 * - must respond with an error message when authentication is not successful
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  // The submitted data is passed as JSON object to your onSubmit function
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.login({...this.state});
  }

  handleChange(e) {
    let stateChangeObject = {};
    stateChangeObject[e.target.name] = e.target.value;

    this.setState(stateChangeObject);
  }

  renderAlert() {
    return this.props.errorMessage ? <div className='alert alert-danger'>{this.props.errorMessage}</div> : '';
  }

  render() {

    return (
      // The submitted data is passed as JSON object to your onSubmit function
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input name='email' className='form-control' onChange={this.handleChange.bind(this)}/>
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input name='password' className='form-control' type='password' onChange={this.handleChange.bind(this)}/>
        </fieldset>
        {this.renderAlert()}
        <button action='submit'>sign in</button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(LoginForm);
