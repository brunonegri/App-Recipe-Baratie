import React from 'react';
import Footer from '../Components/Footer';

function Profile() {
  return (
    <div>
      <header title="Profile" />
      <div>
        <div>
          <h3 data-testid="profile-email">{/* chamarUserCadastrado */}</h3>
        </div>
        <button
          type="button"
          data-testid="profile-done-btn"
          /* onClick={ RedirecionarParaReceitasFeitas } */
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          /* onClick={ redirecionarParaReceitasFavoritas } */
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          /*  onClick={ RedirecionarParaLogin / LimparLocalStorage} */
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>

  );
}

export default Profile;
