import React from 'react';

function Login() {
  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        name="email"
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter

      </button>
    </div>
  );
}

export default Login;
