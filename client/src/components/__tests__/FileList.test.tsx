import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { shallow, mount } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../../theme';
import { FileListDocument } from '../../graphql';
import { FileList } from '../FileList';

describe('<FileList />', () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: FileListDocument
      },
      result: {
        data: {
          // TODO: can we do typechecking for this shape?
          files: [
            {
              __typename: 'File',
              title: 'Foo',
              path: 'foo.mp4'
            }
          ]
        }
      }
    }
  ];

  test('renders without exploding', () => {
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <MockedProvider>
          <FileList />
        </MockedProvider>
      </ThemeProvider>
    );

    expect(wrapper.first().is(FileList));
  });

  test('renders loading state initially', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <MockedProvider mocks={mocks}>
          <FileList />
        </MockedProvider>
      </ThemeProvider>
    );

    expect(wrapper.text()).toContain('Loading');
  });

  test('renders list of files', () =>
    act(async () => {
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <MockedProvider mocks={mocks}>
            <FileList />
          </MockedProvider>
        </ThemeProvider>
      );

      await wait();
      wrapper.update();

      const items = wrapper.find('li');
      expect(items).toHaveLength(1);
      expect(items.text()).toContain('Foo');
      expect(items.text()).toContain('foo.mp4');
    }));
});
