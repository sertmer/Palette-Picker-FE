import React from 'react';
import Main from './Main';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Main />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})