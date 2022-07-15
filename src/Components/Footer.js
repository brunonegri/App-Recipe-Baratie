import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div className="footer-container" data-testid="footer">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drinkIcon" />
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="mealIcon" />
    </div>
  );
}

export default Footer;
