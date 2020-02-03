import React from 'react';
import { render } from '@testing-library/react';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { theme, global } from '../../client/src/theme';
import { ApolloMockingProvider } from './ApolloMockingProvider';

// All the providers a component may need to render in isolation
const AllTheProviders: React.FC = ({ children }) => (
  <ApolloMockingProvider>
    <Global styles={global} />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </ApolloMockingProvider>
);

// Create a modified version of the render function, that wraps the component with all the
// providers by default
type RenderParams = Parameters<typeof render>;
const customRender: typeof render = (ui: RenderParams[0], options?: RenderParams[1]) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from the testing library, but substitute our custom render function
export * from '@testing-library/react';
export { customRender as render };
export { render as renderWithoutProviders };
