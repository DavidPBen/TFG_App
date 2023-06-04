import './Pay.css';

import { useState} from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import React from 'react';


import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// Componente que muestra la vista de pago con tarjeta. Se renderiza al enviar un pedido nuevo o al devolverlo.
export default function Pay(props) {
    const [card_number, setcard_number] = useState();
    const [card_date, setcard_date] = useState("");
    const [card_cvv, setcard_cvv] = useState();
    const [alert, setalert] = useState(false);

    let { OrderId } = useParams();
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que comprueba que el número de la tarjeta es correcto.
    const verifyCardNumber = () => {
        if(card_number?.length == 16){
            return true;
        }
        else{
            setalert("El número de tarjeta es erróneo.");
            return false;
        }
    }

    // Función que comprueba que la fecha de caducidad de la tarjeta es correcta.
    const verifyCardDate = () => {
        const actual_date = new Date();
        const year = actual_date.getFullYear();
        const month = (actual_date.getMonth() + 1)+10;
        const day = actual_date.getDate()+10;
        const card_date_year = card_date?.substr(0,4);
        const card_date_month = +(card_date?.substr(5,2))+10;
        const card_date_day = +(card_date?.substr(8,2))+10;
        const card_date_to_compare = card_date_year+""+card_date_month+""+card_date_day;
        const actual_date_to_compare = year +""+ month +""+ day;
        if(card_date != "" && +card_date_to_compare > +actual_date_to_compare){
            return true;
        }
        else{
            setalert("La fecha de caducidad de la tarjeta es errónea.");
            return false;
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que la fecha de caducidad de la tarjeta es correcta. Para ello, la fecha de caducidad de la tarjeta debe ser posterior a la fecha actual.
    const verifyCardDateCopilot = () => {
        if(card_date?.length == 5){
            const card_date_array = card_date.split("/");
            const card_date_year = card_date_array[1];
            const card_date_month = card_date_array[0];
            const today = new Date();
            const today_year = today.getFullYear();
            const today_month = today.getMonth() + 1;
            if(card_date_year > today_year){
                return true;
            }
            else if(card_date_year == today_year && card_date_month >= today_month){
                return true;
            }
            else{
                setalert("La fecha de caducidad de la tarjeta es errónea.");
                return false;
            }
        }
        else{
            setalert("La fecha de caducidad de la tarjeta es errónea.");
            return false;
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que la fecha de caducidad de la tarjeta es correcta. Para ello, la fecha de caducidad de la tarjeta debe ser posterior a la fecha actual.    
    const verifyCardDateCodeWhisperer = () => {
        const today = new Date();
        const card_date_split = card_date.split("/");
        const card_year = parseInt(card_date_split[1]);
        const card_month = parseInt(card_date_split[0]);
        const card_day = parseInt(card_date_split[2]);
        const card_date_object = new Date(card_year, card_month - 1, card_day);
        if(card_date_object > today){
            return true;
        }
        else{
            setalert("La fecha de caducidad de la tarjeta es errónea.");
            return false;
        }
    
    }

    // Función que comprueba que el CVV de la tarjeta es correcto.
    const verifyCardCVV = () => {
        if(card_cvv?.length == 3 || card_cvv?.length == 4){
            return true;
        }
        else{
            setalert("El CVV de la tarjeta es erróneo.");
            return false;
        }
    }

    // Función que realiza el pago del pedido. En caso de ser devolución se cambia el estado del pedido, considerando el estado actual del pedido y que se ha realizado el pedido a domicilio.
    //En caso de ser un pedido normal se activa dicho pedido. Tras estos casos se redirige al usuario a la página principal.
    const pay = () => {
        if(verifyCardNumber() && verifyCardDate() && verifyCardCVV()){
            if(location.includes("devolver-pedido")){
                const order_to_return = props.order_table.find(order => order.Expedition_Number == OrderId);
                const order_state = order_to_return.State;
                const order_destination = order_to_return.Destination;
                const order_expected_arrival_date = order_to_return.Expected_Arrival_Date;
                const order_expected_collection_date = order_to_return.Expected_Collection_Date;
                let new_state = "";
                let new_expected_return_date = "";
                if(order_state == "Entregado" && !(order_destination == "Calle Fresno, 61, 28036" || order_destination == "Calle Mariposa, 67, 28025" || order_destination == "Calle de la Pesca, 1, 32024")){
                    new_state = "En devolución - En trámite";
                    new_expected_return_date = calculateExpectedReturnDate(order_expected_arrival_date);
                }else if(order_state == "En almacén destino" || order_state == "En camino" || order_state == "Entregado"){
                    new_state = "En devolución - En almacén origen";
                    new_expected_return_date = calculateExpectedReturnDate(order_expected_arrival_date);
                }else if(order_state == "En almacén origen" || order_state == "En trámite"){
                    new_state = "En devolución - En almacén destino";
                    new_expected_return_date = calculateExpectedReturnDate(order_expected_collection_date);
                }
                props.returnOrder(OrderId, new_state, new_expected_return_date);
                props.sendEmail(props.customer_selected.Email, "Su pedido ha sido devuelto correctamente - Just a Second", "Su pedido ha sido devuelto correctamente. <br></br>Puede consultar el estado de su pedido en la aplicación.<br></br> Just a Second");
                navigate("/");
            }
            else{
                props.payOrder(OrderId);
                navigate("/");
            }
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que realiza el pago del pedido. En caso de ser devolución se cambia el estado del pedido, considerando el estado actual del pedido y que se ha realizado el pedido a domicilio.
    //Al realizar la devolución se envían como parámetros el id del pedido, el estado actual del pedido y la nueva fecha de devolución esperada.
    //En caso de ser un pedido normal se activa dicho pedido. Tras estos casos se redirige al usuario a la página principal.
    const payCopilot = () => {
        if(verifyCardNumber() && verifyCardDateCopilot() && verifyCardCVV()){
            if(location.includes("devolucion")){
                props.changeOrderState(OrderId, props.orderState, calculateExpectedReturnDate(props.orderDate));
            }
            else{
                props.activateOrder(OrderId);
            }
            navigate("/");
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que realiza el pago del pedido. En caso de ser devolución se cambia el estado del pedido, considerando el estado actual del pedido y que se ha realizado el pedido a domicilio.
    //Al realizar la devolución se envían como parámetros el id del pedido, el estado actual del pedido y la nueva fecha de devolución esperada.
    //En caso de ser un pedido normal se activa dicho pedido. Tras estos casos se redirige al usuario a la página principal.
    const payCodeWhisperer = () => {
        if(location == "/pay/return"){
            props.axios.post(process.env.REACT_APP_BACKEND_URL + "/pay/return", {
                'OrderId': OrderId,
                'OrderState': props.OrderState,
                'ExpectedReturnDate': calculateExpectedReturnDate(props.OrderDate)
            }).then(response => {
                navigate("/");
            }).catch(error => {
                console.log(error);
            });
        }
        else{
            props.axios.post(process.env.REACT_APP_BACKEND_URL + "/pay", {
                'OrderId': OrderId
            }).then(response => {
                navigate("/");
            }).catch(error => {
                console.log(error);
            });
        }
    }

    // Función que se encarga de obtener la fecha de devolución esperada de un pedido. Para ello añade 7 días a la fecha introducida.
    const calculateExpectedReturnDate = (date) => {
        let date_to_return = new Date(date);
        date_to_return.setDate(date_to_return.getDate() + 7);
        date_to_return.setHours((Math.random() * 14) + 8);
        date_to_return = date_to_return.toLocaleString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
        return(date_to_return.toString().substr(6,4)) +'-'+ (date_to_return.toString().substr(3,2)) +'-'+ (date_to_return.toString().substr(0,2)) +' '+ (+(date_to_return.toString().substr(12,2))+1) +':'+ (date_to_return.toString().substr(15,2));        
    }

    return (
        <div className="Pay">
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="main_title_pay">
                            <h3 id="main_title_pay_text">Termina el proceso realizando el pago correspondiente</h3>
                        </div>
                    </div>
                    <div className="col-12">
                        <img id="pay_image_style" src={process.env.PUBLIC_URL + "/imagen_tarjeta.jpg"} alt="Foto de la tarjeta"/>
                    </div>
                    <div className="col-10">
                        {alert ? 
                        <Alert variant='secondary'>{alert}</Alert> : 
                        null
                        }
                    </div>
                    <div className="col-9">
                        <div className='card_number'>
                            <FloatingLabel controlId="floatingInputCardNumber" label="Número de tarjeta *" className="mb-3" onChange={(e) => {setcard_number(e.target.value)}}>
                                <Form.Control type="number" placeholder="Número de tarjeta *" value={card_number}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='card_date'>
                            <FloatingLabel controlId="floatingInputCardDate" label="Fecha de caducidad de la tarjeta *" className="mb-3" onChange={(e) => {setcard_date(e.target.value)}}>
                                <Form.Control type="date" placeholder="Fecha de caducidad de la tarjeta *" value={card_date}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className='card_cvv'>
                            <FloatingLabel controlId="floatingInputCVV" label="CVV *" className="mb-3" onChange={(e) => {setcard_cvv(e.target.value)}}>
                                <Form.Control type="number" placeholder="CVV *" value={card_cvv}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="pay_cost">
                            <h5 id="pay_description_cost">El pago a realizar es de: <b>{props.cost} €</b></h5>
                        </div>
                        <div className="pay_description">
                            <p id="pay_description_text">El pago se realiza a través de una pasarela de pago segura, en la que se solicita el número de tarjeta de crédito o débito, la fecha de caducidad y el código de seguridad (CVV).</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="pay_button">
                            <Button id="pay_button_style" variant="secondary" size="lg" onClick={() => pay()}>Pagar</Button>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="goBack_button">
                            <Button id="goBack_button_style" variant="secondary" onClick={() => navigate(-1)}>Volver atrás</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Pay.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de pago con tarjeta. En ella se muestra una imagen de una tarjeta y un formulario. */}
                {/* El formulario debe contener los siguientes campos: número de la tarjeta, fecha de caducidad y CVV. Además, se muestra el coste del pago a realizar y dos botones que permiten pagar o volver atrás. */}
                {/* En caso de que el usuario introduzca los datos de la tarjeta de forma incorrecta, muestra una alerta. */}
                {copilot ?
                    <div className="Pay">
                        <div className="Pay__card">
                            <img src={props.card} alt="card_image" className="Pay__card__img" />
                        </div>
                        <div className="Pay__form">
                            <div className="Pay__form__title">
                                <h1>Pago</h1>
                            </div>
                            {alert ? <div className="Pay__form__alert">Los datos introducidos no son correctos</div> : null}
                            <div className="Pay__form__fields">
                                <div className="Pay__form__fields__number">
                                    <label htmlFor="number">Número de tarjeta</label>
                                    <input type="text" id="number" name="number" placeholder="1234 5678 9012 3456" onChange={(e) => setcard_number(e.target.value)} />
                                </div>
                                <div className="Pay__form__fields__date">
                                    <label htmlFor="date">Fecha de caducidad</label>
                                    <input type="text" id="date" name="date" placeholder="MM/AA" onChange={(e) => setcard_date(e.target.value)} />
                                </div>
                                <div className="Pay__form__fields__cvv">
                                    <label htmlFor="cvv">CVV</label>
                                    <input type="text" id="cvv" name="cvv" placeholder="123" onChange={(e) => setcard_cvv(e.target.value)} />
                                </div>
                            </div>
                            <div className="Pay__form__cost">
                                <p>Coste: {props.orderCost}€</p>
                            </div>
                            <div className="Pay__form__buttons">
                                <button onClick={() => navigate(-1)}>Atrás</button>
                                <button onClick={() => payCopilot()}>Pagar</button>
                            </div>
                        </div>
                    </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Pay.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de pago con tarjeta. En ella se muestra una imagen de una tarjeta y un formulario. */}
                {/* El formulario debe contener los siguientes campos: número de la tarjeta, fecha de caducidad y CVV. Además, se muestra el coste del pago a realizar y dos botones que permiten pagar o volver atrás. */}
                {/* En caso de que el usuario introduzca los datos de la tarjeta de forma incorrecta, muestra una alerta. */}
            {codeWhisperer ?
                <div>
                    <img src={props.card_image} alt="card_image"/>
                    <div className="form_container">
                        <form>
                            <div className="form_group">
                                <label>NÚMERO DE TARJETA</label>
                                <input type="text" name="card_number" value={card_number} onChange={(e) => setcard_number(e.target.value)} />
                            </div>
                            <div className="form_group">
                                <label>FECHA DE CADUCIDAD</label>
                                <input type="text" name="card_date" value={card_date} onChange={(e) => setcard_date(e.target.value)} />
                            </div>
                            <div className="form_group">
                                <label>CVV</label>
                                <input type="text" name="card_cvv" value={card_cvv} onChange={(e) => setcard_cvv(e.target.value)} />
                            </div>
                        </form>
                    </div>
                    <div className="total_container">
                        <div className="total_price"><p>COSTE DEL PAGO: {props.order_table?.find(order => order.Expedition_Number == OrderId)?.Total_Price} €</p></div>
                    </div>
                    <div className="buttons_container">
                        <button onClick={payCodeWhisperer}>PAGAR</button>
                        <button onClick={props.back}>VOLVER ATRÁS</button>
                    </div>
                    {alert ? <div className="alert">Datos incorrectos</div> : null}
                </div>
            : null    
            }
        </div>
    );
}