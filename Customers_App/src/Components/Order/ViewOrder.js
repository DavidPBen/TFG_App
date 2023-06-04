import './ViewOrder.css';
import {useNavigate, useParams} from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';

// Componente que muestra un pedido.
export default function ViewOrder(props) {

    let { OrderId } = useParams();
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que redirige a la página de login.
    const login = () => {
        navigate("/iniciar-sesion");
    }

    // Función que cuenta el número de paquetes de un pedido.
    const countPackets = (order) => {
        let packets = [];
        props.package_table.map(packet =>{ if(packet.Order_Id == order.Id){packets.push(packet)}});
        return packets.length;
    }

    // Función realizada por GitHub Copilot.
    // Función que cuenta el número de paquetes de un pedido. Para ello analiza los paquetes de la tabla package_table en los que su Order_Id sea igual al Id del pedido.
    const countPackagesCopilot = (order) => {
        return props.package_table.filter((pack) => pack.Order_Id == order.Id).length;
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que cuenta el número de paquetes de un pedido. Para ello analiza los paquetes de la tabla package_table en los que su Order_Id sea igual al Id del pedido.
    const countPackagesCodeWhisperer = (order) => {
        let count = 0;
        for (let i = 0; i < props.package_table.length; i++) {
            if (props.package_table[i].Order_Id === order.Id) {
                count++;
            }
        }
        return count;
    
    }

    // Función que devuelve la fecha de llegada estimada de un pedido. 
    const getExpectedArrivalDate = (order) => {
        return ((order?.Expected_Arrival_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(0,4)) +' a las '+ (+(order?.Expected_Arrival_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Arrival_Date?.toString().substr(14,2)));
    }

    // Función que devuelve la fecha de recogida estimada de un pedido. 
    const getExpectedCollectionDate = (order) => {
        return ((order?.Expected_Collection_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(0,4)) +' a las '+ (+(order?.Expected_Collection_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Collection_Date?.toString().substr(14,2)));
    }

    // Función que devuelve la fecha de devolución estimada de un pedido. 
    const getExpectedReturnDate = (order) => {
        return ((order?.Expected_Return_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Return_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Return_Date?.toString().substr(0,4)) +' a las '+ (+(order?.Expected_Return_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Return_Date?.toString().substr(14,2)));
    }

    // Función realizada por GitHub Copilot.
    // Función que devuelve una fecha en formato dd-mm-yyyy hh:mm a partir de una fecha en formato yyyy-mm-dd hh:mm.
    const formatDateCopilot = (date) => {
        return date?.split("-").reverse().join("-").replace("T", " ");
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que devuelve una fecha en formato dd-mm-yyyy hh:mm a partir de una fecha en formato yyyy-mm-dd hh:mm.
    const formatDateCodeWhisperer = (date) => {
        let date_formatted = "";
        let date_splitted = date?.split("-");
        let date_splitted_reversed = date_splitted?.reverse();
        date_formatted = date_splitted_reversed?.join("-").replace("T", " ");
        return date_formatted;
    }

    // Función que permite devolver un pedido.
    const returnOrder = () => {
        navigate("/pedido=/"+OrderId+"/devolución")
    }

    return (
        <div className="ViewOrder">
            {props.order_selected ?
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h2 className="ViewOrder_title">Pedido: {OrderId}</h2>
                        </div>
                        {!props.order_selected?.State.includes("En devolución") ?
                            <div className='ViewOrder_state_noDevolution'>
                                <div className="col-12">
                                    <div className="ViewOrder_expectedDate">
                                        {props.order_selected?.State == "En trámite" ?
                                            <h4>La recogida estimada de su pedido es el <b>{getExpectedCollectionDate(props.order_selected)}</b></h4>:
                                            <div>
                                                {props.order_selected?.State != "Entregado" ? <h4>La llegada estimada de su pedido es el <b>{getExpectedArrivalDate(props.order_selected)}</b></h4>: null}
                                            </div>
                                        } 
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="ViewOrder_stateLine">
                                        <img src={process.env.PUBLIC_URL + "/línea_seguimiento_pedidos.png"} className="stateLine_ViewOrder_photo" alt="línea de seguimiento de pedidos"/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="ViewOrder_actualState">
                                        <h5 id="ViewOrder_actualState_title">El estado actual de su pedido es "{props.order_selected?.State}"</h5>
                                        {props.order_selected?.State == "En trámite" ? <p className='ViewOrder_actualState_description'>El pedido aún no se encuentra recogido por el empleado a cargo. El pedido será recogido en la fecha estimada.</p>: null}
                                        {props.order_selected?.State == "En almacén origen" ? <p className='ViewOrder_actualState_description'>El pedido se encuentrá en el almacén de origen. En breves será enviado al destino esperado.</p>: null}
                                        {props.order_selected?.State == "En camino" ? <p className='ViewOrder_actualState_description'>El pedido está en camino hacia el destino esperado.</p>: null}
                                        {props.order_selected?.State == "En almacén destino" ? <p className='ViewOrder_actualState_description'>El pedido se encuentrá en el almacén destino. En breves será enviado a la dirección esperada.</p>: null}
                                        {props.order_selected?.State == "Entregado" ? <p className='ViewOrder_actualState_description'>El pedido se encuentrá entregado en el destino.</p>: null}
                                    </div>
                                    <hr id="hr_ViewOrder"></hr>
                                </div>
                            </div>:
                            <div className='ViewOrder_state_noReturn'>
                                <div className="col-12">
                                    <div className="ViewOrder_return_title">
                                        <h3 id='ViewOrder_return_title_text'>El pedido se encuentra en devolución</h3>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="ViewOrder_expectedDate">
                                        <h4>La fecha de devolución estimada de su pedido es el <b>{getExpectedReturnDate(props.order_selected)}</b></h4>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className='ViewOrder_noReturn_description_container'>
                                        <p className='ViewOrder_noReturn_description'>Tenga en cuenta que la devolución será efectuada en la oficina desde la que se envió el pedido. En caso de que el pedido se enviara con opción de domiciliación, la devolución será efectuada en la dirección origen desde la que se envió el pedido.</p>
                                    </div>
                                    <hr id="hr_ViewOrder"></hr>
                                </div>
                            </div>
                        }
                        
                        <div className="col-12">
                            <div className="ViewOrder_orderInfo">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <h5 className="ViewOrder_orderInfo_title">Información del pedido</h5>
                                    </div>
                                    <div className="col-12">
                                        {props.customer_selected && props.order_table.find((order) => (order.Customer_Id == props.customer_selected?.Id && order.Expedition_Number == OrderId)) ?
                                            <div className="ViewOrder_orderInfo_customer_box">
                                                <div className="row align-items-center">
                                                    <div className="col-12">
                                                        <div className="ViewOrder_orderInfo_customer">
                                                            <div className="row justify-content-center">
                                                                <div className="col-4">
                                                                    <div><b>Origen: </b></div>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div>{props.order_selected?.Origin}</div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div><b>Destino: </b></div>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div>{props.order_selected?.Destination}</div>
                                                                </div>
                                                                {props.order_selected?.Additional_Destination ?
                                                                    <div className="row justify-content-center">    
                                                                        <div className="col-4">
                                                                            <div><b>Destino adicional: </b></div>
                                                                        </div>
                                                                        <div className="col-8">
                                                                            <div>{props.order_selected?.Additional_Destination}</div>
                                                                        </div>
                                                                    </div>:
                                                                    null
                                                                }
                                                                <div className="col-4">
                                                                    <div><b>Fecha de recogida: </b></div>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div>{props.order_selected?.Collection_Date ? (props.order_selected?.Collection_Date?.toString().substr(8,2)) +'-'+ (props.order_selected?.Collection_Date?.toString().substr(5,2)) +'-'+ (props.order_selected?.Collection_Date?.toString().substr(0,4)) +' '+ (+(props.order_selected?.Collection_Date?.toString().substr(11,2))+1) +':'+ (props.order_selected?.Collection_Date?.toString().substr(14,2)): "Sin definir"}</div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div><b>Fecha de entrega: </b></div>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div>{props.order_selected?.Arrival_Date ? (props.order_selected?.Arrival_Date?.toString().substr(8,2)) +'-'+ (props.order_selected?.Arrival_Date?.toString().substr(5,2)) +'-'+ (props.order_selected?.Arrival_Date?.toString().substr(0,4)) +' '+ (+(props.order_selected?.Arrival_Date?.toString().substr(11,2))+1) +':'+ (props.order_selected?.Arrival_Date?.toString().substr(14,2)): "Sin definir"}</div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div><b>Fecha esperada de entrega: </b></div>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div>{(props.order_selected?.Expected_Arrival_Date?.toString().substr(8,2)) +'-'+ (props.order_selected?.Expected_Arrival_Date?.toString().substr(5,2)) +'-'+ (props.order_selected?.Expected_Arrival_Date?.toString().substr(0,4)) +' '+ (+(props.order_selected?.Expected_Arrival_Date?.toString().substr(11,2))+1) +':'+ (props.order_selected?.Expected_Arrival_Date?.toString().substr(14,2))}</div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div><b>Tipo de entrega: </b></div>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div>{props.order_selected?.Shipment_Type == "Rápido" ? "Express" : "Normal"}</div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div><b>Bulto: </b></div>
                                                                </div>
                                                                <div className="col-8">
                                                                    <div>{countPackets(props.order_selected)}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>:
                                            <div className="ViewOrder_orderInfo_notlogin">
                                                <h6>Inicia sesión para ver la información detallada del pedido</h6>
                                                <Button variant="outline-secondary" id="Log_in_view_order" size="sm" onClick={() => login()}>Iniciar sesión</Button>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-12">
                                        <div className="ViewOrder_contact">
                                            <p>Ante cualquier problema pongase en contacto con nosotros llamando al número: <b>644 607 777</b></p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="ViewOrder_return_box">
                                            {props.customer_selected && props.order_table.find((order) => (order.Customer_Id == props.customer_selected?.Id && order.Expedition_Number == OrderId)) ?
                                                <div>
                                                    {!props.order_selected?.State.includes("En devolución") ?
                                                    <div className="col-12">
                                                        <Button variant="secondary" className="return_button" size="sm" onClick={() => returnOrder()}>Devolver</Button>
                                                    </div>:
                                                    null
                                                    }
                                                </div>:
                                                null
                                            }
                                            
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <Button variant="secondary" className="Go_home" onClick={() => navigate("/")}>Volver a la página principal</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='order_not_loaded'>
                    {navigate("/error")}
                </div>
            }
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "ViewOrder.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista del pedido seleccionado según la URL. Dicho pedido se encuentra en la variable order_table donde order.Expedition_Number sea igual que OrderId */}
                {/* Debe mostrar la llegada estimada del pedido junto a una imagen de los diferentes estados almacenada en la capeta public y a un texto con el estado del pedido y una pequeña descripción de dicho estado. */}
                {/* En el caso de que el cliente esté registrado (exista props.customer_selected y el Customer_Id del pedido coincida con el Id del cliente) muestra la información del pedido (origen, destino, destino adicional, fecha de recogida, de entrega, la fecha esperada de entrega, el tipo de entrega y el número de paquetes), en caso contrario no. */}
                {/* Si el pedido está en estado "En trámite" muestra la fecha esperada de recogida, y en el caso de que el pedido se encuentre en algún estado "En devolución - ..." muestra la fecha esperada de devolución. */}
                {/* Además debe haber un botón de devolución (si el estado no es en devolución y el cliente está registrado) y uno de volver a la página principal.*/}
            { copilot ?
                <div>
                    <h1>Pedido {OrderId}</h1>
                    <h2>Estado: {props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.State}</h2>
                    <h3>Fecha de llegada estimada: {formatDateCopilot(props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Expected_Arrival_Date)}</h3>
                    <img src={"/"+props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.State+".png"} alt="Estado del pedido"></img>
                    <br></br>
                    <br></br>
                    {props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.State == "En trámite" ? <h3>Fecha de recogida estimada: {formatDateCopilot(props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Expected_Collection_Date)}</h3> : null}
                    {props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.State.includes("En devolución") ? <h3>Fecha de devolución estimada: {formatDateCopilot(props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Expected_Return_Date)}</h3> : null}          
                    {props.customer_selected && props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Customer_Id == props.customer_selected?.Id ?
                        <div>
                            <h3>Origen: {props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Origin}</h3>
                            <h3>Destino: {props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Destination}</h3>
                            <h3>Destino adicional: {props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Additional_Destination}</h3>
                            <h3>Fecha de recogida: {formatDateCopilot(props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Collection_Date)}</h3>
                            <h3>Fecha de entrega: {formatDateCopilot(props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Arrival_Date)}</h3>
                            <h3>Fecha de entrega estimada: {getExpectedArrivalDate(props.order_table.filter((order) => order.Expedition_Number == OrderId)[0])}</h3>
                            <h3>Tipo de entrega: {props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Shipment_Type}</h3>
                            <h3>Paquetes: {countPackagesCopilot(props.order_table.filter((order) => order.Expedition_Number == OrderId)[0])}</h3>
                        </div>
                        : null
                    }     
                    {props.customer_selected && props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.Customer_Id == props.customer_selected?.Id && !props.order_table.filter((order) => order.Expedition_Number == OrderId)[0]?.State.includes("En devolución") ?
                        <Button variant="primary" onClick={() => returnOrder()}>Devolver</Button>
                    : null
                    }
                    <Button variant="primary" onClick={() => login()}>Volver</Button>
                </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "ViewOrder.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista del pedido seleccionado según la URL. Dicho pedido se encuentra en la variable order_table donde order.Expedition_Number sea igual que OrderId */}
                {/* Debe mostrar la llegada estimada del pedido junto a una imagen de los diferentes estados almacenada en la capeta public y a un texto con el estado del pedido y una pequeña descripción de dicho estado. */}
                {/* En el caso de que el cliente esté registrado (exista props.customer_selected y el Customer_Id del pedido coincida con el Id del cliente) muestra la información del pedido (origen, destino, destino adicional, fecha de recogida, de entrega, la fecha esperada de entrega, el tipo de entrega y el número de paquetes), en caso contrario no. */}
                {/* Si el pedido está en estado "En trámite" muestra la fecha esperada de recogida, y en el caso de que el pedido se encuentre en algún estado "En devolución - ..." muestra la fecha esperada de devolución. */}
                {/* Además debe haber un botón de devolución (si el estado no es en devolución y el cliente está registrado) y uno de volver a la página principal.*/}
                { codeWhisperer ?
                    <div>
                        <div className="ViewOrder-title">
                            <h1>Pedido {OrderId}</h1>
                            <img className="ViewOrder-image" src={props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Status_Image} alt="Status"/>
                            <p>{props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Status}</p>
                            <p>{props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Description}</p>
                            {props.customer_selected && props.customer_selected.Id == props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Customer_Id ?
                                <div>
                                    <p>Origen: {props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Origin}</p>
                                    <p>Destino: {props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Destination}</p>
                                    <p>Destino adicional: {props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Additional_Destination}</p>
                                    <p>Fecha de recogida: {formatDateCodeWhisperer(props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Collection_Date)}</p>
                                    <p>Fecha de entrega: {formatDateCodeWhisperer(props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Arrival_Date)}</p>
                                    <p>Tipo de entrega: {props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Shipment_Type}</p>
                                    <p>Fecha esperada de entrega: {getExpectedArrivalDate(props.order_table.filter(order => order.Expedition_Number == OrderId)[0])}</p>
                                    <p>Paquetes: {countPackagesCodeWhisperer(props.order_table.filter(order => order.Expedition_Number == OrderId)[0])}</p>
                                </div>
                                :  null
                            }
                            {props.customer_selected && props.customer_selected.Id == props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Customer_Id && props.order_table.filter(order => order.Expedition_Number == OrderId)[0]?.Status != "En devolución" ?
                                <Button variant="primary" onClick={returnOrder}>Devolver</Button>
                            : null
                            }
                            <Button variant="primary" onClick={login}>Volver a la página principal</Button>
                        </div>
                    </div>
                    : null
                }
        </div>
    );
}