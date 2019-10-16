import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './components/App';

// Create Apollo client
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});
const client = new ApolloClient({
  cache,
  link
});

const root = document.createElement('div');
document.body.appendChild(root);

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  root
);
