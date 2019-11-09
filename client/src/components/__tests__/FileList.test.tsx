import React from 'react';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { shallow, mount } from 'enzyme';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../../theme';
import { FileListDocument } from '../../graphql';
import { FileListContainer } from '../FileListContainer';
import { FileList } from '../FileList';

describe('<FileList />', () => {
  it('renders without exploding', () => {
    const wrapper = mount(<FileList files={[]} />, {
      wrappingComponent: ThemeProvider,
      wrappingComponentProps: { theme }
    });

    expect(wrapper.is(FileList));
  });
});
