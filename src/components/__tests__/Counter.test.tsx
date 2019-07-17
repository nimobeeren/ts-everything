import React from 'react';
import { mount, shallow } from 'enzyme';
import { Counter } from '../Counter';

describe('<Counter />', () => {
  test('renders without exploding', () => {
    const wrapper = mount(<Counter />);
    expect(wrapper).not.toBeNull();
  });

  test('displays the correct count', done => {
    const wrapper = shallow(<Counter />);
    const button = wrapper.find('button');
    const countElem = wrapper.find('span.count');
    const countHTML = (value: number) => `<span class="count">${value}</span>`;

    expect(button).toHaveLength(1);
    expect(countElem).toHaveLength(1);

    expect(countElem.html()).toBe(countHTML(0));
    // TODO: simulate button click
    setImmediate(() => {
      expect(countElem.html()).toBe(countHTML(1));
      done();
    });
  });
});
