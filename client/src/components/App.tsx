import { hot } from 'react-hot-loader';
import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { theme, global } from '../theme';
import { FileList } from '.';

// Create Apollo client
const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const client = new ApolloClient({ cache, link });

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Global styles={global} />
    <ThemeProvider theme={theme}>
      {/* TODO: prefer not rendering useless div */}
      <div data-testid="content" />
      <FileList />
    </ThemeProvider>
  </ApolloProvider>
);

export default hot(module)(App);
