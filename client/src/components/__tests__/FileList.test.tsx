import React from 'react';
import { render, ApolloMockingProvider } from 'test-utils';
import { FileList } from '..';

describe('<FileList />', () => {
  it('renders without exploding', () => {
    render(<FileList />);
  });

  it('renders loading state initially', () => {
    const { getByText } = render(
      <ApolloMockingProvider>
        <FileList />
      </ApolloMockingProvider>
    );

    expect(getByText(/Loading/)).toBeInTheDocument();
  });

  it('renders error state when query fails', async () => {
    const { findByText } = render(
      <ApolloMockingProvider errors={[]}>
        <FileList />
      </ApolloMockingProvider>
    );

    // FIXME: when passing errors, the component renders twice, first without errors and then with

    expect(await findByText(/Error/)).toBeInTheDocument();
  });

  it('renders a list of files', async () => {
    const mocks = {
      FileList: () => ({
        // prettier-ignore
        items: [
          { title: 'Foo', path: 'foo.mp4' },
          { title: 'Bar', path: 'bar.mp4' }
        ]
      })
    };

    const { findByText } = render(
      <ApolloMockingProvider mocks={mocks}>
        <FileList />
      </ApolloMockingProvider>
    );

    // FIXME: when passing mocks, the component renders twice, first without custom mocks and then with

    expect(await findByText(/Foo/)).toBeInTheDocument();
    expect(await findByText(/foo.mp4/)).toBeInTheDocument();
    expect(await findByText(/Bar/)).toBeInTheDocument();
    expect(await findByText(/bar.mp4/)).toBeInTheDocument();
  });
});
