import { render, screen, fireEvent } from '@testing-library/react';
import Pay from './Pay.js';
import '@testing-library/jest-dom'
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

describe('Pay', () => {

    let props = {};

    beforeAll(() => {
        const cost = 7.09;
        const payOrder = jest.fn();
        const returnOrder = jest.fn();
        const order_table = [{ Id: 100, Customer_Id: 100, Origin: 'Calle 1', Destination: 'Calle 2', Additional_Destination: 'Calle 3', Volume: 10, Cost: 10, State: 'En camino', Shipment_Type: 'Normal', Collection_Date: '2023-01-08 12:00:00', Expected_Collection_Date: '2023-01-08 12:30:00', Expected_Arrival_Date: '2023-01-08 13:00:00', Expected_Return_Date: "", Employee_In_Charge: 100, Active: 1, Expedition_Number: 123456789 }];
        const sendEmail = jest.fn();
        const customer_selected = { Id: 100, Name: 'Cliente 1', Email: 'c100@email.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle cliente, 1' };
        props = { cost, payOrder, returnOrder, order_table, sendEmail, customer_selected };
    });

    beforeEach(() => {
        window.history.pushState({}, 'Test page', '/devolver-pedido/123456789/pago');
        render(<BrowserRouter initialEntries={['/devolver-pedido/123456789/pago']}><Routes><Route path="/devolver-pedido/:OrderId/pago" element={<Pay {...props}/>}></Route></Routes></BrowserRouter>);
    });

    test('Se muestra el título "Termina el proceso realizando el pago correspondiente"', () => {
        expect(screen.getByText('Termina el proceso realizando el pago correspondiente')).toBeInTheDocument();
    });

    test('Se muestra la foto con alt "Foto de la tarjeta"', () => {
        expect(screen.getByAltText('Foto de la tarjeta')).toBeInTheDocument();
    });

    test('Se muestra el formulario con los inputs "Número de tarjeta *", "Fecha de caducidad de la tarjeta *" y "CVV *"', () => {
        expect(screen.getByLabelText('Número de tarjeta *')).toBeInTheDocument();
        expect(screen.getByLabelText('Fecha de caducidad de la tarjeta *')).toBeInTheDocument();
        expect(screen.getByLabelText('CVV *')).toBeInTheDocument();
    });

    test('Se muestra el texto "El pago a realizar es de: 7.09 €"', () => {
        expect(screen.getByText('El pago a realizar es de:')).toBeInTheDocument();
        expect(screen.getByText('7.09 €')).toBeInTheDocument();
    });

    test('Se muestra el botón "Pagar"', () => {
        expect(screen.getByText('Pagar')).toBeInTheDocument();
    });

    test('Si al pulsar en el botón pagar el número de tarjeta es erróneo muestra la alerta "El número de tarjeta es erróneo."', () => {
        const payButton = screen.getByText('Pagar');
        const cardNumberInput = screen.getByLabelText('Número de tarjeta *');
        fireEvent.change(cardNumberInput, { target: { value: '123456789' } });
        fireEvent.click(payButton);
        expect(screen.getByText('El número de tarjeta es erróneo.')).toBeInTheDocument();
    });

    test('Si al pulsar en el botón pagar la fecha de caducidad de la tarjeta es errónea muestra la alerta "La fecha de caducidad de la tarjeta es errónea.". Antes debe estar el número de tarjeta introducido correctamente.', () => {
        const payButton = screen.getByText('Pagar');
        const cardNumberInput = screen.getByLabelText('Número de tarjeta *');
        fireEvent.change(cardNumberInput, { target: { value: '1234567891234567' } });
        const cardDateInput = screen.getByLabelText('Fecha de caducidad de la tarjeta *');
        fireEvent.change(cardDateInput, { target: { value: '01-2020' } });
        fireEvent.click(payButton);
        expect(screen.getByText('La fecha de caducidad de la tarjeta es errónea.')).toBeInTheDocument();
    });

    test('Si al pulsar en el botón pagar el CVV es erróneo muestra la alerta "El CVV de la tarjeta es erróneo.". Antes debe estar el número de tarjeta y la fecha de caducidad introducidos correctamente.', () => {
        const payButton = screen.getByText('Pagar');
        const cardNumberInput = screen.getByLabelText('Número de tarjeta *');
        fireEvent.change(cardNumberInput, { target: { value: '1234567891234567' } });
        const cardDateInput = screen.getByLabelText('Fecha de caducidad de la tarjeta *');
        fireEvent.change(cardDateInput, { target: { value: '2023-07-10' } });
        const cardCVVInput = screen.getByLabelText('CVV *');
        fireEvent.change(cardCVVInput, { target: { value: '' } });
        fireEvent.click(payButton);
        expect(screen.getByText('El CVV de la tarjeta es erróneo.')).toBeInTheDocument();
    });

    test('Si al pulsar en el botón pagar el número de tarjeta, la fecha de caducidad y el CVV son correctos se redirige a /', () => {
        const payButton = screen.getByText('Pagar');
        const cardNumberInput = screen.getByLabelText('Número de tarjeta *');
        fireEvent.change(cardNumberInput, { target: { value: '1234567891234567' } });
        const cardDateInput = screen.getByLabelText('Fecha de caducidad de la tarjeta *');
        fireEvent.change(cardDateInput, { target: { value: '2023-07-10' } });
        const cardCVVInput = screen.getByLabelText('CVV *');
        fireEvent.change(cardCVVInput, { target: { value: '123' } });
        fireEvent.click(payButton);
        expect(window.location.pathname).toBe('/');
    });

    test('Muestra el botón "Volver atrás"', async () => {
        expect(screen.getByText('Volver atrás')).toBeInTheDocument();
    });

});