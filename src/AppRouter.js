import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Container } from 'semantic-ui-react';
import styled from 'react-emotion';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import HabitOverview from './Components/Habit/HabitOverview';
import Login from './Components/Login';
import { isAuthenticated, logOut, getUserId } from './utils/AuthUtils';
import Garden from './Components/Garden/Garden';
import tree from './assets/tree_logo.svg';

const Logo = styled('img')`
  height: 40px;
  width: 40px;
`;

const AppLayout = styled('div')`
  position: absolute;
  margin-right: 0em;
  margin-left: 0em;
  top: calc(5em);
  bottom: 0;
  left: 0;
  right: 0;
  @media (max-width: 770px) {
    margin-right: 1em;
    margin-left: 1em;
  }
`;

class Routes extends Component {
  state = {
    isAuthenticated: isAuthenticated(),
    userId: getUserId(),
  };

  toggleIsAuthenticated = () => this.setState({ isAuthenticated: !this.state.isAuthenticated });

  logOutAndRerender = () => {
    logOut();
    this.toggleIsAuthenticated();
    this.props.history.push('/login');
  };

  renderMenu = () => {
    const screenWidth = window.innerWidth;
    const auth = isAuthenticated();
    return (
      <Menu borderless fixed="top" inverted width="100vw">
        <Container fluid>
          {screenWidth > 770 ? (
            <Menu.Item as={Link} to="/">
              <Logo src={tree} alt="Logo" />
            </Menu.Item>
          ) : (
            ''
          )}
          {auth ? (
            <Menu.Item as={Link} to="/home">
              <h3>
                <Icon name="chart bar" color="orange" />
                Dashboard
              </h3>
            </Menu.Item>
          ) : (
            ''
          )}
          {auth ? (
            <Menu.Item as={Link} to="/garden">
              <h3>
                <Icon name="tree" color="green" />
                My Garden
              </h3>
            </Menu.Item>
          ) : (
            <div />
          )}
          {auth ? (
            <Menu.Item position="right" onClick={this.logOutAndRerender}>
              <h3>Log out</h3>
            </Menu.Item>
          ) : (
            <Menu.Item position="right">
              <Menu.Item as={Link} to={'/login'}>
                <h3>Log in</h3>
              </Menu.Item>
              <Menu.Item as={Link} to={'/signup'}>
                <h3>Sign Up</h3>
              </Menu.Item>
            </Menu.Item>
          )}
        </Container>
      </Menu>
    );
  };

  render() {
    const { userId } = this.state;
    return (
      <div>
        {this.renderMenu()}
        <Route exact path="/" component={LandingPage} />
        <AppLayout>
          <Switch>
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/garden" component={Garden} />
            <ProtectedRoute userId={userId} exact path="/home" component={Home} />
            <ProtectedRoute
              userId={userId}
              exact
              path="/habit/:habitName"
              component={HabitOverview}
            />
          </Switch>
        </AppLayout>
      </div>
    );
  }
}

const AppContent = withRouter(Routes);

const AppRouter = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default AppRouter;
