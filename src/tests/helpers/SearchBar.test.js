import React from 'react';
// import { Alert } from 'bootstrap';
import { waitFor, cleanup, render } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
import { Provider } from 'react-redux';
import store from '../../redux/Store';
// import App from '../../App';
import userEvent from '@testing-library/user-event';
import SearchBar from '../../Components/SearchBar';
// import fetchRecipeInfos from '../../0 - Services/API/requestAPI';

// https://remarkablemark.org/blog/2018/06/28/jest-mock-default-named-export/ 
jest.mock('../../0 - Services/API/requestAPI', () => ({__esModule: true, default: (jest.fn().mockResolvedValue({}))}))
import fetchRecipeInfos from '../../0 - Services/API/requestAPI';

describe('Testa o componente SearchBar', () => {
  test('Testa page drinks', async () => {
    // const { history } = renderWithRouter(<App />);
    const searchbar = render(<Provider store={ store }><SearchBar /></Provider>);
    fetchRecipeInfos.mockResolvedValue({drinks: ["vodka"]})
    // history.push('/drinks');
    // jest.mock('../../0 - Services/API/requestAPI', () => { return { defaul: {drinks: ['155 Belmont']} }});
    global.alert = jest.fn()
    userEvent.type(searchbar.getByTestId('search-input'), { target: { value: 'vodka' } });
    const ingredients = searchbar.getByTestId('ingredient-search-radio');
    userEvent.click(ingredients);
    const src = searchbar.getByTestId('exec-search-btn');
    userEvent.click(src);
    await waitFor(() => expect(global.alert).not.toHaveBeenCalled());
    cleanup();
  });

  test('Testa rota de foods', async () => {
    // const { history } = renderWithRouter(<App />);
    const searchbar = render(<Provider store={ store }><SearchBar /></Provider>);
    fetchRecipeInfos.mockResolvedValue({foods: ["Tamiya"]})
    // history.push('/foods');
    // jest.mock('../../0 - Services/API/requestAPI', () => { return { defaul: {foods: ['Tamiya']} }});
    global.alert = jest.fn();
    // const searchIcon = searchbar.getByTestId('search-top-btn');
    // userEvent.click(searchIcon);
    userEvent.type(searchbar.getByTestId('search-input'), { target: { value: 'Tamiya' } });

    const nameSearch = searchbar.getByTestId('name-search-radio');
    userEvent.click(nameSearch);
    const src = searchbar.getByTestId('exec-search-btn');
    userEvent.click(src);
    await waitFor(() => expect(global.alert).not.toHaveBeenCalled());
    cleanup();
  });

  test('Verifica se alerta de mais de uma letra na busca funciona', async () => {
    // const { history } = renderWithRouter(<App />);
    const searchbar = render(<Provider store={ store }><SearchBar /></Provider>);
    fetchRecipeInfos.mockResolvedValue({ })
    // history.push('/foods');
    global.alert = jest.fn();
    // jest.mock('../../0 - Services/API/requestAPI', () => { return { defaul: {} }});

    // const searchIcon = searchbar.getByTestId('search-top-btn');
    // userEvent.click(searchIcon);
    const searchInput = searchbar.getByTestId('search-input');
    const optionRadio = searchbar.getByTestId('first-letter-search-radio');
    const submitButton = searchbar.getByTestId('exec-search-btn');

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'aaa');
    userEvent.click(optionRadio);
    userEvent.click(submitButton);

    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character'));
    cleanup();
  });

  test('Verifica se alerta errorNull funciona input-ingredient', async () => {
    localStorage.clear()
    // jest.spyOn(requestAPI, 'fetchRecipeInfos').mockImplementation( () => {}); 
    // jest.mock('../../0 - Services/API/requestAPI', () => () => {});
    // fetchRecipeInfo.fetchRecipeInfos.mockResolvedValueOnce({})
    const searchbar = render(<Provider store={ store }><SearchBar /></Provider>);
    fetchRecipeInfos.mockResolvedValue({ })
    // history.push('/foods');
    global.alert = jest.fn(() => {});
    
    const searchInput = searchbar.getByTestId('search-input');
    const optionRadio = searchbar.getByTestId('ingredient-search-radio');
    const submitButton = searchbar.getByTestId('exec-search-btn');
 
    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'xablau');
    expect(searchInput).toHaveValue('xablau');
    userEvent.click(optionRadio);
    userEvent.click(submitButton);

    // await waitFor(() => expect(global.fetch).toHaveBeenCalled()); 
    // const errorNull = 'Sorry, we haven\'t found any recipes for these filters.';
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
    cleanup();
  });


  test('Verifica se alerta errorNull funciona input-name', async () => {
    const searchbar = render(<Provider store={ store }><SearchBar /></Provider>);
    
    global.alert = jest.fn(() => {});
    // {um drink}
    fetchRecipeInfos.mockResolvedValue({ })
    
    const searchInput = searchbar.getByTestId('search-input');
    const optionRadio = searchbar.getByTestId('name-search-radio');
    const submitButton = searchbar.getByTestId('exec-search-btn');
 
    userEvent.clear(searchInput);
    // xablau = um drink
    userEvent.type(searchInput, 'xablau');
    expect(searchInput).toHaveValue('xablau');
    userEvent.click(optionRadio);
    userEvent.click(submitButton);

    // .not
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  });



  test('Verifica se retorna receitar com a busca de uma letra', async () => {
    // const { history } = renderWithRouter(<App />);
    const searchbar = render(<Provider store={ store }><SearchBar /></Provider>);
    fetchRecipeInfos.mockResolvedValue({ target: { value: '"Apple Frangipan Tart"' }})
    // history.push('/foods');
    global.alert = jest.fn();
    // jest.mock('../../0 - Services/API/requestAPI', () => { return { defaul: {} }});

    // const searchIcon = searchbar.getByTestId('search-top-btn');
    // userEvent.click(searchIcon);
    const searchInput = searchbar.getByTestId('search-input');
    const optionRadio = searchbar.getByTestId('first-letter-search-radio');
    const submitButton = searchbar.getByTestId('exec-search-btn');

    userEvent.clear(searchInput);
    userEvent.type(searchInput, 'a');
    userEvent.click(optionRadio);
    userEvent.click(submitButton);

    await waitFor(() => expect(global.alert).not.toHaveBeenCalledWith());
    expect(searchInput).toBeInTheDocument("Apple Frangipan Tart");
    cleanup();
  });

});
