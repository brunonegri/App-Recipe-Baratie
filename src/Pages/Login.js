import React, { useState } from 'react';
import SearchBar from '../Components/SearchBar';

function Login() {
  const [userEmail/* , setEmail */] = useState('');
  const [userPassword, setPassword] = useState('');
  const six = 6;
  const CheckUserInfo = () => {
    userPassword.length > six
        && userEmail.includes('@') && setValid((valid = !valid));
  };

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        name="emailfilterSearch."
        value={ email }
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        value={ password }
        onChange={ (setPassword({ password }), CheckUserInfo) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ valid }
        onClick
      >
        Enter
      </button>
	  <SearchBar />
    </div>
  );
}

export default Login;
