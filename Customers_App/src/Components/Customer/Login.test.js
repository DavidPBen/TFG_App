import { fireEvent, render, screen } from '@testing-library/react';
import Login from './Login.js';
import '@testing-library/jest-dom'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {   
    let props = {};

    beforeAll(() => {
        const customer_table = [{ Id: 100, Name: 'Cliente 1', Email: 'c100@email.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle cliente, 1', Password: '$¨ãÎÓqX§w=VêqQ', Password_Try: ''}];
        const relogin = false;
        const clearCustomersPasswordsTries = jest.fn();
        const setcustomer_Password_Try = jest.fn();
        const selectCustomer = jest.fn();
        const setrelogin = jest.fn();
        const sendEmail = jest.fn();
        const cifrateNewCustomerPassword = jest.fn();
        props = { customer_table, relogin, clearCustomersPasswordsTries, setcustomer_Password_Try, selectCustomer, setrelogin, sendEmail, cifrateNewCustomerPassword};
    });
    
    test('Muestra el título del formulario de login', () => {
        render(<BrowserRouter ><Login {...props} /></BrowserRouter>);
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Iniciar sesión');
    });

    test('Muestra el formulario de login con los inputs de email (Correo electrónico), contraseña (Contraseña) y botón de iniciar sesión', async () => {
        render(<BrowserRouter ><Login {...props} /></BrowserRouter>);
        const emailInput = screen.getByLabelText('Correo electrónico');
        const passwordInput = screen.getByLabelText('Contraseña');
        const loginButton = screen.getByRole('button', { name: 'Iniciar sesión' });
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: 'c100@email.com' } });
        fireEvent.change(passwordInput, { target: { value: '12345aaaa' } });
        await loginButton.click();
        expect(window.location.pathname).toBe('/');
    });

    test('En caso de error en la contraseña o en el email muestra la alerta de "Correo electrónico o contraseña incorrectos." al pulsar el botón de iniciar sesión', async () => {
        render(<BrowserRouter ><Login {...props} /></BrowserRouter>);
        const emailInput = screen.getByLabelText('Correo electrónico');
        const passwordInput = screen.getByLabelText('Contraseña');
        const loginButton = screen.getByRole('button', { name: 'Iniciar sesión' });
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        await loginButton.click();
        expect(screen.getByText('Correo electrónico o contraseña incorrectos.')).toBeInTheDocument();
    });

    test('Hay un botón "¿Has olvidado tu contraseña?"', async () => {
        render(<BrowserRouter ><Login {...props} /></BrowserRouter>);
        const forgotPasswordButton = screen.getByRole('button', { name: '¿Has olvidado tu contraseña?' });
        expect(forgotPasswordButton).toBeInTheDocument();
    });

    test('Hay un texto "¿No tienes cuenta?", con una descripción "No pierdas tiempo, ¡Regístrate!" y un botón "Registrarse" que redirige a /registrarse', async () => {
        render(<BrowserRouter ><Login {...props} /></BrowserRouter>);
        const noAccountText = screen.getByText('¿No tienes cuenta?');
        const noAccountDescription = screen.getByText('No pierdas tiempo, ¡Regístrate!');
        const registerButton = screen.getByRole('button', { name: 'Registrarse' });
        expect(noAccountText).toBeInTheDocument();
        expect(noAccountDescription).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
        await registerButton.click();
        expect(window.location.pathname).toBe('/registrarse');
    });

    test('Si props.relogin=true hay un texto de "Por favor inicia sesión para terminar el proceso de registro."', async () => {
        props.relogin = true;
        render(<BrowserRouter ><Login {...props} /></BrowserRouter>);
        const reloginText = screen.getByText('Por favor inicia sesión para terminar el proceso de registro.');
        expect(reloginText).toBeInTheDocument();
    });
});