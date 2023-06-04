import { render, screen } from '@testing-library/react';
import ModifyProfile from './ModifyProfile.js';
import '@testing-library/jest-dom'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('ModifyProfile', () => {   
    let props = {};
    
    beforeAll(() => {
        const customer_selected = "";
        const setCustomer = jest.fn(); 
        props = { customer_selected, setCustomer }; 
    });
    
    describe('Cuando el usuario no está logueado', () => {
        test('Muestra el mensaje de error "No puedes modificar tu perfil si aún no has iniciado sesión."', () => {
            render(<BrowserRouter ><ModifyProfile {...props} /></BrowserRouter>);
            expect(screen.getByText('No puedes modificar tu perfil si aún no has iniciado sesión.')).toBeInTheDocument();
        });
    
        test('Muestra el botón de iniciar sesión que redirige a /iniciar-sesion', async () => {
            render(<BrowserRouter ><ModifyProfile {...props} /></BrowserRouter>);
            const loginButton = screen.getByRole('button', { name: 'Iniciar sesión' });
            await loginButton.click();
            expect(window.location.pathname).toBe('/iniciar-sesion');
        });

        test('Muestra el botón de registrarse que redirige a /registrarse', async () => {
            render(<BrowserRouter ><ModifyProfile {...props} /></BrowserRouter>);
            const registerButton = screen.getByRole('button', { name: 'Registrarse' });
            await registerButton.click();
            expect(window.location.pathname).toBe('/registrarse');
        });

        test('Muestra el botón de volver a la página principal que redirige a /', async () => {
            render(<BrowserRouter ><ModifyProfile {...props} /></BrowserRouter>);
            const backButton = screen.getByRole('button', { name: 'Volver a la página principal' });
            await backButton.click();
            expect(window.location.pathname).toBe('/');
        });
    });

    describe('Cuando el usuario está logueado', () => {
        beforeEach(() => {
            props.customer_selected = { Id: 100, Name: 'Cliente 1', Email: 'cliente1@gmail.com', Phone: '666666666', Address: 'Calle 1' };
        });

        test('Muestra el título del formulario de modificar perfil', () => {
            render(<BrowserRouter ><ModifyProfile {...props} /></BrowserRouter>);
            expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Modificar perfil');
        });

        test('Muestra el formulario de modificar perfil con los inputs de nombre (Nombre), email (Correo electrónico), teléfono (Teléfono), identificación (NIF/CIF/NIE), dirección (Dirección), contraseña (Contraseña), confirmación de contraseña (Confirmar contraseña) y botón de modificar datos que redirige a "/"', async () => {
            render(<BrowserRouter ><ModifyProfile {...props} /></BrowserRouter>);
            expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
            expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
            expect(screen.getByLabelText('Teléfono')).toBeInTheDocument();
            expect(screen.getByLabelText('NIF/CIF/NIE')).toBeInTheDocument();
            expect(screen.getByLabelText('Dirección')).toBeInTheDocument();
            expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
            expect(screen.getByLabelText('Confirmar contraseña')).toBeInTheDocument();
            const modifyButton = screen.getByRole('button', { name: 'Modificar datos' });
            await modifyButton.click();
            expect(window.location.pathname).toBe('/');
        });

        test('Muestra el botón de volver a la página principal que redirige a /', async () => {
            render(<BrowserRouter ><ModifyProfile {...props} /></BrowserRouter>);
            const backButton = screen.getByRole('button', { name: 'Volver a la página principal' });
            await backButton.click();
            expect(window.location.pathname).toBe('/');
        });
    });

});