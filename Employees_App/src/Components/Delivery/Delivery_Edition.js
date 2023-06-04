import './Delivery_Edition.css';

import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// Componente que permite al repartidor ver y editar los datos de una entrega seleccionada. Además, permite ver los datos de los paquetes asociados a la entrega.
export default function Delivery_Edition(props) {
    const [state, setState] = useState(props.order?.State);
    const [collection_date, setCollection_date] = useState(props.order?.Collection_Date);
    const [arrival_date, setArrival_date] = useState(props.order?.Arrival_Date);
    const [return_date, setReturn_date] = useState(props.order?.Return_Date);
    const [fields_concatenated, setFields_concatenated] = useState();
    const [return_order, setreturn_order] = useState(false);
    const [fields_return_order, setFields_return_order] = useState();

    const copilot = false;
    const codeWhisperer = false;

    // Función que se ejecuta al iniciar el componente. Concatena los campos de la entrega seleccionada.
    useEffect(() => {
        concatFields()
    }, [props.order, props.customer])
    
    // Función que permite cambiar el estado de una entrega, enviando el nuevo estado a la base de datos.
    const changeState = (event) => {
        setState(event.target.value)
        if(event.target.value === 'En devolución - En trámite' || event.target.value === 'En devolución - En almacén origen' || event.target.value === 'En devolución - En camino' || event.target.value === 'En devolución - En almacén destino' || event.target.value === 'En devolución - Entregado'){
            setreturn_order(true)
        }
        props.setOrderValue(props.order.Id, 'State', event.target.value)
        alert('El estado ha cambiado')
    }

    // Función realizada por GitHub Copilot.
    // Función que permite cambiar el estado de una entrega. Si el estado contiene "En devolución", se activa el campo de devolución. 
    // Además, se envía el nuevo estado a la base de datos. La función debe camiar el estado de la entrega cambiando el campo state de la aplicación.
    const changeStateCopilot = () => {
        if (state === 'En devolución') {
            setreturn_order(true)
        }
        props.setOrderValue(props.order.Id, 'State', state)
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que permite cambiar el estado de una entrega. Si el estado contiene "En devolución", se activa el campo de devolución. 
    // Además, se envía el nuevo estado a la base de datos. La función debe camiar el estado de la entrega cambiando el campo state de la aplicación.
    const changeStateCodeWhisperer = () => {
        if (state === 'En devolución') {
            setreturn_order(true)
            setFields_return_order(
                <Form.Group>
                    <Form.Label>Devolución</Form.Label>
                    <Form.Control type="date" id="return_date" value={return_date} onChange={changeReturnDate} />
                </Form.Group>
            )
        } else {
            setreturn_order(false)
            setFields_return_order()
        }
        props.setOrderValue(props.order.Id, 'State', state)
        alert('State changed')
    }
    
    // Función que permite cambiar la fecha de recogida de una entrega, enviando la nueva fecha de recogida a la base de datos.
    const changeCollectionDate = () => {
        if(collection_date){
            props.setOrderValue(props.order.Id, 'Collection_Date', collection_date)  
            alert('Fecha de recogida cambiada')
        }else{
            alert('La fecha de recogida no puede estar vacía')
        }
    }

    // Función que permite cambiar la fecha de llegada de una entrega, enviando la nueva fecha de llegada a la base de datos.
    const changeArrivalDate = () => {
        if(arrival_date){
            console.log(arrival_date)
            props.setOrderValue(props.order.Id, 'Arrival_Date', arrival_date)
            alert('Fecha de llegada cambiada')
        }else{
            alert('La fecha de llegada no puede estar vacía')
        }
    }

    // Función que permite cambiar la fecha de devolución de una entrega, enviando la nueva fecha de devolución a la base de datos.
    const changeReturnDate = () => {
        if(return_date){
            props.setOrderValue(props.order.Id, 'Return_Date', return_date)
            alert('Fecha de devolución cambiada')
        }else{
            alert('La fecha de devolución no puede estar vacía')
        }
    }    
    
    // Función realizada por GitHub Copilot.
    // Función que permite modificar la fecha de recogida, de entrega o de devolución en la base de datos si se presiona su botón correspondiente.
    const changeDateCopilot = (event) => {
        if (event.target.id === 'collection_date') {
            props.setOrderValue(props.order.Id, 'Collection_Date', event.target.value)
        } else if (event.target.id === 'arrival_date') {
            props.setOrderValue(props.order.Id, 'Arrival_Date', event.target.value)
        } else if (event.target.id === 'return_date') {
            props.setOrderValue(props.order.Id, 'Return_Date', event.target.value)
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que permite modificar la fecha de recogida, de entrega o de devolución en la base de datos si se presiona su botón correspondiente.
    const changeDateCodeWhisperer = (event) => {   
        if (event.target.id === 'collection_date') {
            setCollection_date(event.target.value)
            props.setOrderValue(props.order.Id, 'Collection_Date', event.target.value)
        } else if (event.target.id === 'arrival_date') {
            setArrival_date(event.target.value)
            props.setOrderValue(props.order.Id, 'Arrival_Date', event.target.value)
        } else if (event.target.id === 'return_date') {
            setReturn_date(event.target.value)
            props.setOrderValue(props.order.Id, 'Return_Date', event.target.value)
        }
    }

    // Función que permite desactivar una entrega, modificando el campo Active de la entrega en la base de datos.
    const desactivateOrder = () => { 
        props.setOrderValue(props.order.Id, 'Active', false)
        alert('Pedido desactivado')
        props.goBack()
    }

    // Función realizada por GitHub Copilot.
    // Función que permite desactivar una entrega, modificando el campo Active de la entrega en la base de datos. Tras esto, navega a la página anterior.
    const deactivateOrderCopilot = () => {
        props.setOrderValue(props.order.Id, 'Active', false)
        props.history.goBack()
    }    

    // Función realizada por Amazon CodeWhisperer.
    // Función que permite desactivar una entrega, modificando el campo Active de la entrega en la base de datos. Tras esto, navega a la página anterior.
    const deactivateOrderCodeWhisperer = () => {
        props.setOrderValue(props.order.Id, 'Active', false)
        props.setOrderValue(props.order.Id, 'State', 'Cancelado')
        alert('Order deactivated')
        props.history.goBack()
    }

    // Función que se encarga de obtener la fecha de recogida esperada de un pedido.
    const obtainExpectedCollectionDate = (order) => {
        return ((order?.Expected_Collection_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Collection_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Collection_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de llegada esperada de un pedido.
    const obtainExpectedArrivalDate = (order) => {
        return ((order?.Expected_Arrival_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Arrival_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Arrival_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de devolución esperada de un pedido.
    const obtainExpectedReturnDate = (order) => {
        return ((order?.Expected_Return_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Return_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Return_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Return_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Return_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de recogida de un pedido.
    const obtainCollectionDate = (order) => {
        return ((order?.Collection_Date?.toString().substr(8,2)) +'-'+ (order?.Collection_Date?.toString().substr(5,2)) +'-'+ (order?.Collection_Date?.toString().substr(0,4)) +' '+ (+(order?.Collection_Date?.toString().substr(11,2))+2) +':'+ (order?.Collection_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de llegada de un pedido.
    const obtainArrivalDate = (order) => {
        return ((order?.Arrival_Date?.toString().substr(8,2)) +'-'+ (order?.Arrival_Date?.toString().substr(5,2)) +'-'+ (order?.Arrival_Date?.toString().substr(0,4)) +' '+ (+(order?.Arrival_Date?.toString().substr(11,2))+2) +':'+ (order?.Arrival_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de devolución de un pedido.
    const obtainReturnDate = (order) => {
        return ((order?.Return_Date?.toString().substr(8,2)) +'-'+ (order?.Return_Date?.toString().substr(5,2)) +'-'+ (order?.Return_Date?.toString().substr(0,4)) +' '+ (+(order?.Return_Date?.toString().substr(11,2))+2) +':'+ (order?.Return_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de recoger los campos de interés para mostrarlos en la vista.
    const concatFields = () => {
        if(!props.order || !props.customer) return([])
        const fields = [
            {name: 'Id',
                value: props.order?.Id},
            {name: 'Número de expedición',
                value: props.order?.Expedition_Number},
            {name: 'Nombre del cliente',
                value: props.customer?.Name},
            {name: 'Id del cliente',
                value: props.customer?.Customer_Id},
            {name: 'Teléfono del cliente',
                value: props.customer?.Phone},
            {name: 'Origen',
                value: props.order?.Origin},
            {name: 'Destino',
                value: props.order?.Destination},
            {name: 'Destino adicional',
                value: props.order?.Additional_Destination},
            {name: 'Fecha de recogida esperada',
                value: obtainExpectedCollectionDate(props.order)},
            {name: 'Fecha de llegada esperada',
                value: obtainExpectedArrivalDate(props.order)},
            {name: 'Fecha de recogida',
                value: obtainCollectionDate(props.order)},
            {name: 'Fecha de llegada',
                value: obtainArrivalDate(props.order)},
            {name: 'Estado',
                value: props.order?.State},
            {name: 'Tipo de envío',
                value: props.order?.Shipment_Type},
            {name: 'Volumen',
                value: props.order?.Volume},
            {name: 'Coste (€)',
                value: props.order?.Cost},
            {name: 'Comentario',
                value: props.order?.Commentary}
        ]
        setFields_concatenated(fields)
        if(props.order?.State === 'En devolución - En trámite' || props.order?.State === 'En devolución - En almacén origen' || props.order?.State === 'En devolución - En camino' || props.order?.State === 'En devolución - En almacén destino' || props.order?.State === 'En devolución - Entregado'){
            setreturn_order(true)
        }
        const fields_return = [
            {name: 'Fecha esperada de devolución',
                value: obtainExpectedReturnDate(props.order)},
            {name: 'Fecha de devolución',
                value: obtainReturnDate(props.order)}    
        ]
        setFields_return_order(fields_return)
    }

    // Función realizada por GitHub Copilot.
    // Función que concatena todos los campos de un pedido, incluyendo el nombre, el id y el teléfono del cliente. 
    // Además concatena en otro adicional los datos de devolución si el pedido está en devolución.
    const concatenateFieldsCopilot = (order) => {
        const fields = [
            { name: 'Id', value: order.Id },
            { name: 'Customer', value: order.Customer },
            { name: 'Expedition number', value: order.Expedition_Number },
            { name: 'Customer_Id', value: order.Customer_Id },
            { name: 'Customer_Phone', value: order.Customer_Phone },
            { name: 'State', value: order.State },
            { name: 'Expected_Collection_Date', value: obtainExpectedCollectionDate(order) },
            { name: 'Expected_Arrival_Date', value: obtainExpectedArrivalDate(order) },
            { name: 'Expected_Return_Date', value: obtainExpectedReturnDate(order) },
            { name: 'Collection_Date', value: obtainCollectionDate(order) },
            { name: 'Arrival_Date', value: obtainArrivalDate(order) },
            { name: 'Return_Date', value: obtainReturnDate(order) },
            { name: 'Active', value: order.Active },
        ]
        if (order.State === 'En devolución - En trámite' || order.State === 'En devolución - En almacén origen' || order.State === 'En devolución - En camino' || order.State === 'En devolución - En almacén destino' || order.State === 'En devolución - Entregado') {
            const fields_return = [
                { name: 'Return_Customer', value: order.Return_Customer },
                { name: 'Return_Customer_Id', value: order.Return_Customer_Id },
                { name: 'Return_Customer_Phone', value: order.Return_Customer_Phone },
                { name: 'Return_State', value: order.Return_State },
                { name: 'Return_Expected_Collection_Date', value: obtainExpectedCollectionDate(order) },
                { name: 'Return_Expected_Arrival_Date', value: obtainExpectedArrivalDate(order) },
                { name: 'Return_Expected_Return_Date', value: obtainExpectedReturnDate(order) },
                { name: 'Return_Collection_Date', value: obtainCollectionDate(order) },
                { name: 'Return_Arrival_Date', value: obtainArrivalDate(order) },
                { name: 'Return_Return_Date', value: obtainReturnDate(order) },
                { name: 'Return_Active', value: order.Return_Active },
            ]
            return fields.concat(fields_return)
        } else {
            return fields
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que concatena todos los campos de un pedido, incluyendo el nombre, el id y el teléfono del cliente. 
    // Además concatena en otro adicional los datos de devolución si el pedido está en devolución.
    const concatenateFieldsCodeWhisperer = (order) => {
        const fields = [
            { name: 'Id', value: order.Id },
            { name: 'Customer', value: order.Customer },
            { name: 'Expedition number', value: order.Expedition_Number },
            { name: 'Customer_Id', value: order.Customer_Id },
            { name: 'Customer_Phone', value: order.Customer_Phone },
            { name: 'State', value: order.State },
            { name: 'Expected_Collection_Date', value: obtainExpectedCollectionDate(order) },
            { name: 'Expected_Arrival_Date', value: obtainExpectedArrivalDate(order) },
            { name: 'Expected_Return_Date', value: obtainExpectedReturnDate(order) },
            { name: 'Collection_Date', value: obtainCollectionDate(order) },
            { name: 'Arrival_Date', value: obtainArrivalDate(order) },
            { name: 'Active', value: order.Active },
        ]
        return fields;
    }

    return (
        <div className='Delivery_Edition'>
           <h1 className='delivery_edition_title'>Edición del pedido</h1>
            <div className='delivery_edition_container'>
                <Table size="sm">
                    <tbody>
                        {fields_concatenated?.map((field) => {
                            if(field.name === 'Estado'){
                                return(
                                    <tr key={field.name}>
                                        <td className='field_title'>{field.name}</td>
                                        <td className='field_value'>
                                            <Form.Select className='form_state' value={state} key={'selector'} onChange={(e) => changeState(e)}>
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
                                        </td>
                                    </tr>
                                )
                            } else if(field.name === 'Fecha de recogida' && field.value === 'undefined-undefined-undefined NaN:undefined'){
                                return(
                                    <tr key={field.name}>
                                        <td className='collection_arrival_return_title' id='collection_title'>{field.name}</td> 
                                        <td className='field_value'>
                                            <div className='field_value_input'>
                                                <InputGroup size="sm" className='field_input' onChange={(e) => {setCollection_date(e.target.value)}}>
                                                    <Form.Control type="datetime-local" placeholder="Collection date"/>  
                                                    <Button variant="secondary" onClick={() => changeCollectionDate()}>Enviar</Button>
                                                </InputGroup>
                                            </div>
                                        </td>
                                    </tr> 
                                )
                            } else if(field.name === 'Fecha de llegada' && field.value === 'undefined-undefined-undefined NaN:undefined'){
                                return(
                                    <tr key={field.name}>
                                        <td className='collection_arrival_return_title' id='arrival_title'>{field.name}</td> 
                                        <td className='field_value'>
                                            <div className='field_value_input'>
                                                <InputGroup size="sm" className='field_input' onChange={(e) => {setArrival_date(e.target.value)}}>
                                                    <Form.Control type="datetime-local" placeholder="Arrival date"/>  
                                                    <Button variant="secondary" onClick={() => changeArrivalDate()}>Enviar</Button>
                                                </InputGroup>
                                            </div>
                                        </td>
                                    </tr> 
                                )
                            } else if(field.name === 'Volumen'){
                                return(
                                    <tr key={field.name}>
                                        <td className='field_title'>{field.name} (cm<sup>3</sup>)</td> 
                                        <td className='field_value'>{field.value}</td>
                                    </tr> 
                                )
                            }else {
                                return(
                                    <tr key={field.name}>
                                        <td className='field_title'>{field.name}</td> 
                                        <td className='field_value'>{field.value}</td>
                                    </tr> 
                                )
                            }
                        })}
                    </tbody>
                </Table>
            </div>
            <div className='delivery_edition_return_order'>
                {return_order ? <h2 className='return_title'>Devolución del pedido</h2> : null}
                {return_order ? <div className='delivery_edition_return_container'>
                    <Table size="sm">
                        <tbody>
                            {fields_return_order?.map((field) => {
                                if(field.name === 'Fecha de devolución' && field.value === 'undefined-undefined-undefined NaN:undefined'){
                                    return(
                                        <tr key={field.name}>
                                            <td className='collection_arrival_return_title' id='return_title'>{field.name}</td> 
                                            <td className='field_value'>
                                                <div className='field_value_input'>
                                                    <InputGroup size="sm" className='field_input' onChange={(e) => {setReturn_date(e.target.value)}}>
                                                        <Form.Control type="datetime-local" placeholder="Return date"/>  
                                                        <Button variant="secondary" onClick={() => changeReturnDate()}>Enviar</Button>
                                                    </InputGroup>
                                                </div>
                                            </td>
                                        </tr> 
                                    )
                                }
                                else {
                                    return(
                                        <tr key={field.name}>
                                            <td className='field_title'>{field.name}</td> 
                                            <td className='field_value'>{field.value}</td>
                                        </tr> 
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
                : null
                }
            </div>
            <div className='delivery_edition_buttons'>
                <div className='go_back'>
                    <Button variant="secondary" onClick={() => props.goBack()}>Volver</Button>
                </div>
                <div className='desactivate'>
                    <Button variant="danger" onClick={() => desactivateOrder()}>Desactivar</Button>
                </div>
            </div>
            <div className='packets'>
                <h2 className='packets_title'>Paquetes</h2>
                {props.package_table?.map((packet) => {
                    if(packet.Order_Id === props.order.Id){
                        return(
                            <div className='packets_container'>
                                <Table size="sm">
                                    <tbody>
                                        <tr key={'Id'+packet.Id}>
                                            <td className='field_title'>Id del paquete</td> 
                                            <td className='field_value'>{packet.Id}</td>
                                        </tr>
                                        <tr key={'Fragility'+packet.Fragility}>
                                            <td className='field_title'>Fragilidad del paquete</td>
                                            {packet.Fragility ? <td className='field_value' id='fragile'>Sí</td> : <td className='field_value'>No</td>}                                        </tr>
                                        <tr key={'Weight'+packet.Weight}>
                                            <td className='field_title'>Peso del paquete (kg)</td> 
                                            <td className='field_value'>{packet.Weight}</td>
                                        </tr>
                                        <tr key={'Width'+packet.Width}>
                                            <td className='field_title'>Anchura del paquete (cm)</td> 
                                            <td className='field_value'>{packet.Width}</td>
                                        </tr>
                                        <tr key={'Height'+packet.Height}>
                                            <td className='field_title'>Altura del paquete (cm)</td>
                                            <td className='field_value'>{packet.Height}</td>
                                        </tr>
                                        <tr key={'Length'+packet.Length}>
                                            <td className='field_title'>Profundidad del paquete (cm)</td>
                                            <td className='field_value'>{packet.Length}</td>
                                        </tr>
                                        <tr key={'Volume'+packet.Volume}>
                                            <td className='field_title'>Volumen del paquete (cm<sup>3</sup>)</td>
                                            <td className='field_value'>{packet.Volume}</td>
                                        </tr>
                                    </tbody>
                                </Table> 
                            </div>
                        )
                    }
                })}
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Delivery_Edition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un pedido. En ella se muestra la información general del pedido, para lo que utiliza props.customer, props.order y props.package_table (obteniendo los datos de los paquetes comparando order.Id con package_table.Order_Id). */}
                {/* En la parte superior se muestra la información del pedido con su id, número de expedición, nombre del cliente, Id del cliente, su teléfono, */}
                {/* origen, destino, destino adicional (si existe), fecha de recogida esperada, fecha de recogida, fecha de llegada esperada, fecha de llegada, estado del pedido, fecha de devolución (si existe), fecha de devolución esperada (si existe), estado, tipo de envío, volumen total, coste y comentarios adicionales. */}
                {/* Los datos de fecha de recogida, fecha de llegada y fecha de devolución se pueden modificar siempre que no tengan el valor asignado. El estado se podrá modificar en todo momento. */}
                {/* En la parte inferior se muestra la información de los paquetes que contiene el pedido con su id, fragilidad, peso, anchura, altura, profundidad y volumen. */}
                {/* Además, contiene dos botones, uno para volver y otro para desactivar el pedido. */}
            {copilot ? 
                <div>
                    <div className='Delivery_Edition_Header'>
                        <h1>Editar pedido</h1>
                    </div>
                    <div className='Delivery_Edition_Container'>
                        {props.order ?
                            <div className='Delivery_Edition_Container_Order'>
                                <p>Id: {props.order.Id}</p>
                                <p>Número de expedición: {props.order.Expedition_Number}</p>
                                <p>Cliente: {props.order.Customer}</p>
                                <p>Id del cliente: {props.order.Customer_Id}</p>
                                <p>Teléfono del cliente: {props.order.Customer_Phone}</p>
                                <p>Origen: {props.order.Origin}</p>
                                <p>Destino: {props.order.Destination}</p>
                                {props.order.Destination_Additional ? <p>Destino adicional: {props.order.Destination_Additional}</p> : null}
                                <p>Fecha de recogida esperada: {obtainExpectedCollectionDate(props.order)}</p>
                                {props.order.Collection_Date ? <p>Fecha de recogida: {obtainCollectionDate(props.order)}</p> : null}
                                <p>Fecha de llegada esperada: {obtainExpectedArrivalDate(props.order)}</p>
                                {props.order.Arrival_Date ? <p>Fecha de llegada: {obtainArrivalDate(props.order)}</p> : null}
                                {props.order.Return_Date ? <p>Fecha de devolución: {obtainReturnDate(props.order)}</p> : null}
                                {props.order.Return_Expected_Return_Date ? <p>Fecha de devolución esperada: {obtainExpectedReturnDate(props.order)}</p> : null}
                                <p>Estado: {props.order.State}</p>
                                <p>Tipo de envío: {props.order.Shipping_Type}</p>
                                <p>Volumen total: {props.order.Total_Volume}</p>
                                <p>Coste: {props.order.Cost}</p>
                                {props.order.Comments ? <p>Comentarios adicionales: {props.order.Comments}</p> : null}
                            </div>
                            : null
                        }
                        {props.package_table ?
                            <div className='Delivery_Edition_Container_Packages'>
                                <h2>Paquetes</h2>
                                {props.package_table.map((packet) => {
                                    if(packet.Order_Id === props.order.Id){
                                        return (
                                            <div className='Delivery_Edition_Container_Packages_Package'>
                                                <p>Id: {packet.Id}</p>
                                                <p>Fragilidad: {packet.Fragility}</p>
                                                <p>Peso: {packet.Weight}</p>
                                                <p>Anchura: {packet.Width}</p>
                                                <p>Altura: {packet.Height}</p>
                                                <p>Profundidad: {packet.Depth}</p>
                                                <p>Volumen: {packet.Volume}</p>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                            : null
                        }
                        <div className='Delivery_Edition_Container_Buttons'>
                            <button onClick={() => props.setEdit(false)}>Volver</button>
                            <button onClick={() => props.setActive(false)}>Desactivar</button>
                        </div>
                    </div>
                </div>  
            : null
            } 
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Delivery_Edition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un pedido. En ella se muestra la información general del pedido, para lo que utiliza props.customer, props.order y props.package_table (obteniendo los datos de los paquetes comparando order.Id con package_table.Order_Id). */}
                {/* En la parte superior se muestra la información del pedido con su id, número de expedición, nombre del cliente, Id del cliente, su teléfono, */}
                {/* origen, destino, destino adicional (si existe), fecha de recogida esperada, fecha de recogida, fecha de llegada esperada, fecha de llegada, estado del pedido, fecha de devolución (si existe), fecha de devolución esperada (si existe), estado, tipo de envío, volumen total, coste y comentarios adicionales. */}
                {/* Los datos de fecha de recogida, fecha de llegada y fecha de devolución se pueden modificar siempre que no tengan el valor asignado. El estado se podrá modificar en todo momento. */}
                {/* En la parte inferior se muestra la información de los paquetes que contiene el pedido con su id, fragilidad, peso, anchura, altura, profundidad y volumen. */}
                {/* Además, contiene dos botones, uno para volver y otro para desactivar el pedido. */}
            {codeWhisperer ?
                <div>
                    <div className='Delivery_Edition_Top'>
                        <div className='Delivery_Edition_Top_Fields'>
                            {concatenateFieldsCodeWhisperer(props.order).map((field) => (
                                <div className='Delivery_Edition_Top_Fields_Field'>
                                    <div className='Delivery_Edition_Top_Fields_Field_Name'>{field.name}</div>
                                    <div className='Delivery_Edition_Top_Fields_Field_Value'>{field.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='Delivery_Edition_Bottom'>
                        <div className='Delivery_Edition_Bottom_Fields'>
                            {props.package_table.map((package_table) => (
                                <div className='Delivery_Edition_Bottom_Fields_Field'>
                                    <div className='Delivery_Edition_Bottom_Fields_Field_Name'>{package_table.Package_Id}</div>
                                    <div className='Delivery_Edition_Bottom_Fields_Field_Value'>{package_table.Fragile}</div>
                                    <div className='Delivery_Edition_Bottom_Fields_Field_Value'>{package_table.Weight}</div>
                                    <div className='Delivery_Edition_Bottom_Fields_Field_Value'>{package_table.Width}</div>
                                    <div className='Delivery_Edition_Bottom_Fields_Field_Value'>{package_table.Height}</div>
                                    <div className='Delivery_Edition_Bottom_Fields_Field_Value'>{package_table.Depth}</div>
                                    <div className='Delivery_Edition_Bottom_Fields_Field_Value'>{package_table.Volume}</div>
                                </div>
                            ))}
                        </div>
                        <div className='Delivery_Edition_Bottom_Buttons'>
                            <button className='Delivery_Edition_Bottom_Buttons_Button' onClick={props.handle_return_order}>Volver</button>
                            <button className='Delivery_Edition_Bottom_Buttons_Button' onClick={props.handle_deactivate_order}>Desactivar</button>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}