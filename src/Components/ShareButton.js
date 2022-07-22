import React from 'react'
import shareIcon from '../images/shareIcon.svg'

function ShareButton () {
  const copy = require('clipboard-copy')

  const handleClick = (link) => {
      copy(link)
  }
  
  return (
    <button 
     type="button"
     onClick={ handleClick }
     >
        <img
          src={ shareIcon }
          alt="Icone de Compartilhamento"
          data-testid="share-btn"
        />
    </button>
  )
}
export default ShareButton;