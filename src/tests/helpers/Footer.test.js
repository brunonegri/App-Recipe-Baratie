import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../../Components/Footer';
import userEvent from '@testing-library/user-event';

describe('Testando o componente Footer', () => {
  test('Verifica se é redirecionado para a página do perfil.', () => {
    const { history } = renderWithRouter(<Footer />);
    history.push('/drink');

    const footerFoodbtn = screen.getByTestId('food-bottom-btn');
    userEvent.click(footerFoodbtn);
    expect(history.location.pathname).toBe('/foods');

  });
});
