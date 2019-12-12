import * as React from 'react';
import {shallow} from 'enzyme';
// @ts-ignore
import CountOperation from '@/components/CountOperation';

it('test count add', () => {
  let mockFn = jest.fn()
  let wrapper = shallow(<CountOperation onAdd={mockFn}/>);
  wrapper.find('button').simulate('click');
  expect(mockFn).toHaveBeenCalledTimes(1);
});