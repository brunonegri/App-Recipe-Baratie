import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../../App';
import userEvent from '@testing-library/user-event';

describe('Testando o componente Header', () => {
  test('Verificando se os elementos são renderizados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
  });

  test('Verifica se é redirecionado para a página do perfil.', () => {
    const { history } = renderWithRouter(<App />);

    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    history.push('/foods');

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');

  });

  test('Verifica se a barra de pesquisa aparece ao clicar na lupa.', () => {
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

  test('Verifica os inputs radio da barra de pesquisa.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);

    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
  });

  test('Verifica os buttons de Drink, Done/Favorite recipes.', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'teste@teste.com')
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567')
    const buttonLogin = screen.getByTestId('login-submit-btn');
    userEvent.click(buttonLogin)
    const buttonDrink = screen.getByTestId('drinks-bottom-btn')
    userEvent.click(buttonDrink)

    const test = screen.getByText(/Drinks/)
    expect(test).toBeInTheDocument()

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');

    const buttonDone = screen.getByTestId('profile-done-btn')
    userEvent.click(buttonDone)

    const test2 = screen.getByText(/Done Recipes/)
    expect(test2).toBeInTheDocument()

    const profileIcon2 = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon2);
    expect(history.location.pathname).toBe('/profile');

    const buttonFavorite = screen.getByTestId('profile-favorite-btn')
    userEvent.click(buttonFavorite)

    const test3 = screen.getByText(/Favorite Recipes/)
    expect(test3).toBeInTheDocument()
  });
});
