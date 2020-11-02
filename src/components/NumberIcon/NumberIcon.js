import React from 'react';
import './NumberIcon.scss';

export default function NumberIcon( props ) {
  return (
    <div className="number-icon">
      <p className="number-icon__item">{
        props.value ? props.value : '' 
      }</p>  
    </div>
  )
}
