import React from 'react';
import { render } from 'test-utils';
import { File } from '../../../../graphql/src';
import { FileList } from '..';

describe('<FileList />', () => {
  it('renders without exploding', () => {
    render(<FileList files={[]} />);
  });

  it('renders a list', () => {
    const files: File[] = [
      {
        title: 'Foo',
        path: 'foo.mp4'
      },
      {
        title: 'Bar',
        path: 'bar.mp4'
      }
    ];

    const { getByText } = render(<FileList files={files} />);

    expect(getByText(/Foo/)).toBeInTheDocument();
    expect(getByText(/foo.mp4/)).toBeInTheDocument();
    expect(getByText(/Bar/)).toBeInTheDocument();
    expect(getByText(/bar.mp4/)).toBeInTheDocument();
  });
});
