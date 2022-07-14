import React from 'react';
import { useState } from 'react';

function Login() {
	const [userEmail, setEmail] = useState('');
	const [userPassword, setPassword] = useState('');
	const [valid, setValid] = useState(false);
	const CheckUserInfo = () => {
		userPassword.length > 6 &&
			userEmail.includes('@') & setValid((valid = !valid));
	};

	return (
		<div>
			<input
				type="email"
				data-testid="email-input"
				name="email"
				value={email}
			/>
			<input
				type="password"
				data-testid="password-input"
				name="password"
				value={password}
				onChange={(setPassword({ password }), CheckUserInfo)}
			/>
			<button
				type="button"
				data-testid="login-submit-btn"
				disabled={valid}
				onClick
			>
				Enter
			</button>
		</div>
	);
}

export default Login;
