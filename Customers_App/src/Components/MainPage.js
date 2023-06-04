import './MainPage.css';

import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

// Componente principal de la página principal. Tiene la primera vista de la web.
export default function MainPage(props) {
    const [inputSearch, setinputSearch] = useState("");
    const [alertInputSearch, setalertInputSearch] = useState(false);

    let orderFound = false;
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que redirige a la página de envío de paquetes.
    const sendOrder = () => {
        navigate("/enviar-paquete");
    }

    // Función que busca un pedido en la base de datos, si el pedido tiene el mismo número de expedición. En dicho caso lo redirige a la página del pedido. En caso contrario, muestra un mensaje de error.
    const searchOrder = () => {
        const order_selected = props.order_table.find(order => (order.Expedition_Number == inputSearch));
        if(order_selected){
            props.setorder_selected(order_selected);
            navigate("/pedido=/"+order_selected.Expedition_Number);
        }
        else{
            setalertInputSearch(true);
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que busca un pedido en la base de datos, en la tabla order_table, si el pedido tiene el mismo número de expedición que el dado. En dicho caso lo redirige a la página del pedido.
    //En caso contrario, muestra un mensaje de error.
    const searchOrderCopilot = () => {
        let orderFound = false;
        props.order_table.forEach(order => {
            if(order.Expedition_Number == inputSearch){
                orderFound = true;
                props.setorder_selected(order);
                navigate("/pedido=/"+order.Expedition_Number);
            }
        });
        if(!orderFound){
            setalertInputSearch(true);
        }
    }
    
    // Función realizada por Amazon CodeWhisperer.
    // Función que busca un pedido en la base de datos, en la tabla order_table, si el pedido tiene el mismo número de expedición que el dado. En dicho caso lo redirige a la página del pedido.
    //En caso contrario, muestra un mensaje de error.
    const searchOrderCodeWhisperer = () => {
        let orderFound = false;
        props.order_table.forEach(order => {
            if(order.Expedition_Number == inputSearch){
                orderFound = true;
                navigate("/pedido/" + order.Id);
            }
        });
        if(!orderFound){
            setalertInputSearch(true);
        }
    
    }

    // Función que cuenta el número de paquetes de un pedido.
    const countPackets = (order) => {
        let packets = [];
        props.package_table.map(packet =>{ if(packet.Order_Id == order.Id){packets.push(packet)}});
        return packets.length;
    }

    // Función realizada por GitHub Copilot.
    // Función que cuenta el número de paquetes de un pedido.
    const countPacketsCopilot = (order) => {
        let count = 0;
        props.package_table.forEach(packet => {
            if(packet.Order_Id == order.Id){
                count++;
            }
        });
        return count;
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que cuenta el número de paquetes de un pedido.
    const countPacketsCodeWhisperer = (order) => {
        let count = 0;
        order.Packets.forEach(packet => {
            count += packet.Quantity;
        });
        return count;
    
    }

    return (
        <div className="MainPage">
            <hr id="hr"></hr>
            {props.customer_selected &&  
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-4">
                            <div id="view_orders_main_page_title">
                                <h2 id="view_orders_main_page_title_1">Tus pedidos</h2>
                            </div>
                            <div id="view_orders_main_page_image">
                                <img id="view_orders_main_page_image_style" src={process.env.PUBLIC_URL + "/tus_pedidos_main.png"}/>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className='row justify-content-center'>
                                {props.order_table.map((order) => {
                                if(order.Customer_Id == props.customer_selected.Id && order.Active){
                                    orderFound = true;
                                    return(
                                        <div className="col-6">
                                            <div className="orders_main_page_order">
                                                <h6 className="orders_main_page_order_title"><b>Pedido: {order.Expedition_Number}</b></h6>
                                                <p className="orders_main_page_order_description">Estado: {order.State}</p>
                                                <p className="orders_main_page_order_packets_and_buttons">
                                                    Bulto: {countPackets(order)}  
                                                    <Button className="btn btn-secondary" size="sm" id="orders_main_page_order_button" onClick={() => {props.setorder_selected(order); navigate("/pedido=/"+order.Expedition_Number)}}>Ver pedido</Button>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                }
                                )
                                }
                                {!orderFound && 
                                <div id="no_orders">
                                    <h5 id="no_orders_text">No tienes ningún pedido.</h5>
                                    <Button id="no_orders_button" className="btn btn-secondary" onClick={() => sendOrder()}>Enviar paquete</Button>
                                </div> 
                                }
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            }
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-8">
                        <div id="send_packet_photo"><img id="send_packet_photo_style" alt="Foto_principal_1" src={process.env.PUBLIC_URL + "/imagen_home.jpeg"}/></div>
                    </div>
                    <div className="col-4">
                        <div id="send_packet_title">
                            <h2 id="send_packet_1"><b>Envía tu paquete</b></h2>
                        </div>
                        <div id="send_packet_description">
                            <h6 id="send_packet_2">Envía tu paquete con la mayor seguridad y rapidez.</h6>
                        </div>
                        <div id="send_packet_button">
                            <Button id="send_button" className="btn btn-primary" onClick={() => sendOrder()}>Enviar paquete</Button>
                        </div>
                        <hr id="send_packet_hr"></hr>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-5">
                        <div id="search_packet_title">
                            <h2 id="search_packet_1">Seguimiento del pedido</h2>
                        </div>
                        <div id="search_packet_description">
                            <p id="search_packet_2">Introduce el número de seguimiento de tu pedido.</p>
                        </div>
                        <div id="search_packet_input">
                            <InputGroup className='search_input' onChange={(e) => {setinputSearch(e.target.value)}}>
                                <Form.Control type="number" placeholder="Número de seguimiento"/>  
                                <Button variant="secondary" id="search_button" onClick={() => searchOrder()}>Buscar</Button>
                            </InputGroup>
                        </div>
                        <div id="search_packet_alert">
                            {alertInputSearch && <p id="search_alert">El número de seguimiento introducido no es correcto.</p>}
                        </div>
                    </div>
                    <div className="col-7">
                        <div id="search_packet_photo"><img id="search_packet_photo_style" alt="Foto_principal_2" src={process.env.PUBLIC_URL + "/imagen_seguimiento.jpg"}/></div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="final_cards">
                            <div className="final_card_title">
                                <h5 className="final_card_1">Contacto</h5>
                            </div>
                            <div className="final_card_description">
                                <p className="final_card_2">Si tienes alguna duda o quieres contactar con nosotros, puedes hacerlo a través de nuestro correo electrónico o de nuestro teléfono.</p>
                                <b>justasecond@gmail.com</b> <br></br>
                                <b>644 607 777</b>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="final_cards">
                            <div className="final_card_title">
                                <h5 className="final_card_1">Transporte</h5>
                            </div>
                            <div className="final_card_description">
                                <p className="final_card_2">Realiza envíos en España, dentro de la Península Ibérica de la forma más eficiente posible.</p>
                            </div>
                            <div>
                                <img className="final_card_image" src={process.env.PUBLIC_URL + "/transporte.jpg"}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="final_cards">
                            <div className="final_card_title">
                                <h5 className="final_card_1">Sostenibilidad</h5>
                            </div>
                            <div className="final_card_description">
                                <p className="final_card_2">En 2030 reduciremos el 80% de nuestras emisinones CO2.</p>
                            </div>
                            <div>
                                <img className="final_card_image" src={process.env.PUBLIC_URL + "/sostenibilidad.jpg"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "MainPage.js" */}
            {/* En el html debe mostrar de una forma bonita y ordenada los pedidos del cliente (si está registrado), una sección de envío del paquete, con su botón correstondiente, */}
                {/*una sección de seguimiento del pedido, que permite buscar el pedido y muestra un mensaje de alerta cuando el número de seguimiento del pedido no es el correcto, */}
                {/*y una sección de contacto, que tiene el email "justasecond@gmail.com" y el teléfono "644 607 777" */}
            {copilot ?
                <div className="MainPage-Container">
                    <div className="MainPage-Container-Header">
                        <h1>Paquetes</h1>
                    </div>
                    <div className="MainPage-Container-Body">
                        <div className="MainPage-Container-Body-Orders">
                            <h2>Pedidos</h2>
                            <div className="MainPage-Container-Body-Orders-List">
                                {props.customer_selected ?
                                    props.order_table.map((order) => {
                                        if(order.Customer_Id == props.customer_selected.Id){
                                            return(
                                                <div className="MainPage-Container-Body-Orders-List-Order">
                                                    <div className="MainPage-Container-Body-Orders-List-Order-Header">
                                                        <h3>{order.Expedition_Number}</h3>
                                                    </div>
                                                    <div className="MainPage-Container-Body-Orders-List-Order-Body">
                                                        <div className="MainPage-Container-Body-Orders-List-Order-Body-Info">
                                                            <p>Estado: {order.State}</p>
                                                            <p>Paquetes: {countPackets(order)}</p>
                                                        </div>
                                                        <div className="MainPage-Container-Body-Orders-List-Order-Body-Button">
                                                            <Button variant="primary" onClick={() => {props.setorder_selected(order); navigate("/pedido=/"+order.Expedition_Number)}}>Ver</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                : <p>No hay pedidos</p>
                                }
                            </div>
                        </div>
                        <div className="MainPage-Container-Body-Send">
                            <h2>Enviar paquete</h2>
                            <div className="MainPage-Container-Body-Send-Button">
                                <Button variant="primary" onClick={() => sendOrder()}>Enviar</Button>
                            </div>
                        </div>
                        <div className="MainPage-Container-Body-Search">   
                            <h2>Seguimiento del pedido</h2>
                            <div className="MainPage-Container-Body-Search-Input">
                                <InputGroup className='search_input' onChange={(e) => {setinputSearch(e.target.value)}}>
                                    <Form.Control type="number" placeholder="Número de seguimiento"/>
                                    <Button variant="secondary" id="search_button" onClick={() => searchOrder()}>Buscar</Button>
                                </InputGroup>
                            </div>
                            <div className="MainPage-Container-Body-Search-Alert">
                                {alertInputSearch ? <Alert variant="danger">El número de seguimiento no es correcto</Alert> : null}
                            </div>
                        </div>
                        <div className="MainPage-Container-Body-Contact">
                            <h2>Contacto</h2>
                            <div className="MainPage-Container-Body-Contact-Info">
                                <p>Correo:
                                    <a href="mailto:
                                        justasecond@gmail.com
                                    ">
                                        justasecond@gmail.com
                                    </a>
                                </p>
                                <p>Teléfono: 644 607 777</p>               
                           </div>
                        </div>
                    </div>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "MainPage.js"*/}
            {/* En el html debe mostrar de una forma bonita y ordenada los pedidos del cliente (si está registrado), una sección de envío del paquete, con su botón correstondiente, */}
                {/*una sección de seguimiento del pedido, que permite buscar el pedido y muestra un mensaje de alerta cuando el número de seguimiento del pedido no es el correcto, */}
                {/*y una sección de contacto, que tiene el email "justasecond@gmail.com" y el teléfono "644 607 777" */}
            {codeWhisperer ?
                <div>
                    <div className="MainPage-title">
                        <h1>Pedidos del cliente</h1>
                    </div>
                    <div className="MainPage-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>NÚMERO DE SEGUIMIENTO</th>
                                    <th>FECHA DE ENVÍO</th>
                                    <th>PAQUETES</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                {props.order_table.map(order => (
                                    <tr key={order.Id}>
                                        <td>{order.Expedition_Number || ""}</td>
                                        <td>{order.Collection_Date || ""}</td>
                                        <td>{countPackets(order)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="MainPage-button">
                        <Button variant="primary" onClick={() => sendOrder()}>Enviar paquete</Button>
                    </div>
                    <div className="MainPage-title">
                        <h1>Seguimiento del pedido</h1>
                    </div>
                    <div className="MainPage-form">
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="NÚMERO DE SEGUIMIENTO" value={inputSearch} onChange={(e) => setinputSearch(e.target.value)}/>
                            <Button variant="primary" onClick={() => searchOrder()}>Buscar</Button>
                        </InputGroup>
                    </div>
                    <div className="MainPage-alert">
                        {alertInputSearch ? <Alert variant="danger">El nÚMERO DE SEGUIMIENTO no es correcto</Alert> : null}
                    </div>
                    <div className="MainPage-title">
                        <h1>Contacto</h1>
                        <p>XXXXXXXXXXXXXXXXXXXXX</p>
                    </div>
                </div>  
                : null
            }
        </div>
    );
}