import './Manager.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// Componente que muestra la vista principal de los empleados de gestión (con privilegios).
export default function Manager(props) {
    const [input_filter_customer, setInput_filter_customer] = useState();
    const [input_filter_employee, setInput_filter_employee] = useState();
    const [input_filter_order, setInput_filter_order] = useState();
    const [array_customer_filtered, setArray_customer_filtered] = useState(props.customer_table);
    const [array_employee_filtered, setArray_employee_filtered] = useState(props.employee_table);
    const [array_order_filtered, setArray_order_filtered] = useState(props.order_table);
    const [view_customers, setView_customers] = useState(0);
    const [view_employees, setView_employees] = useState(0);
    const [view_employees_inactive, setView_employees_inactive] = useState(0);
    const [view_orders, setView_orders] = useState(0);
    const [view_orders_inactive, setView_orders_inactive] = useState(0);

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

        // Función que se ejecuta al iniciar el componente. Se encarga de recoger los datos de las tablas de cliente, de empleado y de pedido.
        useEffect(() => {
            if(props.customer_table === undefined || props.employee_table === undefined || props.order_table === undefined){
                return
            }
            setArray_customer_filtered(props.customer_table)
            setArray_employee_filtered(props.employee_table)
            setArray_order_filtered(props.order_table)
        }, [props.customer_table, props.employee_table, props.order_table])
    
        
        // Función que se encarga de filtrar los clientes. Se utiliza para filtrar los clientes por su Id, su nombre o su email con el input de filtrado de clientes.
        const filter_customer = () => {
            if(input_filter_customer === ""){
                setArray_customer_filtered(props.customer_table)
            } else{
                var array_filter = []
                props.customer_table.map((customer) => {
                    if(customer.Id == input_filter_customer || customer.Name.toLowerCase().includes(input_filter_customer.toLowerCase()) || customer.Email.toLowerCase().includes(input_filter_customer.toLowerCase())){
                        array_filter.push(customer)
                    }
                })
                setArray_customer_filtered(array_filter)
            }
        }
    
        // Función que se encarga de filtrar los empleados. Se utiliza para filtrar los empleados por su Id, su nombre, su email, su rol o su Id de empleado con el input de filtrado de empleados.
        const filter_employee = () => {
            if(input_filter_employee === ""){
                setArray_employee_filtered(props.employee_table)
            } else{
                var array_filter = []
                props.employee_table.map((employee) => {
                    if(employee.Id == input_filter_employee || employee.Name.toLowerCase().includes(input_filter_employee.toLowerCase()) || employee.Email.toLowerCase().includes(input_filter_employee.toLowerCase()) || employee.Role.toLowerCase().includes(input_filter_employee.toLowerCase()) ||employee.Employee_Id == input_filter_employee){
                        array_filter.push(employee)
                    }
                })
                setArray_employee_filtered(array_filter)
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
        // Función que se encarga de filtrar los clientes, los empleados y los pedidos según el valor introducido en los inputs.
        const filterCopilot = () => {
            setArray_customer_filtered(props.customer_table.filter(customer => customer.Name.toLowerCase().includes(input_filter_customer?.toLowerCase()) || customer.Surname.toLowerCase().includes(input_filter_customer?.toLowerCase()) || customer.Email.toLowerCase().includes(input_filter_customer?.toLowerCase()) || customer.Phone_Number.toLowerCase().includes(input_filter_customer?.toLowerCase()) || customer.Address.toLowerCase().includes(input_filter_customer?.toLowerCase()) || customer.City.toLowerCase().includes(input_filter_customer?.toLowerCase()) || customer.Postal_Code.toLowerCase().includes(input_filter_customer?.toLowerCase()) || customer.Country.toLowerCase().includes(input_filter_customer?.toLowerCase())))
            setArray_employee_filtered(props.employee_table.filter(employee => employee.Name.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Surname.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Email.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Phone_Number.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Address.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.City.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Postal_Code.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Country.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Role.toLowerCase().includes(input_filter_employee?.toLowerCase()) || employee.Status.toLowerCase().includes(input_filter_employee?.toLowerCase())))
            setArray_order_filtered(props.order_table.filter(order => order.Order_ID.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Expedition_Number.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Employee_ID.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Order_Status.toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Order_Date.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Expected_Collection_Date.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Expected_Arrival_Date.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Actual_Collection_Date.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Actual_Arrival_Date.toString().toLowerCase().includes(input_filter_order?.toLowerCase()) || order.Total_Price.toString().toLowerCase().includes(input_filter_order?.toLowerCase())))
        }
    
        // Función realizada por Amazon CodeWhisperer.
        // Función que se encarga de filtrar los clientes, los empleados y los pedidos según el valor introducido en los inputs.
        const filterCodeWhisperer = () => {
            if (input_filter_customer === undefined || input_filter_employee === undefined || input_filter_order === undefined) {
                return
            }
            setArray_customer_filtered(array_customer_filtered.filter(customer => customer.Customer_Name.toLowerCase().includes(input_filter_customer.toLowerCase())))
            setArray_employee_filtered(array_employee_filtered.filter(employee => employee.Employee_Name.toLowerCase().includes(input_filter_employee.toLowerCase())))
            setArray_order_filtered(array_order_filtered.filter(order => order.Order_ID.toString().includes(input_filter_order)))
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
        // Función que permite obtener la fecha de entrega y de recogida esperada de un pedido. Con su año, día, hora y minuto.
        const obtainExpectedCollectionDateAndArrivalDateCopilot = (order) => {
            var date = new Date(order.Expected_Collection_Date)
            var date2 = new Date(order.Expected_Arrival_Date)
            var year = date.getFullYear()
            var month = date.getMonth()
            var day = date.getDate()
            var hour = date.getHours()
            var minutes = date.getMinutes()
            var year2 = date2.getFullYear()
            var month2 = date2.getMonth()
            var day2 = date2.getDate()
            var hour2 = date2.getHours()
            var minutes2 = date2.getMinutes()
            return day + "/" + month + "/" + year + " " + hour + ":" + minutes + " - " + day2 + "/" + month2 + "/" + year2 + " " + hour2 + ":" + minutes2
        }

        // Función realizada por Amazon CodeWhisperer.
        // Función que permite obtener la fecha de entrega y de recogida esperada de un pedido. Con sus horas y minutos.
        const obtainDatesCodeWhisperer = (order) => {
            let date_expected = new Date(order.Date_Expected);
            let date_expected_hour = date_expected.getHours();
            let date_expected_minute = date_expected.getMinutes();
            let date_expected_string = date_expected_hour + ":" + date_expected_minute;
            let date_delivered = new Date(order.Date_Delivered);
            let date_delivered_hour = date_delivered.getHours();
            let date_delivered_minute = date_delivered.getMinutes();
            let date_delivered_string = date_delivered_hour + ":" + date_delivered_minute;
            return (date_expected_string + " - " + date_delivered_string);
        }


    return (
        <div className="Manager">
            <div className='Manager_title'>
                <h1>Encargado</h1>
            </div>
            <div className='Manager_Customer'>
                <hr></hr>
                <div className='Manager_Field_title'>
                    <h2>Clientes</h2>
                </div>
                <div className='Manager_Field_filter'>
                    <InputGroup className='filter_input' onChange={(e) => {setInput_filter_customer(e.target.value)}}>
                        <Form.Control type="text" placeholder="Filtrar"/>  
                        <Button variant="secondary" onClick={() => filter_customer()}>Buscar</Button>
                    </InputGroup>
                </div>
                <div className='Manager_Field_table'>
                    <Table size="sm" striped responsive>
                        <thead>
                            <tr key={'Manager_costumer'}>
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
                            {array_customer_filtered?.map((customer, index) => {
                                if(index < 10 || view_customers === true){
                                    return (
                                        <tr key={'Manager_costumer' + customer.Customer_Id}>
                                            <td>{customer.Id}</td>
                                            <td>{customer.Name}</td>
                                            <td>{customer.Email}</td>
                                            <td>{customer.Customer_Id}</td>
                                            <td>{customer.Phone}</td>
                                            <td>{customer.Address}</td>
                                            <td><button onClick={() => navigate('/main/manager/customer_edition/' + customer.Id)}>Editar</button></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className='Manager_Field_view_more'>
                    <Button variant="secondary" onClick={() => setView_customers(!view_customers)}>{view_customers === true ? 'Esconder' : 'Ver todos'}</Button>
                </div>
                <div className='Manager_Field_add'>
                    <Button variant="secondary" size="lg" onClick={() => navigate('/main/manager/customer_edition/add')}>Añadir cliente</Button>
                </div>
            </div>
            <div className='Manager_Employee'>
                <hr></hr>
                <div className='Manager_Field_title'>
                    <h2>Empleados</h2>
                </div>
                <div className='Manager_Field_filter'>
                    <InputGroup className='filter_input' onChange={(e) => {setInput_filter_employee(e.target.value)}}>
                        <Form.Control type="text" placeholder="Filtrar"/>  
                        <Button variant="secondary" onClick={() => filter_employee()}>Buscar</Button>
                    </InputGroup>
                </div>
                <div className='Manager_Field_table'>
                    <Table size="sm" striped responsive>
                        <thead>
                            <tr key={'Manager_employee'}>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Correo electrónico</th>
                                <th>DNI/NIE</th>
                                <th>Teléfono</th>
                                <th>Rol</th>
                                <th>Número de empleado</th>
                                <th>Activo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {array_employee_filtered?.map((employee, index) => {
                                if((index < 10 || view_employees) && (employee.Active == 1 || view_employees_inactive)){
                                    return (
                                        <tr key={'Manager_employee' + employee.Employee_Id}>
                                            <td>{employee.Id}</td>
                                            <td>{employee.Name}</td>
                                            <td>{employee.Email}</td>
                                            <td>{employee.DNI}</td>
                                            <td>{employee.Phone}</td>
                                            <td>{employee.Role}</td>
                                            <td>{employee.Employee_Id}</td>
                                            <td>{employee.Active ? 'Yes' : 'No'}</td>
                                            <td><button onClick={() => navigate('/main/manager/employee_edition/' + employee.Id)}>Editar</button></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className='Manager_Field_view_more'>
                    <Button variant="secondary" onClick={() => setView_employees(!view_employees)}>{view_employees === true ? 'Esconder' : 'Ver todos'}</Button>
                    <div className='Manager_view_inactives'>
                        <Button variant="secondary" onClick={() => setView_employees_inactive(!view_employees_inactive)}>{view_employees_inactive === true ? 'Esconder inactivos' : 'Ver inactivos'}</Button>
                    </div>
                </div>
                <div className='Manager_Field_add'>
                    <Button variant="secondary" size="lg" onClick={() => navigate('/main/manager/employee_edition/add')}>Añadir empleado</Button>
                </div>
            </div>
            <div className='Manager_Orders'>
                <hr></hr>
                <div className='Manager_Field_title'>
                    <h2>Pedidos</h2>
                </div>
                <div className='Manager_Field_filter'>
                    <InputGroup className='filter_input' onChange={(e) => {setInput_filter_order(e.target.value)}}>
                        <Form.Control type="text" placeholder="Filtrar"/>  
                        <Button variant="secondary" onClick={() => filter_order()}>Buscar</Button>
                    </InputGroup>
                </div>
                <div className='Manager_Field_table'>
                    <Table size="sm" striped responsive>
                        <thead>
                            <tr key={'Manager_order'}>
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
                                if((index < 10 || view_orders) && (order.Active == 1 || view_orders_inactive)){
                                    return (
                                        <tr key={'Manager_order' + order.Id}>
                                            <td>{order.Id}</td>
                                            <td>{order.Expedition_Number}</td>
                                            <td>{order.Origin}</td>
                                            <td>{order.Destination}</td>
                                            <td>{order.State}</td>
                                            <td>{obtainExpectedCollectionDate(order)+" / "+obtainExpectedArrivalDate(order)}</td>
                                            <td>{order.Employee_In_Charge}</td>
                                            <td>{order.Active ? 'Sí' : 'No'}</td>
                                            <td><button onClick={() => navigate('/main/manager/order_edition/' + order.Id)}>Editar</button></td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className='Manager_Field_view_more'>
                    <Button variant="secondary" onClick={() => setView_orders(!view_orders)}>{view_orders === true ? 'Esconder' : 'Ver todos'}</Button>
                    <div className='Manager_view_inactives'>
                        <Button variant="secondary" onClick={() => setView_orders_inactive(!view_orders_inactive)}>{view_orders_inactive === true ? 'Esconder inactivos' : 'Ver inactivos'}</Button>
                    </div>
                </div>
                <div className='Manager_Field_add'>
                    <Button variant="secondary" size="lg" onClick={() => navigate('/main/manager/order_edition/add')}>Añadir pedido</Button>
                </div>
                <hr></hr>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Manager.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de los encargados de la empresa. */}
                {/* Debe mostrar los 10 primeros clientes de customer_table en una tabla, permitiendo filtrar en dicha tabla los clientes por nombre, email o teléfono mediante un input. Además, debe haber un botón para ver todos los clientes registrados. */}
                {/* En la tabla de clientes se debe mostrar los campos de id, nombre, email, dni, teléfono, dirección y edición (al pulsar te redirige a /main/manager/customer_edition/' + Id). */}
                {/* Debe mostrar los 10 primeros pedidos de order_table en una tabla, permitiendo filtrar en dicha tabla los pedidos por número de expedición, empleado a cargo o estado mediante un input. Además, debe haber un botón para ver todos los pedidos registrados y otro para ver los inactivos. */}
                {/* En la tabla de pedidos se debe mostrar los campos de id, número de expedición, origen, destino, estado, fechas esperadas, empleado a cargo, activo y edición (al pulsar te redirige a /main/manager/order_edition/' + Id). */}
                {/* Debe mostrar los 10 primeros empleados de employee_table en una tabla, permitiendo filtrar en dicha tabla los pedidos por número de nombre, email, rol o número de empleado mediante un input. Además, debe haber un botón para ver todos los empleados registrados. */}
                {/* En la tabla de empleados se debe mostrar los campos de id, nombre, email, dni, teléfono, rol, número de empleado, activo y edición (al pulsar te redirige a /main/manager/employee_edition/' + Id). */}
                {/* Debe haber un botón para añadir un nuevo cliente (te redirige a /main/manager/customer_edition/add), otro para añadir un nuevo pedido (te redirige a /main/manager/order_edition/add) y otro para añadir un nuevo empleado (te redirige a /main/manager/employee_edition/add). */}
            {copilot ?
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <h1>Customers</h1>
                        </div>
                        <div className="col-4">
                            <input type="text" placeholder="Filter by name" onChange={filter_customer}></input>
                        </div>
                        <div className="col-4">
                            <button onClick={() => props.history.push('/main/manager/customer_edition/add')}>Add new customer</button>
                        </div>
                        <div className="col-12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Dni</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.customers.map((customer, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{customer.Id}</td>
                                                <td>{customer.Name}</td>
                                                <td>{customer.Email}</td>
                                                <td>{customer.Dni}</td>
                                                <td>{customer.Phone}</td>
                                                <td>{customer.Address}</td>
                                                <td><button onClick={() => props.history.push('/main/manager/customer_edition/' + customer.Id)}>Edit</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <button onClick={() => props.history.push('/main/manager/customer_table')}>See all customers</button>
                        </div>
                        <div className="col-4">
                            <h1>Orders</h1>
                        </div>
                        <div className="col-4">
                            <input type="text" placeholder="Filter by expedition number" onChange={filter_order}></input>
                        </div>
                        <div className="col-4">
                            <button onClick={() => props.history.push('/main/manager/order_edition/add')}>Add new order</button>
                        </div>
                        <div className="col-12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Expedition number</th>
                                        <th>Origin</th>
                                        <th>Destination</th>
                                        <th>Status</th>
                                        <th>Expected dates</th>
                                        <th>Employee</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.orders.map((order, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{order.Id}</td>
                                                <td>{order.Expedition_Number}</td>
                                                <td>{order.Origin}</td>
                                                <td>{order.Destination}</td>
                                                <td>{order.Status}</td>
                                                <td>{obtainDatesCodeWhisperer(order)}</td>
                                                <td>{order.Employee}</td>
                                                <td><button onClick={() => props.history.push('/main/manager/order_edition/' + order.Id)}>Edit</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <button onClick={() => props.history.push('/main/manager/order_table')}>See all orders</button>
                        </div>
                        <div className="col-4">
                            <button onClick={() => props.history.push('/main/manager/order_table_inactive')}>See inactive orders</button>
                        </div>
                        <div className="col-4">
                            <h1>Employees</h1>
                        </div>
                        <div className="col-4">
                            <input type="text" placeholder="Filter by name" onChange={filter_employee}></input>
                        </div>
                        <div className="col-4">
                            <button onClick={() => props.history.push('/main/manager/employee_edition/add')}>Add new employee</button>
                        </div>
                        <div className="col-12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Dni</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Employee number</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.employees.map((employee, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{employee.Id}</td>
                                                <td>{employee.Name}</td>
                                                <td>{employee.Email}</td>
                                                <td>{employee.Dni}</td>
                                                <td>{employee.Phone}</td>
                                                <td>{employee.Role}</td>
                                                <td>{employee.Employee_Number}</td>
                                                <td><button onClick={() => props.history.push('/main/manager/employee_edition/' + employee.Id)}>Edit</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <button onClick={() => props.history.push('/main/manager/employee_table')}>See all employees</button>
                        </div>
                    </div>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Manager.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de los encargados de la empresa. */}
                {/* Debe mostrar los 10 primeros clientes de customer_table en una tabla, permitiendo filtrar en dicha tabla los clientes por nombre, email o teléfono mediante un input. Además, debe haber un botón para ver todos los clientes registrados. */}
                {/* En la tabla de clientes se debe mostrar los campos de id, nombre, email, dni, teléfono, dirección y edición (al pulsar te redirige a /main/manager/customer_edition/' + Id). */}
                {/* Debe mostrar los 10 primeros pedidos de order_table en una tabla, permitiendo filtrar en dicha tabla los pedidos por número de expedición, empleado a cargo o estado mediante un input. Además, debe haber un botón para ver todos los pedidos registrados y otro para ver los inactivos. */}
                {/* En la tabla de pedidos se debe mostrar los campos de id, número de expedición, origen, destino, estado, fechas esperadas, empleado a cargo, activo y edición (al pulsar te redirige a /main/manager/order_edition/' + Id). */}
                {/* Debe mostrar los 10 primeros empleados de employee_table en una tabla, permitiendo filtrar en dicha tabla los pedidos por número de nombre, email, rol o número de empleado mediante un input. Además, debe haber un botón para ver todos los empleados registrados. */}
                {/* En la tabla de empleados se debe mostrar los campos de id, nombre, email, dni, teléfono, rol, número de empleado, activo y edición (al pulsar te redirige a /main/manager/employee_edition/' + Id). */}
                {/* Debe haber un botón para añadir un nuevo cliente (te redirige a /main/manager/customer_edition/add), otro para añadir un nuevo pedido (te redirige a /main/manager/order_edition/add) y otro para añadir un nuevo empleado (te redirige a /main/manager/employee_edition/add). */}
            {codeWhisperer ?
                <div className="Manager_CodeWhisperer">
                    <div className="Manager_CodeWhisperer_Title">
                        <h1>Encargados</h1>
                    </div>
                    <div className="Manager_Table">
                        <div className="Manager_Table_Header">
                            <h2>Clientes</h2>
                        </div>
                        <div className="Manager_Table_Search">
                            <input type="text" placeholder="Buscar" onChange={props.handleSearchCustomer} />
                        </div>
                        <div className="Manager_Table_Body">
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
                            <div className="Manager_Table_Buttons">
                                <button onClick={props.handleShowCustomerAdd}>Añadir Cliente</button>
                            </div>
                        </div>
                        <div className="Manager_Table_Header">
                            <h2>Pedidos</h2>
                        </div>
                        <div className="Manager_Table_Search">
                            <input type="text" placeholder="Buscar" onChange={props.handleSearchOrder} />
                        </div>
                        <div className="Manager_Table_Body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Número de expedición</th>
                                        <th>Origen</th>
                                        <th>Destino</th>
                                        <th>Estado</th>
                                        <th>Fecha esperadas</th>
                                        <th>Empleado a cargo</th>
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
                                            <td>{order.Status}</td>
                                            <td>{obtainDatesCodeWhisperer(order)}</td>
                                            <td>{order.Employee_Name}</td>
                                            <td><button onClick={() => props.handleShowOrderEdition(order.Order_ID)}>Editar</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="Manager_Table_Buttons">
                                <button onClick={props.handleShowOrderAdd}>Añadir Pedido</button>
                                <button onClick={props.handleShowInactiveOrders}>Pedidos Inactivos</button>
                                <button onClick={props.handleShowAllOrders}>Todos los Pedidos</button>
                            </div>
                        </div>
                        <div className="Manager_Table_Header">
                            <h2>Empleados</h2>
                        </div>
                        <div className="Manager_Table_Search">
                            <input type="text" placeholder="Buscar" onChange={props.handleSearchEmployee} />
                        </div>
                        <div className="Manager_Table_Body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>DNI</th>
                                        <th>Teléfono</th>
                                        <th>Rol</th>
                                        <th>Número de empleado</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {array_employee_filtered.map((employee) => (
                                        <tr key={employee.Employee_ID}>
                                            <td>{employee.Employee_ID}</td>
                                            <td>{employee.Name}</td>
                                            <td>{employee.Email}</td>
                                            <td>{employee.DNI}</td>
                                            <td>{employee.Phone}</td>
                                            <td>{employee.Role}</td>
                                            <td>{employee.Employee_Number}</td>
                                            <td><button onClick={() => props.handleShowEmployeeEdition(employee.Employee_ID)}>Editar</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="Manager_Table_Buttons">
                                <button onClick={props.handleShowEmployeeAdd}>Añadir Empleado</button>
                                <button onClick={props.handleShowAllEmployees}>Todos los Empleados</button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );
}