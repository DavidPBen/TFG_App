import './SendPackage.css';

import { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// Componente que muestra la página de envío de paquetes y almacena los datos de dichos paquetes.
export default function SendPackage(props) {
    const [width, setwidth] = useState('');
    const [height, setheight] = useState('');
    const [length, setlength] = useState('');
    const [fragility, setfragility] = useState(false);
    const [volume, setvolume] = useState('');
    const [weight, setweight] = useState('');
    const [alert, setalert] = useState("");

    const navigate = useNavigate();

    let { PackageNumber } = useParams();
    const copilot = false;
    const codeWhisperer = false;

    // Función que añade un paquete a la lista de paquetes del pedido.
    const addPacket = () => {
        if(verifyWidth() && verifyHeight() && verifyLength() && weight <= 50.00){
            let packets = [];
            let fragility_field = fragility ? "Sí" : "No";
            props.packages?.map(packet => packets.push(packet));
            packets.push({width: width, height: height, length: length, fragility: fragility_field, volume: volume, weight: weight});
            props.setpackages(packets);
            navigate('/enviar-paquete');
        }
        else{
            if(weight <= 50.00){
                setalert('Introduzca correctamente los datos del paquete.');
            }
            else{
                setalert('El peso de los paquetes no puede superar los 50 kg.');
            }
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que añade un paquete a la lista de paquetes del pedido (props.packages) y navega a la página de envío de paquetes. 
    //Esto lo realiza si los datos introducidos son correctos y cumplen los verificadores. En caso contrario, muestra un mensaje de error.
    const addPackageCopilot = () => {
        if(verifyWidth() && verifyHeight() && verifyLength()){
            props.setpackages([...props.packages, {width: width, height: height, length: length, fragility: fragility, volume: volume, weight: weight}])
            navigate('/order/sendPackage')
        } else {
            setalert("Por favor, introduce los datos correctamente.")
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que añade un paquete a la lista de paquetes del pedido (props.packages) y navega a la página de envío de paquetes. 
    //Esto lo realiza si los datos introducidos son correctos y cumplen los verificadores. En caso contrario, muestra un mensaje de error.
    const addPackageCodeWhisperer = () => {
        if(verifyWidth() && verifyHeight() && verifyLength()){
            props.addPackage(width, height, length, fragility)
            navigate('/sendpackage')
        } else {
            setalert("Error: Datos incorrectos.")
        }
    }

    // Función que verifica que el ancho del paquete está introducido correctamente.
    const verifyWidth = () => {
        if(width < 0 || width == ''){
            return false
        }
        return true
    }

    // Función que verifica que el alto del paquete está introducido correctamente.
    const verifyHeight = () => {
        if(height < 0 || height == ''){
            return false
        }
        return true
    }

    // Función que verifica que la longitud del paquete está introducido correctamente.
    const verifyLength = () => {
        if(length < 0 || length == ''){
            return false
        }
        return true
    }

    // Función que calcula el volumen del paquete a partir de las dimensiones introducidas.
    const calculateVolume = () => {
        if(verifyWidth() && verifyHeight() && verifyLength()){
            setvolume((width * height * length).toFixed(2))
        } else {
            setvolume('')
        }
    }

    // Función que calcula el peso del paquete a partir del volumen introducido. Utiliza la fórmula de peso volumétrico de Correos.
    const calculateWeight = () => {
        if((width * height * length)>0){
            setweight(((width * height * length) / 6000).toFixed(2))
        } else{
            setweight('')
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que calcula el peso del paquete a partir del volumen introducido. Utiliza la fórmula de peso volumétrico de Correos (el volumen entre 6000). El peso no puede superar los 50 kg.
    const calculateWeightCopilot = () => {
        if(volume < 50){
            setweight(volume / 6000)
        } else {
            setweight(50)
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que calcula el peso del paquete a partir del volumen introducido. Utiliza la fórmula de peso volumétrico de Correos (el volumen entre 6000). El peso no puede superar los 50 kg.
    const calculateWeightCodeWhisperer = () => {
        if(verifyWidth() && verifyHeight() && verifyLength()){
            if(volume < 6000){
                setweight((volume / 6000).toFixed(2))
            } else {
                setweight((50).toFixed(2))
            }
        } else {
            setweight('')
        }
    }

    // Función que calcula el peso y el volumen cuando las dimensiones del paquete se introducen.
    useEffect(() => {
        calculateVolume();
        calculateWeight();
    }, [width, height, length])

    return(
        <div className="SendPackage">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12">
                        <div className='SendPackage_title'>
                            <h2 id="SendPackage_main_title">Paquete {PackageNumber}</h2>
                        </div>
                    </div>
                    <div className="col-12">
                        {alert ? 
                        <div className="alert_sendPackage">
                            <Alert key="secondary" variant="secondary">
                                {alert}
                            </Alert>
                        </div> :
                        null
                        }
                    </div>
                    <div className='col-12'>
                        <h4 className="SendPackage_descriptions">Introduce los datos de tu paquete</h4>
                    </div>
                    <div className="col-4">
                        <FloatingLabel controlId="floatingPackageWidth" label="Anchura *" className="mb-3" onChange={(e) => {setwidth(e.target.value)}}>
                            <Form.Control type="number" placeholder="Anchura" value={width}/>
                            <Form.Text className='form_text'>
                                La anchura debe estar en centímertros.
                            </Form.Text>
                        </FloatingLabel>
                    </div>
                    <div className="col-4">
                        <FloatingLabel controlId="floatingPackageHeight" label="Altura *" className="mb-3" onChange={(e) => {setheight(e.target.value)}}>
                            <Form.Control type="number" placeholder="Altura" value={height}/>
                            <Form.Text className='form_text'>
                                La altura debe estar en centímertros.
                            </Form.Text>
                        </FloatingLabel>
                    </div>
                    <div className="col-4">
                        <FloatingLabel controlId="floatingPackageLength" label="Profundidad *" className="mb-3" onChange={(e) => {setlength(e.target.value)}}>
                            <Form.Control type="number" placeholder="Profundidad" value={length}/>
                            <Form.Text className='form_text'>
                                La profundidad debe estar en centímertros.
                            </Form.Text>
                        </FloatingLabel>
                    </div>
                    <div className="col-12">
                        <div className='Volume_and_Weight_container'>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-6">
                                    <h6 className='SendPackage_field'><b>Volumen:</b> {volume} (cm&#xB3;)</h6>
                                </div>
                                <div className="col-6">
                                    <h6 className='SendPackage_field'><b>Peso volumétrico:</b> {weight} (kg)</h6>
                                </div>
                                <div className="col-12">
                                    <p className='SendPackage_field_description'>El peso está calculado según el volumen del paquete. La fórmula es el volumen entre 6000.</p>
                                </div>
                            </div>
                        </div>
                        <hr id="hr_sendPackage"></hr>
                    </div>
                    <div className="col-12">
                        <div className='SendPackage_fragility_container'>
                            <h7>¿El paquete es frágil? </h7>
                            <Button variant="outline-secondary" id="SendPackage_fragility" onClick={() => setfragility(!fragility)}>{fragility ? 'Sí' : 'No'}</Button>   
                        </div>
                    </div>
                    <div className="col-12">
                        <Button variant="secondary" size="lg" id="SendPackage_button" onClick={() => addPacket()}>Añadir</Button>
                    </div>
                    <div className="col-10">
                        <hr></hr>
                    </div>
                    <div className="col-12">
                    <Button variant="secondary" onClick={() => navigate("/enviar-paquete")}>Volver</Button>
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "SendPackage.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir paquetes. */}
                {/* Debe mostrar el número de paquete, así como un formulario para registrar la anchura, la altura, la profundidad y la fragilidad del paquete. */}
                {/* Con ello se calculan automáticamente los campos de volumen y peso. Además, hay un botón de añadir paquete y uno de volver a la anterior vista. */}
                {/* Si se añade un paquete, se debe mostrar un mensaje de confirmación. En el caso de que haya algún campo erróneo muestra una alerta. */}
            {copilot ?
                <div>
                    <h1>Añadir paquete</h1>
                    <p>Número de paquete: {props.packages.length + 1}</p>
                    <p>Anchura (cm):</p>
                    <input type="number" value={width} onChange={(e) => setwidth(parseFloat(e.target.value))} />
                    <p>Altura (cm):</p>
                    <input type="number" value={height} onChange={(e) => setheight(parseFloat(e.target.value))} />
                    <p>Profundidad (cm):</p>
                    <input type="number" value={length} onChange={(e) => setlength(parseFloat(e.target.value))} />
                    <p>Fragilidad:</p>
                    <input type="checkbox" checked={fragility} onChange={(e) => setfragility(e.target.checked)} />
                    <p>Volumen (cm<sup>3</sup>): {volume}</p>
                    <p>Peso (kg): {weight}</p>
                    <button onClick={() => addPackageCopilot()}>Añadir paquete</button>
                    <button onClick={() => navigate('/order')}>Volver</button>
                    <p>{alert}</p>
                </div>
            :null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "SendPackage.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir paquetes. */}
                {/* Debe mostrar el número de paquete, así como un formulario para registrar la anchura, la altura, la profundidad y la fragilidad del paquete. */}
                {/* Con ello se calculan automáticamente los campos de volumen y peso. Además, hay un botón de añadir paquete y uno de volver a la anterior vista. */}
                {/* Si se añade un paquete, se debe mostrar un mensaje de confirmación. En el caso de que haya algún campo erróneo muestra una alerta. */}
            {codeWhisperer ?
                <div>
                    <div className="SendPackage-header">
                        <h1>Paquete {PackageNumber}</h1>
                    </div>
                    <div className="SendPackage-body">
                        <Form.Group className="mb-3" controlId="formBasicWidth">
                            <FloatingLabel label="Ancho" className="mb-3">
                                <Form.Control type="number" placeholder="Ancho" onChange={(e) => setwidth(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicHeight">
                            <FloatingLabel label="Alto" className="mb-3">
                                <Form.Control type="number" placeholder="Alto" onChange={(e) => setheight(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLength">
                            <FloatingLabel label="Profundidad" className="mb-3">
                                <Form.Control type="number" placeholder="Profundidad" onChange={(e) => setlength(e.target.value)}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFragility">
                            <Form.Check type="checkbox" label="Fragil" onChange={(e) => setfragility(e.target.checked)}/>
                        </Form.Group>
                        <Button variant="primary" onClick={addPacket}>Añadir paquete</Button>
                        <Button variant="primary" onClick={() => navigate('/enviar-paquete')}>Volver</Button>
                        <p>{alert}</p>
                    </div>
                </div>
            :null
            }
        </div>
    );
}