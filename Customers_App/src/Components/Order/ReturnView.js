import './ReturnView.css';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';

// Componente que renderiza la vista de devolución de un pedido.
export default function ReturnView(props) {
    const [additionalCost, setAdditionalCost] = useState(0);

    let { OrderId } = useParams();
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que calcula el coste adicional de la devolución de un pedido. Se ejecuta al cargar la vista.
    useEffect(() => {
        let cost = props.order_selected?.Cost;
        if(cost*0.056 < 7.09){
            setAdditionalCost(7.09)
        }
        else if(cost*0.056 > 138.53){
            setAdditionalCost(138.53)
        }
        else{
            setAdditionalCost((cost*0.056).toFixed(2))
        }
    }, []) 

    // Función que devuelve el pedido y pasa a la vista de pago.
    function returnOrder(){
        navigate("/devolver-pedido/"+OrderId+"/pago")
        props.setcost(additionalCost)
    }

    return (
        <div className="ReturnView">
            {props.customer_selected && props.order_table.find((order) => (order.Customer_Id == props.customer_selected?.Id && order.Expedition_Number == OrderId)) ?
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='ReturnView_title'>
                                <h2 id="ReturnView_main_title">Devolución</h2>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='ReturnView_question'>
                                <h5 id="ReturnView_main_question">¿Estás seguro que quieres devolver tu pedido?</h5>
                            </div>
                        </div>
                        <div className="col-12">
                            <Button variant="secondary" className="confirm_return" size="lg" onClick={() => returnOrder()}>Devolver</Button>
                        </div>
                        <div className="col-12">
                            <div className='ReturnView_description'>
                                <p className='ReturnView_description1'>El coste de devolución es <b>{additionalCost}€</b>, al confirmar la devolución estás aceptando abonar el coste adicional especificado anteriormente.</p>
                                <p className='ReturnView_description2'>Tenga en cuenta que la devolución será efectuada en la oficina desde la que se envió el pedido. En caso de que el pedido se enviara con opción de domiciliación, la devolución será efectuada en la dirección origen desde la que se envió el pedido.</p>
                            </div>
                            <hr id='hr_ReturnView'></hr>
                        </div>
                        <div className="col-12">
                        <Button variant="secondary" onClick={() => navigate("/pedido=/"+OrderId)}>Volver</Button>
                        </div>
                    </div>
                </div>:
                <div className='customer_not_loaged'>
                    {navigate("/error")}
                </div>
            }
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "ReturnView.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de devolución de un pedido. */}
                {/* Dicha vista sólo se mostrará si hay un cliente con la sesión iniciada (props.customer_selected) y si el pedido corresponde a un pedido del cliente seleccionado. En caso contrario muestra la pantalla de error. */}
                {/* En la vista debe aparecer una pequeña descripción con el coste y dos botones, uno para volver y otro para efectuar la devolución. */}
            {copilot ?
                <div>
                    {props.customer_selected && props.order_selected && props.order_selected.CustomerId === props.customer_selected.CustomerId ?
                        <div>
                            <h1>Return Order</h1>
                            <p>Order {OrderId} has a cost of {props.order_selected?.Cost}€</p>
                            <p>Additional cost of return: {additionalCost}€</p>
                            <Button onClick={() => navigate("/devolver-pedido")}>Go back</Button>
                            <Button onClick={() => returnOrder()}>Return order</Button>
                        </div>
                    : 
                        <div>
                            <h1>¡Ups! Parece que algo ha salido mal.</h1>
                            <p>Por favor, vuelve a intentarlo más tarde.</p>
                            <Button variant="primary" onClick={() => navigate('/')}>Volver al inicio</Button>
                        </div>
                    }
                </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "ReturnView.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de devolución de un pedido. */}
                {/* Dicha vista sólo se mostrará si hay un cliente con la sesión iniciada (props.customer_selected) y si el pedido corresponde a un pedido del cliente seleccionado. En caso contrario muestra la pantalla de error. */}
                {/* En la vista debe aparecer una pequeña descripción con el coste y dos botones, uno para volver y otro para efectuar la devolución. */}
            {codeWhisperer ?
                <div>
                    <div className="ReturnView-description">
                        <div className="ReturnView-description-title">
                            <h2>Devolución de pedido</h2>
                        </div>
                        <div className="ReturnView-description-text">
                            <p>El coste de la devolución es de {additionalCost} €.</p>
                        </div>
                    </div>
                    <div className="ReturnView-buttons">
                        <Button variant="secondary" onClick={() => navigate("/cliente")}>Volver</Button>
                        <Button variant="primary" onClick={() => returnOrder()}>Devolver</Button>
                    </div>
                </div>
            : null    
            }
        </div>
    );
}