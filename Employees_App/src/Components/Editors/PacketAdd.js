import './PacketAdd.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Componente que permite añadir un nuevo paquete a un pedido.
export default function PacketAdd(props) {
    let { Order_Id } = useParams();
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    const [weight, setweight] = useState('');
    const [width, setwidth] = useState('');
    const [height, setheight] = useState('');
    const [length, setlength] = useState('');
    const [volume, setvolume] = useState('');
    const [fragility, setfragility] = useState(false);

    // Función que añade un nuevo paquete a la base de datos.
    const addPackage = () => {
        const fields = {
            "Order_Id": Order_Id,
            "Weight": weight,
            "Width": width,
            "Height": height,
            "Length": length,
            "Volume": volume,
            "Fragility": fragility
        }
        props.addNewPackage(fields) 
    }

    // Función realizada por GitHub Copilot.
    // Función que añade un paquete en la base de datos, en la tabla de package_table. Para ello comprueba que todos los campos del formulario están rellenos correctamente.
    //En caso de que no estén rellenos correctamente, muestra una alerta. En caso contrario, añade el paquete a la base de datos y navega a la página anterior.
    const addPackageCopilot = () => {
        if (verifyWeight() && verifyWidth() && verifyHeight() && verifyLength() && verifyVolume()) {
            props.addPackage(Order_Id, weight, width, height, length, volume, fragility)
        }
        else {
            alert('Please fill all the fields correctly')
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que añade un paquete en la base de datos, en la tabla de package_table. Para ello comprueba que todos los campos del formulario están rellenos correctamente.
    //En caso de que no estén rellenos correctamente, muestra una alerta. En caso contrario, añade el paquete a la base de datos en el puerto 8000 y navega a la página anterior.
    const addPackageCodeWhisperer = () => {
        if (verifyWeight() && verifyWidth() && verifyHeight() && verifyLength() && verifyVolume()) {
            fetch('http://localhost:8000/addPackage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weight: weight,
                    width: width,
                    height: height,
                    length: length,
                    volume: volume,
                    fragility: fragility,
                    Order_Id: Order_Id
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            navigate(-1)
        }
        else {
            alert('Please fill all the fields correctly')
        }
    }

    // Función que verifica que todos los campos del formulario están rellenos correctamente. En caso contrario, muestra una alerta.
    const verify = () => {
        if (verifyWeight() && verifyWidth() && verifyHeight() && verifyLength() && verifyVolume()) {
            addPackage()
            navigate(-1)
        }
        else {
            if(weight > 50.00){
                alert('El peso máximo permitido es de 50 kg')
            }
            else{
                alert('Por favor, rellene todos los campos correctamente')
            }
        }
    }
    
    // Función que verifica que el peso está introducido correctamente.
    const verifyWeight = () => {
        if(weight < 0 || weight == '' || weight > 50.00){
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

    // Función que se ejecuta cada vez que cambia el valor de las dimensiones del paquete. Permite calcular el volumen y el peso del paquete.
    useEffect(() => {
        calculateVolume()
        calculateWeight()
    }, [width, height, length])

    // Función que calcula el volumen del paquete a partir de las dimensiones introducidas.
    const calculateVolume = () => {
        setvolume((width * height * length).toFixed(2))
    }

    // Función que calcula el peso del paquete a partir del volumen introducido. Utiliza la fórmula de peso volumétrico de Correos.
    const calculateWeight = () => {
        setweight((volume / 6000).toFixed(2))
    }

    // Función realizada por GitHub Copilot.
    //Función que permite calcular el volumen y el peso del paquete a partir de las dimensiones introducidas.
    const calculateVolumeWeightCopilot = () => {
        const volume = width * height * length;
        const weight = volume / 5000;
        setvolume(volume);
        setweight(weight);
    }

    // Función realizada por Amazon CodeWhisperer.
    //Función que permite calcular el volumen y el peso del paquete a partir de las dimensiones introducidas.
    const calculateVolumeWeightCodeWhisperer = () => {
        if (verifyWidth() && verifyHeight() && verifyLength()) {
            setvolume(width * height * length)
            setweight(width * height * length * 0.001)
        }
    }

    return (
        <div className="PacketAdd">
            <div className='PacketAdd_title'>
                <h1>Añadir un nuevo paquete</h1>
            </div>
            <div className='PacketAdd_form'>
                <div className='PacketAdd_Id'>
                    <h5>Id del pedido = {Order_Id}</h5>
                </div>
                <FloatingLabel controlId="floatingPacketWidth" label="Anchura *" className="mb-3" onChange={(e) => {setwidth(e.target.value)}}>
                    <Form.Control type="number" placeholder="Anchura" value={width}/>
                    <Form.Text className='form_text'>
                        La anchura debe de ponerse en centímetros.
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPacketHeight" label="Altura *" className="mb-3" onChange={(e) => {setheight(e.target.value)}}>
                    <Form.Control type="number" placeholder="Altura" value={height}/>
                    <Form.Text className='form_text'>
                        La altura debe de ponerse en centímetros.
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPacketLength" label="Profundidad *" className="mb-3" onChange={(e) => {setlength(e.target.value)}}>
                    <Form.Control type="number" placeholder="Profundidad" value={length}/>
                    <Form.Text className='form_text'>
                        La profundidad debe de ponerse en centímetros.
                    </Form.Text>
                </FloatingLabel>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-6'>
                            <p className='PacketAdd_volume_weight'>Volumen = <b>{volume}m<sup>3</sup></b></p>
                        </div>
                        <div className='col-6'>
                            <p className='PacketAdd_volume_weight'>Peso = <b>{weight}kg</b></p>
                        </div>
                    </div>
                </div>
                <h7>¿El paquete es frágil? </h7>
                <Button variant="outline-secondary" id="PacketAdd_fragility" onClick={() => setfragility(!fragility)}>{fragility ? 'Sí' : 'No'}</Button>
            </div>
            <div className='PacketAdd_buttons'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-6'>
                            <div className='PacketAdd_goBack'>
                                    <Button variant="secondary" size='lg' onClick={() => navigate(-1)}>Volver</Button>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='PacketAdd_add'>
                                <Button variant="secondary" size='lg' onClick={() => verify()}>Añadir</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "PacketAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo paquete. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo paquete, y dos botones: uno para añadir el paquete y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de anchura, altura y profundidad. Además, debe mostrar los valores calculados de peso y volumen y debe tener un toggle donde se muestre la fragilidad del paquete. */}
            {copilot ?
                <div>
                    <h1>Añadir un nuevo paquete</h1>
                    <form>
                        <label htmlFor="width">Anchura</label>
                        <input type="number" id="width" name="width" value={width} onChange={(e) => setwidth(e.target.value)} />
                        <label htmlFor="height">Altura</label>
                        <input type="number" id="height" name="height" value={height} onChange={(e) => setheight(e.target.value)} />
                        <label htmlFor="length">Profundidad</label>
                        <input type="number" id="length" name="length" value={length} onChange={(e) => setlength(e.target.value)} />
                        <label htmlFor="volume">Volumen</label>
                        <input type="number" id="volume" name="volume" value={volume} onChange={(e) => setvolume(e.target.value)} />
                        <label htmlFor="weight">Peso</label>
                        <input type="number" id="weight" name="weight" value={weight} onChange={(e) => setweight(e.target.value)} />
                        <label htmlFor="fragility">Fragilidad</label>
                        <input type="checkbox" id="fragility" name="fragility" value={fragility} onChange={(e) => setfragility(e.target.value)} />
                    </form>
                    <button onClick={() => verify()}>Añadir paquete</button>
                    <button onClick={() => navigate(-1)}>Volver</button>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "PacketAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo paquete. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo paquete, y dos botones: uno para añadir el paquete y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de anchura, altura y profundidad. Además, debe mostrar los valores calculados de peso y volumen y debe tener un toggle donde se muestre la fragilidad del paquete. */}
            {codeWhisperer ?
                <div>
                    <h1>Añadir un nuevo paquete</h1>
                    <form onSubmit={addPackageCodeWhisperer}>
                       <label htmlFor="width">Anchura</label>
                       <input type="number" id="width" value={width} onChange={(e) => setwidth(e.target.value)} />
                       <label htmlFor="height">Altura</label>
                       <input type="number" id="height" value={height} onChange={(e) => setheight(e.target.value)} />
                       <label htmlFor="length">Profundidad</label>
                       <input type="number" id="length" value={length} onChange={(e) => setlength(e.target.value)} />
                       <label htmlFor="volume">Volumen</label>
                       <input type="number" id="volume" value={volume} onChange={(e) => setvolume(e.target.value)} />
                       <label htmlFor="weight">Peso</label>
                       <input type="number" id="weight" value={weight} onChange={(e) => setweight(e.target.value)} />
                       <label htmlFor="fragility">Fragilidad</label>
                       <input type="checkbox" id="fragility" checked={fragility} onChange={(e) => setfragility(e.target.checked)} />
                       <button type="submit">Añadir paquete</button>
                       <button onClick={() => navigate(-1)}>Volver</button>
                    </form>
                </div>
                : null
            }
        </div>
    );
}