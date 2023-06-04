import './CustomerService.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Link from 'react-bootstrap/NavLink';

// Componente que muestra la vista principal de los empleados de atención al cliente.
export default function CustomerService(props) {
    const [input_filter_customer, setInput_filter_customer] = useState();
    const [input_filter_order, setInput_filter_order] = useState();
    const [array_customer_filtered, setArray_customer_filtered] = useState(props.customer_table);
    const [array_order_filtered, setArray_order_filtered] = useState(props.order_table);
    const [view_customers, setView_customers] = useState(0);
    const [view_orders, setView_orders] = useState(0);
    const [view_orders_inactive, setView_orders_inactive] = useState(0);

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que se ejecuta al iniciar el componente. Se encarga de recoger los datos de las tablas de cliente y de pedido.
    useEffect(() => {
        if(props.customer_table === undefined || props.order_table === undefined){
            return
        }
        setArray_customer_filtered(props.customer_table)
        setArray_order_filtered(props.order_table)
    }, [props.customer_table, props.order_table])

    // Función que se encarga de filtrar los clientes. Se utiliza para filtrar los clientes por su Id, su nombre o su email con el input de filtrado de clientes.
    const filter_customer = () => {
        if(input_filter_customer === ""){
            setArray_customer_filtered(props.customer_table)
        } else{
            var array_filter = []
            props.customer_table.map((customer) => {
                if(customer.Id ==  input_filter_customer || customer.Name.toLowerCase().includes(input_filter_customer.toLowerCase()) || customer.Email.toLowerCase().includes(input_filter_customer.toLowerCase())){
                    array_filter.push(customer)
                }
            })
            setArray_customer_filtered(array_filter)
        }

    }

    // Función que se encarga de filtrar los pedidos. Se utiliza para filtrar los pedidos por su Id, su número de expedición, su estado, su fecha de entrega esperada, su fecha de llegada esperada o el empleado que lo gestiona con el input de filtrado de pedidos.
    const filter_order = () => {
        if(input_filter_order === ""){
            setArray_order_filtered(props.order_table)
        } else{
            var array_filter = []
            props.order_table.map((order) => {
                if(order.Id == input_filter_order || order.Expedition_Number == input_filter_order || order.State.toLowerCase().includes(input_filter_order.toLowerCase()) || obtainExpectedCollectionDate(order) == input_filter_order || obtainExpectedArrivalDate(order) == input_filter_order || order.Employee_In_Charge == input_filter_order){
                    array_filter.push(order)
                }
            })
            setArray_order_filtered(array_filter)
        }
    }

    // Función realizada por GitHub Copilot.
    // Función encargada de filtrar los pedidos y los clientes. Debe filtrar por los campos más importantes de los pedidos y de los clientes.
    const filterCopilot = () => {
        setArray_customer_filtered(props.customer_table.filter((customer) => {
            if (customer.Id.toString().includes(input_filter_customer) || customer.Name.includes(input_filter_customer) || customer.Surname.includes(input_filter_customer) || customer.Email.includes(input_filter_customer) || customer.Phone_Number.includes(input_filter_customer)) {
                return customer
            }
        }))
        setArray_order_filtered(props.order_table.filter((order) => {
            if (order.Id.toString().includes(input_filter_order) || order.Expedition_Number.toString().includes(input_filter_order) || order.Order_Status.includes(input_filter_order) || order.Expected_Collection_Date.includes(input_filter_order) || order.Expected_Arrival_Date.includes(input_filter_order)) {
                return order
            }
        }))
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función encargada de filtrar los pedidos y los clientes. Debe filtrar por los campos más importantes de los pedidos y de los clientes.
    const filterCodeWhisperer = () => {
        var array_customer_filtered_aux = []
        var array_order_filtered_aux = []
        if (input_filter_customer != "" && input_filter_order != "") {
            for (var i = 0; i < array_customer_filtered.length; i++) {
                if (array_customer_filtered[i].Customer_Name.toLowerCase().includes(input_filter_customer.toLowerCase()) && array_customer_filtered[i].Customer_ID.toLowerCase().includes(input_filter_customer.toLowerCase())) {
                    array_customer_filtered_aux.push(array_customer_filtered[i])
                }
            }
            for (var i = 0; i < array_order_filtered.length; i++) {
                if (array_order_filtered[i].Order_ID.toLowerCase().includes(input_filter_order.toLowerCase())) {
                    array_order_filtered_aux.push(array_order_filtered[i])
                }
            }
            setArray_customer_filtered(array_customer_filtered_aux)
            setArray_order_filtered(array_order_filtered_aux)
            return

        }
        setArray_customer_filtered(array_customer_filtered_aux)
        setArray_order_filtered(array_order_filtered_aux)
    }
    
    // Función que se encarga de obtener la fecha de entrega esperada de un pedido.
    const obtainExpectedCollectionDate = (order) => {
        return ((order?.Expected_Collection_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Collection_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Collection_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de llegada esperada de un pedido.
    const obtainExpectedArrivalDate = (order) => {
        return ((order?.Expected_Arrival_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Arrival_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Arrival_Date?.toString().substr(14,2)))
    }

    // Función realizada por GitHub Copilot.
    // Función que se encarga de obtener las fechas de llegada y entrega esperadas de un pedido.
    const obtainExpectedCollectionArrivalDateCopilot = (order) => {
        var expectedCollectionDate = new Date(order.Expected_Collection_Date)
        var expectedArrivalDate = new Date(order.Expected_Arrival_Date)
        var expectedCollectionDateStr = expectedCollectionDate.getDate() + "/" + (expectedCollectionDate.getMonth() + 1) + "/" + expectedCollectionDate.getFullYear()
        var expectedArrivalDateStr = expectedArrivalDate.getDate() + "/" + (expectedArrivalDate.getMonth() + 1) + "/" + expectedArrivalDate.getFullYear()
        return expectedCollectionDateStr + " - " + expectedArrivalDateStr

    }
    
    // Función realizada por Amazon CodeWhisperer.
    // Función que se encarga de obtener las fechas de llegada y entrega esperadas de un pedido.
    const obtainExpectedCollectionArrivalDateCodeWhisperer = (order) => {
        let expectedCollectionArrivalDate = "";
        let expectedCollectionArrivalTime = "";
        let expectedCollectionArrivalDateSplit = [];
        let expectedCollectionArrivalTimeSplit = [];
        let expectedCollectionArrivalDateFinal = "";
        let expectedCollectionArrivalTimeFinal = "";
        let expectedCollectionArrivalDateFinalSplit = [];
        let expectedCollectionArrivalTimeFinalSplit = [];
        let expectedCollectionArrivalDateFinalFinal = "";
        let expectedCollectionArrivalTimeFinalFinal = "";

        if (order.ExpectedCollectionArrivalDate !== null) {
            expectedCollectionArrivalDate = order.ExpectedCollectionArrivalDate;
        }
        if (order.ExpectedCollectionArrivalTime !== null) {
            expectedCollectionArrivalTime = order.ExpectedCollectionArrivalTime;
        }

        expectedCollectionArrivalDateSplit = expectedCollectionArrivalDate.split("T");
        expectedCollectionArrivalTimeSplit = expectedCollectionArrivalTime.split("T");
        expectedCollectionArrivalDateFinal = expectedCollectionArrivalDateSplit[0];
        expectedCollectionArrivalTimeFinal = expectedCollectionArrivalTimeSplit[1];
        expectedCollectionArrivalDateFinalSplit = expectedCollectionArrivalDateFinal.split("-");
        expectedCollectionArrivalTimeFinalSplit = expectedCollectionArrivalTimeFinal.split(":");
        expectedCollectionArrivalDateFinalFinal = expectedCollectionArrivalDateFinalSplit[2] + "/" + expectedCollectionArrivalDateFinalSplit[1] + "/" + expectedCollectionArrivalDateFinalSplit[0];
        expectedCollectionArrivalTimeFinalFinal = expectedCollectionArrivalTimeFinalSplit[0] + ":" + expectedCollectionArrivalTimeFinalSplit[1];
        return (expectedCollectionArrivalDateFinalFinal + " " + expectedCollectionArrivalTimeFinalFinal);
    }

    return (
        <div className="Customer_Service">
            <div className='Customer_Service_title'>
                <h1>Atención al cliente</h1>
            </div>
            <div className='Customers'>
                <hr></hr>
                <div className='Customer_Service_Field_title'>
                    <h2>Clientes</h2>
                </div>
                <div className='Customer_Service_filter'>
                    <InputGroup className='filter_input' onChange={(e) => {setInput_filter_customer(e.target.value)}}>
                        <Form.Control type="text" placeholder="Filtrar"/>  
                        <Button variant="secondary" onClick={() => filter_customer()}>Buscar</Button>
                    </InputGroup>
                </div>
                <div className='Customer_Service_table'>
                    <Table size="sm" striped responsive>
                        <thead>
                            <tr key={'Customer_Service customer'}>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Correo electrónico</th>
                                <th>Id de cliente</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {array_customer_filtered.map((customer, index) => {
                                if(index < 10 || view_customers === true){
                                    return (
                                        <tr key={'Customer_Service customer'+customer.Customer_Id}>
                                            <td>{customer.Id}</td>
                                            <td>{customer.Name}</td>
                                            <td>{customer.Email}</td>
                                            <td>{customer.Customer_Id}</td>
                                            <td>{customer.Phone}</td>
                                            <td>{customer.Address}</td>
                                            <td><button onClick={() => navigate('/main/customer_service/customer_edition/' + customer.Id)}>Editar</button></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className='Customer_Service_view_more'>
                    <Button variant="secondary" size='sm' onClick={() => setView_customers(!view_customers)}>{view_customers === true ? 'Esconder' : 'Ver todos'}</Button>
                </div>
                <div className='Customer_Service_add'>
                    <Button variant="secondary" size="lg" onClick={() => navigate('/main/customer_service/customer_edition/add')}>Añadir cliente</Button>
                </div>
            </div>
            <div className='Orders'>
                <hr></hr>
                <div className='Customer_Service_Field_title'>
                    <h2>Pedidos</h2>
                </div>
                <div className='Customer_Service_filter'>
                    <InputGroup className='filter_input' onChange={(e) => {setInput_filter_order(e.target.value)}}>
                        <Form.Control type="text" placeholder="Filtrar"/>  
                        <Button variant="secondary" onClick={() => filter_order()}>Buscar</Button>
                    </InputGroup>
                </div>
                <div className='Customer_Service_table'>
                    <Table size="sm" striped responsive>
                        <thead>
                            <tr key={'Customer_Service order'}>
                                <th>Id</th>
                                <th>Nº de expedición</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Estado</th>
                                <th>Fechas esperadas</th>
                                <th>Id empleado a cargo</th>
                                <th>Activo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {array_order_filtered?.map((order, index) => {
                                if((index < 10 || view_orders === true) && (order.Active == 1 || view_orders_inactive)){
                                    return (
                                        <tr key={'Customer_Service order' + order.Id}>
                                            <td>{order.Id}</td>
                                            <td>{order.Expedition_Number}</td>
                                            <td>{order.Origin}</td>
                                            <td>{order.Destination}</td>
                                            <td>{order.State}</td>
                                            <td>{obtainExpectedCollectionDate(order)+" / "+obtainExpectedArrivalDate(order)}</td>
                                            <td>{order.Employee_In_Charge}</td>
                                            <td>{order.Active ? 'Sí' : 'No'}</td>
                                            <td><button onClick={() => navigate('/main/customer_service/order_edition/' + order.Id)}>Editar</button></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className='Customer_Service_view_more'>
                    <Button variant="secondary" onClick={() => setView_orders(!view_orders)}>{view_orders === true ? 'Esconder' : 'Ver todos'}</Button>
                    <div className='Customer_Service_view_inactives'>
                        <Button variant="secondary" onClick={() => setView_orders_inactive(!view_orders_inactive)}>{view_orders_inactive === true ? 'Esconder inactivos' : 'Ver inactivos'}</Button>
                    </div>
                </div>
                <div className='Customer_Service_add'>
                    <Button variant="secondary" size="lg" onClick={() => navigate('/main/customer_service/order_edition/add')}>Añadir pedido</Button>
                </div>
                <hr></hr>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "CustomerService.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de los empleados de atención al cliente. */}
                {/* Debe mostrar los 10 primeros clientes de customer_table en una tabla, permitiendo filtrar en dicha tabla los clientes por nombre, email o teléfono mediante un input. Además, debe haber un botón para ver todos los clientes registrados. */}
                {/* En la tabla de clientes se debe mostrar los campos de id, nombre, email, dni, teléfono, dirección y edición (al pulsar te redirige a /main/customer_service/customer_edition/' + Id). */}
                {/* Debe mostrar los 10 primeros pedidos de order_table en una tabla, permitiendo filtrar en dicha tabla los pedidos por número de expedición, empleado a cargo o estado mediante un input. Además, debe haber un botón para ver todos los pedidos registrados y otro para ver los inactivos. */}
                {/* En la tabla de pedidos se debe mostrar los campos de id, número de expedición, origen, destino, estado, fechas esperadas, empleado a cargo, activo y edición (al pulsar te redirige a /main/customer_service/order_edition/' + Id). */}
                {/* Debe haber un botón para añadir un nuevo cliente (te redirige a /main/customer_service/customer_edition/add) y otro para añadir un nuevo pedido (te redirige a /main/customer_service/order_edition/add). */}
            {copilot ?
                <div>
                    <div className="Customer_Service__title">
                        <h1>Atención al cliente</h1>
                    </div>
                    <div className="Customer_Service__customers">
                        <div className="Customer_Service__customers__title">
                            <h2>Clientes</h2>
                        </div>
                        <div className="Customer_Service__customers__table">
                            <div className="Customer_Service__customers__table__search">
                                <input type="text" placeholder="Buscar por nombre, email o teléfono" onChange={(e) => {filter_customer(e.target.value)}}/>
                            </div>
                            <div className="Customer_Service__customers__table__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>DNI</th>
                                            <th>Teléfono</th>
                                            <th>Dirección</th>
                                            <th>Edición</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.customers.map((customer) => {
                                            return (
                                                <tr key={customer.Id}>
                                                    <td>{customer.Id}</td>
                                                    <td>{customer.Name}</td>
                                                    <td>{customer.Email}</td>
                                                    <td>{customer.DNI}</td>
                                                    <td>{customer.Phone}</td>
                                                    <td>{customer.Address}</td>
                                                    <td><Link to={'/main/customer_service/customer_edition/' + customer.Id}><button>Editar</button></Link></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="Customer_Service__customers__table__buttons">
                                <button onClick={() => {props.setCustomers(props.customersTable.slice(0, 10))}}>Ver 10 primeros</button>
                                <button onClick={() => {props.setCustomers(props.customersTable)}}>Ver todos</button>
                            </div>
                        </div>
                    </div>
                    <div className="Customer_Service__orders">
                        <div className="Customer_Service__orders__title">
                            <h2>Pedidos</h2>
                        </div>
                        <div className="Customer_Service__orders__table">
                            <div className="Customer_Service__orders__table__search">
                                <input type="text" placeholder="Buscar por número de expedición, empleado a cargo o estado" onChange={(e) => {filter_order(e.target.value)}}/>
                            </div>
                            <div className="Customer_Service__orders__table__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Número de expedición</th>
                                            <th>Origen</th>
                                            <th>Destino</th>
                                            <th>Estado</th>
                                            <th>Fechas esperadas</th>
                                            <th>Empleado a cargo</th>
                                            <th>Activo</th>
                                            <th>Edición</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.orders.map((order) => {
                                            return (
                                                <tr key={order.Id}>
                                                    <td>{order.Id}</td>
                                                    <td>{order.ExpeditionNumber}</td>
                                                    <td>{order.Origin}</td>
                                                    <td>{order.Destination}</td>
                                                    <td>{order.State}</td>
                                                    <td>{obtainExpectedCollectionDate(order)}-{obtainExpectedArrivalDate(order)}</td>
                                                    <td>{order.Employee}</td>
                                                    <td>{order.Active}</td>
                                                    <td><Link to={'/main/customer_service/order_edition/' + order.Id}><button>Editar</button></Link></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="Customer_Service__orders__table__buttons">
                                <button onClick={() => {props.setOrders(props.ordersTable.slice(0, 10))}}>Ver 10 primeros</button>
                                <button onClick={() => {props.setOrders(props.ordersTable)}}>Ver todos</button>
                                <button onClick={() => {props.setOrders(props.ordersTable.filter((order) => {return order.Active === "No"}))}}>Ver inactivos</button>
                            </div>
                        </div>
                    </div>
                    <div className="Customer_Service__buttons">
                        <div className="Customer_Service__buttons__add">
                            <Link to="/main/customer_service/customer_edition/add"><button>Añadir cliente</button></Link>
                            <Link to="/main/customer_service/order_edition/add"><button>Añadir pedido</button></Link>
                        </div>
                    </div>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "CustomerService.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de los empleados de atención al cliente. */}
                {/* Debe mostrar los 10 primeros clientes de customer_table en una tabla, permitiendo filtrar en dicha tabla los clientes por nombre, email o teléfono mediante un input. Además, debe haber un botón para ver todos los clientes registrados. */}
                {/* En la tabla de clientes se debe mostrar los campos de id, nombre, email, dni, teléfono, dirección y edición (al pulsar te redirige a /main/customer_service/customer_edition/' + Id). */}
                {/* Debe mostrar los 10 primeros pedidos de order_table en una tabla, permitiendo filtrar en dicha tabla los pedidos por número de expedición, empleado a cargo o estado mediante un input. Además, debe haber un botón para ver todos los pedidos registrados y otro para ver los inactivos. */}
                {/* En la tabla de pedidos se debe mostrar los campos de id, número de expedición, origen, destino, estado, fechas esperadas, empleado a cargo, activo y edición (al pulsar te redirige a /main/customer_service/order_edition/' + Id). */}
                {/* Debe haber un botón para añadir un nuevo cliente (te redirige a /main/customer_service/customer_edition/add) y otro para añadir un nuevo pedido (te redirige a /main/customer_service/order_edition/add). */}
            {codeWhisperer ?
                <div>
                    <div className="Customer_Service_Table">
                        <div className="Customer_Service_Table_Header">
                            <h1>Clientes</h1>
                        </div>
                        <div className="Customer_Service_Table_Search">
                            <input type="text" placeholder="Buscar" onChange={props.handleSearchCustomer} />
                        </div>
                        <div className="Customer_Service_Table_Body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>DNI</th>
                                        <th>Teléfono</th>
                                        <th>Dirección</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {array_customer_filtered.map((customer) => (
                                        <tr key={customer.Customer_ID}>
                                            <td>{customer.Customer_ID}</td>
                                            <td>{customer.Name}</td>
                                            <td>{customer.Email}</td>
                                            <td>{customer.DNI}</td>
                                            <td>{customer.Phone}</td>
                                            <td>{customer.Address}</td>
                                            <td><button onClick={() => props.handleShowCustomerEdition(customer.Customer_ID)}>Editar</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="Customer_Service_Table_Buttons">
                                <button onClick={props.handleShowCustomerAdd}>Añadir Cliente</button>
                            </div>
                        </div>
                    </div>
                    <div className="Customer_Service_Table">
                        <div className="Customer_Service_Table_Header">
                            <h1>Pedidos</h1>
                        </div>
                        <div className="Customer_Service_Table_Search">
                            <input type="text" placeholder="Buscar" onChange={props.handleSearchOrder} />
                        </div>
                        <div className="Customer_Service_Table_Body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Expedición</th>
                                        <th>Origen</th>
                                        <th>Destino</th>
                                        <th>Estado</th>
                                        <th>Fechas</th>
                                        <th>Empleado</th>
                                        <th>Activo</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {array_order_filtered.map((order) => (
                                        <tr key={order.Order_ID}>
                                            <td>{order.Order_ID}</td>
                                            <td>{order.Order_Number}</td>
                                            <td>{order.Origin}</td>
                                            <td>{order.Destination}</td>
                                            <td>{order.Order_State}</td>
                                            <td>{obtainExpectedCollectionArrivalDateCodeWhisperer(order)}</td>
                                            <td>{order.Employee}</td>
                                            <td>{order.Active}</td>
                                            <td><button onClick={() => props.handleShowOrderEdition(order.Order_ID)}>Editar</button></td>
                                        </tr>
                                    ))}
                                </tbody>  
                            </table>
                            <div className="Customer_Service_Table_Buttons">
                                <button onClick={props.handleShowOrderAdd}>Añadir Pedido</button>
                                <button onClick={props.handleShowOrderInactive}>Pedidos Inactivos</button>
                                <button onClick={props.handleShowOrderActive}>Pedidos Activos</button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }   
        </div>
    );
}