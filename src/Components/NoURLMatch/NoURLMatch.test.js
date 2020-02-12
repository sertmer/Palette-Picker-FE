import React from 'react';
import NoURLMatch from './NoURLMatch';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NoURLMatch />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})