import './Delivery.css';
import { useNavigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Table from 'react-bootstrap/Table';
import Delivery_Edition from './Delivery_Edition';

// Componente que muestra la vista principal de los repartidores. Muestra una tabla con los pedidos que tiene asignados el repartidor.
export default function Delivery(props) {
    const [edit_order, setEdit_order] = useState(false);
    const [order_Selected, setOrder_Selected] = useState();

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que redirige al usuario a la vista de edición de pedidos.
    const view_Order = (order) => {
        setEdit_order(true);
        setOrder_Selected(order);
        navigate('/main/delivery/' + order.Id)
    }

    // Función realizada por GitHub Copilot.
    // Función que habilita la edición de un pedido. Lo selecciona y redirige al usuario a la vista de edición de pedidos.
    const enableEditOrderCopilot = (order) => {
        setOrder_Selected(order)
        setEdit_order(true)
        navigate('/main/delivery/edit')
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que habilita la edición de un pedido. Lo selecciona y redirige al usuario a la vista de edición de pedidos.
    const enableEditOrderCodeWhisperer = (order) => {
        setOrder_Selected(order)
        setEdit_order(true)
        navigate('/main/delivery/edit')
    }

    // Función que redirige al usuario a la vista principal de los repartidores.
    const goBack = () => {
        setEdit_order(false);
        navigate('/main/delivery')
    }

    // Función realizada por GitHub Copilot.
    // Función que deshabilita la edición de un pedido. Lo deselecciona y redirige al usuario a la vista principal de los repartidores.
    const disableEditOrderCopilot = () => {
        setOrder_Selected()
        setEdit_order(false)
        navigate('/main/delivery')
    }

    
    // Función realizada por Amazon CodeWhisperer.
    // Función que deshabilita la edición de un pedido. Lo deselecciona y redirige al usuario a la vista principal de los repartidores.
    const disableEditOrderCodeWhisperer = () => {
        setEdit_order(false)
        navigate('/main/delivery')
    }

    // Función que obtiene la fecha de recogida esperada del pedido.
    const obtainExpectedCollectionDate = (order) => {
        return ((order?.Expected_Collection_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Collection_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Collection_Date?.toString().substr(14,2)))
    }

    // Función que obtiene la fecha de llegada esperada del pedido.
    const obtainExpectedArrivalDate = (order) => {
        return ((order?.Expected_Arrival_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Arrival_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Arrival_Date?.toString().substr(14,2)))
    }

    return(
        <div className='Delivery'>
            {!edit_order ?
            <div className='delivery_container'>
                <div className='delivery_table_title'>
                    <h1>Reparto de pedidos</h1>
                </div>
                <div className='delivery_table'>
                    <Table striped size="sm">
                        <thead>
                            <tr key={'delivery_table'}>
                                <th>Id</th>
                                <th>Número de expedición</th>
                                <th>Nombre del cliente</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Fechas esperadas</th>
                                <th>Vista detallada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.order_table.map((order) => {
                                if ((props.employee_ID === order.Employee_In_Charge) && (order.Active == 1)) {
                                    return (
                                        <tr key={order.Id}>
                                            <td>{order.Id}</td>
                                            <td>{order.Expedition_Number}</td>
                                            <td>{props.customer_table.find(customer => customer.Id === order.Customer_Id).Name}</td>
                                            <td>{order.Origin}</td>
                                            <td>{order.Destination}</td>
                                            <td>{obtainExpectedCollectionDate(order)+' / '+obtainExpectedArrivalDate(order)}</td>
                                            <td><button onClick={() => view_Order(order)}>Ver pedido</button></td>
                                        </tr>
                                    )
                                }    
                            })}
                        </tbody>
                    </Table>
                </div>
            </div> :
            <div className='delivery_table_edition'>
                <Routes>
                    <Route path="/:orderId" element={<Delivery_Edition order={order_Selected} package_table={props.package_table} customer={props.customer_table.find(customer => customer.Id === order_Selected.Customer_Id)} setOrderValue={props.setOrderValue} goBack={goBack}/>}/>
                </Routes>
            </div>
            }
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Delivery.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista principal de los repartidores. */}
                {/* Debe mostrar una tabla con los pedidos que tiene asignados el repartidor. Para ello props.employee_ID tiene que ser igual a Employee_In_Charge de los pedidos de order_table. Además, dicho pedido tiene que estar activo. */}
                {/* La tabla debe tener las siguientes columnas: Id, Número de expedición, Nombre del cliente, Origen, Destino, Fechas esperadas y Vista detallada. */}
            {copilot ?
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Número de expedición</th>
                                <th>Nombre del cliente</th>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Fechas esperadas</th>
                                <th>Vista detallada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.order_table.map((order) => {
                                return (
                                    order.Employee_In_Charge === props.employee_ID && order.Active ?
                                        <tr onClick={() => enableEditOrderCopilot(order)}>
                                            <td>{order.Id}</td>
                                            <td>{order.Expedition_Number}</td>
                                            <td>{order.Customer_Name}</td>
                                            <td>{order.Origin}</td>
                                            <td>{order.Destination}</td>
                                            <td>{obtainExpectedCollectionDate(order)} - {obtainExpectedArrivalDate(order)}</td>
                                            <td><button onClick={() => view_Order(order)}>Ver pedido</button></td>
                                        </tr>
                                    : null
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Delivery.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista principal de los repartidores. */}
                {/* Debe mostrar una tabla con los pedidos que tiene asignados el repartidor. Para ello props.employee_ID tiene que ser igual a Employee_In_Charge de los pedidos de order_table. Además, dicho pedido tiene que estar activo. */}
                {/* La tabla debe tener las siguientes columnas: Id, Número de expedición, Nombre del cliente, Origen, Destino, Fechas esperadas y Vista detallada. */}
            {codeWhisperer ?
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Expedition Number</th>
                                <th>Client Name</th>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Expected Collection Date</th>
                                <th>Expected Arrival Date</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.order_table.map((order) => {
                                if (order.Employee_In_Charge === props.employee_ID && order.Active) {
                                    return (
                                        <tr key={order.Id}>
                                            <td>{order.Id}</td>
                                            <td>{order.Expedition_Number}</td>
                                            <td>{order.Client_Name}</td>
                                            <td>{order.Origin}</td>
                                            <td>{order.Destination}</td>
                                            <td>{obtainExpectedCollectionDate(order)}</td>
                                            <td>{obtainExpectedArrivalDate(order)}</td>
                                            <td><button onClick={() => view_Order(order)}>View</button></td>
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
    );
}