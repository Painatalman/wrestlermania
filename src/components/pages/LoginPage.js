import React, { Component } from 'react';
import LoginForm from '../LoginForm.js';
import Layout from '../Layout.js';

class LoginPage extends Component {
    render() {
        return <Layout><LoginForm></LoginForm></Layout>;
    }
}

export default LoginPage;
