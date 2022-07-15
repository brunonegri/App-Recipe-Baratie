import React from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Footer from '../Components/Footer';

function Profile() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <header title="Profile" />
      <div>
        <div>
          <h3 data-testid="profile-email">{userEmail}</h3>
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
