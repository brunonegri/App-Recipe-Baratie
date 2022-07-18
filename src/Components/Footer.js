import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setApiAction, setPageAction } from '../redux/Actions';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = ({ dispatchSetApi, dispatchPageName }) => {
  const history = useHistory();
  const handleDrinkClick = () => {
    history.push('/drinks');
    dispatchSetApi('cocktail');
    dispatchPageName('Drinks');
  };
  const handleMealClick = () => {
    history.push('/foods');
    dispatchSetApi('meal');
    dispatchPageName('Foods');
  };

  return (
    <div className="footer-container" data-testid="footer">
      <button
        type="button"
        onClick={ handleDrinkClick }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />

      </button>
      <button
        type="button"
        onClick={ handleMealClick }
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetApi: (api) => dispatch(setApiAction(api)),
  dispatchPageName: (pageName) => dispatch(setPageAction(pageName)),
});

Footer.propTypes = {
  dispatchSetApi: PropTypes.func.isRequired,
  dispatchPageName: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Footer);
