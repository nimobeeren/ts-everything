import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import wait from 'waait';
import { ApolloMockingProvider } from '../../../../test-utils/src/ApolloMockingProvider';
import { FileList, FileListContainer } from '..';

jest.mock('../FileList', () => ({
  // eslint-disable-next-line react/jsx-fragments
  FileList: () => <React.Fragment />
}));

describe('<FileListContainer />', () => {
  it('renders without exploding', () =>
    // Tests that cause rendering updates should be wrapped in act()
    // Here, `ApolloMockingProvider` is causing the update
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
        <ApolloMockingProvider errors={[]}>
          <FileListContainer />
        </ApolloMockingProvider>
      );

      await wait();
      wrapper.update();

      expect(wrapper.text()).toContain('Error');
    }));

  it('renders a <FileList /> after loading', () =>
    act(async () => {
      const mocks = {
        FileList: () => ({
          // prettier-ignore
          items: [
            { title: 'Foo', path: 'foo.mp4' },
            { title: 'Bar', path: 'bar.mp4' }
          ]
        })
      };

      const wrapper = mount(
        <ApolloMockingProvider mocks={mocks}>
          <FileListContainer />
        </ApolloMockingProvider>
      );

      await wait();
      wrapper.update();

      const fileList = wrapper.find(FileList);
      expect(fileList).toHaveLength(1);
      const receivedFiles = fileList.prop('files');
      expect(receivedFiles[0]).toHaveProperty('title', 'Foo');
      expect(receivedFiles[0]).toHaveProperty('path', 'foo.mp4');
      expect(receivedFiles[1]).toHaveProperty('title', 'Bar');
      expect(receivedFiles[1]).toHaveProperty('path', 'bar.mp4');
    }));
});
