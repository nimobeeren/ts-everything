import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { FileListDocument } from '../../graphql';
import { ApolloMockingProvider } from '../../test-utils/ApolloMockingProvider';
import { FileList, FileListContainer } from '..';

jest.mock('../FileList', () => ({
  FileList: () => <React.Fragment />
}));

describe('<FileListContainer />', () => {
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

  it('renders without exploding', () =>
    act(async () => {
      const wrapper = mount(
        <ApolloMockingProvider>
          <FileListContainer />
        </ApolloMockingProvider>
      );

      expect(wrapper.find(FileListContainer)).toHaveLength(1);
    }));

  it('renders loading state initially', () =>
    act(async () => {
      const wrapper = mount(
        <ApolloMockingProvider>
          <FileListContainer />
        </ApolloMockingProvider>
      );

      expect(wrapper.text()).toContain('Loading');
    }));

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
        <ApolloMockingProvider>
          <FileListContainer />
        </ApolloMockingProvider>
      );

      await wait();
      wrapper.update();

      expect(wrapper.find(FileList)).toHaveLength(1);
      // TODO: assert props correct props are passed to FileList
    }));
});
