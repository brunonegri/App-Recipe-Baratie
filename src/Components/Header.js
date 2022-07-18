import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setPageAction from '../redux/Actions';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName, dispatchPageName }) {
  const history = useHistory();

  const goToProfile = () => {
    dispatchPageName('Profile');
    history.push('/profile');
  };
  const [visivel, setVisivel] = useState(false);
  const [title, setTitle] = useState(pageName);
  const handleSearch = () => {
    setVisivel(!visivel);
  };

  const setPageName = () => {
    console.log(history.location.pathname);
    if (history.location.pathname === '/profile') {
      setTitle('Profile');
    }
    if (history.location.pathname === '/drinks') {
      setTitle('Drinks');
    }
    if (history.location.pathname === '/foods') {
      setTitle('Foods');
    }
  };

  useEffect(() => {
    setPageName();
  }, [history.location.pathname]);

  const searchIconValidate = title === 'Profile'
   || title === 'Done Recipes' || title === 'Favorites Recipes';
  console.log(searchIconValidate);
  return (
    <div>
      <button
        type="button"
        onClick={ goToProfile }
      >
        <img
          src={ profileIcon }
          alt="Icone de Perfil+"
          data-testid="profile-top-btn"
        />
      </button>
      <h2
        data-testid="page-title"
      >
        {title}
      </h2>
      {!searchIconValidate && (
        <button
          type="button"
          onClick={ handleSearch }
        >
          <img
            src={ searchIcon }
            alt="Icone de Busca+"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {visivel === true && (
        <SearchBar />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  pageName: state.page.page,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPageName: (pageName) => dispatch(setPageAction(pageName)),
});

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  dispatchPageName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
