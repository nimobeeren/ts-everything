import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import { FileList } from '../FileList';

describe('<App />', () => {
  test('renders without exploding', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).not.toBeNull();
  });

  test('renders a <Counter />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(FileList)).toHaveLength(1);
  });
});
