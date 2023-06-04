import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SendPackage from './SendPackage.js';
import '@testing-library/jest-dom'
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

describe('SendPackage', () => {

    let props = {};

    beforeAll(() => {
        const setpackages = jest.fn();
        const packages = [{width: 10, height: 10, length: 10, fragility: false, volume: 1000, weight: 0.6}];
        props = { setpackages, packages };
    });

    beforeEach(() => {
        window.history.pushState({}, 'Test page', '/enviar-paquete/paquete/1');
        render(<BrowserRouter initialEntries={['/enviar-paquete/paquete/1']}><Routes><Route path="/enviar-paquete/paquete/:PackageNumber" element={<SendPackage {...props}/>}></Route></Routes></BrowserRouter>);
    });

    test('Muestra el texto "Introduce los datos de tu paquete"', () => {
        expect(screen.getByText('Introduce los datos de tu paquete')).toBeInTheDocument();
    });

    test('Muestra el formulario con los campos de inputs: "Anchura *", "Altura *" y "Profundidad *"', () => {
        expect(screen.getByLabelText('Anchura *')).toBeInTheDocument();
        expect(screen.getByLabelText('Altura *')).toBeInTheDocument();
        expect(screen.getByLabelText('Profundidad *')).toBeInTheDocument();
    });

    test('Muestra los textos "La anchura debe estar en centímertros.", "La altura debe estar en centímertros." y "La profundidad debe estar en centímertros."', () => {
        expect(screen.getByText('La anchura debe estar en centímertros.')).toBeInTheDocument();
        expect(screen.getByText('La altura debe estar en centímertros.')).toBeInTheDocument();
        expect(screen.getByText('La profundidad debe estar en centímertros.')).toBeInTheDocument();
    });

    describe('Muestra los cambios de volumen y peso volumétrico', () => {

        test('Muestra el texto "Volumen:", con su valor como los valores de anchura+altura+profundidad con dos decimales y su unidad (cm<sup>3</sup>). Para ello hay que cambiar los valores de los inputs de anchura, altura y profundidad', async () => {
            await waitFor(() => {
                fireEvent.change(screen.getByLabelText('Anchura *'), { target: { value: '10' } });
                fireEvent.change(screen.getByLabelText('Altura *'), { target: { value: '10' } });
                fireEvent.change(screen.getByLabelText('Profundidad *'), { target: { value: '10' } });
                
            });
            expect(screen.getByText('Volumen:')).toBeInTheDocument();
            expect(screen.getByText('1000.00 (cm³)')).toBeInTheDocument();
        });

        test('Muestra el texto "Peso volumétrico:", con su valor como el valor de (anchura+altura+profundidad)/6000 y su unidad (kg). Para ello hay que cambiar los valores de los inputs de anchura, altura y profundidad', async () => {
            await waitFor(() => {
                fireEvent.change(screen.getByLabelText('Anchura *'), { target: { value: '10' } });
                fireEvent.change(screen.getByLabelText('Altura *'), { target: { value: '10' } });
                fireEvent.change(screen.getByLabelText('Profundidad *'), { target: { value: '10' } });
                
            });
            expect(screen.getByText('Peso volumétrico:')).toBeInTheDocument();
            expect(screen.getByText('0.17 (kg)')).toBeInTheDocument();
        });

    });

    test('Muestra el texto "Introduzca correctamente los datos del paquete." en el caso de que falte introducir algún dato o algún dato sea negativo y se dé al botón de añadir', async () => {
        fireEvent.change(screen.getByLabelText('Anchura *'), { target: { value: '-10' } });
        fireEvent.change(screen.getByLabelText('Altura *'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Profundidad *'), { target: { value: '10' } });
        const button = screen.getByText('Añadir');
        expect(button).toBeInTheDocument();
        await fireEvent.click(button);
        expect(screen.getByText('Introduzca correctamente los datos del paquete.')).toBeInTheDocument();
    });

    test('Muestra el texto "El peso de los paquetes no puede superar los 50 kg." en el caso de que el peso volumétrico supere los 50 kg y se dé al botón de añadir', async () => {
        fireEvent.change(screen.getByLabelText('Anchura *'), { target: { value: '1000' } });
        fireEvent.change(screen.getByLabelText('Altura *'), { target: { value: '1000' } });
        fireEvent.change(screen.getByLabelText('Profundidad *'), { target: { value: '1000' } });
        const button = screen.getByText('Añadir');
        expect(button).toBeInTheDocument();
        await fireEvent.click(button);
        expect(screen.getByText('El peso de los paquetes no puede superar los 50 kg.')).toBeInTheDocument();
    });

    test('Muestra el texto "El peso está calculado según el volumen del paquete. La fórmula es el volumen entre 6000."',  () => {
        expect(screen.getByText('El peso está calculado según el volumen del paquete. La fórmula es el volumen entre 6000.')).toBeInTheDocument();
    });

    test('Muestra el texto "¿El paquete es frágil?" y un botón que cambia entre "Sí" o "No", cambiando el valor de fragility del paquete',  () => {
        expect(screen.getByText('¿El paquete es frágil?')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
        fireEvent.click(screen.getByText('No'));
        expect(screen.getByText('Sí')).toBeInTheDocument();
    });

    test('Muestra el botón de Añadir, que redirige a la ruta /enviar-paquete/paquete y añade el paquete. Para ello debe rellenar los campos de anchura, altura y profundidad',  () => {
        fireEvent.change(screen.getByLabelText('Anchura *'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Altura *'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Profundidad *'), { target: { value: '10' } });
        const button = screen.getByText('Añadir');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(window.location.pathname).toBe('/enviar-paquete');
    });

    test('Muestra el botón de Volver, que redirige a la ruta /enviar-paquete/paquete sin añadir el paquete',  () => {
        const button = screen.getByText('Volver');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(window.location.pathname).toBe('/enviar-paquete');
    });

});