import { fireEvent, render, screen } from '@testing-library/react';
import MainPage from './MainPage.js';
import '@testing-library/jest-dom'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

describe('MainPage', () => {   
    let props = {};

    beforeAll(() => {
        const customer_selected = { Id: 100, Name: 'Cliente 1', Email: 'cliente1@gmail.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle 1' };
        const order_table = [{ Id: 100, Customer_Id: 100, Origin: 'Calle 1', Destination: 'Calle 1', Additional_Destination: 'Calle 2', Volume: 10, Cost: 10, State: 'En trámite', Shipment_Type: 'Normal', Expected_Collection_Date: '2023-01-08 12:00:00', Expected_Arrival_Date: '2023-01-08 12:00:00', Employee_In_Charge: 100, Active: 1, Expedition_Number: 123456789 }];
        const package_table = [{ Id: 100, Order_Id: 100, Weight: 10, Width: 10, Length: 10, Volume: 1000, Fragility: 0}];
        const setorder_selected = jest.fn();
        props = { customer_selected, order_table, package_table, setorder_selected };
    });

    describe('Si customer_selected es un cliente, debe mostrar los pedidos del cliente', () => {

        test('Muestra Tus pedidos', () => {
            render(<BrowserRouter><MainPage {...props} /></BrowserRouter>);
            const orders = screen.getByText('Tus pedidos');
            expect(orders).toBeInTheDocument();
        });

        test('Muestra los pedidos del cliente con su número de expedición como Pedido: número de expedición, estado como Estado: estado y el número de paquetes con "Bulto: número de paquetes". En el caso de pulsar el botón de ver pedido navega al pedido correspondiente con la ruta "/pedido=/"+order.Expedition_Number', () => {
            render(<BrowserRouter><MainPage {...props} /></BrowserRouter>);
            const order = screen.getByText('Pedido: 123456789');
            expect(order).toBeInTheDocument();
            const state = screen.getByText('Estado: En trámite');
            expect(state).toBeInTheDocument();
            const packages = screen.getByText('Bulto: 1');
            expect(packages).toBeInTheDocument();
            const order_button = screen.getByText('Ver pedido');
            expect(order_button).toBeInTheDocument();
            order_button.click();
            expect(window.location.pathname).toBe('/pedido=/123456789');
        });

        test('Muestra "No tienes ningún pedido." cuando no tiene pedidos', () => {
            props.order_table = [];
            render(<BrowserRouter><MainPage {...props} /></BrowserRouter>);
            const no_orders = screen.getByText('No tienes ningún pedido.');
            expect(no_orders).toBeInTheDocument();
        });
    })

    test('Muestra la foto con texto por defecto "Foto_principal_1", un texto de "Envía tu paquete" con su descripción "Envía tu paquete con la mayor seguridad y rapidez." y el botón de "Enviar paquete" que redirige a /enviar-paquete', () => {
        props.order_table = [{ Id: 100, Customer_Id: 100, Destination: 'Calle 1', Additional_Destination: 'Calle 2', Volume: 10, Cost: 10, State: 'En trámite', Shipment_Type: 'Normal', Expected_Collection_Date: '2023-01-08 12:00:00', Expected_Arrival_Date: '2023-01-08 12:00:00', Active: 1, Expedition_Number: 123456789 }];
        render(<BrowserRouter><MainPage {...props} /></BrowserRouter>);
        const send_packet_photo = screen.getByAltText('Foto_principal_1');
        expect(send_packet_photo).toBeInTheDocument();
        const send_packet_text = screen.getByText('Envía tu paquete');
        expect(send_packet_text).toBeInTheDocument();
        const send_packet_description = screen.getByText('Envía tu paquete con la mayor seguridad y rapidez.');
        expect(send_packet_description).toBeInTheDocument();
        const send_packet_button = screen.getByText('Enviar paquete');
        expect(send_packet_button).toBeInTheDocument();
        send_packet_button.click();
        expect(window.location.pathname).toBe('/enviar-paquete');
    });

    test('Muestra la foto con texto por defecto "Foto_principal_2", un texto de "Seguimiento del pedido" con su descripción "Introduce el número de seguimiento de tu pedido." y un input para poner el número de expedición del paquete. Si existe un paquete en order_table con dicho número de expedición lo redirige a la ruta /pedido=/+ número pulsando el botón con texto "Buscar"', () => {
        render(<BrowserRouter><MainPage {...props} /></BrowserRouter>);    
        const track_packet_photo = screen.getByAltText('Foto_principal_2');
        expect(track_packet_photo).toBeInTheDocument();
        const track_packet_text = screen.getByText('Seguimiento del pedido');
        expect(track_packet_text).toBeInTheDocument();
        const track_packet_description = screen.getByText('Introduce el número de seguimiento de tu pedido.');
        expect(track_packet_description).toBeInTheDocument();
        const track_packet_input = screen.getByPlaceholderText('Número de seguimiento');
        expect(track_packet_input).toBeInTheDocument();
        fireEvent.change(track_packet_input, { target: { value: '123456789' } });
        const track_packet_button = screen.getByText('Buscar');
        expect(track_packet_button).toBeInTheDocument();
        track_packet_button.click();
        expect(window.location.pathname).toBe('/pedido=/123456789');
    });

    test('Muestra la alerta "El número de seguimiento introducido no es correcto." en caso de que el input no tenga el valor del número de expedición correctamente', async () => {
        window.history.pushState({}, 'Test page3', '/');
        render(<BrowserRouter><MainPage {...props} /></BrowserRouter>);
        expect(window.location.pathname).toBe('/');
        const track_packet_input = screen.getByPlaceholderText('Número de seguimiento');
        expect(track_packet_input).toBeInTheDocument();
        track_packet_input.value = '12345678';
        track_packet_input.dispatchEvent(new Event('change'));
        const track_packet_button = screen.getByText('Buscar');
        expect(track_packet_button).toBeInTheDocument();
        await track_packet_button.click();
        const alert = screen.getByText('El número de seguimiento introducido no es correcto.');
        expect(alert).toBeInTheDocument();
    });

    test('Muestra las tarjetas de "Contacto", "Transporte" y "Sostenibilidad"', () => {
        render(<BrowserRouter><MainPage {...props} /></BrowserRouter>);
        const contact_card = screen.getByText('Contacto');
        expect(contact_card).toBeInTheDocument();
        const transport_card = screen.getByText('Transporte');
        expect(transport_card).toBeInTheDocument();
        const sostenibility_card = screen.getByText('Sostenibilidad');
        expect(sostenibility_card).toBeInTheDocument();
    });


});