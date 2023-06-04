import './SendOrder.css';

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// Componente que muestra el formulario de envío de pedido. Tiene la posibilidad de añadir un nuevo cliente si no hay ningún cliente con la sesión iniciada.
//También tiene la posibilidad de añadir un nuevo pedido y los paquetes de dicho pedido.
export default function SendOrder(props) {
    const [name, setname] = useState("");
    const [first_surname, setfirst_surname] = useState("");
    const [second_surname, setsecond_surname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [dni, setdni] = useState("");
    const [address, setaddress] = useState("");
    const [postcode, setpostcode] = useState("");
    const [origin, setorigin] = useState("");
    const [postcodeorigin, setpostcodeorigin] = useState("");
    const [destination, setdestination] = useState("");
    const [postcodedestination, setpostcodedestination] = useState("");
    const [additionaldestination, setadditionaldestination] = useState("");
    const [postcodeadditionaldestination, setpostcodeadditionaldestination] = useState("");
    const [shipment_type, setshipment_type] = useState("Normal");
    const [desiredcollectiondate, setdesiredcollectiondate] = useState("");
    const [desiredarrivaldate, setdesiredarrivaldate] = useState("");
    const [commentary, setcommentary] = useState("");
    const [cost, setcost] = useState(0);
    const [alertcustomer, setalertcustomer] = useState("");
    const [alertorder, setalertorder] = useState("");
    const [alertpackage, setalertpackage] = useState("");

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que se ejecuta al cargar el componente. Si se ha seleccionado un cliente, se rellenan los campos con los datos del cliente. Si se ha creado un pedido, se rellenan los campos con los datos del pedido.
    //Además, se calcula el coste del pedido con los nuevos paquetes añadidos.
    useEffect(() => {
        if(props.customer_created){
            setname(props.customer_created.name);
            setfirst_surname(props.customer_created.first_surname);
            setsecond_surname(props.customer_created.second_surname);
            setemail(props.customer_created.email);
            setphone(props.customer_created.phone);
            setdni(props.customer_created.dni);
            setaddress(props.customer_created.address);
            setpostcode(props.customer_created.postcode);
        }
        if(props.order){
            setorigin(props.order.origin);
            setpostcodeorigin(props.order.postcodeorigin);
            setdestination(props.order.destination);
            setpostcodedestination(props.order.postcodedestination);
            setadditionaldestination(props.order.additionaldestination);
            setpostcodeadditionaldestination(props.order.postcodeadditionaldestination);
            setshipment_type(props.order.shipment_type);
            setdesiredcollectiondate(props.order.desiredcollectiondate);
            setdesiredarrivaldate(props.order.desiredarrivaldate);
            setcommentary(props.order.commentary);

            calculateCost(props.order.shipment_type);
        }
        else{
            calculateCost(shipment_type);
        }
    }, []);

    // Función que recoge los datos del formulario y los envía a la base de datos. Para ello comprueba todas las verificaciones y crea los objetos necesarios para introducir los valores en la base de datos.
    //En caso de que el cliente no esté registrado, se crea un nuevo cliente con los datos introducidos en el formulario. En caso de error activa la alerta correspondiente.
    const send = () => {
        let order_data = {}
        let package_data = {}
        if(!props.customer_selected){
            if(verifyName() && verifyFirstSurname() && verifySecondSurname() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPostcode()){
                let new_customer_id=0;
                props.customer_table.map(customer => {
                    if(customer.Id >= new_customer_id){
                        new_customer_id = customer.Id+1;
                    }
                });
                setalertcustomer("");
                let customer_data={
                    Id: new_customer_id,
                    Address: address+", "+postcode,
                    Customer_Id: dni,
                    Email: email,
                    Name: name+" "+first_surname+" "+second_surname,
                    Phone: phone,
                    Password: dni,
                    Password_Try: ""
                };
                if(verifyOriginAddress() && verifyOriginPostcode() && verifyDestinationAddress() && verifyDestinationPostcode() && verifyDates()){
                    let new_order_id=0;
                    props.order_table.map(order => {
                        if(order.Id >= new_order_id){
                            new_order_id = order.Id+1;
                        }
                    });
                    let volume_total = 0;
                    props.packages?.map(packet => {volume_total = volume_total + +packet.volume});
                    const possible_employees_in_charge = props.employee_table.filter(employee => { if(employee.Role == "repartidor" && employee.Active == 1){ return employee } });
                    const employee_in_charge = possible_employees_in_charge[Math.floor((Math.random()-0.0001)*possible_employees_in_charge.length)].Employee_Id;
                    let expedition_number = Math.trunc(Math.random()*(999999999-100000000)+100000000);
                    while(props.order_table.find(order => order.Expedition_Number == expedition_number)){
                        expedition_number = Math.trunc(Math.random()*(999999999-100000000)+100000000);
                    };
                    setalertorder("");
                    order_data={
                        Id: new_order_id,
                        Customer_Id: new_customer_id,
                        Origin: origin+", "+postcodeorigin,
                        Destination: destination+", "+postcodedestination,
                        Volume: volume_total,
                        Cost: cost,
                        State: "En trámite",
                        Shipment_Type: shipment_type,
                        Expected_Collection_Date: desiredcollectiondate,
                        Expected_Arrival_Date: desiredarrivaldate,
                        Employee_In_Charge: employee_in_charge,
                        Active: 0,
                        Expedition_Number: expedition_number
                    };
                    if(additionaldestination){
                        order_data['Additional_Destination'] = additionaldestination+", "+postcodeadditionaldestination;
                    }
                    if(commentary){
                        order_data['Commentary'] = commentary;
                    }
                    if(verifyPackages()){
                        setalertpackage("");
                        props.sendOrder(customer_data, order_data);
                        setTimeout(() => {
                            props.packages?.map(packet => {
                                let fragility_field = packet.fragility == "Sí" ? 1 : 0 ;
                                package_data = ({
                                    Order_Id: new_order_id,
                                    Width: packet.width,
                                    Weight: Math.trunc(packet.weight),
                                    Height: Math.trunc(packet.height),
                                    Length: Math.trunc(packet.length),
                                    Volume: Math.trunc(packet.volume),
                                    Fragility: fragility_field
                                });
                                props.sendPackage(package_data);
                            });
                        }, 1000);
                        props.sendEmail(email, "Bienvenido a Just a Second", "Le damos la bienvenida a Just a Second.<br></br>Para acceder a su cuenta, introduzca su DNI como contraseña.<br></br>Acuerdese de modificarlo lo antes posible. <br></br>Gracias por confiar en nosotros.");
                        props.sendEmail(email, "Envío de pedido - Just a Second", "<h2>Datos de su pedido</h2><h3>Su pedido es el <b>"+expedition_number+"</b>. Este número le permite buscarlo en la página web para saber su estado.</h3>El origen del pedido es: "+origin+", "+postcodeorigin+"<br></br>El destino del pedido es: "+destination+", "+postcodedestination+"<br></br>El coste del pedido es: "+cost+"€<br></br>La fecha de recogida deseada es: "+obtainExpectedCollectionDate()+"<br></br>La fecha de entrega deseada es: "+obtainExpectedArrivalDate()+"<br></br><br></br>Gracias por confiar en nosotros.<br></br>Just a Second.");
                        navigate("/enviar-paquete/"+expedition_number+"/pagar");
                        props.setcost(cost);
                        props.setorder();
                        props.setcustomer_created();
                        props.setpackages([]);
                    }else{
                        setalertpackage("Añade paquetes para realizar el pedido.");
                    }                  
                }else{
                    setalertorder("Rellena los datos del pedido correctamente.");
                }
            }else{
                let impossible_email = props.customer_table.find(customer => customer.Email == email)
                let impossible_dni = props.customer_table.find(customer => customer.Customer_Id == dni)
                if(!impossible_email && !impossible_dni){
                    setalertcustomer("Rellena los datos personales correctamente.");
                }
            }
        }else{
            if(verifyOriginAddress() && verifyOriginPostcode() && verifyDestinationAddress() && verifyDestinationPostcode() && verifyDates()){
                let new_order_id=0;
                props.order_table.map(order => {
                    if(order.Id >= new_order_id){
                        new_order_id = order.Id+1;
                    }
                });
                let volume_total = 0;
                props.packages?.map(packet => {volume_total = volume_total + +packet.volume});
                const possible_employees_in_charge = props.employee_table.filter(employee => { if(employee.Role == "repartidor" && employee.Active == 1){ return employee } });
                const employee_in_charge = possible_employees_in_charge[Math.floor((Math.random()-0.0001)*possible_employees_in_charge.length)].Employee_Id;
                let expedition_number = Math.trunc(Math.random()*(999999999-100000000)+100000000);
                while(props.order_table.find(order => order.Expedition_Number == expedition_number)){
                    expedition_number = Math.trunc(Math.random()*(999999999-100000000)+100000000);
                };
                setalertorder("");
                order_data={
                    Id: new_order_id,
                    Customer_Id: props.customer_selected.Id,
                    Origin: origin+", "+postcodeorigin,
                    Destination: destination+", "+postcodedestination,
                    Volume: volume_total,
                    Cost: cost,
                    State: "En trámite",
                    Shipment_Type: shipment_type,
                    Expected_Collection_Date: desiredcollectiondate,
                    Expected_Arrival_Date: desiredarrivaldate,
                    Employee_In_Charge: employee_in_charge,
                    Active: 0,
                    Expedition_Number: expedition_number
                };
                if(additionaldestination){
                    order_data['Additional_Destination'] = additionaldestination+", "+postcodeadditionaldestination;
                }
                if(commentary){
                    order_data['Commentary'] = commentary;
                }
                if(verifyPackages()){
                    setalertpackage("");
                    props.sendOrder("", order_data);
                    setTimeout(() => {
                        props.packages?.map(packet => {
                            let fragility_field = packet.fragility == "Sí" ? 1 : 0 ;
                            package_data = ({
                                Order_Id: new_order_id,
                                Width: packet.width,
                                Weight: Math.trunc(packet.weight),
                                Height: Math.trunc(packet.height),
                                Length: Math.trunc(packet.length),
                                Volume: Math.trunc(packet.volume),
                                Fragility: fragility_field
                            });
                            props.sendPackage(package_data);
                        });
                    }, 1000);
                    props.sendEmail(props.customer_selected.Email, "Envío de pedido - Just a Second", "<h2>Datos de su pedido</h2><h3>Su pedido es el <b>"+expedition_number+"</b>. Este número le permite buscarlo en la página web para saber su estado.</h3>El origen del pedido es: "+origin+", "+postcodeorigin+"<br></br>El destino del pedido es: "+destination+", "+postcodedestination+"<br></br>El coste del pedido es: "+cost+"€<br></br>La fecha de recogida deseada es: "+obtainExpectedCollectionDate()+"<br></br>La fecha de entrega deseada es: "+obtainExpectedArrivalDate()+"<br></br><br></br>Gracias por confiar en nosotros.<br></br>Just a Second.");
                    navigate("/enviar-paquete/"+expedition_number+"/pagar");
                    props.setcost(cost);
                    props.setorder();
                    props.setcustomer_created();
                    props.setpackages([]);
                }else{
                    setalertpackage("Añade paquetes para realizar el pedido.");
                }                  
            }else{
                setalertorder("Rellena los datos del pedido correctamente.");
            }
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que recoge los datos del formulario y los envía a la base de datos del puertp 8000. Para ello comprueba todas las verificaciones y crea los objetos necesarios para introducir los valores en la base de datos.
    //Dichos datos se guardan en las tablas package_table y order_table.
    //En caso de que el cliente no esté registrado, se crea un nuevo cliente (en customer_table) con los datos introducidos en el formulario. En caso de error activa la alerta correspondiente.
    const sendCopilot = () => {
        if(verifyName() && verifyFirstSurname() && verifySecondSurname() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPostcode() && verifyOriginAddress() && verifyOriginPostcode() && verifyDestinationAddress() && verifyDestinationPostcode() && verifyDates()){
            let customer = props.customer_table.find(customer => customer.Email == email);
            if(!customer){
                let customer = {
                    name: name,
                    first_surname: first_surname,
                    second_surname: second_surname,
                    email: email,
                    phone: phone,
                    dni: dni,
                    address: address,
                    postcode: postcode,
                    password: "1234"
                }
                fetch('http://localhost:8000/customer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(customer)
                })
                .then(response => response.json())
                .then(data => {
                    if(data.status == "ok"){
                        let order = {
                            customer_id: data.customer_id,
                            origin: origin,
                            postcodeorigin: postcodeorigin,
                            destination: destination,
                            postcodedestination: postcodedestination,
                            additionaldestination: additionaldestination,
                            postcodeadditionaldestination: postcodeadditionaldestination,
                            shipment_type: shipment_type,
                            desiredcollectiondate: desiredcollectiondate,
                            desiredarrivaldate: desiredarrivaldate,
                            commentary: commentary,
                            cost: cost
                        }
                        fetch('http://localhost:8000/order', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(order)
                        })
                        .then(response => response.json())
                        .then(data => {
                            if(data.status == "ok"){
                                props.package_table.forEach(packet => {
                                    let packet_order = {
                                        order_id: data.order_id,
                                        package_id: packet.id,
                                        weight: packet.weight,
                                        height: packet.height,
                                        width: packet.width,
                                        depth: packet.depth,
                                        description: packet.description
                                    }
                                    fetch('http://localhost:8000/package_order', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(packet_order)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if(data.status == "ok"){
                                            navigate('/app/orders');
                                        }
                                        else{
                                            setalertpackage("Error al crear el paquete.");
                                        }
                                    })
                                })
                            }
                        })
                    }
                })  
            }
            else{
                let order = {
                    customer_id: customer.id,
                    origin: origin,
                    postcodeorigin: postcodeorigin,
                    destination: destination,
                    postcodedestination: postcodedestination,
                    additionaldestination: additionaldestination,
                    postcodeadditionaldestination: postcodeadditionaldestination,
                    shipment_type: shipment_type,
                    desiredcollectiondate: desiredcollectiondate,
                    desiredarrivaldate: desiredarrivaldate,
                    commentary: commentary,
                    cost: cost
                }
                fetch('http://localhost:8000/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                .then(response => response.json())
                .then(data => {
                    if(data.status == "ok"){
                        props.package_table.forEach(packet => {
                            let packet_order = {
                                order_id: data.order_id,
                                package_id: packet.id,
                                weight: packet.weight,
                                height: packet.height,
                                width: packet.width,
                                depth: packet.depth,
                                description: packet.description
                            }
                            fetch('http://localhost:8000/package_order', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(packet_order)
                            })
                            .then(response => response.json())
                            .then(data => {
                                if(data.status == "ok"){
                                    navigate('/app/orders');
                                }
                                else{
                                    setalertpackage("Error al crear el paquete.");
                                }
                            })
                        })
                    }
                })
            }
        }
        else{     
            setalertorder("Rellena los datos del pedido correctamente.");
        }                                          
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que recoge los datos del formulario y los envía a la base de datos del puertp 8000. Para ello comprueba todas las verificaciones y crea los objetos necesarios para introducir los valores en la base de datos.
    //Dichos datos se guardan en las tablas package_table y order_table.
    //En caso de que el cliente no esté registrado, se crea un nuevo cliente (en customer_table) con los datos introducidos en el formulario. En caso de error activa la alerta correspondiente.
    const sendCodeWhisperer = () => {
        if(verifyName() && verifyFirstSurname() && verifySecondSurname() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPostcode() && verifyOriginAddress() && verifyOriginPostcode() && verifyDestinationAddress() && verifyDestinationPostcode() && verifyDates()){
            let new_customer = {
                name: name,
                first_surname: first_surname,
                second_surname: second_surname,
                email: email,
                phone: phone,
                dni: dni,
                address: address,
                postcode: postcode
            }
            props.sendCustomer(new_customer);
        }
        else{
            if(!verifyName()){
                setalertcustomer("El nombre no puede estar vacío.");
            }
            if(!verifyFirstSurname()){
                setalertcustomer("El primer apellido no puede estar vacío.");
            }
            if(!verifySecondSurname()){
                setalertcustomer("El segundo apellido no puede estar vacío.");
            }
            if(!verifyEmailCopilot()){
                setalertcustomer("El email no puede estar vacío.");
            }
            if(!verifyPhoneCopilot()){
                setalertcustomer("El teléfono no puede estar vacío.");
            }
            if(!verifyDNICopilot()){
                setalertcustomer("El DNI no puede estar vacío.");
            }
            if(!verifyAddress()){
                setalertcustomer("La dirección no puede estar vacía.");
            }
            // ...
            // Ante funciones tan grandes Amazon Code Whisperer no es capaz de completarlas.
        }
    }

    // Función que se encarga de obtener la fecha de llegada esperada de un pedido.
    const obtainExpectedCollectionDate = () => {
        return ((desiredcollectiondate.toString().substr(8,2)) +'-'+ (desiredcollectiondate.toString().substr(5,2)) +'-'+ (desiredcollectiondate.toString().substr(0,4)) +' '+ (desiredcollectiondate.toString().substr(11,2)) +':'+ (desiredcollectiondate.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de llegada esperada de un pedido.
    const obtainExpectedArrivalDate = () => {
        return ((desiredarrivaldate.toString().substr(8,2)) +'-'+ (desiredarrivaldate.toString().substr(5,2)) +'-'+ (desiredarrivaldate.toString().substr(0,4)) +' '+ (desiredarrivaldate.toString().substr(11,2)) +':'+ (desiredarrivaldate.toString().substr(14,2)))
    }

    // Función que verifica que el nombre introducido es válido.
    const verifyName = () => {
        if(name == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el primer apellido introducido es válido.
    const verifyFirstSurname = () => {
        if(first_surname == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el segundo apellido introducido es válido.
    const verifySecondSurname = () => {
        if(second_surname == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que verifica que el email introducido es válido.
    const verifyEmailCopilot = () => {
        let impossible_email = props.customer_table.find(customer => customer.Email == email)
        if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            return false
        }
        else if(impossible_email){
            setalertcustomer("El correo electrónico introducido ya está registrado. Si ya eres cliente, inicia sesión.");
            return false
        }
        else {
            setalertcustomer("");
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que verifica que el email introducido es válido.
    const verifyEmailCodeWhisperer = () => {
        if (email.includes('@') && email.includes('.')) {
            return true
        }
        else {
            return false
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el teléfono está relleno correctamente.
    const verifyPhoneCopilot = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el teléfono está relleno correctamente.
    const verifyPhoneCodeWhisperer = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el NIF/CIF/NIE del empleado está relleno correctamente.
    const verifyDNICopilot = () => {
        let impossible_dni = props.customer_table.find(customer => customer.Customer_Id == dni)
        if (!dni.match(/^[0-9]{8}[A-Z]$/) && !dni.match(/^[A-Z]{1}[0-9]{8}$/)) {
            return false
        }
        else if(impossible_dni){
            setalertcustomer("El NIF/CIF/NIE introducido ya está registrado. Si ya eres cliente, inicia sesión.");
            return false
        }
        else {
            setalertcustomer("");
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el NIF/CIF/NIE del empleado está relleno correctamente.
    const verifyDNICodeWhisperer = () => {
        if (!dni.match(/^[0-9]{8}[A-Z]$/)) {
            return false
        }
        else {
            return true
        }
    
    }

    // Función que verifica que la dirección introducida es válida.
    const verifyAddress = () => {
        if(address == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el código postal introducido es válido.
    const verifyPostcode = () => {
        if (!postcode.match(/^[0-9]{5}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función que verifica que la dirección de origen introducida es válida.
    const verifyOriginAddress = () => {
        if(origin == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el código postal de origen introducido es válido.
    const verifyOriginPostcode = () => {
        if (!postcodeorigin.match(/^[0-9]{5}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función que verifica que la dirección destino introducida es válida.
    const verifyDestinationAddress = () => {
        if(destination == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el código postal introducido es válido.
    const verifyDestinationPostcode = () => {
        if (!postcodedestination.match(/^[0-9]{5}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función que verifica que las fechas son válidas.
    const verifyDates = () => {
        if(desiredcollectiondate == "" || desiredarrivaldate == ""){
            return false;
        }
        else if(translateDate()){
            return true;
        }
        else{
            return false;
        }
    } 

    // Función que comprueba que han pasado los días mínimos obligatorios entre las fechas esperadas.
    const translateDate = () => {
        let collectionyear = desiredcollectiondate.substr(0, 4);
        let collectionmonth = desiredcollectiondate.substr(5,2);
        let collectionday = desiredcollectiondate.substr(8,2);
        let arrivalyear = desiredarrivaldate.substr(0, 4);
        let arrivalmonth = desiredarrivaldate.substr(5,2);
        let arrivalday = desiredarrivaldate.substr(8,2);
        if(shipment_type == "Normal"){
            if(desiredcollectiondate >= desiredarrivaldate){
                return false;
            }else if(collectionmonth == arrivalmonth && collectionyear == arrivalyear){
                if(+arrivalday - collectionday < 5){
                    return false;
                }
                else{
                    return true;
                }
            }else if(collectionyear == arrivalyear && +collectionmonth+1 == +arrivalmonth){
                let daysInMonth = new Date(collectionyear, collectionmonth, 0).getDate();
                if(+arrivalday + (daysInMonth - collectionday) < 5){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+collectionyear+1 == +arrivalyear && collectionmonth == 12 && arrivalmonth == 1){
                if(+arrivalday + (31 - collectionday) < 5){
                    return false;
                }
                else{
                    return true;
                }
            }else{
                return true;
            }
        }else{
            if(desiredcollectiondate >= desiredarrivaldate){
                return false;
            }else if(collectionmonth == arrivalmonth && collectionyear == arrivalyear){
                if(+arrivalday - collectionday < 2){
                    return false;
                }
                else{
                    return true;
                }
            }else if(collectionyear == arrivalyear && +collectionmonth+1 == +arrivalmonth){
                let daysInMonth = new Date(collectionyear, collectionmonth, 0).getDate();
                if(+arrivalday + (daysInMonth - collectionday) < 2){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+collectionyear+1 == +arrivalyear && collectionmonth == 12 && arrivalmonth == 1){
                if(+arrivalday + (31 - collectionday) < 2){
                    return false;
                }
                else{
                    return true;
                }
            }else{
                return true;
            }
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que han pasado los días mínimos obligatorios entre las fechas esperadas. 
    //Para ello comprueba que la fecha de llegada es 5 días posterior a la de recogida en el caso de envíos normales y 2 días en el caso de envíos urgentes.
    const translateDateCopilot = () => {
        let date1 = new Date(desiredcollectiondate)
        let date2 = new Date(desiredarrivaldate)
        if(shipment_type == "Normal"){
            if(date2.getDate() - date1.getDate() < 5){
                return false
            }
            else{
                return true
            }
        }
        else if(shipment_type == "Urgente"){
            if(date2.getDate() - date1.getDate() < 2){
                return false
            }
            else{
                return true
            }
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que han pasado los días mínimos obligatorios entre las fechas esperadas. 
    //Para ello comprueba que la fecha de llegada es 5 días posterior a la de recogida en el caso de envíos con estado "Normal" y 2 días en el caso de envíos con estado "Express".
    const translateDateCodeWhisperer = () => {
        let date_difference = desiredarrivaldate - desiredcollectiondate;
        if(shipment_type == "Normal" && date_difference < 5){
            return false
        }
        else if(shipment_type == "Express" && date_difference < 2){
            return false
        }
        else{
            return true
        }
    }

    // Función que comprueba que el número de paquetes introducido es válido.
    const verifyPackages = () => {
        if(props.packages.length == 0){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que cambia el estado del pedido.
    const changeState = (e) => {
        setshipment_type(e.target.value);
        calculateCost(e.target.value);
    }

    // Función que calcula el coste de un pedido en función de su peso y tipo de envío. Tiene en cuenta los paquetes que contiene el pedido.
    // Está diseñada con los costes asociados a Correos, excepto en las devoluciones, que está basado en en SEUR.
    const calculateCost = (new_shipment_type) => {
        let actual_cost = 0
        let weight = 0
        props.packages?.map((packet) => {
            weight = weight + +packet.weight;
        })
        if(weight <= 1 && new_shipment_type === 'Normal'){
            actual_cost=12.75;
        }
        else if(weight > 1 && weight <= 5 && new_shipment_type === 'Normal'){
            actual_cost=15.95;
        }
        else if(weight > 5 && weight <= 10 && new_shipment_type === 'Normal'){
            actual_cost=21.4;
        }
        else if(weight > 10 && weight <= 15 && new_shipment_type === 'Normal'){
            actual_cost=25.95;
        }
        else if(weight > 15 && weight <= 20 && new_shipment_type === 'Normal'){
            actual_cost=31.4;
        }
        else if(weight > 20 && weight <= 25 && new_shipment_type === 'Normal'){
            actual_cost=36.4;
        }
        else if(weight > 25 && weight <= 30 && new_shipment_type === 'Normal'){
            actual_cost=41.3;
        }
        else if(weight > 30 && new_shipment_type === 'Normal'){
            actual_cost = 41.3 + (weight-30)*1.25;
        }
        else if(weight <= 1 && new_shipment_type === 'Rápido'){
            actual_cost=14.3;
        }
        else if(weight > 1 && weight <= 5 && new_shipment_type === 'Rápido'){
            actual_cost=17.65;
        }
        else if(weight > 5 && weight <= 10 && new_shipment_type === 'Rápido'){
            actual_cost=23.1;
        }
        else if(weight > 10 && weight <= 15 && new_shipment_type === 'Rápido'){
            actual_cost=27.5;
        }
        else if(weight > 15 && weight <= 20 && new_shipment_type === 'Rápido'){
            actual_cost=33.5;
        }
        else if(weight > 20 && weight <= 25 && new_shipment_type === 'Rápido'){
            actual_cost=39.65;
        }
        else if(weight > 25 && weight <= 30 && new_shipment_type === 'Rápido'){
            actual_cost=45.65;
        }
        else if(weight > 30 && new_shipment_type === 'Rápido'){
            actual_cost = 45.65 + (weight-30)*1.29;
        }
        setcost(actual_cost.toFixed(2));
    }

    // Función que permite añadir un paquete al pedido y almacena los datos añadidos.
    const addPackage = () => {
        if(!props.customer_selected){
            props.setcustomer_created({
                name: name,
                first_surname: first_surname,
                second_surname: second_surname,
                email: email,
                phone: phone,
                dni: dni,
                address: address,
                postcode: postcode
            });
        }
        props.setorder({
            origin: origin,
            postcodeorigin: postcodeorigin,
            destination: destination,
            postcodedestination: postcodedestination,
            additionaldestination: additionaldestination,
            postcodeadditionaldestination: postcodeadditionaldestination,
            shipment_type: shipment_type,
            desiredcollectiondate: desiredcollectiondate,
            desiredarrivaldate: desiredarrivaldate,
            commentary: commentary
        });
        navigate("/enviar-paquete/paquete/"+(props.packages.length+1))
    }

    // Función realizada por GitHub Copilot.
    // Función que permite ir a la vista de añadir paquetes y almacena los datos añadidos en las variables globales de customer_created (para los datos de usuario) y order (para los datos del pedido).
    //Tras esto, se redirige a la página de añadir paquetes.
    const addPackageCopilot = () => {
        let customer = {
            name: name,
            first_surname: first_surname,
            second_surname: second_surname,
            email: email,
            phone: phone,
            dni: dni,
            address: address,
            postcode: postcode
        }
        props.setcustomer_created(customer);
        props.setorder({
            'customer': customer,
            'packages': props.packages,
            'shipment_type': shipment_type,
            'desiredcollectiondate': desiredcollectiondate,
            'desiredarrivaldate': desiredarrivaldate,
            'cost': cost
        });
        navigate('/addPackage');
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que permite ir a la vista de añadir paquetes y almacena los datos añadidos en las variables globales de customer_created (para los datos de usuario) y order (para los datos del pedido).
    //Tras esto, se redirige a la página de añadir paquetes.
    const addPackageCodeWhisperer = () => {
        props.setcustomer_created({
            name: name,
            email: email,
            phone: phone,
            address: address,
            postal_code: postcode
        });
        props.setorder({
            customer_id: props.customer_id,
            shipment_type: shipment_type,
            desiredcollectiondate: desiredcollectiondate,
            desiredarrivaldate: desiredarrivaldate,
            packages: props.packages,
            cost: cost,
            state: "Enviado"
        });
        props.setaddpackages(true);
    
    }

    // Función que permite eliminar un paquete del pedido.
    const deletePackage = async (index) => {
        let new_packages = props.packages.map(packet => packet)
        new_packages.splice(index, 1);
        props.setpackages(new_packages);
    }

    // Función que permite volver a calcular el coste del pedido cuando se añaden o eliminan paquetes.
    useEffect(() => {
        calculateCost(shipment_type);
    }, [props.packages])

    return(
        <div className="SendOrder">
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <div className='SendOrder_title'>
                            <h2 id="SendOrder_main_title">Envía tus paquetes</h2>
                        </div>
                        {!props.customer_selected ?
                            <div className='col-12'>
                                <div className='row'>
                                    <div className='col-12'>
                                        {alertcustomer ? 
                                        <Alert variant='secondary'>{alertcustomer}</Alert> : 
                                        null
                                        }
                                    </div>
                                    <div className='col-12'>
                                        <h4 className="SendOrder_descriptions">Introduce tus datos personales</h4>
                                    </div>
                                    <div className='col-4'>
                                        <div className='sendorder_inputs_Name'>
                                            <FloatingLabel controlId="floatingInputName" label="Nombre *" className="mb-3" onChange={(e) => {setname(e.target.value)}}>
                                                <Form.Control type="text" placeholder="Nombre *" value={name}/>  
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className='sendorder_inputs_FirstSurname'>
                                            <FloatingLabel controlId="floatingInputFirstSurname" label="Primer apellido *" className="mb-3" onChange={(e) => {setfirst_surname(e.target.value)}}>
                                                <Form.Control type="text" placeholder="Primer apellido *" value={first_surname}/>  
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className='sendorder_inputs_SecondSurname'>
                                            <FloatingLabel controlId="floatingInputSecondSurname" label="Segundo apellido *" className="mb-3" onChange={(e) => {setsecond_surname(e.target.value)}}>
                                                <Form.Control type="text" placeholder="Segundo apellido *" value={second_surname}/>  
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='sendorder_inputs_Email'>
                                            <FloatingLabel controlId="floatingInputEmail" label="Correo electrónico *" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                                                <Form.Control type="email" placeholder="Correo electrónico *" value={email}/>  
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='sendorder_inputs_Phone'>
                                            <FloatingLabel controlId="floatingInputPhone" label="Teléfono *" className="mb-3" onChange={(e) => {setphone(e.target.value)}}>
                                                <Form.Control type="number" placeholder="Teléfono *" value={phone}/>  
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='sendorder_inputs_DNI'>
                                            <FloatingLabel controlId="floatingInputDNI" label="NIF/CIF/NIE *" className="mb-3" onChange={(e) => {setdni(e.target.value)}}>
                                                <Form.Control type="text" placeholder="NIF/CIF/NIE *" value={dni}/>  
                                                <Form.Text className="HelpBlock">
                                                    Introduce tu DNI o NIE. En caso de ser una empresa, introduce el CIF.
                                                </Form.Text>
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <div className='col-8'>
                                        <div className='sendorder_inputs_Address'>
                                            <FloatingLabel controlId="floatingInputAddress" label="Dirección *" className="mb-3" onChange={(e) => {setaddress(e.target.value)}}>
                                                <Form.Control type="text" placeholder="Dirección *" value={address}/>  
                                                <Form.Text className="HelpBlock">
                                                    Introduce la dirección de tu domicilio.
                                                </Form.Text>
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className='sendorder_inputs_PostCode'>
                                            <FloatingLabel controlId="floatingInputPostCode" label="Código postal *" className="mb-3" onChange={(e) => {setpostcode(e.target.value)}}>
                                                <Form.Control type="number" data-testid="PostalCodeCustomer" placeholder="Código postal *" value={postcode}/>  
                                            </FloatingLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>:
                            null
                            }
                    </div>
                    <div className='col-12'>
                        {alertorder ? 
                        <Alert variant='secondary'>{alertorder}</Alert> : 
                        null
                        }
                    </div>
                    <div className='col-12'>
                        <h4 className="SendOrder_descriptions">Introduce los datos de tu pedido</h4>
                    </div>
                    <div className='col-8'>
                        <div className='modify_inputs_Origin'>
                            <FloatingLabel controlId="floatingInputOrigin" label="Dirección de origen *" className="mb-3" onChange={(e) => {setorigin(e.target.value)}}>
                                <Form.Control type="text" placeholder="Dirección de origen *" value={origin}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='sendorder_inputs_PostCode'>
                            <FloatingLabel controlId="floatingInputPostCodeOrigin" label="Código postal *" className="mb-3" onChange={(e) => {setpostcodeorigin(e.target.value)}}>
                                <Form.Control type="number" data-testid="PostalCodeOrigin" placeholder="Código postal *" value={postcodeorigin}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='modify_inputs_Destination'>
                            <FloatingLabel controlId="floatingInputDestination" label="Dirección de destino *" className="mb-3" onChange={(e) => {setdestination(e.target.value)}}>
                                <Form.Control type="text" placeholder="Dirección de destino *" value={destination}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='sendorder_inputs_PostCode'>
                            <FloatingLabel controlId="floatingInputPostCodeDestination" label="Código postal *" className="mb-3" onChange={(e) => {setpostcodedestination(e.target.value)}}>
                                <Form.Control type="number" data-testid="PostalCodeDestination" placeholder="Código postal *" value={postcodedestination}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='modify_inputs_AdditionalDestination'>
                            <FloatingLabel controlId="floatingInputAdditionalDestination" label="Dirección adicional de destino" className="mb-3" onChange={(e) => {setadditionaldestination(e.target.value)}}>
                                <Form.Control type="text" placeholder="Dirección adicional de destino" value={additionaldestination}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='sendorder_inputs_PostCode'>
                            <FloatingLabel controlId="floatingInputPostCodeAdditionalDestination" label="Código postal" className="mb-3" onChange={(e) => {setpostcodeadditionaldestination(e.target.value)}}>
                                <Form.Control type="number" data-testid="PostalCodeaddDestination" placeholder="Código postal" value={postcodeadditionaldestination}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-2'>
                        <div className='sendorder_selects_Shipment_Type'>
                            <FloatingLabel controlId="floatingState" label="Tipo de envío *" className="mb-3">
                                <Form.Select value={shipment_type} className='select_Shipment_Type' onChange={(e) => changeState(e)}>
                                    <option value="Normal">Normal</option>
                                    <option value="Rápido">Express</option>
                                </Form.Select>
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='sendorder_inputs_DesiredCollectionDate'>
                            <FloatingLabel controlId="floatingInputDesiredCollectionDate" label="Fecha deseada de recogida *" className="mb-3" onChange={(e) => {setdesiredcollectiondate(e.target.value)}}>
                                <Form.Control type="datetime-local" placeholder="Fecha deseada de recogida *" value={desiredcollectiondate}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='sendorder_inputs_DesiredArrivalDate'>
                            <FloatingLabel controlId="floatingInputDesiredArrivalDate" label="Fecha deseada de entrega *" className="mb-3" onChange={(e) => {setdesiredarrivaldate(e.target.value)}}>
                                <Form.Control type="datetime-local" placeholder="Fecha deseada de entrega *" value={desiredarrivaldate}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-12'>
                        <Form.Text className="HelpBlock" id="HelpBlock_desiredDates">
                            Entre la fecha deseada de recogida y de entrega debe haber 5 días de diferencia como mínimo en caso de un pedido "Normal" y 2 días en el caso de un pedido "Express".
                        </Form.Text>
                    </div>
                    <div className='col-12'>
                        <div className='sendorder_inputs_Commentary'>
                            <FloatingLabel controlId="floatingInputCommentary" label="Comentarios adicionales" className="mb-3" onChange={(e) => {setcommentary(e.target.value)}}>
                                <Form.Control as="textarea" placeholder="Leave a comment here" value={commentary}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-12'>
                        <Button variant="outline-secondary" size="lg" className='sendorder_button_AddPackage' onClick={() => addPackage()}>Añadir paquete</Button>
                    </div>
                    <div className='col-12'>
                        {alertpackage ? 
                        <Alert variant='secondary'>{alertpackage}</Alert> : 
                        null
                        }
                    </div>
                    {props.packages?.map((packet, index) => {
                        return(
                            <div className='col-3'>
                                <div className='sendorder_packages'>
                                    <h6>Paquete nº {index+1}</h6>
                                    <p>Peso: {packet.weight} kg</p>
                                    <p>Altura: {packet.height} cm</p>
                                    <p>Anchura: {packet.width} cm</p>
                                    <p>Profundidad: {packet.length} cm</p>
                                    <p>Volumen: {packet.volume} cm&#xB3;</p>
                                    <p>Fragilidad: {packet.fragility}</p>
                                    <Button variant="outline-danger" size="sm" className='sendorder_button_DeletePackage' onClick={() => deletePackage(index)}>Eliminar paquete</Button>
                                </div>
                            </div>
                        );
                    })
                    }
                    <div className='col-12'>
                        <hr className='hr_sendorder'></hr>
                        <h4 id="sendorder_cost_main">El coste del pedido son {cost} €</h4>
                    </div>
                    <div className='col-12'>
                        <div className='sendorder_cost_description'>
                            <p className='sendorder_cost_description_field'>
                                El coste del pedido es independiente de la distancia entre el origen y el destino (siempre que los mismos sean territorio español de la Península Ibérica). 
                                El coste asociado depende del peso de los paquetes y del tipo de envío.
                            </p>
                            <p className='sendorder_cost_description_field'>
                                Si quiere saber nuestras tarifas, contacte con nosotros a través del correo <i>justasecond@gmail.com</i> o a través del teléfono <i>644 607 777</i>.
                            </p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <Button variant="secondary" size="lg" className='sendorder_send' onClick={() => send()}>Enviar</Button>
                    </div>
                    <div className='col-12'>
                        <hr></hr>
                        <Button variant="secondary" className='sendorder_button_goHome' onClick={() => navigate("/")}>Volver al inicio</Button>
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "SendOrder.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de Enviar los pedidos. */}
                {/* En ella debe haber un formulario para rellenar los datos personales del usuario. Dicho formulario debe tener los siguientes campos: nombre, primer apellido, segundo apellido, email, teléfono, dni, dirección y código postal, y sólamente se muestra si el cliente no ha iniciado sesión (props.customer_selected vacío) */}
                {/* Además, debe haber otro formulario para rellenar los datos del pedido. Dicho formulario debe tener los siguientes campos: dirección de origen, su código postal, dirección de destino, su código postal, dirección adicional, su código postal, tipo de envío, fecha deseada de recogida, fecha deseada de entrega y comentarios adicionales.*/}
                {/* En el caso de que haya paquetes (props.packages) se deben mostrar tarjetas de los diferentes paquetes, con su anchura, altura, profundidad, peso, volumen y su fragilidad. */}
                {/* En el caso de que algún campo de los mostrados esté erróneo se deberá moestrar una alerta (hay tres alertas definidas, una para el formulario de datos personales, otra para el formulario del pedido y otra para los paquetes añadidos). */}
                {/* El coste del pedido debe mostrarse en el formulario junto con un botón de añadir paquetes, uno de enviar pedido y uno de volver a la página principal. */}
            { copilot ?
                <div>
                    <h1>Enviar pedido</h1>
                    { !props.customer_selected ?
                        <div>
                            <h2>Datos personales</h2>
                            <form>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" name="name" value={name} onChange={(e) => setname(e.target.value)} required/>
                                <label htmlFor="first_surname">Primer apellido</label>
                                <input type="text" id="first_surname" name="first_surname" value={first_surname} onChange={(e) => setfirst_surname(e.target.value)} required/>
                                <label htmlFor="second_surname">Segundo apellido</label>
                                <input type="text" id="second_surname" name="second_surname" value={second_surname} onChange={(e) => setsecond_surname(e.target.value)} required/>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} required/>
                                <label htmlFor="phone">Teléfono</label>
                                <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setphone(e.target.value)} required/>
                                <label htmlFor="dni">DNI</label>
                                <input type="text" id="dni" name="dni" value={dni} onChange={(e) => setdni(e.target.value)} required/>
                                <label htmlFor="address">Dirección</label>
                                <input type="text" id="address" name="address" value={address} onChange={(e) => setaddress(e.target.value)} required/>
                                <label htmlFor="postcode">Código postal</label>
                                <input type="text" id="postcode" name="postcode" value={postcode} onChange={(e) => setpostcode(e.target.value)} required/>
                            </form>
                        </div>
                    : null
                    }
                    <h2>Datos del pedido</h2>
                    <form>
                        <label htmlFor="origin">Dirección de origen</label>
                        <input type="text" id="origin" name="origin" value={origin} onChange={(e) => setorigin(e.target.value)} required/>
                        <label htmlFor="postcodeorigin">Código postal de origen</label>
                        <input type="text" id="postcodeorigin" name="postcodeorigin" value={postcodeorigin} onChange={(e) => setpostcodeorigin(e.target.value)} required/>
                        <label htmlFor="destination">Dirección de destino</label>
                        <input type="text" id="destination" name="destination" value={destination} onChange={(e) => setdestination(e.target.value)} required/>
                        <label htmlFor="postcodedestination">Código postal de destino</label>
                        <input type="text" id="postcodedestination" name="postcodedestination" value={postcodedestination} onChange={(e) => setpostcodedestination(e.target.value)} required/>
                        <label htmlFor="additionaladdress">Dirección adicional</label>
                        <input type="text" id="additionaladdress" name="additionaladdress" value={additionaldestination} onChange={(e) => setadditionaldestination(e.target.value)} required/>
                        <label htmlFor="postcodeadditional">Código postal adicional</label>
                        <input type="text" id="postcodeadditional" name="postcodeadditional" value={postcodeadditionaldestination} onChange={(e) => setpostcodeadditionaldestination(e.target.value)} required/>
                        <label htmlFor="shipment_type">Tipo de envío</label>
                        <select id="shipment_type" name="shipment_type" value={shipment_type} onChange={(e) => setshipment_type(e.target.value)} required>
                            <option value="Urgente">Urgente</option>
                            <option value="Normal">Normal</option>
                        </select>
                        <label htmlFor="desiredcollectiondate">Fecha deseada de recogida</label>
                        <input type="date" id="desiredcollectiondate" name="desiredcollectiondate" value={desiredcollectiondate} onChange={(e) => setdesiredcollectiondate(e.target.value)} required/>
                        <label htmlFor="desiredarrivaldate">Fecha deseada de entrega</label>
                        <input type="date" id="desiredarrivaldate" name="desiredarrivaldate" value={desiredarrivaldate} onChange={(e) => setdesiredarrivaldate(e.target.value)} required/>
                        <label htmlFor="additionalcomments">Comentarios adicionales</label>
                        <input type="text" id="additionalcomments" name="additionalcomments" value={commentary} onChange={(e) => setcommentary(e.target.value)} required/>
                    </form>
                    <h2>Paquetes</h2>
                    <div className="packages">
                        {props.packages?.map((packet, index) => {
                            return(
                                <div className="package" key={index}>
                                    <h3>Paquete {index + 1}</h3>
                                    <p>Anchura: {packet.width} cm</p>
                                    <p>Altura: {packet.height} cm</p>
                                    <p>Profundidad: {packet.depth} cm</p>
                                    <p>Peso: {packet.weight} kg</p>
                                    <p>Volumen: {packet.volume} cm<sup>3</sup></p>
                                    <p>Fragilidad: {packet.fragility}</p>
                                </div>
                            );
                        })}
                    </div>
                    {alertcustomer ? <Alert severity="error">Los datos personales no son correctos</Alert> : null}
                    {alertorder ? <Alert severity="error">Los datos del pedido no son correctos</Alert> : null}
                    {alertpackage ? <Alert severity="error">Los datos del paquete no son correctos</Alert> : null}
                    <h2>Coste del pedido</h2>
                    <p>{cost} €</p>
                    <button onClick={() => addPackageCopilot()}>Añadir paquetes</button>
                    <button onClick={() => sendCopilot()}>Enviar pedido</button>
                    <button onClick={() => navigate('/')}>Volver a la página principal</button>
                </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "SendOrder.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de Enviar los pedidos. */}
                {/* En ella debe haber un formulario para rellenar los datos personales del usuario. Dicho formulario debe tener los siguientes campos: nombre, primer apellido, segundo apellido, email, teléfono, dni, dirección y código postal, y sólamente se muestra si el cliente no ha iniciado sesión (props.customer_selected vacío) */}
                {/* Además, debe haber otro formulario para rellenar los datos del pedido. Dicho formulario debe tener los siguientes campos: dirección de origen, su código postal, dirección de destino, su código postal, dirección adicional, su código postal, tipo de envío, fecha deseada de recogida, fecha deseada de entrega y comentarios adicionales.*/}
                {/* En el caso de que haya paquetes (props.packages) se deben mostrar tarjetas de los diferentes paquetes, con su anchura, altura, profundidad, peso, volumen y su fragilidad. */}
                {/* En el caso de que algún campo de los mostrados esté erróneo se deberá moestrar una alerta (hay tres alertas definidas, una para el formulario de datos personales, otra para el formulario del pedido y otra para los paquetes añadidos). */}
                {/* El coste del pedido debe mostrarse en el formulario junto con un botón de añadir paquetes, uno de enviar pedido y uno de volver a la página principal. */}
            {codeWhisperer ?
                <div>
                    {!props.customer_selected ?
                        <div className="SendOrder__form">
                            <div className="SendOrder__form__title">
                                <h1>Datos personales</h1>
                            </div>
                            <div className="SendOrder__form__inputs">
                                <div className="SendOrder__form__inputs__name">
                                    <label htmlFor="name">Nombre</label>
                                    <input type="text" id="name" name="name" placeholder="Nombre" onChange={(e) => setname(e.target.value)} value={name}/>
                                    <label htmlFor="first_surname">Primer apellido</label>
                                    <input type="text" id="first_surname" name="first_surname" placeholder="Primer apellido" onChange={(e) => setfirst_surname(e.target.value)} value={first_surname}/>
                                    <label htmlFor="second_surname">Segundo apellido</label>
                                    <input type="text" id="second_surname" name="second_surname" placeholder="Segundo apellido" onChange={(e) => setsecond_surname(e.target.value)} value={second_surname}/>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" placeholder="Email" onChange={(e) => setemail(e.target.value)} value={email}/>
                                    <label htmlFor="phone">Teléfono</label>
                                    <input type="text" id="phone" name="phone" placeholder="Teléfono" onChange={(e) => setphone(e.target.value)} value={phone}/>
                                    <label htmlFor="dni">DNI</label>
                                    <input type="text" id="dni" name="dni" placeholder="DNI" onChange={(e) => setdni(e.target.value)} value={dni}/>
                                    <label htmlFor="address">Dirección</label>
                                    <input type="text" id="address" name="address" placeholder="Dirección" onChange={(e) => setaddress(e.target.value)} value={address}/>
                                    <label htmlFor="postcode">Código postal</label>
                                    <input type="text" id="postcode" name="postcode" placeholder="Código postal" onChange={(e) => setpostcode(e.target.value)} value={postcode}/>
                                </div>
                            </div>
                        </div>
                    : null
                    }
                    <div className="SendOrder__form">
                        <div className="SendOrder__form__title">
                            <h1>Datos del pedido</h1>
                        </div>
                        <div className="SendOrder__form__inputs">
                            <div className="SendOrder__form__inputs__name">
                                <label htmlFor="origin_address">Dirección de origen</label>
                                <input type="text" id="origin_address" name="origin_address" placeholder="Dirección de origen" onChange={(e) => setorigin(e.target.value)} value={origin}/>
                                <label htmlFor="origin_postcode">Código postal de origen</label>
                                <input type="text" id="origin_postcode" name="origin_postcode" placeholder="Código postal de origen" onChange={(e) => setpostcodeorigin(e.target.value)} value={postcodeorigin}/>
                                <label htmlFor="destination_address">Dirección de destino</label>
                                <input type="text" id="destination_address" name="destination_address" placeholder="Dirección de destino" onChange={(e) => setdestination(e.target.value)} value={destination}/>
                                <label htmlFor="destination_postcode">Código postal de destino</label>
                                <input type="text" id="destination_postcode" name="destination_postcode" placeholder="Código postal de destino" onChange={(e) => setpostcodedestination(e.target.value)} value={postcodedestination}/>
                                <label htmlFor="additional_address">Dirección adicional</label>
                                <input type="text" id="additional_address" name="additional_address" placeholder="Dirección adicional" onChange={(e) => setadditionaldestination(e.target.value)} value={additionaldestination}/>
                                <label htmlFor="additional_postcode">Código postal adicional</label>
                                <input type="text" id="additional_postcode" name="additional_postcode" placeholder="Código postal adicional" onChange={(e) => setpostcodeadditionaldestination(e.target.value)} value={postcodeadditionaldestination}/>
                                <label htmlFor="shipment_type">Tipo de envío</label>
                                <select id="shipment_type" name="shipment_type" onChange={(e) => setshipment_type(e.target.value)} value={shipment_type}>
                                    <option value="normal">Normal</option>
                                    <option value="express">Express</option>
                                </select>
                                <label htmlFor="pickup_date">Fecha deseada de recogida</label>
                                <input type="date" id="pickup_date" name="pickup_date" onChange={(e) => setdesiredcollectiondate(e.target.value)} value={desiredcollectiondate}/>
                                <label htmlFor="delivery_date">Fecha deseada de entrega</label>
                                <input type="date" id="delivery_date" name="delivery_date" onChange={(e) => setdesiredarrivaldate(e.target.value)} value={desiredarrivaldate}/>
                                <label htmlFor="additional_comments">Comentarios adicionales</label>
                                <textarea id="additional_comments" name="additional_comments" placeholder="Comentarios adicionales" onChange={(e) => setcommentary(e.target.value)} value={commentary}/>
                            </div>
                        </div>
                    </div>
                    <div className="SendOrder__form">
                        <div className="SendOrder__form__title">
                            <h1>Paquetes</h1>
                        </div>
                        <div className="SendOrder__form__inputs">
                            <div className="SendOrder__form__inputs__name">
                                <label htmlFor="package_weight">Peso del paquete</label>
                                <input type="text" id="package_weight" name="package_weight" placeholder="Peso del paquete" onChange={(e) => props.setPackageWeight(e.target.value)} value={props.package_weight}/>
                                <label htmlFor="package_height">Altura del paquete</label>
                                <input type="text" id="package_height" name="package_height" placeholder="Altura del paquete" onChange={(e) => props.setPackageHeight(e.target.value)} value={props.package_height}/>
                                <label htmlFor="package_width">Anchura del paquete</label>
                                <input type="text" id="package_width" name="package_width" placeholder="Anchura del paquete" onChange={(e) => props.setPackageWidth(e.target.value)} value={props.package_width}/>
                                <label htmlFor="package_length">Longitud del paquete</label>
                                <input type="text" id="package_length" name="package_length" placeholder="Longitud del paquete" onChange={(e) =>props. setPackageLength(e.target.value)} value={props.package_length}/>
                                <label htmlFor="package_quantity">Volumen del paquete</label>
                                <input type="text" id="package_quantity" name="package_quantity" placeholder="Volumen del paquete" onChange={(e) => props.setPackageQuantity(e.target.value)} value={props.package_quantity}/>
                                <label htmlFor="package_description">Fragilidad del paquete</label>
                                <select id="package_description" name="package_description" onChange={(e) => props.setPackageDescription(e.target.value)} value={props.package_description}>
                                    <option value="normal">Normal</option>
                                    <option value="fragile">Fragil</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* En el caso de que algún campo de los mostrados esté erróneo se deberá moestrar una alerta (hay tres alertas definidas, una para el formulario de datos personales, otra para el formulario del pedido y otra para los paquetes añadidos). */}
                    {/* El coste del pedido debe mostrarse en el formulario junto con un botón de añadir paquetes, uno de enviar pedido y uno de volver a la página principal. */}
                    {alertcustomer || alertorder || alertpackage ?
                        <div className="SendOrder__alert">
                            <h1>Error</h1>
                            <p>Por favor revise los datos introducidos</p>
                        </div> 
                    : null
                    }
                    <div className="SendOrder__buttons">
                        <button onClick={() => addPackageCodeWhisperer()}>Añadir paquete</button>
                        <button onClick={() => sendCodeWhisperer()}>Enviar pedido</button>
                        <button onClick={() => navigate(-1)}>Volver</button>
                    </div>
                </div>
            : null    
            }
        </div>
    );
}