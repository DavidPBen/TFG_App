import { render, screen, fireEvent  } from '@testing-library/react';
import Signup from './Signup.js';
import '@testing-library/jest-dom'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('Signup', () => {   
    let props = {};

    beforeAll(() => {
        const customer_table = [{ Id: 100, Name: 'Cliente 1', Email: 'c100@email.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle cliente, 1', Password: '$¨ãÎÓqX§w=VêqQ', Password_Try: ''}];
        const selectCustomer = jest.fn();
        const addNewCustomer = jest.fn();
        const setrelogin = jest.fn();
        const sendEmail = jest.fn();
        props = { customer_table, selectCustomer, addNewCustomer, setrelogin, sendEmail};
    });

    test('Muestra el título del formulario de registro "Registrarse"', () => {
        render(<BrowserRouter ><Signup {...props} /></BrowserRouter>);
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Registrarse');
    });

    test('Muestra el formulario de registro con los inputs de nombre (Nombre *), primer apellido (Primer apellido *), segundo apellido (Segundo apellido *), email (Correo electrónico *), teléfono (Teléfono *), identificador (NIF/CIF/NIE *), dirección (Dirección *), código postal (Código postal *) y contraseña (Contraseña *), y botón de registrarse, que redirige a /iniciar-sesión', async () => {
        render(<BrowserRouter ><Signup {...props} /></BrowserRouter>);
        const nameInput = screen.getByLabelText('Nombre *');
        const firstSurnameInput = screen.getByLabelText('Primer apellido *');
        const secondSurnameInput = screen.getByLabelText('Segundo apellido *');
        const emailInput = screen.getByLabelText('Correo electrónico *');
        const phoneInput = screen.getByLabelText('Teléfono *');
        const customer_IdInput = screen.getByLabelText('NIF/CIF/NIE *');
        const addressInput = screen.getByLabelText('Dirección *');
        const postal_CodeInput = screen.getByLabelText('Código postal *');
        const passwordInput = screen.getByLabelText('Contraseña *');
        const signupButton = screen.getByRole('button', { name: 'Registrarse' });
        expect(nameInput).toBeInTheDocument();
        expect(firstSurnameInput).toBeInTheDocument();
        expect(secondSurnameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(phoneInput).toBeInTheDocument();
        expect(customer_IdInput).toBeInTheDocument();
        expect(addressInput).toBeInTheDocument();
        expect(postal_CodeInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument();
        fireEvent.change(nameInput, { target: { value: 'Cliente 1' } });
        fireEvent.change(firstSurnameInput, { target: { value: 'Apellido 1' } });
        fireEvent.change(secondSurnameInput, { target: { value: 'Apellido 2' } });
        fireEvent.change(emailInput, { target: { value: 'c0@email.com' } });
        fireEvent.change(phoneInput, { target: { value: '666666666' } });
        fireEvent.change(customer_IdInput, { target: { value: '10000000A' } });
        fireEvent.change(addressInput, { target: { value: 'Calle cliente, 1' } });
        fireEvent.change(postal_CodeInput, { target: { value: '11111' } });
        fireEvent.change(passwordInput, { target: { value: '12345678abc' } });
        await signupButton.click();
        expect(window.location.pathname).toBe('/iniciar-sesion');
    });

    test('Muestra el mensaje de alerta (Alguno de los campos introducidos no es válido.) cuando se introduce mal algún dato, por ejemplo la contraseña etsá vacía.', async () => {
        render(<BrowserRouter ><Signup {...props} /></BrowserRouter>);
        const nameInput = screen.getByLabelText('Nombre *');
        const firstSurnameInput = screen.getByLabelText('Primer apellido *');
        const secondSurnameInput = screen.getByLabelText('Segundo apellido *');
        const emailInput = screen.getByLabelText('Correo electrónico *');
        const phoneInput = screen.getByLabelText('Teléfono *');
        const customer_IdInput = screen.getByLabelText('NIF/CIF/NIE *');
        const addressInput = screen.getByLabelText('Dirección *');
        const postal_CodeInput = screen.getByLabelText('Código postal *');
        const passwordInput = screen.getByLabelText('Contraseña *');
        const signupButton = screen.getByRole('button', { name: 'Registrarse' });
        expect(nameInput).toBeInTheDocument();
        expect(firstSurnameInput).toBeInTheDocument();
        expect(secondSurnameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(phoneInput).toBeInTheDocument();
        expect(customer_IdInput).toBeInTheDocument();
        expect(addressInput).toBeInTheDocument();
        expect(postal_CodeInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument();
        fireEvent.change(nameInput, { target: { value: 'Cliente 1' } });
        fireEvent.change(firstSurnameInput, { target: { value: 'Apellido 1' } });
        fireEvent.change(secondSurnameInput, { target: { value: 'Apellido 2' } });
        fireEvent.change(emailInput, { target: { value: 'c0@email.com' } });
        fireEvent.change(phoneInput, { target: { value: '666666666' } });
        fireEvent.change(customer_IdInput, { target: { value: '10000000A' } });
        fireEvent.change(addressInput, { target: { value: 'Calle cliente, 1' } });
        fireEvent.change(postal_CodeInput, { target: { value: '11111' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        await signupButton.click();
        expect(screen.getByText('Alguno de los campos introducidos no es válido.')).toBeInTheDocument();
    });

    test('Muestra el mensaje de alerta (El email o el DNI introducido ya está registrado.) cuando se introduce un email que ya está registrado.', async () => {
        render(<BrowserRouter ><Signup {...props} /></BrowserRouter>);
        const emailInput = screen.getByLabelText('Correo electrónico *');
        const signupButton = screen.getByRole('button', { name: 'Registrarse' });
        expect(emailInput).toBeInTheDocument();
        expect(signupButton).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: 'c100@email.com' } });
        await signupButton.click();
        expect(screen.getByText('El email o el DNI introducido ya está registrado.')).toBeInTheDocument();
    });

    test('Muestra el mensaje de "¿Ya tienes una cuenta? y un botón de Inicia sesión que redirige a /iniciar-sesión"', async () => {
        render(<BrowserRouter ><Signup {...props} /></BrowserRouter>);
        expect(screen.getByText('¿Ya tienes una cuenta?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Inicia sesión' })).toBeInTheDocument();
        await screen.getByRole('button', { name: 'Inicia sesión' }).click();
        expect(window.location.pathname).toBe('/iniciar-sesion');
    });
});