import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../Services/renderWithRouter';
import MainDrinks from '../../Pages/MainDrinks';
import MainFood from '../../Pages/MainFood';
import Recipes from '../../Components/Recipes';
import userEvent from '@testing-library/user-event';
import simulateFetch from '../Services/simulateFetch';
import drinks from '../Mocks/drinks';
import meals from '../Mocks/meals';

describe('Testando o componente Recipes', () => {
  test('Verifica se renderiza o card e o drink GG', async () => {
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

  test('Verifica se renderiza o card e a receita Corba.', async () => {
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