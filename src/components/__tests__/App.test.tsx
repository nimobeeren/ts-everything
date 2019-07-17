import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { Counter } from '../Counter';

describe('<App />', () => {
  test('renders without exploding', () => {
    const wrapper = mount(<App />);
    expect(wrapper).not.toBeNull();
  });

  test('renders a <Counter />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.is(Counter)).toBe(true);
  });
});
