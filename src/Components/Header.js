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
      setTitle('Done Recipes');
    }
    if (history.location.pathname === '/favorite-recipes') {
      setTitle('Favorite Recipes');
    }
  };

  useEffect(() => {
    setPageName();
  }, [history.location.pathname, pageName]);

  const searchIconValidate = title === 'Profile'
   || title === 'Done Recipes' || title === 'Favorite Recipes';
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
