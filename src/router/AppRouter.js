import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Admin from '../components/Administrator/Administrator';
import SuperUser from '../components/SuperUser/SuperUser';
import Logout from '../components/Logout/Logout';

const mapStateToProps = state => ({
  id: state.auth.id,
  role: state.auth.role,
});
class AppRouter extends Component {

  isAdmin = () => {
    // TODO: Match ID with id from router params
    const { id, role } = this.props;
    return id && (role === 2 || role === 1);
  };

  isSuperUser = () => {
    const { id, role } = this.props;
    return id && role === 1;
  };

  SuperUserRoute = ({ component: Component, ...rest }) => (<Route
    {...rest}
    render={props => (this.isSuperUser() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/' }} />
    ))}
  />
  );

  AdminRoute = ({ component: Component, ...rest }) => (<Route
    {...rest}
    render={props => (this.isAdmin() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/' }} />
    ))}
  />
  );

  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Main} />
          <Route path="/login/" exact component={Login} />
          <Route path="/register/" exact component={Register} />
          <Route path="/logout" exact component={Logout} />
          <this.AdminRoute path="/administrator/:id/" exact component={Admin} />
          <this.SuperUserRoute path="/superuser/:id/" exact component={SuperUser} />
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, null)(AppRouter);
