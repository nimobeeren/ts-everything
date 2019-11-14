import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { useFileListQuery } from '../../graphql';
import { ApolloMockingProvider } from '../ApolloMockingProvider';

const Consumer: React.FC = () => <Child result={useFileListQuery()} />;

const Child: React.FC<{ result: any }> = () => <React.Fragment />;

describe('<ApolloMockingProvider />', () => {
  it('provides mocked data', () =>
    act(async () => {
      const wrapper = mount(
        <ApolloMockingProvider>
          <Consumer />
        </ApolloMockingProvider>
      );

      await wait();
      wrapper.update();

      const child = wrapper.find(Child);
      expect(child.prop('result').data).toBeDefined();
    }));
});
