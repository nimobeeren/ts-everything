import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../../theme';
import { File } from '../../../../graphql';
import { FileList } from '..';

describe('<FileList />', () => {
  it('renders without exploding', () => {
    const wrapper = mount(<FileList files={[]} />, {
      wrappingComponent: ThemeProvider,
      wrappingComponentProps: { theme }
    });

    expect(wrapper.is(FileList));
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
    const wrapper = mount(<FileList files={files} />, {
      wrappingComponent: ThemeProvider,
      wrappingComponentProps: { theme }
    });

    const items = wrapper.find('li');
    expect(items.at(0).text()).toContain('Foo');
    expect(items.at(0).text()).toContain('foo.mp4');
    expect(items.at(1).text()).toContain('Bar');
    expect(items.at(1).text()).toContain('bar.mp4');
  });
});
