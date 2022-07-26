import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setApiAction } from '../redux/Actions';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
// import PirateSearch from '../images/pirate/PirateSearch.png';
import PirateSearchWhite from '../images/pirate/PirateSearchWhite.png';
// import pirateUser from '../images/pirate/pirateUser.png';
import pirateUserWhite from '../images/pirate/pirateUserWhite.png';
import DoneRecipesWhite from '../images/pirate/DoneRecipesWhite.png';
import FavoriteRecipesWhite from '../images/pirate/FavoriteRecipesWhite.png';
import FoodsWhite from '../images/pirate/FoodsWhite.png';
import ProfileWhite from '../images/pirate/ProfileWhite.png';
import SearchBar from './SearchBar';
import CategoriesButtons from './CategoriesButtons';
import Drinks from '../images/pirate/Drinks.png';

function Header({ pageName, dispatchSetApi }) {
  const history = useHistory();

  const goToProfile = () => {
    history.push('/profile');
  };
  const [visivel, setVisivel] = useState(false);
  const [title, setTitle] = useState(pageName);
  const handleSearch = () => {
    setVisivel(!visivel);
  };

  const doneRecipes = 'Done Recipes';
  const favoriteRecipes = 'Favorite Recipes';

  const setPageName = () => {
    if (history.location.pathname === '/profile') {
      setTitle('Profile');
    }
    if (history.location.pathname === '/drinks') {
      setTitle('Drinks');
      dispatchSetApi('cocktail');
    }
    if (history.location.pathname === '/foods') {
      setTitle('Foods');
      dispatchSetApi('meal');
    }
    if (history.location.pathname === '/done-recipes') {
      setTitle(doneRecipes);
    }
    if (history.location.pathname === '/favorite-recipes') {
      setTitle(favoriteRecipes);
    }
  };

  useEffect(() => {
    setPageName();
  }, [history.location.pathname, pageName]);

  const searchIconValidate = title === 'Profile'
   || title === doneRecipes || title === favoriteRecipes;
  return (
    <div className="header-container">
      <div className="header-mainbox">
        <button
          className="header-btn"
          type="button"
          onClick={ goToProfile }
        >
          <img
            className="pirateUser"
            src={ pirateUserWhite }
            alt="Icone de Perfil+"
            data-testid="profile-top-btn"
          />
        </button>
        {title === 'Drinks' && <img
          className="imgTitle"
          src={ Drinks }
          alt="drink title"
        />}
        {title === 'Foods' && <img
          className="imgTitle"
          src={ FoodsWhite }
          alt="Foods title"
        />}
        {title === 'Profile' && <img
          className="profileTitle"
          src={ ProfileWhite }
          alt="Profile title"
        />}
        {title === doneRecipes && <img
          className="doneRecipesTitle"
          src={ DoneRecipesWhite }
          alt="Done title"
        />}
        {title === favoriteRecipes && <img
          className="favoriteRecipesTitle"
          src={ FavoriteRecipesWhite }
          alt="Favorite title"
        />}
        {/* <h2
          data-testid="page-title"
        >
          {title}
        </h2> */}
        <div>
          {!searchIconValidate && (
            <button
              className="header-btn"
              type="button"
              onClick={ handleSearch }
            >
              <img
                className="pirateUser"
                src={ PirateSearchWhite }
                alt="Icone de Busca+"
                data-testid="search-top-btn"
              />
            </button>
          )}
        </div>
      </div>
      <div>
        {visivel === true ? (
          <SearchBar />
        ) : (!searchIconValidate && (<CategoriesButtons />))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageName: state.page.setPage,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetApi: (api) => dispatch(setApiAction(api)),
});
Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  dispatchSetApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
