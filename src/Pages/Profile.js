import React from 'react';

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
    </div>

  );
}

export default Profile;
