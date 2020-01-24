import React from 'react';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Login, Register, Home, AddPost, Profile, ResetPassword, ChangePassword } from './layouts';
import { LoginHeader, MainHeader } from './layouts/components';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from './util/route';

const mapStateToProps = ({ session: { userId } }) => ({ 
    loggedIn: Boolean(userId) 
});

const App = ({ loggedIn }) => (
    <Router>
        { loggedIn ? <LoginHeader /> : <MainHeader />}
        <Switch>
            <AuthRoute path='/login' component={Login} />
            <AuthRoute path='/reset/password' component={ResetPassword} />
            <AuthRoute path='/register' component={Register} />
            <ProtectedRoute path='/post' component={AddPost} />
            <ProtectedRoute path='/profile' component={Profile} />
            <ProtectedRoute path='/change/password' component={ChangePassword} />
            <ProtectedRoute path='/' component={Home} />
        </Switch>
    </Router>
);

export default connect(mapStateToProps)(App);