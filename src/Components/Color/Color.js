import React, { useState } from 'react';
import './Color.scss'

const Color = ({color}) => {
  return (
    <div className='color-column' style={{backgroundColor: `#${color}`}}>
      <h2 className='color-h2'>#{color.toUpperCase()}</h2>
    </div>
  )
}

export default Color;