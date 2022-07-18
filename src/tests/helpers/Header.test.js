import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Testando o componente Header', () => {
  test('Verificando se os elementos são renderizados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
  });

  test('Verifica se é redirecionado para a página do perfil', () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    history.push('/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  test('Verifica se a barra de pesquisa aparece ao clicar na lupa', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const inputSearch = 'search-input';
    expect(screen.queryByTestId(inputSearch)).not.toBeInTheDocument();

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    expect(screen.getByTestId(inputSearch)).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(screen.queryByTestId(inputSearch)).not.toBeInTheDocument();
  });
});
