import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { FileListDocument } from '../../graphql';
import { FileListContainer } from '../FileListContainer';
import { FileList } from '../FileList';

jest.mock('../FileList', () => ({
  FileList: () => <React.Fragment />
}));

describe('<FileListContainer />', () => {
  const succesfulMocks: MockedResponse[] = [
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
  const errorMocks: MockedResponse[] = [
    {
      request: {
        query: FileListDocument
      },
      error: {
        name: 'Error',
        message: 'aw shucks'
      }
    }
  ];

  it('renders without exploding', () => {
    const wrapper = mount(
      <MockedProvider mocks={succesfulMocks}>
        <FileListContainer />
      </MockedProvider>
    );

    expect(wrapper.first().is(FileListContainer));
  });

  it('renders loading state initially', () => {
    const wrapper = mount(
      <MockedProvider mocks={succesfulMocks}>
        <FileListContainer />
      </MockedProvider>
    );

    expect(wrapper.text()).toContain('Loading');
  });

  it('renders error state when query fails', () =>
    act(async () => {
      const wrapper = mount(
        <MockedProvider mocks={errorMocks}>
          <FileListContainer />
        </MockedProvider>
      );

      await wait();
      wrapper.update();

      expect(wrapper.text()).toContain('Error');
    }));

  it('renders a <FileList /> after loading', () =>
    act(async () => {
      const wrapper = mount(
        <MockedProvider mocks={succesfulMocks}>
          <FileListContainer />
        </MockedProvider>
      );

      await wait();
      wrapper.update();

      expect(wrapper.find(FileList)).toHaveLength(1);
    }));
});
