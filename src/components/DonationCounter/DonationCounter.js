import React from 'react';
import './DonationCounter.scss';

export default function DonationCounter(props) {
  return (
    <div className="donation-counter">
      <p className="donation-counter__text">{
        (`$${ props.value || '0,000'} Donated`)
      }</p>
    </div>
  )
}
