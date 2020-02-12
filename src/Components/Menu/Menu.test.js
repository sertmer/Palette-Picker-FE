import React from 'react';
import Menu from './Menu';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Menu />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})