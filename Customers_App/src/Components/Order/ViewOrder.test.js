import { render, screen, fireEvent } from '@testing-library/react';
import ViewOrder from './ViewOrder.js';
import '@testing-library/jest-dom'
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

describe('ViewOrder', () => {   
    let props = {};

    beforeAll(() => {
        const customer_selected = { Id: 100, Name: 'Cliente 1', Email: 'cliente1@gmail.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle 1' };
        const order_table = [{ Id: 100, Customer_Id: 100, Origin: 'Calle 1', Destination: 'Calle 2', Additional_Destination: 'Calle 3', Volume: 10, Cost: 10, State: 'En camino', Shipment_Type: 'Normal', Collection_Date: '2023-01-08 12:00:00', Expected_Collection_Date: '2023-01-08 12:30:00', Expected_Arrival_Date: '2023-01-08 13:00:00', Expected_Return_Date: "", Employee_In_Charge: 100, Active: 1, Expedition_Number: 123456789 }];
        const order_selected = { Id: 100, Customer_Id: 100, Origin: 'Calle 1', Destination: 'Calle 2', Additional_Destination: 'Calle 3', Volume: 10, Cost: 10, State: 'En camino', Shipment_Type: 'Normal', Collection_Date: '2023-01-08 12:00:00', Expected_Collection_Date: '2023-01-08 12:30:00', Expected_Arrival_Date: '2023-01-08 13:00:00', Expected_Return_Date: "", Employee_In_Charge: 100, Active: 1, Expedition_Number: 123456789 };
        const package_table = [{ Id: 100, Order_Id: 100, Weight: 10, Width: 10, Length: 10, Volume: 1000, Fragility: 0}];
        props = { customer_selected, order_table, package_table, order_selected};
    });

    beforeEach(() => {
        window.history.pushState({}, 'Test page', '/pedido=/123456789');
        render(<BrowserRouter initialEntries={['/pedido=/123456789']}><Routes><Route path="/pedido=/:OrderId" element={<ViewOrder {...props}/>}></Route></Routes></BrowserRouter>);
    });

    describe('El estado del paquete es "En camino" con la sesión iniciada', () => {

        test('Pone el título como "Pedido: + OrderId" y la fecha esperada de llegada como "La llegada estimada de su pedido es el "+ fecha de llegada como "DD-MM-YYYY a las HH+1:MM"', () => {
            expect(screen.getByText('Pedido: 123456789')).toBeInTheDocument();
            expect(screen.getByText('La llegada estimada de su pedido es el')).toBeInTheDocument();
            expect(screen.getByText('08-01-2023 a las 14:00')).toBeInTheDocument();
        });

        test('Muestra la foto con alt "línea de seguimiento de pedidos"', () => {
            expect(screen.getByAltText('línea de seguimiento de pedidos')).toBeInTheDocument();
        });

        test('Muestra el texto "El estado actual de su pedido es "En camino", con la descripción "El pedido está en camino hacia el destino esperado."', () => {
            expect(screen.getByText('El estado actual de su pedido es "En camino"')).toBeInTheDocument();
            expect(screen.getByText('El pedido está en camino hacia el destino esperado.')).toBeInTheDocument();
        });

        test('Muestra "Información del pedido" y un cuadro con dicha información entre la que encontramos el origen, destino, fecha de recogida, fecha de entrega, fecha esperada de entrega, tipo de entrega (Normal o Express) y bulto (número de paquetes, en este caso 1) con formato "Campo: valor". Las fechas en formato "DD-MM-YYYY HH+1:MM", si el pedido no tiene dicha fecha se pone "Sin definir"', () => {
            expect(screen.getByText('Información del pedido')).toBeInTheDocument();
            expect(screen.getByText('Origen:')).toBeInTheDocument();
            expect(screen.getByText('Calle 1')).toBeInTheDocument();
            expect(screen.getByText('Destino:')).toBeInTheDocument();
            expect(screen.getByText('Calle 2')).toBeInTheDocument();
            expect(screen.getByText('Destino adicional:')).toBeInTheDocument();
            expect(screen.getByText('Calle 3')).toBeInTheDocument();
            expect(screen.getByText('Fecha de recogida:')).toBeInTheDocument();
            expect(screen.getByText('08-01-2023 13:00')).toBeInTheDocument();
            expect(screen.getByText('Fecha de entrega:')).toBeInTheDocument();
            expect(screen.getByText('Sin definir')).toBeInTheDocument();
            expect(screen.getByText('Fecha esperada de entrega:')).toBeInTheDocument();
            expect(screen.getByText('08-01-2023 14:00')).toBeInTheDocument();
            expect(screen.getByText('Tipo de entrega:')).toBeInTheDocument();
            expect(screen.getByText('Normal')).toBeInTheDocument();
            expect(screen.getByText('Bulto:')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument();
        });

        test('Muestra el texto "Ante cualquier problema pongase en contacto con nosotros llamando al número: 644 607 777" y el botón de Devolver (que va a /pedido=/120121425/devolución)', () => {
            expect(screen.getByText('Ante cualquier problema pongase en contacto con nosotros llamando al número:')).toBeInTheDocument();
            expect(screen.getByText('644 607 777')).toBeInTheDocument();
            const return_button = screen.getByRole('button', { name: 'Devolver' });
            expect(return_button).toBeInTheDocument();
            fireEvent.click(return_button);
            expect(window.location.pathname).toBe('/pedido=/123456789/devoluci%C3%B3n');
        });

        test('Muestra el botón de volver a la página principal (que lleva a /)', () => {
            const home_button = screen.getByRole('button', { name: 'Volver a la página principal' });
            expect(home_button).toBeInTheDocument();
            fireEvent.click(home_button);
            expect(window.location.pathname).toBe('/');
        });

    });

    describe('El estado del paquete es "En camino" con la sesión sin iniciar', () => {

        beforeAll(() => {props.customer_selected = ""});

        test('Aparece el texto "Inicia sesión para ver la información detallada del pedido" y el botón de iniciar sesión que redirige a /iniciar-sesion', () => {
            expect(screen.getByText('Inicia sesión para ver la información detallada del pedido')).toBeInTheDocument();
            const login_button = screen.getByRole('button', { name: 'Iniciar sesión' });
            expect(login_button).toBeInTheDocument();
            fireEvent.click(login_button);
            expect(window.location.pathname).toBe('/iniciar-sesion');
        });

        test('No muestra la información del pedido. Ejemplo origen, destino, fecha de recogida...', () => {
            expect(screen.queryByText('Origen:')).not.toBeInTheDocument();
            expect(screen.queryByText('Calle 1')).not.toBeInTheDocument();
            expect(screen.queryByText('Destino:')).not.toBeInTheDocument();
            expect(screen.queryByText('Calle 2')).not.toBeInTheDocument();
            expect(screen.queryByText('Destino adicional:')).not.toBeInTheDocument();
            expect(screen.queryByText('Calle 3')).not.toBeInTheDocument();
            expect(screen.queryByText('Fecha de recogida:')).not.toBeInTheDocument();
            expect(screen.queryByText('08-01-2023 13:00')).not.toBeInTheDocument();
            expect(screen.queryByText('Fecha de entrega:')).not.toBeInTheDocument();
            expect(screen.queryByText('Sin definir')).not.toBeInTheDocument();
            expect(screen.queryByText('Fecha esperada de entrega:')).not.toBeInTheDocument();
            expect(screen.queryByText('08-01-2023 14:00')).not.toBeInTheDocument();
            expect(screen.queryByText('Tipo de entrega:')).not.toBeInTheDocument();
            expect(screen.queryByText('Normal')).not.toBeInTheDocument();
            expect(screen.queryByText('Bulto:')).not.toBeInTheDocument();
            expect(screen.queryByText('1')).not.toBeInTheDocument();
        });

        test('No muestra el botón de devolver', () => {
            expect(screen.queryByRole('button', { name: 'Devolver' })).not.toBeInTheDocument();
        });

    });
    
    describe('El estado del paquete es "En devolución - En camino" con la sesión iniciada', () => {

        beforeAll(() => {
            props.order_selected.State = "En devolución - En camino";
            props.order_selected.Expected_Return_Date = "2023-01-10 12:30:00";
        });

        test('Muestra el texto "El pedido se encuentra en devolución" y la fecha esperada de devolución como "La fecha de devolución estimada de su pedido es el "+ fecha de devolución como "DD-MM-YYYY a las HH+1:MM". También muestra el texto "Tenga en cuenta que la devolución será efectuada en la oficina desde la que se envió el pedido. En caso de que el pedido se enviara con opción de domiciliación, la devolución será efectuada en la dirección origen desde la que se envió el pedido."', () => {
            expect(screen.getByText('El pedido se encuentra en devolución')).toBeInTheDocument();
            expect(screen.getByText('La fecha de devolución estimada de su pedido es el')).toBeInTheDocument();
            expect(screen.getByText('10-01-2023 a las 13:30')).toBeInTheDocument();
            expect(screen.getByText('Tenga en cuenta que la devolución será efectuada en la oficina desde la que se envió el pedido. En caso de que el pedido se enviara con opción de domiciliación, la devolución será efectuada en la dirección origen desde la que se envió el pedido.')).toBeInTheDocument();
        });
    });

});