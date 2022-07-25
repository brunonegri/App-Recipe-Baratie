import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../Services/renderWithRouter';
import Recipes from '../../Components/Recipes';
import userEvent from '@testing-library/user-event';
import simulateFetch from '../Services/simulateFetch';
import oneDrinkId15997 from '../Mocks/oneDrinkId15997';
import drinks from '../Mocks/drinks';
import meals from '../Mocks/meals';
import RecipeDetails from '../../Pages/RecipeDetails';
import App from '../../App';
import MainDrinks from '../../Pages/MainDrinks';
import MainFood from '../../Pages/MainFood';

describe('Testando o componente RecipeDetails', () => {
  test('Verifica se renderiza o drink GG', async () => {
    simulateFetch(oneDrinkId15997)
    const {history} = renderWithRouter(<MainDrinks></MainDrinks>)
    history.push('/drinks/15997')
    
    await waitFor(() => {
      const cardRecipe = screen.getByTestId('0-recipe-card')
      expect(cardRecipe).toBeInTheDocument()
      waitFor(() => {
      userEvent.click(cardRecipe)
      const recipePhoto = screen.getByTestId("recipe-photo")
      expect(recipePhoto).toBeInTheDocument()
      const test2 = screen.getByText(/GG/);
      expect(test2).toBeInTheDocument();
      }) 
    })
  cleanup()
  });

  test('Verifica se renderiza a receita Corba', async () => {
    simulateFetch(meals)
    const { history } = renderWithRouter(<MainFood><RecipeDetails /></MainFood>);
    history.push('/foods');
    
    await waitFor(() => {
    const cardRecipe = screen.getByTestId('0-recipe-card');
    expect(cardRecipe).toBeInTheDocument();
    userEvent.click(cardRecipe)
    expect(history.location.pathname).toBe('/foods/52977')
    waitFor(() => {
    const recipePhoto = screen.getByTestId('share-btn')
    expect(recipePhoto).toBeInTheDocument()});
    });
    cleanup()
  });
});
