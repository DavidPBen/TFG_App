import './OrderAdd.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Componente que renderiza el formulario para añadir un nuevo pedido.
export default function OrderAdd(props) {
    const [expedition_number, setexpedition_number] = useState('');
    const [customer_Id, setcustomer_Id] = useState('');
    const [origin, setorigin] = useState('');
    const [destination, setdestination] = useState('');
    const [additional_Destination, setadditional_Destination] = useState();
    const [state, setstate] = useState('En trámite');
    const [shipment_Type, setshipment_Type] = useState('Normal');
    const [collection_Date, setcollection_Date] = useState('');
    const [expected_Collection_Date, setexpected_Collection_Date] = useState('');
    const [arrival_Date, setarrival_Date] = useState('');
    const [expected_Arrival_Date, setexpected_Arrival_Date] = useState('');
    const [return_Date, setreturn_Date] = useState('');
    const [expected_Return_Date, setexpected_Return_Date] = useState('');
    const [commentary, setcommentary] = useState();
    const [employee_In_Charge, setemployee_In_Charge] = useState('');
    const [return_order, setreturn_order] = useState(false);

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que añade un nuevo pedido a la base de datos.
    const addOrder = () => {
        const fields = {
            "Expedition_Number": expedition_number,
            "Customer_Id": customer_Id,
            "Origin": origin,
            "Destination": destination,
            "Volume": 0,
            "Cost": 0,
            "State": state,
            "Shipment_Type": shipment_Type,
            "Expected_Collection_Date": expected_Collection_Date,
            "Expected_Arrival_Date": expected_Arrival_Date,
            "Employee_In_Charge": employee_In_Charge,
            "Active": "1"
        }
        if(additional_Destination != '') {
            fields['Additional_Destination'] = additional_Destination;
        }
        if(collection_Date != '') { 
            fields['Collection_Date'] = collection_Date;
        }
        if(arrival_Date != '') {
            fields['Arrival_Date'] = arrival_Date;
        }
        if(commentary != '') {
            fields['Commentary'] = commentary;
        }
        if(return_Date != '') {
            fields['Return_Date'] = return_Date;
        }
        if(expected_Return_Date != '') {
            fields['Expected_Return_Date'] = expected_Return_Date;
        }
        props.addNewOrder(fields) 
        let customer = props.customer_table.find(customer => customer.Id === customer_Id);
        props.sendEmail(customer?.Email, "Su pedido se ha efectuado con éxito - Just a Second", "<h3>Su pedido es el <b>"+expedition_number+"</b>. Este número le permite buscarlo en la página web para saber su estado.</h3>Para verlo en más detalle acceda a su cuenta desde la aplicación con su email y la contraseña dada por el trabajador que le ha atendido.<br></br>Just a Second");
    }

    // Función realizada por GitHub Copilot.
    // Funciión que añade un nuevo pedido a la base de datos, para ello añade los campos del formulario a la tabla order_table.
    const addOrderCopilot = () => {
        props.addOrder(customer_Id, origin, destination, additional_Destination, state, shipment_Type, collection_Date, expected_Collection_Date, arrival_Date, expected_Arrival_Date, return_Date, expected_Return_Date, commentary, employee_In_Charge, return_order)
    }

    // Función realizada por Amazon CodeWhisperer.
    // Funciión que añade un nuevo pedido a la base de datos, para ello añade los campos del formulario a la tabla order_table.
    const addOrderCodeWhisperer = () => {
        const newOrder = {
            Id: props.order_table.length + 1,
            Customer_Id: customer_Id,
            Origin: origin,
            Destination: destination,
            Additional_Destination: additional_Destination,
            State: state,
            Shipment_Type: shipment_Type,
            Collection_Date: collection_Date,
            Expected_Collection_Date: expected_Collection_Date,
            Arrival_Date: arrival_Date,
            Expected_Arrival_Date: expected_Arrival_Date,
            Return_Date: return_Date,
            Expected_Return_Date: expected_Return_Date,
            Commentary: commentary,
            Employee_In_Charge: employee_In_Charge
        }
        props.setorder_table([...props.order_table, newOrder])
    }

    // Función que verifica que todos los campos del formulario estén rellenados correctamente. En caso contrario, muestra una alerta.
    const verify = () => {
        if (verifyExpedition_Number() && verifyCustomer_Id() && verifyOrigin() && verifyDestination() && verifyState() && verifyShipment_Type() && verifyCollection_Date() && verifyExpected_Collection_Date() && verifyArrival_Date() && verifyExpected_Arrival_Date() && verifyEmployee_In_Charge()) {
            if(return_order) {
                if(verifyReturn_Date() && verifyExpected_Return_Date()){
                    addOrder()
                    navigate(-1)
                }else{
                    alert('Por favor, rellene correctamente los campos de la devolución')
                }
            }
            else{
                addOrder()
                navigate(-1)
            }
        }
        else {
            alert('Por favor, rellene correctamente los campos')
        }
    }

    // Función que verifica que el campo "Número de expedición" esté rellenado correctamente.
    const verifyExpedition_Number = () => {
        const notpossibleExpediton_Number = props.order_table?.find((order) => order.Expedition_Number == expedition_number)
        if (!expedition_number.match(/^[0-9]+$/) || expedition_number.length != 9 || notpossibleExpediton_Number) {
            return false
        }
        return true
    }


    // Función que verifica que el campo "Id del cliente" esté rellenado correctamente.
    const verifyCustomer_Id = () => {
        const possibleCustomer = props.customer_table?.find((customer) => customer.Id == customer_Id)
        if (!customer_Id.match(/^[0-9]+$/) || !possibleCustomer) {
            return false
        }
        return true
    }
    
    // Función que verifica que el campo "Origen" esté rellenado correctamente.
    const verifyOrigin = () => {
        if (!origin.match(/^[a-zA-Z0-9\s]+$/)) {
            return false
        }
        return true
    }

    // Función que verifica que el campo "Destino" esté rellenado correctamente.
    const verifyDestination = () => {
        if (!destination.match(/^[a-zA-Z0-9\s]+$/)) {
            return false
        }
        return true
    }

    // Función que verifica que el campo "Estado" esté rellenado correctamente.
    const verifyState = () => {
        if (state === '') {
            return false
        }
        return true
    }

    // Función que verifica que el campo "Tipo de envío" esté rellenado correctamente.
    const verifyShipment_Type = () => {
        if(shipment_Type === ''){
            return false
        }
        else{
            return true
        }
    }

    // Función que verifica que el campo "Fecha de recogida" esté rellenado correctamente.
    const verifyCollection_Date = () => {
        if (collection_Date === '' && state !== 'En trámite') {
            return false
        }
        return true
    }

    // Función que verifica que el campo "Fecha prevista de recogida" esté rellenado correctamente.
    const verifyExpected_Collection_Date = () => {
        if (expected_Collection_Date === '') {
            return false
        }
        else if(translateDate()){
            return true;
        }
        else{
            return false;
        }
    }

    // Función que verifica que el campo "Fecha de entrega" esté rellenado correctamente.
    const verifyArrival_Date = () => {
        if (arrival_Date === '' && state === 'Entregado') {
            return false
        }
        return true
    }

    // Función que verifica que el campo "Fecha prevista de entrega" esté rellenado correctamente.
    const verifyExpected_Arrival_Date = () => {
        if (expected_Arrival_Date === '') {
            return false
        }
        else if(translateDate()){
            return true;
        }
        else{
            return false;
        }
    }

    // Función que verifica que el campo "Fecha de devolución" esté rellenado correctamente.
    const verifyReturn_Date = () => {
        if (return_Date === '' && state === 'En devolución - Entregado') {
            return false
        }
        return true
    }

    // Función que verifica que el campo "Fecha prevista de devolución" esté rellenado correctamente.
    const verifyExpected_Return_Date = () => {
        if (expected_Return_Date === '') {
            return false
        }
        else if(translateReturnDate()){
            return true;
        }
        else{
            return false;
        }
    }

    // Función que verifica que el campo "Empleado encargado" esté rellenado correctamente.
    const verifyEmployee_In_Charge = () => {
        const possibleEmployee = props.employee_table?.find((employee) => employee.Employee_Id == employee_In_Charge)
        if (!employee_In_Charge.match(/^[0-9]+$/) || !possibleEmployee) {
            return false
        }
        return true
    }

    // Función que cambia el estado. Si el estado es de devolución, se muestran los campos "Fecha de devolución" y "Fecha prevista de devolución".
    const changeState = (actual_state) => {
        setstate(actual_state)
        if(actual_state === 'En devolución - En trámite' || actual_state === 'En devolución - En almacén origen' || actual_state === 'En devolución - En camino' || actual_state === 'En devolución - En almacén destino' || actual_state === 'En devolución - Entregado'){
            setreturn_order(true)
        }
        else{
            setreturn_order(false)
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que cambia el estado. Si el evento contiene "En devolución" en su nombre, se muestran los campos de las fechas de devolución.
    const changeStateCopilot = (e) => {
        setstate(e.target.value)
        if(e.target.value.includes('En devolución')){
            setreturn_order(true)
        }else{
            setreturn_order(false)
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que cambia el estado. Si el evento contiene "En devolución" en su nombre, se muestran los campos de las fechas de devolución. 
    const changeStateCodeWhisperer = (e) => {
        if (e.target.value === 'En devoluci�3n - Entregado') {
            setreturn_order(true)
        }
        else {
            setreturn_order(false)
        }
        setstate(e.target.value)
    }

    // Función que comprueba que han pasado los días mínimos obligatorios entre las fechas esperadas.
    const translateDate = () => {
        let collection_Date = expected_Collection_Date;
        let arrival_Date = expected_Arrival_Date;
        let collectionyear = expected_Collection_Date.substr(0, 4);
        let collectionmonth = expected_Collection_Date.substr(5,2);
        let collectionday = expected_Collection_Date.substr(8,2);
        let arrivalyear = expected_Arrival_Date.substr(0, 4);
        let arrivalmonth = expected_Arrival_Date.substr(5,2);
        let arrivalday = expected_Arrival_Date.substr(8,2);
        if(shipment_Type == "Normal"){
            if(new Date(collection_Date) >= new Date(arrival_Date)){
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
            if(new Date(collection_Date) >= new Date(arrival_Date)){
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

    // Función que comprueba que han pasado los días mínimos obligatorios entre las fechas de devolución esperadas.
    const translateReturnDate = () => {
        let collection_Date = expected_Collection_Date;
        let arrival_Date = expected_Arrival_Date;
        let return_Date = expected_Return_Date;
        let collectionyear = expected_Collection_Date.substr(0, 4);
        let collectionmonth = expected_Collection_Date.substr(5,2);
        let collectionday = expected_Collection_Date.substr(8,2);
        let arrivalyear = expected_Arrival_Date.substr(0, 4);
        let arrivalmonth = expected_Arrival_Date.substr(5,2);
        let arrivalday = expected_Arrival_Date.substr(8,2);
        let returnyear = expected_Return_Date.substr(0, 4);
        let returnmonth = expected_Return_Date.substr(5,2);
        let returnday = expected_Return_Date.substr(8,2);
        if(state == "En devolución - En almacén destino"){
            if(new Date(collection_Date) >= new Date(return_Date)){
                return false;
            }else if(collectionmonth == returnmonth && collectionyear == returnyear){
                if(+returnday - collectionday < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(collectionyear == returnyear && +collectionmonth+1 == +returnmonth){
                let daysInMonth = new Date(collectionyear, collectionmonth, 0).getDate();
                if(+returnday + (daysInMonth - collectionday) < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+collectionyear+1 == +returnyear && collectionmonth == 12 && returnmonth == 1){
                if(+returnday + (31 - collectionday) < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else{
                return true;
            } 
        } else {   
            if(new Date(arrival_Date) >= new Date(return_Date)){
                return false;
            }
            else if(arrivalmonth == returnmonth && arrivalyear == returnyear){
                if(+returnday - arrivalday < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(arrivalyear == returnyear && +arrivalmonth+1 == +returnmonth){
                let daysInMonth = new Date(arrivalyear, arrivalmonth, 0).getDate();
                if(+returnday + (daysInMonth - arrivalday) < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+arrivalyear+1 == +returnyear && arrivalmonth == 12 && returnmonth == 1){
                if(+returnday + (31 - arrivalday) < 7){
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

    return (
        <div className="OrderAdd">
            <div className='OrderAdd_title'>
                <h1>Añadir un nuevo pedido</h1>
            </div>
            <div className='OrderAdd_form'>
                <FloatingLabel controlId="floatingExpedition_Number" label="Número de expedición *" className="mb-3" onChange={(e) => {setexpedition_number(e.target.value)}}>
                    <Form.Control type="number" placeholder="Número de expedición" value={expedition_number}/> 
                    <Form.Text className='form_text'>
                        El número de expedición debe tener 9 dígitos. No puede estar repetido en la base de datos.
                    </Form.Text>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingCustomer_Id" label="Id del cliente *" className="mb-3" onChange={(e) => {setcustomer_Id(e.target.value)}}>
                    <Form.Control type="number" placeholder="Id del cliente" value={customer_Id}/> 
                    <Form.Text className='form_text'>
                        El Id del cliente será el Id proporcionado en la base de datos.
                    </Form.Text>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingOrigin" label="Origen *" className="mb-3" onChange={(e) => {setorigin(e.target.value)}}>
                    <Form.Control type="text" placeholder="Origen" value={origin}/>  
                    <Form.Text className='form_text'>
                        La dirección de origen debe ser una calle, un número, un piso, una puerta y un código postal.
                    </Form.Text> 
                </FloatingLabel>
                <FloatingLabel controlId="floatingDestination" label="Destino *" className="mb-3" onChange={(e) => {setdestination(e.target.value)}}>
                    <Form.Control type="text" placeholder="Destino" value={destination}/> 
                    <Form.Text className='form_text'>
                        La dirección de destino debe ser una calle, un número, un piso, una puerta y un código postal.
                    </Form.Text>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingAdditional_Destination" label="Destino adicional" className="mb-3" onChange={(e) => {setadditional_Destination(e.target.value)}}>
                    <Form.Control type="text" placeholder="Destino adicional" value={additional_Destination}/>  
                    <Form.Text className='form_text'>
                        La dirección de destino adicional debe ser una calle, un número, un piso, una puerta y un código postal.
                    </Form.Text> 
                </FloatingLabel>
                <FloatingLabel controlId="floatingState" label="Estado del pedido *" className="mb-3">
                    <Form.Select className='manager_form_state' value={state} key={'selector_state'} onChange={(e) => changeState(e.target.value)}>
                                                <option>En trámite</option>
                                                <option>En almacén origen</option>
                                                <option>En camino</option>
                                                <option>En almacén destino</option>
                                                <option>Entregado</option>
                                                <option>En devolución - En trámite</option>
                                                <option>En devolución - En almacén origen</option>
                                                <option>En devolución - En camino</option>
                                                <option>En devolución - En almacén destino</option>
                                                <option>En devolución - Entregado</option>
                    </Form.Select>
                    <Form.Text className='form_text'>
                        Si el estado no es 'En trámite' la fecha de recogida debe añadirse. Si es 'Entregado' la fecha de llegada también debe añadirse.
                    </Form.Text> 
                    {return_order ? <Form.Text className='form_text'>Si el estado es 'En devolución - Entregado' la fecha de devolución debe añadirse.</Form.Text> : null}
                </FloatingLabel>
                {return_order ? 
                    <div>
                        <FloatingLabel controlId="floatingReturn_Date" label="Fecha de devolución" className="mb-3" onChange={(e) => {setreturn_Date(e.target.value)}}>
                            <Form.Control type="datetime-local" placeholder="Fecha de devolución" value={return_Date}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingExpected_Return_Date" label="Fecha esperada de devolución *" className="mb-3" onChange={(e) => {setexpected_Return_Date(e.target.value)}}>
                            <Form.Control type="datetime-local" placeholder="Fecha esperada de devolución" value={expected_Return_Date}/>
                        </FloatingLabel>
                        <Form.Text className='form_text_date'>
                            Deben pasar al menos 7 días entre la fecha esperada de devolución y la fecha de recogida si el pedido no ha sido enviado. Si el pedido se encuentra enviado, deben pasar al menos 7 días entre la fecha esperada de devolución y la fecha de llegada.
                        </Form.Text>
                    </div>
                : null}
                <FloatingLabel controlId="floatingShipment_Type" label="Tipo de envío *" className="mb-3">
                    <Form.Select className='manager_form_shipment_Type' value={shipment_Type} key={'selector_shipment_Type'} onChange={(e) => setshipment_Type(e.target.value)}>
                                                <option>Normal</option>
                                                <option>Rápido</option>
                    </Form.Select>
                </FloatingLabel>
                <Form.Text className='form_text_date'>
                    Debe haber al menos 5 días de diferencia entre la fecha esperada de recogida y entrega en el caso de un pedido "Normal" y 2 días en el caso de un pedido "Rápido".
                </Form.Text>
                <FloatingLabel controlId="floatingCollection_Date" label="Fecha de recogida" className="mb-3" onChange={(e) => {setcollection_Date(e.target.value)}}>
                    <Form.Control type="datetime-local" placeholder="Fecha de recogida" value={collection_Date}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingExpected_Collection_Date" label="Fecha esperada de recogida *" className="mb-3" onChange={(e) => {setexpected_Collection_Date(e.target.value)}}>
                    <Form.Control type="datetime-local" placeholder="Fecha esperada de recogida" value={expected_Collection_Date}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingArrival_Date" label="Fecha de llegada" className="mb-3" onChange={(e) => {setarrival_Date(e.target.value)}}>
                    <Form.Control type="datetime-local" placeholder="Fecha de llegada" value={arrival_Date}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingExpected_Arrival_Date" label="Fecha esperada de llegada *" className="mb-3" onChange={(e) => {setexpected_Arrival_Date(e.target.value)}}>
                    <Form.Control type="datetime-local" placeholder="Fecha esperada de llegada" value={expected_Arrival_Date}/> 
                </FloatingLabel>
                <FloatingLabel controlId="floatingCommentary" label="Comentario" className="mb-3" onChange={(e) => {setcommentary(e.target.value)}}>
                    <Form.Control type="text" placeholder="Comentario" value={commentary}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmployee_In_Charge" label="Id del empleado a cargo del pedido *" className="mb-3" onChange={(e) => {setemployee_In_Charge(e.target.value)}}>
                    <Form.Control type="number" placeholder="Id del empleado a cargo del pedido" value={employee_In_Charge}/>
                    <Form.Text className='form_text'>
                        El Id del empleado a cargo del pedido debe ser el Id del empleado de reparto proporcionado en la base de datos.
                    </Form.Text>  
                </FloatingLabel>
            </div>
            <div className='OrderAdd_buttons'>
                <div className='OrderAdd_add'>
                    <Button variant="secondary" size='lg' onClick={() => verify()}>Añadir</Button>
                </div>
                <div className='OrderAdd_goBack'>
                    <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
                </div>
            </div>
            <hr></hr>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "OrderAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo pedido. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo pedido, y dos botones: uno para añadir el pedido y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de número de expedición, id del cliente, origen, destino, destino adicional, estado del pedido (es un selector), tipo de envío (es un selector),  */}
                {/* fecha de recogida, fecha esperada de recogida, fecha de llegada, fecha esperada de llegada, comentario y empleado a cargo del pedido. */}
            {copilot ?
                <div>
                    <div className="OrderAdd__title">
                        <h1>Añadir pedido</h1>
                    </div>
                    <div className="OrderAdd__form">
                        <form onSubmit={props.handleSubmit}>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="expedition_Number">Número de expedición</label>
                                <input type="text" name="expedition_Number" id="expedition_Number" value={expedition_number} onChange={(e) => setexpedition_number(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="client_Id">Id del cliente</label>
                                <input type="text" name="client_Id" id="client_Id" value={customer_Id} onChange={(e) => setcustomer_Id(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="origin">Origen</label>
                                <input type="text" name="origin" id="origin" value={origin} onChange={(e) => setorigin(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="destination">Destino</label>
                                <input type="text" name="destination" id="destination" value={destination} onChange={(e) => setdestination(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="additional_Destination">Destino adicional</label>
                                <input type="text" name="additional_Destination" id="additional_Destination" value={additional_Destination} onChange={(e) => setadditional_Destination(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="state">Estado del pedido</label>
                                <select name="state" id="state" value={state} onChange={(e) => setstate(e.target.value)} required>
                                    <option value="En almacén origen">En almacén origen</option>
                                    <option value="En tránsito">En tránsito</option>
                                    <option value="En almacén destino">En almacén destino</option>
                                    <option value="En reparto">En reparto</option>
                                    <option value="Entregado">Entregado</option>
                                    <option value="En devolución - En almacén destino">En devolución - En almacén destino</option>
                                    <option value="En devolución - En tránsito">En devolución - En tránsito</option>
                                    <option value="En devolución - En almacén origen">En devolución - En almacén origen</option>
                                    <option value="Devuelto">Devuelto</option>
                                </select>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="shipping_Type">Tipo de envío</label>
                                <select name="shipping_Type" id="shipping_Type" value={shipment_Type} onChange={(e) => setshipment_Type(e.target.value)} required>
                                    <option value="Terrestre">Terrestre</option>
                                    <option value="Marítimo">Marítimo</option>
                                    <option value="Aéreo">Aéreo</option>
                                </select>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="pickup_Date">Fecha de recogida</label>
                                <input type="date" name="pickup_Date" id="pickup_Date" value={collection_Date} onChange={(e) => setcollection_Date(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="expected_Pickup_Date">Fecha esperada de recogida</label>
                                <input type="date" name="expected_Pickup_Date" id="expected_Pickup_Date" value={expected_Collection_Date} onChange={(e) => setexpected_Collection_Date(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="arrival_Date">Fecha de llegada</label>
                                <input type="date" name="arrival_Date" id="arrival_Date" value={arrival_Date} onChange={(e) => setarrival_Date(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="expected_Arrival_Date">Fecha esperada de llegada</label>
                                <input type="date" name="expected_Arrival_Date" id="expected_Arrival_Date" value={expected_Arrival_Date} onChange={(e) => setexpected_Arrival_Date(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="comment">Comentario</label>
                                <input type="text" name="comment" id="comment" value={commentary} onChange={(e) => setcommentary(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__field">
                                <label htmlFor="employee_Id">Empleado a cargo del pedido</label>
                                <input type="text" name="employee_Id" id="employee_Id" value={employee_In_Charge} onChange={(e) => setemployee_In_Charge(e.target.value)} required/>
                            </div>
                            <div className="OrderAdd__form__buttons">
                                <button type="submit">Añadir pedido</button>
                                <button type="button" onClick={() => props.history.goBack()}>Volver</button>
                            </div>
                        </form>
                    </div>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "OrderAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo pedido. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo pedido, y dos botones: uno para añadir el pedido y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de número de expedición, id del cliente, origen, destino, destino adicional, estado del pedido (es un selector), tipo de envío (es un selector),  */}
                {/* fecha de recogida, fecha esperada de recogida, fecha de llegada, fecha esperada de llegada, comentario y empleado a cargo del pedido. */}
            {codeWhisperer ?
                <div>
                    <h1>Añadir pedido</h1>
                    <form onSubmit={props.handleSubmit}>
                            <label>NÚMERO DE EXPEDICIÓN</label>
                            <input type="text" name="number_of_expedition" value={expedition_number} onChange={props.handleChange} />
                            <label>ID DEL CLIENTE</label>
                            <input type="text" name="id_client" value={customer_Id} onChange={props.handleChange} />
                            <label>ORIGEN</label>
                            <input type="text" name="origin" value={origin} onChange={props.handleChange} />
                            <label>DESTINO</label>
                            <input type="text" name="destination" value={destination} onChange={props.handleChange} />
                            <label>DESTINO ADICIONAL</label>
                            <input type="text" name="destination_additional" value={additional_Destination} onChange={props.handleChange} />
                            <label>ESTADO DEL PEDIDO</label>
                            <select name="state" value={state} onChange={props.handleChange}>
                                <option value="En almacén">En almacén</option>
                                <option value="En almacén destino">En almacén destino</option>
                                <option value="En devolución - En almacén destino">En devolución - En almacén destino</option>
                                <option value="En devolución - En almacén">En devolución - En almacén</option>
                            </select>
                            <label>TIPO DE ENVÍO</label>
                            <select name="type_of_shipping" value={shipment_Type} onChange={props.handleChange}>
                                <option value="Express">Express</option>
                                <option value="Standard">Standard</option>
                            </select>
                            <label>FECHA DE RECOGIDA</label>
                            <input type="date" name="collection_date" value={collection_Date} onChange={props.handleChange} />
                            <label>FECHA DE LLEGADA</label>
                            <input type="date" name="arrival_date" value={arrival_Date} onChange={props.handleChange} />
                            <label>FECHA DE VUELTA</label>
                            <input type="date" name="return_date" value={return_Date} onChange={props.handleChange} />
                            <label>COMENTARIO</label>
                            <input type="text" name="comment" value={commentary} onChange={props.handleChange} />
                            <label>EMPLEADO A CARGO DEL PEDIDO</label>
                            <input type="text" name="employee" value={employee_In_Charge} onChange={props.handleChange} />
                            <button type="submit">Añadir pedido</button>
                            <button onClick={props.handleBack}>Volver</button>
                    </form>
                </div>
                : null
            }
        </div>
    );
}