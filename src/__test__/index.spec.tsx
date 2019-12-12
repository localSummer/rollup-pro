import * as React from 'react';
import { shallow } from 'enzyme';
import Counter from '../index';

it('test count', () => {
  const wrapper = shallow(<Counter/>);

  expect(wrapper.find('img')).toHaveLength(2);

  expect(wrapper).toMatchSnapshot();
})