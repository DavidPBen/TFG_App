import { render, screen } from '@testing-library/react';
import Header from './Header.js';
import '@testing-library/jest-dom'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {   
    let props = {};

    beforeAll(() => {
        const customer_selected = "";
        const selectCustomer = jest.fn();
        props = { customer_selected, selectCustomer };
    });

    test('Muestra el logo con alt "logo", el nombre de la empresa "Just a Second" y los botones de "Iniciar sesión" que redirige a /iniciar-sesion y "Registrarse" que redirige a /registrarse', () => {
        render(<BrowserRouter><Header {...props} /></BrowserRouter>);
        expect(screen.getByAltText('logo')).toBeInTheDocument();
        expect(screen.getByText('Just a Second')).toBeInTheDocument();
        const loginButton = screen.getByText('Iniciar sesión');
        expect(loginButton).toBeInTheDocument();
        loginButton.click();
        expect(window.location.pathname).toBe('/iniciar-sesion');
        const signupButton = screen.getByText('Registrarse');
        expect(signupButton).toBeInTheDocument();
        signupButton.click();
        expect(window.location.pathname).toBe('/registrarse');
    });

    test('Tiene un usuario conectado, muestra su nombre y un dropdown con los botones "Modificar perfil" (que redirige a /modificar-perfil) y "Cerrar sesión"', () => {
        props.customer_selected = { Name: "Juan" };
        render(<BrowserRouter><Header {...props} /></BrowserRouter>);
        expect(screen.getByText('Juan')).toBeInTheDocument();
        const dropdownButton = screen.getByRole('button', { name: '' });
        expect(dropdownButton).toBeInTheDocument();
        dropdownButton.click();
        render(<BrowserRouter><Header {...props} /></BrowserRouter>);
        const modifyProfileButton = screen.getByText('Modificar perfil');
        expect(modifyProfileButton).toBeInTheDocument();
        modifyProfileButton.click();
        expect(window.location.pathname).toBe('/modificar-perfil');
        expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    });
});