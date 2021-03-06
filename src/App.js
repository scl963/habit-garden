import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import AppRouter from './AppRouter';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import HttpsRedirect from 'react-https-redirect';

const env = runtimeEnv();

const dblink = createHttpLink({ uri: env.REACT_APP_GRAPH_ENDPOINT });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(dblink),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <HttpsRedirect>
        <ApolloProvider client={client}>
          <AppRouter />
        </ApolloProvider>
      </HttpsRedirect>
    );
  }
}

export default App;
