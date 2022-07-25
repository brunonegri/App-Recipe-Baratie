import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoriteRecipes from '../../Pages/FavoriteRecipes';
import userEvent from '@testing-library/user-event';


describe('Testa página de LFavorite Recipes', () => {
  test('Testa se as receitas favoritadas são filtradas' , async () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push('/favorite-recipes');

    await waitFor(() => {
      const favAll = screen.getByTestId('filter-by-all-btn');
      expect(favAll).toBeInTheDocument();
      userEvent.click(favAll)
      waitFor(() =>{   
      const iconFav = screen.getByTestId(/horizontal-favorite-btn/i);
      expect(iconFav).toBeInTheDocument();
     })
    })
  });

  test('Testa se as receitas de foods favoritadas são filtradas' , async () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push('/favorite-recipes');

    await waitFor(() => {
      const favFoods = screen.getByTestId('filter-by-food-btn');
      expect(favFoods).toBeInTheDocument();
      userEvent.click(favFoods);
      waitFor(() =>{   
      const iconFav = screen.getByTestId(/horizontal-favorite-btn/i);
      expect(iconFav).toBeInTheDocument();
     })
    })
  });

  test('Testa se as receitas de drinks favoritadas são filtradas' , async () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push('/favorite-recipes');

    await waitFor(() => {
      const favDrinks = screen.getByTestId('filter-by-drink-btn');
      expect(favDrinks).toBeInTheDocument();
      userEvent.click(favDrinks);
      waitFor(() =>{   
      const iconFav = screen.getByTestId(/horizontal-favorite-btn/i);
      expect(iconFav).toBeInTheDocument();
     })
    })
    cleanup()
  });

});
