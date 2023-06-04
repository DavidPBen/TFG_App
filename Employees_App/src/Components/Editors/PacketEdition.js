import './PacketEdition.css';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Componente que permite editar un paquete.
export default function PacketEdition(props) {
    let { Package_Id } = useParams();
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    const [weight, setweight] = useState();
    const [width, setwidth] = useState();
    const [height, setheight] = useState();
    const [length, setlength] = useState();
    const [volume, setvolume] = useState();
    const [fragility, setfragility] = useState();

    // Función que se ejecuta al iniciar el componente. Se encarga de rellenar los campos del formulario con los datos del paquete.
    useEffect(() => {
        choosePackage()
    }, [props.package_table])

    // Función que rellena los campos del formulario con los datos del paquete.
    const choosePackage = () => {
        if(props.package_table === undefined){
            return
        } 
        const package_localized = props.package_table.find((packet) => packet.Id == Package_Id)
        setwidth(package_localized.Width)
        setheight(package_localized.Height)
        setlength(package_localized.Length)
        calculateVolume(package_localized.Width, package_localized.Height, package_localized.Length)
        calculateWeight(package_localized.Width, package_localized.Height, package_localized.Length)
        setfragility(package_localized.Fragility)
    }

    // Función que se encarga de actualizar los datos del paquete en la base de datos cuando verifican dichos valores. En caso contrario, muestra una alerta.
    const applyChanges = () => {
        const package_localized = props.package_table.find((packet) => packet.Id == Package_Id)
        var packet_accepted = true
        var packet_validated = false
        if(weight < 50.00){
            if(weight !== package_localized.Weight){
                if(verifyWeight()){
                    props.setPackage(Package_Id, 'Weight', weight)
                    packet_validated = true
                }
                else{
                    alert ('Peso no válido')
                    packet_accepted = false
                }
            }
            if(width !== package_localized.Width){
                if(verifyWidth()){
                    props.setPackage(Package_Id, 'Width', width)
                    packet_validated = true
                }
                else{
                    alert ('Anchura no válida')
                    packet_accepted = false
                }
            }
            if(height !== package_localized.Height){
                if(verifyHeight()){
                    props.setPackage(Package_Id, 'Height', height)
                    packet_validated = true
                }
                else{
                    alert ('Altura no válida')
                    packet_accepted = false
                }
            }
            if(length !== package_localized.Length){
                if(verifyLength()){
                    props.setPackage(Package_Id, 'Length', length)
                    packet_validated = true
                }
                else{
                    alert ('Profundidad no válida')
                    packet_accepted = false
                }
            }
            if(volume !== package_localized.Volume){
                if(verifyVolume()){
                    props.setPackage(Package_Id, 'Volume', volume)
                    packet_validated = true
                }
                else{
                    alert ('Volumen no válido')
                    packet_accepted = false
                }
            }
            if(fragility !== package_localized.Fragility){
                props.setPackage(Package_Id, 'Fragility', fragility)
                packet_validated = true
            }
            if(packet_accepted && packet_validated){
                navigate(-1)
            }
        }
        else{
            alert ('El peso del paquete no puede ser superior a 50 kg')
        }
    }

    // Función que verifica que el peso está introducido correctamente.
    const verifyWeight = () => {
        if(weight < 0 || weight == ''){
            return false
        }
        return true
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

    // Función que verifica que el volumen del paquete está introducido correctamente.
    const verifyVolume = () => {
        if(volume < 0 || volume == ''){
            return false
        }
        return true
    }

    // Función que calcula el volumen del paquete a partir de las dimensiones introducidas.
    const calculateVolume = (width_field, height_field, length_field) => {
        setvolume((width_field * height_field * length_field).toFixed(2))
    }

    // Función que calcula el peso del paquete a partir del volumen introducido. Utiliza la fórmula de peso volumétrico de Correos.
    const calculateWeight = (width_field, height_field, length_field) => {
        setweight(((width_field * height_field * length_field) / 6000).toFixed(2))
    }

    // Función que se ejecuta cada vez que cambia el valor de las dimensiones del paquete. Permite calcular el volumen y el peso del paquete.
    useEffect(() => {
        calculateVolume(width, height, length)
        calculateWeight(width, height, length)
    }, [width, height, length])

    return (
        <div className="PacketEdition">
            <div className='PacketEdition_title'>
                <h1>Editar un paquete</h1>
            </div>
            <div className='PacketEdition_form'>
                <div className='PacketEdition_Id'>
                    <h5>Id del paquete = {Package_Id}</h5>
                </div>
                <FloatingLabel controlId="floatingPackageWidth" label="Anchura *" className="mb-3" onChange={(e) => {setwidth(e.target.value)}}>
                    <Form.Control type="number" placeholder="Anchura" value={width}/>
                    <Form.Text className='form_text'>
                        La anchura debe de ponerse en centímetros.
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPackageHeight" label="Altura *" className="mb-3" onChange={(e) => {setheight(e.target.value)}}>
                    <Form.Control type="number" placeholder="Altura" value={height}/>
                    <Form.Text className='form_text'>
                        La altura debe de ponerse en centímetros.
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPackageLength" label="Profundidad *" className="mb-3" onChange={(e) => {setlength(e.target.value)}}>
                    <Form.Control type="number" placeholder="Profundidad" value={length}/>
                    <Form.Text className='form_text'>
                        La profundidad debe de ponerse en centímetros.
                    </Form.Text>
                </FloatingLabel>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-5'>
                            <p className='PacketAdd_volume_weight'>Volumen = <b>{volume}m<sup>3</sup></b></p>
                        </div>
                        <div className='col-6'>
                            <p className='PacketAdd_volume_weight'>Peso = <b>{weight}kg</b></p>
                        </div>
                    </div>
                </div>
                <h7>¿El paquete es frágil? </h7>
                <Button variant="outline-secondary" id="PacketEdition_fragility" onClick={() => setfragility(!fragility)}>{fragility ? 'Sí' : 'No'}</Button>
            </div>
            <div className='PacketEdition_buttons'>
            <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-6'>
                            <div className='PacketEdition_goBack'>
                                <Button variant="secondary" size='lg' onClick={() => navigate(-1)}>Volver</Button>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='PacketEdition_apply_changes'>
                                <Button variant="secondary" size='lg' onClick={() => applyChanges()}>Aplicar cambios</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "PacketEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo paquete. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo paquete, y dos botones: uno para aplicar cambios y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de anchura, altura y profundidad. Además, debe mostrar los valores calculados de peso y volumen y debe tener un toggle donde se muestre la fragilidad del paquete. */}
            {copilot ?
                <div>
                    <h1>Editar paquete</h1>
                    <form>
                        <label htmlFor="width">Anchura</label>
                        <input type="number" id="width" name="width" value={width} onChange={(e) => setwidth(e.target.value)}></input>
                        <label htmlFor="height">Altura</label>
                        <input type="number" id="height" name="height" value={height} onChange={(e) => setheight(e.target.value)}></input>
                        <label htmlFor="length">Profundidad</label>
                        <input type="number" id="length" name="length" value={length} onChange={(e) => setlength(e.target.value)}></input>
                        <label htmlFor="weight">Peso</label>
                        <input type="number" id="weight" name="weight" value={weight} onChange={(e) => setweight(e.target.value)}></input>
                        <label htmlFor="volume">Volumen</label>
                        <input type="number" id="volume" name="volume" value={volume} onChange={(e) => setvolume(e.target.value)}></input>
                        <label htmlFor="fragility">Fragilidad</label>
                        <input type="checkbox" id="fragility" name="fragility" value={fragility} onChange={(e) => setfragility(e.target.value)}></input>
                    </form>
                    <button onClick={() => applyChanges()}>Aplicar cambios</button>
                    <button onClick={() => navigate(-1)}>Volver</button>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "PacketEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo paquete. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo paquete, y dos botones: uno para aplicar cambios y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de anchura, altura y profundidad. Además, debe mostrar los valores calculados de peso y volumen y debe tener un toggle donde se muestre la fragilidad del paquete. */}
            {codeWhisperer ?
                <div>
                    <h1>Editar paquete</h1>
                    <form>
                        <label>Anchura</label>
                        <input type="number" value={width} onChange={(e) => setwidth(e.target.value)}></input>
                        <label>Altura</label>
                        <input type="number" value={height} onChange={(e) => setheight(e.target.value)}></input>
                        <label>Profundidad</label>
                        <input type="number" value={length} onChange={(e) => setlength(e.target.value)} />
                        <label>Peso</label>
                        <input type="number" value={weight} onChange={(e) => setweight(e.target.value)} />
                        <label>Volumen</label>
                        <input type="number" value={volume} onChange={(e) => setvolume(e.target.value)} />
                        <label>Fragilidad</label>
                        <input type="checkbox" value={fragility} onChange={(e) => setfragility(e.target.value)} />
                        <button onClick={applyChanges} >Aplicar cambios</button>
                        <button onClick={() => navigate(-1)} >Volver</button>
                    </form>
                </div>
                : null
            }
        </div>
    );
}