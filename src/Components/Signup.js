import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import { Formik } from 'formik';
import { Redirect, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { setAuthToken, isAuthenticated, setUserId, getUserId } from '../utils/AuthUtils';

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $firstName: String!) {
    signup(email: $email, password: $password, firstName: $firstName) {
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
};

const validateEmail = values => {
  const errors = {};
  if (!values.email) {
    errors.email = ERROR_MESSAGE.EMAIL_REQUIRED;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = ERROR_MESSAGE.INVALID_EMAIL_ADDRESS;
  }
  return errors;
};

class Signup extends Component {
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
      mutation: SIGNUP,
      variables: { email, password, firstName },
    });
    const { token, user } = res.data.signup;
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
              firstName: '',
            }}
            validate={validateEmail}
            validateOnChange={false}
            onSubmit={this.handleSubmit(client)}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
              return (
                <div className="signup-form">
                  <style>
                    {`
                        body > div,
                        body > div > div,
                        body > div > div > div.signup-form {
                          height: 100%;
                        }
                    `}
                  </style>
                  <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }}>
                      <Header as="h2" color="teal" textAlign="center">
                        Sign up for an account
                      </Header>
                      <Form size="large" onSubmit={handleSubmit}>
                        <Segment stacked>
                          <Form.Input
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="E-mail Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            value={values.email}
                          />
                          <Form.Input
                            type="firstName"
                            name="firstName"
                            icon="user"
                            iconPosition="left"
                            placeholder="First Name"
                            fluid
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                          />
                          <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />

                          <Button
                            type="submit"
                            loading={isSubmitting}
                            color="teal"
                            fluid
                            size="large"
                          >
                            Sign up
                          </Button>
                        </Segment>
                      </Form>
                    </Grid.Column>
                  </Grid>
                </div>
              );
            }}
          </Formik>
        )}
      </ApolloConsumer>
    );
  }
}

export default Signup;
