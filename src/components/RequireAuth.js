import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.user) {
                // go home!
                this.context.router.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            // not authenticated yet?
            if (!nextProps.user) {
                // go home!
                this.context.router.push('/signin');
            }
        }

        render() {
            if (this.props.user) {
                return <ComposedComponent {... this.props} />
            } else {
                return <div></div>
            }
        }
    }

  Authentication.propTypes = {
    children: PropTypes.element,
    user: PropTypes.object
  };

    function mapStateToProps(state) {
        return {
            user: state.auth.user
        }
    }

    return connect(mapStateToProps)(Authentication);
}
