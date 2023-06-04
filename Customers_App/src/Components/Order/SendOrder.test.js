import { render, screen, fireEvent } from '@testing-library/react';
import SendOrder from './SendOrder.js';
import '@testing-library/jest-dom'
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

describe('SendOrder', () => {

    let props = {};

    beforeAll(() => {
        const packages = [{width: 10, height: 10, length: 10, fragility: "No", volume: 1000, weight: 0.6}];
        const setpackages = jest.fn((packets) => props.packages = packets);
        const customer_selected = "";
        const customer_table = [{ Id: 100, Name: 'Cliente 1', Email: 'c100@email.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle cliente, 1'}];
        const employee_table = [{ Id: 100, Name: 'Empleado 1', Email: 'e100@email.com', DNI: '11111111A', Phone: '666666666', Role: 'repartidor', Employee_Id: '100', Active: 1}];
        const order_table = [{ Id: 100, Customer_Id: 100, Origin: 'Calle 1', Destination: 'Calle 2', Additional_Destination: 'Calle 3', Volume: 10, Cost: 10, State: 'En camino', Shipment_Type: 'Normal', Collection_Date: '2023-01-08 12:00:00', Expected_Collection_Date: '2023-01-08 12:30:00', Expected_Arrival_Date: '2023-01-08 13:00:00', Expected_Return_Date: "", Employee_In_Charge: 100, Active: 1, Expedition_Number: 123456789 }];
        const setcustomer_created = jest.fn();
        const customer_created = {};
        const order = {};
        const setorder = jest.fn();
        const sendOrder = jest.fn();
        const sendPackage = jest.fn();
        const setcost = jest.fn();
        const sendEmail = jest.fn();
        props = { setpackages, packages, customer_selected, customer_table, employee_table, order_table, setcustomer_created, customer_created, order, setorder, sendOrder, sendPackage, setcost, sendEmail };
    });

    beforeEach(() => {
        window.history.pushState({}, 'Test page', '/enviar-paquete');
    });

    test('Muestra el título "Envía tus paquetes"', () => {
        render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
        expect(screen.getByText('Envía tus paquetes')).toBeInTheDocument();
    });

    test('Muestra el texto "Introduce tus datos personales" con el formulario con los inputs "Nombre *", "Primer apellido *", "Segundo apellido *", "Correo electrónico *", "Teléfono *", "NIF/CIF/NIE *", "Dirección *" y el código postal con id="PostalCodeCustomer"', () => {
        render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
        expect(screen.getByText('Introduce tus datos personales')).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre *')).toBeInTheDocument();
        expect(screen.getByLabelText('Primer apellido *')).toBeInTheDocument();
        expect(screen.getByLabelText('Segundo apellido *')).toBeInTheDocument();
        expect(screen.getByLabelText('Correo electrónico *')).toBeInTheDocument();
        expect(screen.getByLabelText('Teléfono *')).toBeInTheDocument();
        expect(screen.getByLabelText('NIF/CIF/NIE *')).toBeInTheDocument();
        expect(screen.getByLabelText('Dirección *')).toBeInTheDocument();
        expect(screen.getByTestId('PostalCodeCustomer')).toBeInTheDocument();
    });

    test('Muestra los textos "Introduce tu DNI o NIE. En caso de ser una empresa, introduce el CIF." y "Introduce la dirección de tu domicilio." del formulario', () => {
        render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
        expect(screen.getByText('Introduce tu DNI o NIE. En caso de ser una empresa, introduce el CIF.')).toBeInTheDocument();
        expect(screen.getByText('Introduce la dirección de tu domicilio.')).toBeInTheDocument();
    });

    test('Muestra la alerta "El NIF/CIF/NIE introducido ya está registrado. Si ya eres cliente, inicia sesión." cuando se introduce un identificador que se encuentra en la base de datos "11111111A"', () => {
        render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
        const nameInput = screen.getByLabelText('Nombre *');
        fireEvent.change(nameInput, { target: { value: 'Nombre' } });
        const surnameInput = screen.getByLabelText('Primer apellido *');
        fireEvent.change(surnameInput, { target: { value: 'Apellido' } });
        const secondSurnameInput = screen.getByLabelText('Segundo apellido *');
        fireEvent.change(secondSurnameInput, { target: { value: 'Apellido' } });
        const emailInput = screen.getByLabelText('Correo electrónico *');
        fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
        const phoneInput = screen.getByLabelText('Teléfono *');
        fireEvent.change(phoneInput, { target: { value: '666666666' } });
        const dniInput = screen.getByLabelText('NIF/CIF/NIE *');
        fireEvent.change(dniInput, { target: { value: '11111111A' } });
        const addressInput = screen.getByLabelText('Dirección *');
        fireEvent.change(addressInput, { target: { value: 'dirección' } });
        const postalCodeInput = screen.getByTestId('PostalCodeCustomer');
        fireEvent.change(postalCodeInput, { target: { value: '111111' } });
        const sendButton = screen.getByRole('button', { name: 'Enviar' });
        expect(sendButton).toBeInTheDocument();
        fireEvent.click(sendButton);
        expect(screen.getByText('El NIF/CIF/NIE introducido ya está registrado. Si ya eres cliente, inicia sesión.')).toBeInTheDocument();
    });

    test('Muestra la alerta "El correo electrónico introducido ya está registrado. Si ya eres cliente, inicia sesión." cuando se introduce un email que se encuentra en la base de datos "c100@email.com"', () => {
        render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
        const nameInput = screen.getByLabelText('Nombre *');
        fireEvent.change(nameInput, { target: { value: 'Nombre' } });
        const surnameInput = screen.getByLabelText('Primer apellido *');
        fireEvent.change(surnameInput, { target: { value: 'Apellido' } });
        const secondSurnameInput = screen.getByLabelText('Segundo apellido *');
        fireEvent.change(secondSurnameInput, { target: { value: 'Apellido' } });
        const emailInput = screen.getByLabelText('Correo electrónico *');
        fireEvent.change(emailInput, { target: { value: 'c100@email.com' } });
        const phoneInput = screen.getByLabelText('Teléfono *');
        fireEvent.change(phoneInput, { target: { value: '666666666' } });
        const dniInput = screen.getByLabelText('NIF/CIF/NIE *');
        fireEvent.change(dniInput, { target: { value: '00000000A' } });
        const addressInput = screen.getByLabelText('Dirección *');
        fireEvent.change(addressInput, { target: { value: 'dirección' } });
        const postalCodeInput = screen.getByTestId('PostalCodeCustomer');
        fireEvent.change(postalCodeInput, { target: { value: '111111' } });
        const sendButton = screen.getByRole('button', { name: 'Enviar' });
        expect(sendButton).toBeInTheDocument();
        fireEvent.click(sendButton);
        expect(screen.getByText('El correo electrónico introducido ya está registrado. Si ya eres cliente, inicia sesión.')).toBeInTheDocument();
    });

    test('Muestra el botón de "Enviar", al pulsarlo se muestra la alerta "Rellena los datos personales correctamente.". Para ello rellena los campos del formulario', () => {
        render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
        const nameInput = screen.getByLabelText('Nombre *');
        fireEvent.change(nameInput, { target: { value: 'Nombre' } });
        const surnameInput = screen.getByLabelText('Primer apellido *');
        fireEvent.change(surnameInput, { target: { value: 'Apellido' } });
        const secondSurnameInput = screen.getByLabelText('Segundo apellido *');
        fireEvent.change(secondSurnameInput, { target: { value: 'Apellido' } });
        const emailInput = screen.getByLabelText('Correo electrónico *');
        fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
        const phoneInput = screen.getByLabelText('Teléfono *');
        fireEvent.change(phoneInput, { target: { value: '666666666' } });
        const dniInput = screen.getByLabelText('NIF/CIF/NIE *');
        fireEvent.change(dniInput, { target: { value: 'dni' } });
        const addressInput = screen.getByLabelText('Dirección *');
        fireEvent.change(addressInput, { target: { value: 'dirección' } });
        const postalCodeInput = screen.getByTestId('PostalCodeCustomer');
        fireEvent.change(postalCodeInput, { target: { value: '11111' } });
        const sendButton = screen.getByRole('button', { name: 'Enviar' });
        expect(sendButton).toBeInTheDocument();
        fireEvent.click(sendButton);
        expect(screen.getByText('Rellena los datos personales correctamente.')).toBeInTheDocument();
    });
    
    describe('Los test se hacen con un cliente registrado', () => {

        beforeAll(() => {
            props.customer_selected = {Id: 100, Name: 'Cliente 1', Email: 'c100@email.com', Customer_Id: '11111111A', Phone: '666666666', Address: 'Calle cliente, 1'};
        });

        test('Muestra el texto "Introduce los datos de tu pedido" con el formulario con los inputs "Dirección de origen *", "Dirección de destino *", "Dirección adicional de destino", "Tipo de envío *, "Fecha deseada de recogida *", "Fecha deseada de entrega *", "Comentarios adicionales" y los códigos postales con id="PostalCodeOrigin", "PostalCodeDestination" y "PostalCodeaddDestination"', () => {
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            expect(screen.getByText('Introduce los datos de tu pedido')).toBeInTheDocument();
            expect(screen.getByLabelText('Dirección de origen *')).toBeInTheDocument();
            expect(screen.getByLabelText('Dirección de destino *')).toBeInTheDocument();
            expect(screen.getByLabelText('Dirección adicional de destino')).toBeInTheDocument();
            expect(screen.getByLabelText('Tipo de envío *')).toBeInTheDocument();
            expect(screen.getByLabelText('Fecha deseada de recogida *')).toBeInTheDocument();
            expect(screen.getByLabelText('Fecha deseada de entrega *')).toBeInTheDocument();
            expect(screen.getByLabelText('Comentarios adicionales')).toBeInTheDocument();
            expect(screen.getByTestId('PostalCodeOrigin')).toBeInTheDocument();
            expect(screen.getByTestId('PostalCodeDestination')).toBeInTheDocument();
            expect(screen.getByTestId('PostalCodeaddDestination')).toBeInTheDocument();
        });

        test('Muestra el texto "Entre la fecha deseada de recogida y de entrega debe haber 5 días de diferencia como mínimo en caso de un pedido "Normal" y 2 días en el caso de un pedido "Express"."', () => {
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            expect(screen.getByText('Entre la fecha deseada de recogida y de entrega debe haber 5 días de diferencia como mínimo en caso de un pedido "Normal" y 2 días en el caso de un pedido "Express".')).toBeInTheDocument();
        });

        test('Muestra la alerta "Rellena los datos del pedido correctamente." cuando se introducen datos erróneos. Para ello rellena el formulario y pulsa el botón enviar', () => {
        render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
        const originInput = screen.getByLabelText('Dirección de origen *');
        fireEvent.change(originInput, { target: { value: '' } });
        const destinationInput = screen.getByLabelText('Dirección de destino *');
        fireEvent.change(destinationInput, { target: { value: 'dirección' } });
        const addDestinationInput = screen.getByLabelText('Dirección adicional de destino');
        fireEvent.change(addDestinationInput, { target: { value: 'dirección' } });
        const typeInput = screen.getByLabelText('Tipo de envío *');
        fireEvent.change(typeInput, { target: { value: 'Normal' } });
        const dateInput = screen.getByLabelText('Fecha deseada de recogida *');
        fireEvent.change(dateInput, { target: { value: '2021-01-01' } });
        const dateInput2 = screen.getByLabelText('Fecha deseada de entrega *');
        fireEvent.change(dateInput2, { target: { value: '2021-01-01' } });
        const commentsInput = screen.getByLabelText('Comentarios adicionales');
        fireEvent.change(commentsInput, { target: { value: 'comentarios' } });
        const postalCodeInput = screen.getByTestId('PostalCodeOrigin');
        fireEvent.change(postalCodeInput, { target: { value: '111111' } });
        const postalCodeInput2 = screen.getByTestId('PostalCodeDestination');
        fireEvent.change(postalCodeInput2, { target: { value: '111111' } });
        const postalCodeInput3 = screen.getByTestId('PostalCodeaddDestination');
        fireEvent.change(postalCodeInput3, { target: { value: '111111' } });
        const sendButton = screen.getByRole('button', { name: 'Enviar' });
        expect(sendButton).toBeInTheDocument();
        fireEvent.click(sendButton);
        expect(screen.getByText('Rellena los datos del pedido correctamente.')).toBeInTheDocument();
        });

        test('Muestra los datos del paquete añadido. Para ello pone "Paquete nº 1", "Peso: 0.6 kg", "Altura: 10 cm", "Anchura: 10 cm", "Profundidad: 10 cm", "Volumen: 1000 cm<sup>3</sup>" y "Fragilidad: No"', () => {
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            expect(screen.getByText('Paquete nº 1')).toBeInTheDocument();
            expect(screen.getByText('Peso: 0.6 kg')).toBeInTheDocument();
            expect(screen.getByText('Altura: 10 cm')).toBeInTheDocument();
            expect(screen.getByText('Anchura: 10 cm')).toBeInTheDocument();
            expect(screen.getByText('Profundidad: 10 cm')).toBeInTheDocument();
            expect(screen.getByText('Volumen: 1000 cm³')).toBeInTheDocument();
            expect(screen.getByText('Fragilidad: No')).toBeInTheDocument();
        });
    
        test('Muestra el botón de "Añadir paquete", al pulsarlo redirige a la ruta /enviar-paquete/paquete/2', () => {
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            const addButton = screen.getByRole('button', { name: 'Añadir paquete' });
            expect(addButton).toBeInTheDocument();
            fireEvent.click(addButton);
            expect(window.location.pathname).toBe('/enviar-paquete/paquete/2');
        });
    
        test('Muestra el botón de "Eliminar paquete", al pulsarlo elimina el paquete, para ello comprueba que la longitud de props.package sea 0', async () => {
            props.packages = [{width: 10, height: 10, length: 10, fragility: "No", volume: 1000, weight: 0.6}];
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            const deleteButton = screen.getByRole('button', { name: 'Eliminar paquete' });
            expect(deleteButton).toBeInTheDocument();
            await fireEvent.click(deleteButton);
            setTimeout(() => {
                expect(props.packages.length).toBe(0);
            }, 1000);
        });
    
        test('Muestra texto "El coste del pedido son 12.75 €". En el caso de que se añada otro paquete con los valores de altura, anchura y profundidad de 50 el coste debe ser 36', () => {
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            expect(screen.getByText('El coste del pedido son 12.75 €')).toBeInTheDocument();
            props.packages = [{width: 10, height: 10, length: 10, fragility: "No", volume: 1000, weight: 0.6},{width: 50, height: 50, length: 50, fragility: "No", volume: 125000, weight: 20.83}];
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            expect(screen.getByText('El coste del pedido son 36.40 €')).toBeInTheDocument();
        });

        test('Muestra el testo "Añade paquetes para realizar el pedido." cuando se pulsa el botón de enviar con props.packages vacío. Para ello rellena todos los campos del formulario', async () => {
            props.packages = [];
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            const originInput = screen.getByLabelText('Dirección de origen *');
            fireEvent.change(originInput, { target: { value: 'dirección' } });
            const destinationInput = screen.getByLabelText('Dirección de destino *');
            fireEvent.change(destinationInput, { target: { value: 'dirección' } });
            const addDestinationInput = screen.getByLabelText('Dirección adicional de destino');
            fireEvent.change(addDestinationInput, { target: { value: 'dirección' } });
            const typeInput = screen.getByLabelText('Tipo de envío *');
            fireEvent.change(typeInput, { target: { value: 'Normal' } });
            const dateInput = screen.getByLabelText('Fecha deseada de recogida *');
            fireEvent.change(dateInput, { target: { value: '2021-01-01 10:10' } });
            const dateInput2 = screen.getByLabelText('Fecha deseada de entrega *');
            fireEvent.change(dateInput2, { target: { value: '2021-01-10 10:10' } });
            const commentsInput = screen.getByLabelText('Comentarios adicionales');
            fireEvent.change(commentsInput, { target: { value: 'comentarios' } });
            const postalCodeInput = screen.getByTestId('PostalCodeOrigin');
            fireEvent.change(postalCodeInput, { target: { value: '11111' } });
            const postalCodeInput2 = screen.getByTestId('PostalCodeDestination');
            fireEvent.change(postalCodeInput2, { target: { value: '11111' } });
            const postalCodeInput3 = screen.getByTestId('PostalCodeaddDestination');
            fireEvent.change(postalCodeInput3, { target: { value: '11111' } });
            const sendButton = screen.getByRole('button', { name: 'Enviar' });
            await fireEvent.click(sendButton);
            expect(screen.getByText('Añade paquetes para realizar el pedido.')).toBeInTheDocument();
        });

        test('Muestra el botón de "Enviar", al pulsarlo redirige a /enviar-paquete/"+expedition_number+"/pagar (como expedition_number es aleatorio, testeamos que salga de la ruta actual). Para ello deben estar todos los campos rellenos correctamente y rellenar props.packages', async () => {
            props.packages = [{width: 10, height: 10, length: 10, fragility: "No", volume: 1000, weight: 0.6}];
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            const originInput = screen.getByLabelText('Dirección de origen *');
            fireEvent.change(originInput, { target: { value: 'dirección' } });
            const destinationInput = screen.getByLabelText('Dirección de destino *');
            fireEvent.change(destinationInput, { target: { value: 'dirección' } });
            const addDestinationInput = screen.getByLabelText('Dirección adicional de destino');
            fireEvent.change(addDestinationInput, { target: { value: 'dirección' } });
            const typeInput = screen.getByLabelText('Tipo de envío *');
            fireEvent.change(typeInput, { target: { value: 'Normal' } });
            const dateInput = screen.getByLabelText('Fecha deseada de recogida *');
            fireEvent.change(dateInput, { target: { value: '2021-01-01 10:10' } });
            const dateInput2 = screen.getByLabelText('Fecha deseada de entrega *');
            fireEvent.change(dateInput2, { target: { value: '2021-01-10 10:10' } });
            const commentsInput = screen.getByLabelText('Comentarios adicionales');
            fireEvent.change(commentsInput, { target: { value: 'comentarios' } });
            const postalCodeInput = screen.getByTestId('PostalCodeOrigin');
            fireEvent.change(postalCodeInput, { target: { value: '11111' } });
            const postalCodeInput2 = screen.getByTestId('PostalCodeDestination');
            fireEvent.change(postalCodeInput2, { target: { value: '11111' } });
            const postalCodeInput3 = screen.getByTestId('PostalCodeaddDestination');
            fireEvent.change(postalCodeInput3, { target: { value: '11111' } });
            const sendButton = screen.getByRole('button', { name: 'Enviar' });
            await fireEvent.click(sendButton);
            expect(window.location.pathname).not.toBe('/enviar-paquete');
        });

        test('Muestra el botón de "Volver al inicio", al pulsarlo redirige a /', () => {
            render(<BrowserRouter initialEntries={['/enviar-paquete']}><Routes><Route path="/enviar-paquete" element={<SendOrder {...props}/>}></Route></Routes></BrowserRouter>);
            const backButton = screen.getByRole('button', { name: 'Volver al inicio' });
            expect(backButton).toBeInTheDocument();
            fireEvent.click(backButton);
            expect(window.location.pathname).toBe('/');
        });

    });

});
