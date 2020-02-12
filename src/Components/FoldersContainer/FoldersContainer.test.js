import React from 'react';
import FoldersContainer from './FoldersContainer';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<FoldersContainer />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})