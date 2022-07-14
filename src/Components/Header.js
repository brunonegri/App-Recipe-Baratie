import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg'
import searchIcon from '../images/searchIcon.svg'
import SearchBar from './SearchBar'

function Header() {
  const history = useHistory();
  const goToProfile = () => {
    history.push('/profile')  
  };
  const [visivel, setVisivel] = useState(false);
  return (
    <div>
        <img 
          src= { profileIcon }
          alt='Icone de Perfil+'
          data-testid='profile-top-btn'
          onClick={goToProfile}
        >    
        </img>
        <h2
          data-testid='page-title'
        >
          {/* { Nome da Pagina Atual }     */}
        </h2>  
        <img
          src= { searchIcon }
          alt='Icone de Busca+'
          data-testid='search-top-btn'
          onClick={setVisivel(visivel = !visivel)}
        >
        </img>
        { visivel = true & (
          <SearchBar />
        )}
    </div>
  )
}

export default Header;