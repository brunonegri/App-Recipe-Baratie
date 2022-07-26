import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
// import shareIcon from '../images/shareIcon.svg';
import shareDone from '../images/pirate/shareDone.png';

function ShareButton(pathname) {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleClick = () => {
    const { link } = pathname;
    clipboardCopy(link);
    setLinkCopied(!linkCopied);
  };

  return (
    <div>
      <button
        className="imgbtn"
        type="button"
        onClick={ handleClick }
      >
        <img
          src={ shareDone }
          alt="Icone de Compartilhamento"
          data-testid="share-btn"
        />
      </button>
      {linkCopied && <p>Link copied!</p>}
    </div>
  );
}
export default ShareButton;
