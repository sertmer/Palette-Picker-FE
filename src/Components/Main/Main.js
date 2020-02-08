import React from 'react';
import './Main.scss';
import Menu from '../Menu/Menu';
import PaletteContainer from '../PaletteContainer/PaletteContainer';

export const Main = () => {
  return (
    <section className='main-page'>
      <PaletteContainer />
      <Menu />
    </section>
  )
}

export default Main;