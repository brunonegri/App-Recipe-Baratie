import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Testa página de Login', () => {
  test('Testa se os inputs são renderizados', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
    
    const buttonLogin = screen.getByTestId('login-submit-btn');
    expect(buttonLogin).toBeInTheDocument();
  });

  test('Verifique se ao clicar em entrar, o usuário é redirecionado', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'teste@teste.com')

    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567')

    const buttonLogin = screen.getByTestId('login-submit-btn');
    userEvent.click(buttonLogin)

    expect(history.location.pathname).toBe('/foods');
  })
});
