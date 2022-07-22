import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import MainDrinks from '../../Pages/MainDrinks';
import MainFood from '../../Pages/MainFood';
import Recipes from '../../Components/Recipes';
import userEvent from '@testing-library/user-event';
import simulateFetch from './simulateFetch';
import drinks from './drinks';
import meals from './meals';

describe('Testando o componente Footer', () => {
  test('Verifica se é redirecionado para a página do perfil.', async () => {
    simulateFetch(drinks)
    const { history } = renderWithRouter(<MainDrinks> <Recipes /></MainDrinks>);
    history.push('/drinks');

    await waitFor(() => {
    const cardRecipe = screen.getByTestId('0-recipe-card');
    expect(cardRecipe).toBeInTheDocument();
    userEvent.click(cardRecipe)
    expect(history.location.pathname).toBe('/drinks/15997')});
    cleanup()
  });

  test('Verifica se é redirecionado para a página do perfil.', async () => {
    simulateFetch(meals)
    const { history } = renderWithRouter(<MainFood> <Recipes /></MainFood>);
    history.push('/foods');

    await waitFor(() => {
    const cardRecipe = screen.getByTestId('0-recipe-card');
    expect(cardRecipe).toBeInTheDocument();
    userEvent.click(cardRecipe)
    expect(history.location.pathname).toBe('/foods/52977')});

  });
});