import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import styled from 'react-emotion';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home/Home';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import HabitOverview from './Components/Habit/HabitOverview';
import Login from './Components/Login';
import { isAuthenticated, logOut, getUserId } from './utils/AuthUtils';

const AppLayout = styled('div')`
  position: absolute;
  margin-right: 1em;
  margin-left: 1em;
  top: calc(7em);
  bottom: 0;
  left: 0;
  right: 0;
`;

const Content = styled('div')`
  display: flex;
  justify-content: center;
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
    return (
      <Menu fixed="top" inverted width="100vw">
        <Container>
          <Menu.Item as={Link} to="/home" active>
            Home
          </Menu.Item>
          <Menu.Item position="right">
            {isAuthenticated() ? (
              <Button onClick={this.logOutAndRerender}>Log out</Button>
            ) : (
              <div>
                <Button as={Link} to={'/login'}>
                  Log in
                </Button>
                <Button as={Link} to={'/signup'} style={{ marginLeft: '0.5em' }}>
                  Sign Up
                </Button>
              </div>
            )}
          </Menu.Item>
        </Container>
      </Menu>
    );
  };

  render() {
    const { userId } = this.state;
    console.log(userId);
    return (
      <div>
        {this.renderMenu()}
        <AppLayout>
          <Switch>
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={LandingPage} />
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
