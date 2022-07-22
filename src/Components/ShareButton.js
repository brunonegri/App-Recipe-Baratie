import React, { useState } from 'react'
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg'

function ShareButton (link) {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleClick = () => {
    clipboardCopy(link.link)
    setLinkCopied(!linkCopied)
  }
  
  return (
    <div>
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
     {linkCopied && <p>Link copied!</p>}
    </div>
  )
}
export default ShareButton;