import React from 'react';
import { mount, shallow } from 'enzyme';
import { Counter } from '../Counter';

describe('<Counter />', () => {
  test('renders without exploding', () => {
    const wrapper = shallow(<Counter />);
    expect(wrapper).not.toBeNull();
  });

  test('displays the correct count', () => {
    const wrapper = mount(<Counter />);
    const button = wrapper.find('button');
    const count = wrapper.find('span');

    expect(button).toHaveLength(1);
    expect(count).toHaveLength(1);

    expect(count.text()).toEqual('0');
    button.simulate('click');
    expect(count.text()).toEqual('1');
  });
});
