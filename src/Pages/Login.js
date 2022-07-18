import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [valid, setValid] = useState(true);
  const CheckUserInfo = () => {
    const minPassword = 6;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validator = userPassword.length >= minPassword && emailValidate.test(userEmail);
    setValid(!validator);
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
    console.log(userEmail);
    CheckUserInfo();
  };
  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
    console.log(userPassword);
    CheckUserInfo();
  };

  const handleClick = () => {
    const obj = {
      email: userEmail,
    };
    const test = JSON.stringify(obj);
    localStorage.setItem('user', test);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  };

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        name="email"
        value={ userEmail }
        placeholder="Email"
        onChange={ handleEmail }
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        value={ userPassword }
        placeholder="Password"
        onChange={ handlePassword }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ valid }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
