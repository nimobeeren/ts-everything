import React from 'react';
import { render } from '@testing-library/react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { IMocks } from 'graphql-tools';
import { GraphQLError } from 'graphql';
import { theme, global } from '../../client/src/theme';
import { ApolloMockingProvider } from './ApolloMockingProvider';

// Create a modified version of the render function, that wraps the component with all the
// providers by default
type RenderParams = Parameters<typeof render>;
type CustomRenderOptions = RenderParams[1] & {
  gqlMocks?: IMocks;
  gqlErrors?: GraphQLError[];
};
const customRender = (ui: RenderParams[0], options?: CustomRenderOptions) => {
  const { gqlMocks, gqlErrors, ...restOptions } = options || {};

  // These are the providers a component may need to render in isolation
  const AllTheProviders: React.FC = ({ children }) => (
    <ApolloMockingProvider mocks={gqlMocks} errors={gqlErrors}>
      <Global styles={global} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ApolloMockingProvider>
  );

  return render(ui, { wrapper: AllTheProviders, ...restOptions });
};

// Re-export everything from the testing library, but substitute our custom render function
export * from '@testing-library/react';
export { customRender as render };
export { render as renderWithoutProviders };
