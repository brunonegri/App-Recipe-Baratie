import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const history = useHistory();
  const setUserDefault = () => {
    const localUser = localStorage.getItem('user');
    if (localUser === null) {
      const obj = {
        email: 'email@email.com',
      };
      const test = JSON.stringify(obj);
      localStorage.setItem('user', test);
    }
  };

  const [user, setUser] = useState({
    email: 'email@email.com',
  });

  useEffect(() => {
    console.log('oi');
    setUserDefault();
    const userEmail = JSON.parse(localStorage.getItem('user'));
    setUser(userEmail);
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-menu">
          <h3 data-testid="profile-email">{user.email}</h3>

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
              localStorage.clear();
            } }
          >
            Logout
          </button>
        </div>
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
