import React from 'react';
import { Alert } from 'bootstrap';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../../App';
import userEvent from '@testing-library/user-event';


describe('Testa o componente SearchBar', () => {
  test('Testa page drinks', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    history.push('/drinks');

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    userEvent.type(screen.getByTestId('search-input'), { target: { value: 'vodka' } });
    const ingredients = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredients);
    const src = screen.getByTestId('exec-search-btn');
    userEvent.click(src);
    setTimeout(() => {
      const cardName = screen.getByTestId('card-name');
      expect(cardName[0]).toBeInTheDocument();
    }, 1000);
  });

  test('Testa rota de foods', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    history.push('/foods');

    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    userEvent.type(screen.getByTestId('search-input'), { target: { value: 'Tamiya' } });

    const nameSearch = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearch);
    const src = screen.getByTestId('exec-search-btn');
    userEvent.click(src);
    setTimeout(() => {
      const cardName = screen.getByTestId('card-name');
      expect(cardName[0]).toBeInTheDocument();
    }, 1000);
  });

  test('Verifica se alerta de mais de uma letra na busca funciona', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    history.push('/foods');
    global.alert = jest.fn();


    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    const optionRadio = screen.getByTestId('first-letter-search-radio');
    const submitButton = screen.getByTestId('exec-search-btn');


    userEvent.type(searchInput, 'aaa');
    userEvent.click(optionRadio);
    userEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Verifica se alerta errorNull funciona', () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    history.push('/foods');
    global.alert = jest.fn();


    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    const optionRadio = screen.getByTestId('name-search-radio');
    const submitButton = screen.getByTestId('exec-search-btn');


    userEvent.type(searchInput, 'xablau');
    userEvent.click(optionRadio);
    userEvent.click(submitButton);
    const errorNull = 'Sorry, we haven\'t found any recipes for these filters.';
    expect(global.alert).toHaveBeenCalledWith(errorNull);
  });
});
