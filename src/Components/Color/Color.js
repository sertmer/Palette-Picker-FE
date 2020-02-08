import React, { useState } from 'react';
import './Color.scss'

const Color = ({color}) => {
  console.log(color)
  return (
    <div className='color-column' style={{backgroundColor: `#${color}`}}>
      <h2>it's color!</h2>
    </div>
  )
}

export default Color;