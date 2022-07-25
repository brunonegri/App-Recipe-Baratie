import React from "react";
import { screen } from '@testing-library/react';
import renderWithRouter from '../Services/renderWithRouter';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import Profile from "../../Pages/Profile";

describe('Testes do componente Profile', () => {
    test('local user === null' , () => {
        const {history} = renderWithRouter(<Profile></Profile>)

        expect(localStorage.getItem('user')).toBe("{\"email\":\"email@email.com\"}");
    })

    test('Botão de LogOut', () => {
        const {history} = renderWithRouter(<Profile></Profile>)

        const logoutButton = screen.getByTestId("profile-logout-btn")
        expect(logoutButton).toBeInTheDocument()

        userEvent.click(logoutButton)
        expect(history.location.pathname).toBe('/');
    })
})