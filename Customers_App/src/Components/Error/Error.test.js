import { render, screen  } from '@testing-library/react';
import Error from './Error.js';
import '@testing-library/jest-dom'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('Error', () => {   
    let props = {};

    test('Muestra el título del error', () => {
        render(<BrowserRouter ><Error {...props} /></BrowserRouter>);
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Error');
    });

    test('Muestra el mensaje de error "Ha ocurrido un error, disculpe las molestias."', () => {
        render(<BrowserRouter ><Error {...props} /></BrowserRouter>);
        expect(screen.getAllByRole('heading')[1]).toHaveTextContent('Ha ocurrido un error, disculpe las molestias.');
    });

    test('Muestra el texto "El error puede haber sido producido por un intento de acceso a una página inaccesible o por un fallo en el programa."', () => {
        render(<BrowserRouter ><Error {...props} /></BrowserRouter>);
        expect(screen.getByText('El error puede haber sido producido por un intento de acceso a una página inaccesible o por un fallo en el programa.')).toBeInTheDocument();
    });

    test('Muestra el botón "Volver al inicio" y redirige a /', () => {
        render(<BrowserRouter ><Error {...props} /></BrowserRouter>);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Volver al inicio');
        button.click();
        expect(window.location.pathname).toBe('/');
    });
});