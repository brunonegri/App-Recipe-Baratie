import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../Services/renderWithRouter';
import MainFood from '../../Pages/MainFood';
import Recipes from '../../Components/Recipes';
import userEvent from '@testing-library/user-event';
import simulateFetch from '../Services/simulateFetch';
import { meals } from '../Mocks/meals';
import { act } from 'react-dom/test-utils';
import { applyMiddleware } from 'redux';


describe('Testes das paginas Principais', () => {
    test('Verifica se renderiza a recipe details se o resultado for 1', async () => {
        simulateFetch(meals)
        const {history} = renderWithRouter(<MainFood> <Recipes /></MainFood>)
    
       await waitFor(() => {
           const searchButton = screen.getByTestId('search-top-btn');
        userEvent.click(searchButton);
        const nameRadio = screen.getByTestId('name-search-radio');
        userEvent.click(nameRadio);
        const searchIpunt = screen.getByTestId('search-input')
        userEvent.type(searchIpunt, 'arrabiata')
        const search = screen.getByTestId('exec-search-btn')
        userEvent.click(search)
        waitFor(() => expect(history.location.pathname).toBe('/foods/52771') )
     
       })
        
        
        
        cleanup()
      })

      test('Verifica se renderiza a recipe details se o resultado for 1', async () => {
        simulateFetch(meals)
        const {history} = renderWithRouter(<MainFood> <Recipes /></MainFood>)
    
        await waitFor(() => {
        const searchButton = screen.getByTestId('search-top-btn');
        userEvent.click(searchButton);
        const nameRadio = screen.getByTestId('name-search-radio');
        userEvent.click(nameRadio);
        const searchIpunt = screen.getByTestId('search-input')
        userEvent.type(searchIpunt, 'goat')
        const search = screen.getByTestId('exec-search-btn')
        userEvent.click(search)
        expect(history.location.pathname).not.toBe('/foods/52771')
    
        })
        cleanup()
        
      })

      test('Testa Requisiçaõ inicial da página', async () => {
        simulateFetch(meals)
        const {history} = renderWithRouter(<MainFood> <Recipes /></MainFood>)

        await waitFor(() => {
            waitFor(() => {
                const recipeCard = screen.getByTestId('0-recipe-card')
                expect(recipeCard).toBeInTheDocument()
            })
                
            
        })
      })
})