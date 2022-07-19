import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const setUserDefault = () => {
    const obj = {
      email: 'email@email.com',
    };
    const test = JSON.stringify(obj);
    localStorage.setItem('user', test);
  };
  useEffect(() => {
    setUserDefault();
  }, []);
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header />
      <header title="Profile" />
      <div>
        <div>
          <h3 data-testid="profile-email">{userEmail.email}</h3>
        </div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            history.push('/');
            localStorage.removeItem('user');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>

  );
}
Profile.prototype = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Profile;
