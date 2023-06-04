import { render, screen, fireEvent } from '@testing-library/react';
import ReturnView from './ReturnView.js';
import '@testing-library/jest-dom'
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

describe('ReturnView', () => {

    let props = {};

    beforeAll(() => {
        const order_selected = { Id: 100, Customer_Id: 100, Origin: 'Calle 1', Destination: 'Calle 2', Additional_Destination: 'Calle 3', Volume: 10, Cost: 10, State: 'En camino', Shipment_Type: 'Normal', Collection_Date: '2023-01-08 12:00:00', Expected_Collection_Date: '2023-01-08 12:30:00', Expected_Arrival_Date: '2023-01-08 13:00:00', Expected_Return_Date: "", Employee_In_Charge: 100, Active: 1, Expedition_Number: 123456789 };
        const customer_selected = { Id: 100, Name: 'Cliente 1', Email: 'c100@email.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle cliente, 1' };
        const order_table = [{ Id: 100, Customer_Id: 100, Origin: 'Calle 1', Destination: 'Calle 2', Additional_Destination: 'Calle 3', Volume: 10, Cost: 10, State: 'En camino', Shipment_Type: 'Normal', Collection_Date: '2023-01-08 12:00:00', Expected_Collection_Date: '2023-01-08 12:30:00', Expected_Arrival_Date: '2023-01-08 13:00:00', Expected_Return_Date: "", Employee_In_Charge: 100, Active: 1, Expedition_Number: 123456789 }];
        const setcost = jest.fn();
        props = { order_selected, customer_selected, order_table, setcost };
    });

    beforeEach(() => {
        window.history.pushState({}, 'Test page', '/pedido=/123456789/devolución');
        render(<BrowserRouter initialEntries={['/pedido=/123456789/devolución']}><Routes><Route path="/pedido=/:OrderId/devolución" element={<ReturnView {...props}/>}></Route></Routes></BrowserRouter>);
    });

    test('Muestra el título "Devolución" y el texto "¿Estás seguro que quieres devolver tu pedido?"', () => {
        expect(screen.getByText('Devolución')).toBeInTheDocument();
        expect(screen.getByText('¿Estás seguro que quieres devolver tu pedido?')).toBeInTheDocument();
    });

    test('Muestra los textos "El coste de devolución es 7.09€, al confirmar la devolución estás aceptando abonar el coste adicional especificado anteriormente.", mostrando el precio separado, y "Tenga en cuenta que la devolución será efectuada en la oficina desde la que se envió el pedido. En caso de que el pedido se enviara con opción de domiciliación, la devolución será efectuada en la dirección origen desde la que se envió el pedido.". Necesita hacer un timeout de un segundo para cargar el valor del coste', () => {
        setTimeout(() => {
            expect(screen.getByText('El coste de devolución es 7.09€, al confirmar la devolución estás aceptando abonar el coste adicional especificado anteriormente.')).toBeInTheDocument();
            expect(screen.getByText('Tenga en cuenta que la devolución será efectuada en la oficina desde la que se envió el pedido. En caso de que el pedido se enviara con opción de domiciliación, la devolución será efectuada en la dirección origen desde la que se envió el pedido.')).toBeInTheDocument();
        }, 1000);
    });

    test('Muestra el botón "Devolver" y navega a /devolver-pedido/123456789/pago', () => {
        const button = screen.getByText('Devolver');
        fireEvent.click(button);
        expect(window.location.pathname).toBe('/devolver-pedido/123456789/pago');
    });

    test('Muestra el botón "Volver" y navega a /pedido=/123456789', () => {
        const button = screen.getByText('Volver');
        fireEvent.click(button);
        expect(window.location.pathname).toBe('/pedido=/123456789');
    });

});