import * as React from 'react';
import { shallow } from 'enzyme';
import Counter from '../index';

it('test count', () => {
  const wrapper = shallow(<Counter/>);

  wrapper.find('img').forEach(node => {
    expect(node.hasClass('img')).toBe(true)
  })
})