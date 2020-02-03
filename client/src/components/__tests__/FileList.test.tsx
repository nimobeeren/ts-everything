import React from 'react';
import { render } from 'test-utils';
import { FileList } from '../FileList';

describe('<FileList />', () => {
  it('renders without exploding', () => {
    render(<FileList />);
  });

  it('renders loading state initially', () => {
    const { getByText } = render(<FileList />);

    expect(getByText(/Loading/)).toBeInTheDocument();
  });

  it('renders error state when query fails', async () => {
    const { findByText } = render(<FileList />, { gqlErrors: [] });

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

    const { findByText } = render(<FileList />, { gqlMocks: mocks });

    // FIXME: when passing mocks, the component renders twice, first without custom mocks and then with

    expect(await findByText(/Foo/)).toBeInTheDocument();
    expect(await findByText(/foo.mp4/)).toBeInTheDocument();
    expect(await findByText(/Bar/)).toBeInTheDocument();
    expect(await findByText(/bar.mp4/)).toBeInTheDocument();
  });
});
