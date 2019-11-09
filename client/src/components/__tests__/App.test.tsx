import React from 'react';
import { shallow } from 'enzyme';
import { App, FileListContainer } from '..';

describe('<App />', () => {
  it('renders without exploding', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).not.toBeNull();
  });

  it('renders a <FileListContainer />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(FileListContainer)).toHaveLength(1);
  });
});
