import * as React from 'react';
import { shallow } from 'enzyme';
// @ts-ignore
import ShowCount from '@/components/ShowCount';

it('test show count', () => {
  let wrapper = shallow(<ShowCount count={1}/>)
  expect(wrapper.find('p span').text()).toBe('1');
});