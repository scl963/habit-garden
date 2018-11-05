import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { setAuthToken, isAuthenticated, getUserId, setUserId } from '../utils/AuthUtils';
import { LoginFormContainer } from './Styles';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        password
      }
    }
  }
`;

const ERROR_MESSAGE = {
  EMAIL_REQUIRED: 'Email required',
  INVALID_EMAIL_ADDRESS: 'Invalid email addresss',
  PASSWORD_REQUIRED: 'You must enter a password',
};

const validateEmail = values => {
  const errors = {};
  if (!values.email) {
    errors.email = ERROR_MESSAGE.EMAIL_REQUIRED;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ERROR_MESSAGE.INVALID_EMAIL_ADDRESS;
  } else if (!values.password) {
    errors.password = ERROR_MESSAGE.PASSWORD_REQUIRED;
  }
  return errors;
};

class Login extends Component {
  state = {
    isRedirect: false,
    userId: '',
  };

  componentDidMount() {
    if (isAuthenticated() && getUserId()) {
      this.setState({ isRedirect: true });
    } else {
      this.setState({ isRedirect: false });
    }
  }

  handleSubmit = client => async (
    { email, password, firstName },
    { setSubmitting, setFieldError },
  ) => {
    const res = await client.mutate({
      mutation: LOGIN,
      variables: { email, password },
    });
    const { token, user } = res.data.login;
    await setAuthToken(token);
    await setUserId(user.id);
    this.setState({ isRedirect: true });
  };

  render() {
    const { isRedirect, userId } = this.state;
    if (isRedirect) {
      return <Redirect to={{ pathname: '/home', state: { userId } }} />;
    }
    return (
      <ApolloConsumer>
        {client => (
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={validateEmail}
            validateOnChange={false}
            onSubmit={this.handleSubmit(client)}
          >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              touched,
            }) => {
              return (
                <LoginFormContainer>
                  <Header as="h2" color="blue" textAlign="center">
                    Log in
                  </Header>
                  <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                      <Form.Input
                        fluid
                        icon="mail"
                        error={errors && errors.email}
                        iconPosition="left"
                        placeholder="E-mail Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        value={values.email}
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        error={errors && errors.password}
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />

                      <Button type="submit" loading={isSubmitting} color="blue" fluid size="large">
                        Log in
                      </Button>
                    </Segment>
                  </Form>
                </LoginFormContainer>
              );
            }}
          </Formik>
        )}
      </ApolloConsumer>
    );
  }
}

export default Login;
