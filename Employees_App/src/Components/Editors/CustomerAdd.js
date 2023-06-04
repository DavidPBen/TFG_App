import './CustomerAdd.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Componente que renderiza el formulario para añadir un nuevo cliente.
export default function CustomerAdd(props) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [customer_Id, setcustomer_Id] = useState('');
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');
    const [password, setpassword] = useState('');

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que añade un nuevo cliente a la base de datos.
    const addCustomer = () => {
        if (props.customer_table.find(customer => customer.Email === email || customer.Customer_Id === customer_Id)) {
            alert('El cliente ya existe')
        }
        else{
            const fields = [name, email, customer_Id, phone, address, password, '']
            props.addNewCustomer(fields, password, customer_Id)
            navigate(-1)
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que añade un nuevo cliente a la base de datos. En caso de que el cliente ya exista, muestra un mensaje de error.
    const addCustomerCopilot = () => {
        if (props.customer_table.find(customer => customer.Email === email)) {
            alert('Customer already exists')
        }
        else {
            props.addCustomer(name, email, customer_Id, phone, address, password)
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que añade un nuevo cliente a la base de datos con el puerto 8000. En caso de que el cliente ya exista, muestra un mensaje de error.
    const addCustomerCodeWhisperer = () => {
        fetch('http://localhost:8000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                customer_Id: customer_Id,
                phone: phone,
                address: address,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    alert('Customer added successfully')
                    navigate('/customers')
                }
            })
            .catch(error => {
                alert(error)
            }
        )
    }
    
    // Función que comprueba que todos los campos del formulario están rellenos correctamente. En caso contrario, muestra una alerta.
    const verify = () => {
        if (verifyName() && verifyEmailCopilot() && verifyIdCopilot() && verifyPhoneCopilot() && verifyAddress() && verifyPasswordCopilot()) {
            addCustomer()
        }
        else {
            alert('Por favor, rellene todos los campos correctamente')
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que todos los campos del formulario están rellenos correctamente. En caso contrario, muestra una alerta.
    const verifyFormCopilot = () => {
        if (name === '' || !email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) || !customer_Id.match(/^[0-9]{8}[A-Z]$/) && !customer_Id.match(/^[A-Z]{1}[0-9]{8}$/) || !phone.match(/^[0-9]{9}$/) || address === '') {
            alert('Please fill in all fields correctly')
        }
        else {
            addCustomer()
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que todos los campos del formulario están rellenos correctamente. En caso contrario, muestra una alerta.
    const verifyFormCodeWhisperer = () => {
        if (name === '' || email === '' || customer_Id === '' || phone === '' || address === '' || password === '') {
            alert('Please fill all the fields')
        }
        else {
            addCustomerCodeWhisperer()
        }
    }

    // Función que comprueba que el nombre del cliente está relleno correctamente.
    const verifyName = () => {
        if (name === '') {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el email del cliente está relleno correctamente.
    const verifyEmailCopilot = () => {
        if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el email del cliente está relleno correctamente.
    const verifyEmailCodeWhisperer = () => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el DNI/NIE del cliente está relleno correctamente.
    const verifyIdCopilot = () => {
        if (!customer_Id.match(/^[0-9]{8}[A-Z]$/) && !customer_Id.match(/^[A-Z]{1}[0-9]{8}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el DNI/NIE del cliente está relleno correctamente.
    const verifyIdCodeWhisperer = () => {
        if (!customer_Id.match(/^[0-9]{8}[A-Z]$/) && !customer_Id.match(/^[A-Z]{1}[0-9]{8}$/)) {
            return false
        }
        else {
            return true
        }
    }
    
    // Función realizada por GitHub Copilot.
    // Función que comprueba que el teléfono del cliente está relleno correctamente.
    const verifyPhoneCopilot = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    }


    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el teléfono del cliente está relleno correctamente.
    const verifyPhoneCodeWhisperer = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función que comprueba que la dirección del cliente está rellena correctamente.
    const verifyAddress = () => {
        if (address === '') {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que la contraseña del cliente está rellena correctamente. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    const verifyPasswordCopilot = () => {
        if (password.length < 8) {
            return false
        }
        else if (password.length > 20) {
            return false
        }
        else if (!password.match(/[a-z]/) && !password.match(/[A-Z]/)) {
            return false
        }
        else if (!password.match(/[0-9]/)) {
            return false
        }
        else if (password.match(/\s/)) {
            return false
        }
        else if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que la contraseña del cliente está rellena correctamente. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    const verifyPasswordCodeWhisperer = () => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return re.test(password);
    }

    return (
        <div className="CustomerAdd">
            <div className='CustomerAdd_title'>
                <h1>Añadir un nuevo cliente</h1>
            </div>
            <div className='CustomerAdd_form'>
                <FloatingLabel controlId="floatingName" label="Nombre *" className="mb-3" onChange={(e) => {setname(e.target.value)}}>
                    <Form.Control type="text" placeholder="Nombre" value={name}/>  
                    <Form.Text className='form_text'>
                        Nombre y apellidos o nombre de la empresa.
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Correo electrónico *" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                    <Form.Control type="email" placeholder="Correo electrónico" value={email}/>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingCustomer_Id" label="Identificador del cliente *" className="mb-3" onChange={(e) => {setcustomer_Id(e.target.value)}}>
                    <Form.Control type="text" placeholder="Identificador del cliente" value={customer_Id}/>
                    <Form.Text className='form_text'>
                        El identificador de cliente puede ser DNI, NIE o CIF.
                    </Form.Text>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingPhone" label="Teléfono *" className="mb-3" onChange={(e) => {setphone(e.target.value)}}>
                    <Form.Control type="number" placeholder="Teléfono" value={phone}/>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingAddress" label="Dirección *" className="mb-3" onChange={(e) => {setaddress(e.target.value)}}>
                    <Form.Control type="text" placeholder="Dirección" value={address}/>  
                    <Form.Text className='form_text'>
                        La dirección debe ser la calle, el número, la planta, la puerta y el código postal.
                    </Form.Text> 
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Contraseña *" className="mb-3" onChange={(e) => {setpassword(e.target.value)}}>
                    <Form.Control type="password" placeholder="Contraseña" value={password}/> 
                    <Form.Text className='form_text'>
                        La contraseña debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
                    </Form.Text> 
                </FloatingLabel>
            </div>
            <div className='CustomerAdd_buttons'>
                <div className='CustomerAdd_add'>
                    <Button variant="secondary" size='lg' onClick={() => verify()}>Añadir cliente</Button>
                </div>
                <div className='CustomerAdd_goBack'>
                    <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "CustomerAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo cliente. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo cliente, y dos botones: uno para añadir el cliente y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie/cif, teléfono, dirección y contraseña. */}
            {copilot ?
            <div>
                <h1>Add Customer</h1>
                <form>
                    <label>Name</label>
                    <input type="text" placeholder="Name" onChange={(e) => setname(e.target.value)}></input>
                    <label>Email</label>
                    <input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)}></input>
                    <label>Customer ID</label>
                    <input type="text" placeholder="Customer ID" onChange={(e) => setcustomer_Id(e.target.value)}></input>
                    <label>Phone</label>
                    <input type="text" placeholder="Phone" onChange={(e) => setphone(e.target.value)}></input>
                    <label>Address</label>
                    <input type="text" placeholder="Address" onChange={(e) => setaddress(e.target.value)}></input>
                    <label>Password</label>
                    <input type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)}></input>
                    <button type="submit" onClick={addCustomerCopilot}>Add Customer</button>
                    <button onClick={() => props.history.push('/customers')}>Back</button>
                </form>
            </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "CustomerAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo cliente. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo cliente, y dos botones: uno para añadir el cliente y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie/cif, teléfono, dirección y contraseña. */}
            {codeWhisperer ?
                <div>
                    <div className="form-container">
                        <form>
                            <label>Name</label>
                            <input type="text" name="name" onChange={props.handleChange} />
                            <br />
                            <label>Email</label>
                            <input type="text" name="email" onChange={props.handleChange} />
                            <br />
                            <label>Customer ID</label>
                            <input type="text" name="customer_Id" onChange={props.handleChange} />
                            <br />
                            <label>Phone</label>
                            <input type="text" name="phone" onChange={props.handleChange} />
                            <br />
                            <label>Address</label>
                            <input type="text" name="address" onChange={props.handleChange} />
                            <br />
                            <label>Password</label>
                            <input type="password" name="password" onChange={props.handleChange} />
                            <br />
                            <button onClick={verifyFormCodeWhisperer}>Add Customer</button>
                            <button onClick={props.handleBack}>Back</button>
                        </form>
                    </div>
                </div>
                : null
            }
        </div>
    );
}