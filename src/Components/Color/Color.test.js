import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Color from './Color.js';
import {shallow} from 'enzyme';
 
describe('Color Component', () => {
  let wrapper;
 
  beforeEach(() => {
    wrapper = shallow(<Color 
    color={'#FFFFFF'}
    locked={true}
    id={1}
    review={false}
    border={''}
    />)
  })
 
  it('it should match the snapshot with all the data passed through, locked set to true', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('it should match the snapshot with all the data passed through, locked set to false', () => {
    wrapper = shallow(<Color 
    color={'#FFFFFF'}
    locked={false}
    id={1}
    review={false}
    border={''}
    />)

    expect(wrapper).toMatchSnapshot();
  });
  it('it should match the snapshot with all the data passed through, review and locked set to true', () => {
    wrapper = shallow(<Color 
    color={'#FFFFFF'}
    locked={true}
    id={1}
    review={true}
    border={'25px 0 0 25px'}
    />)
    expect(wrapper).toMatchSnapshot();
  });
  it('it should match the snapshot with all the data passed through, review set to false and locked set to true', () => {
    wrapper = shallow(<Color 
    color={'#FFFFFF'}
    locked={false}
    id={1}
    review={true}
    border={'25px 0 0 25px'}
    />)
    expect(wrapper).toMatchSnapshot();
  });
  test.skip('dispatch should be called on icon click, with an action object', () => {
    const id = 1;
    render(wrapper)
    expect(screen.getByAltText(/an icon of a locked lock/i).src).toEqual("http://localhost/lock.svg")
    fireEvent.click(screen.getByAltText(/an icon of a locked lock/i))
    render(wrapper)
    expect(screen.getByAltText(/an icon of an unlocked lock/i).src).toEqual("http://localhost/unlock.svg")
  });
});