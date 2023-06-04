import './Signup.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// Componente que muestra el formulario de registro.
export default function Signup(props) {
    const [name, setname] = useState("");
    const [first_surname, setfirst_surname] = useState("");
    const [second_surname, setsecond_surname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [dni, setdni] = useState("");
    const [address, setaddress] = useState("");
    const [postcode, setpostcode] = useState("");
    const [password, setpassword] = useState("");
    const [alert, setalert] = useState("");
    
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que permite registrarse en la web. Tiene que cumplir todos los validadores y no estar registrado ya. En caso contrario, muestra un mensaje de error.
    //En caso de que se cumplan todos los validadores, se añade el nuevo cliente a la base de datos y se redirige al usuario a la página de login.
    const signup = () => {
        if (props.customer_table.find(customer => customer.Email === email || customer.Customer_Id === dni)) {
            setalert("El email o el DNI introducido ya está registrado.")
        }
        else if(verifyName() && verifyFirstSurname() && verifySecondSurname() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPostcode() && verifyPasswordCopilot()){
            const new_customer = [name + " " + first_surname + " " + second_surname, email, dni, phone, address + ", " + postcode, password, '']
            props.sendEmail(email, "Bienvenido a Just a Second", "<h4>¡Bienvenido/a a Just a Second!</h4> <br></br> Gracias por registrarte en nuestra web. Esperamos que disfrutes de tu experiencia con nosotros. <br></br> ¡Un saludo!")
            props.addNewCustomer(new_customer, password, dni)
            props.setrelogin(true)
            navigate("/iniciar-sesion");
        }
        else{
            setalert("Alguno de los campos introducidos no es válido.")
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que permite registrarse en la web. Tiene que cumplir todos los validadores y no estar registrado ya. En caso contrario, muestra un mensaje de error.
    //En caso de que se cumplan todos los validadores, se añade el nuevo cliente a la base de datos del puerto 8000, a customer_table y se redirige al usuario a la página de login.
    const signupCopilot = () => {
        if (verifyName() && verifyFirstSurname() && verifySecondSurname() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPostcode() && verifyPasswordCopilot()) {
            if (props.customers.find(customer => customer.email == email)) {
                setalert("El email introducido ya está registrado.")
            }
            else {
                fetch("http://localhost:8000/customer_table", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        first_surname: first_surname,
                        second_surname: second_surname,
                        email: email,
                        phone: phone,
                        dni: dni,
                        address: address,
                        postcode: postcode,
                        password: password
                    })
                })
                navigate("/login")
            }
        }
        else {
            setalert("Alguno de los campos introducidos no es válido.")
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que permite registrarse en la web. Tiene que cumplir todos los validadores y no estar registrado ya. En caso contrario, muestra un mensaje de error.
    //En caso de que se cumplan todos los validadores, se añade el nuevo cliente a la base de datos del puerto 8000, a customer_table y se redirige al usuario a la página de login.
    const signupCodeWhisperer = () => {
        if(verifyName() && verifyFirstSurname() && verifySecondSurname() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPostcode() && verifyPasswordCopilot() && !props.verifyEmail(email)){
            props.addCustomer(name, first_surname, second_surname, email, phone, dni, address, postcode, password);
            navigate("/login");
        }
        else{
            setalert("Error: Email ya registrado o datos no válidos.");
        }
    
    }

    // Función que verifica que el nombre introducido es válido.
    const verifyName = () => {
        if(name == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el primer apellido introducido es válido.
    const verifyFirstSurname = () => {
        if(first_surname == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el segundo apellido introducido es válido.
    const verifySecondSurname = () => {
        if(second_surname == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que verifica que el email introducido es válido.
    const verifyEmailCopilot = () => {
        if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que verifica que el email introducido es válido.
    const verifyEmailCodeWhisperer = () => {
        if (email.includes('@') && email.includes('.')) {
            return true
        }
        else {
            return false
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el teléfono está relleno correctamente.
    const verifyPhoneCopilot = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el teléfono está relleno correctamente.
    const verifyPhoneCodeWhisperer = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el NIF/CIF/NIE del empleado está relleno correctamente.
    const verifyDNICopilot = () => {
        if (!dni.match(/^[0-9]{8}[A-Z]$/) && !dni.match(/^[A-Z]{1}[0-9]{8}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el NIF/CIF/NIE del empleado está relleno correctamente.
    const verifyDNICodeWhisperer = () => {
        if (!dni.match(/^[0-9]{8}[A-Z]$/)) {
            return false
        }
        else {
            return true
        }
    
    }

    // Función que verifica que la dirección introducida es válida.
    const verifyAddress = () => {
        if(address == ""){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que verifica que el código postal introducido es válido.
    const verifyPostcode = () => {
        if (!postcode.match(/^[0-9]{5}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que verifica que la contraseña introducida es válida. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
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
    // Función que verifica que la contraseña introducida es válida. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    const verifyPasswordCodeWhisperer = () => {
        if (password.length >= 8 && password.length <= 20 && !password.includes(' ') && !password.match(/[^a-zA-Z0-9]/)) {
            return true
        }
        else {
            return false
        }
    }   

    return(
        <div className="Signup">
            <div id="signup_title">
                <h1>Registrarse</h1>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div id="signup_alert">
                            {alert ? 
                            <div className="alert">
                                <Alert key="primary" variant="primary">
                                    {alert}
                                </Alert>
                            </div> 
                            : null}
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='signup_inputs_Name'>
                            <FloatingLabel controlId="floatingInputName" label="Nombre *" className="mb-3" onChange={(e) => {setname(e.target.value)}}>
                                <Form.Control type="text" placeholder="Nombre *" value={name}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='signup_inputs_FirstSurname'>
                            <FloatingLabel controlId="floatingInputFirstSurname" label="Primer apellido *" className="mb-3" onChange={(e) => {setfirst_surname(e.target.value)}}>
                                <Form.Control type="text" placeholder="Primer apellido *" value={first_surname}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='signup_inputs_SecondSurname'>
                            <FloatingLabel controlId="floatingInputSecondSurname" label="Segundo apellido *" className="mb-3" onChange={(e) => {setsecond_surname(e.target.value)}}>
                                <Form.Control type="text" placeholder="Segundo apellido *" value={second_surname}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='signup_inputs_Email'>
                            <FloatingLabel controlId="floatingInputEmail" label="Correo electrónico *" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                                <Form.Control type="email" placeholder="Correo electrónico *" value={email}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='signup_inputs_Phone'>
                            <FloatingLabel controlId="floatingInputPhone" label="Teléfono *" className="mb-3" onChange={(e) => {setphone(e.target.value)}}>
                                <Form.Control type="number" placeholder="Teléfono *" value={phone}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='signup_inputs_DNI'>
                            <FloatingLabel controlId="floatingInputDNI" label="NIF/CIF/NIE *" className="mb-3" onChange={(e) => {setdni(e.target.value)}}>
                                <Form.Control type="text" placeholder="NIF/CIF/NIE *" value={dni}/>  
                                <Form.Text className="HelpBlock">
                                    Introduce tu DNI o NIE. En caso de ser una empresa, introduce el CIF.
                                </Form.Text>
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='signup_inputs_Address'>
                            <FloatingLabel controlId="floatingInputAddress" label="Dirección *" className="mb-3" onChange={(e) => {setaddress(e.target.value)}}>
                                <Form.Control type="text" placeholder="Dirección *" value={address}/>  
                                <Form.Text className="HelpBlock">
                                    Introduce la dirección de tu domicilio.
                                </Form.Text>
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='signup_inputs_PostCode'>
                            <FloatingLabel controlId="floatingInputPostCode" label="Código postal *" className="mb-3" onChange={(e) => {setpostcode(e.target.value)}}>
                                <Form.Control type="number" placeholder="Código postal *" value={postcode}/>  
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='col-12'>
                        <FloatingLabel controlId="floatingPassword" label="Contraseña *" className="mb-3" onChange={(e) => {setpassword(e.target.value)}}>
                            <Form.Control type="password" placeholder="Contraseña *" value={password}/>
                            <Form.Text className="HelpBlock">
                                Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
                            </Form.Text>
                        </FloatingLabel>
                    </div>
                    <div className='col-12'>
                        <div className='signup_inputs_Button'>
                            <Button variant="secondary" type="submit" size="lg" onClick={() => signup()}>Registrarse</Button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='row align-content-center'>
                        <div className='col-6'>
                            <div className='login_signup'>
                                <p>¿Ya tienes una cuenta?</p>
                            </div>      
                        </div>
                        <div className='col-6'>
                            <div className='login_signup_button'>
                                <Button variant="primary" id="login_signup_button" onClick={() => navigate("/iniciar-sesion")}>Inicia sesión</Button>
                            </div>
                        </div>              
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Signup.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de registro de la aplicación. */}
                {/* Dicha vista debe tener los campos de nombre, primer apellido, segundo apellido, email, teléfono, identificador personal, dirección, código postal y contraseña, con sus respectivos verificadores. */}
                {/* Debe tener un botón de registro y uno de iniciar sesión para ir al login */}
            {copilot ?
                <div>
                    <h1>Registro</h1>
                    <div className="SignupForm">
                        <div className="SignupFormName">
                            <label>Nombre</label>
                            <input type="text" placeholder="Nombre" onChange={(e) => setname(e.target.value)}></input>
                            {verifyName() ? <p></p> : <p>Nombre no válido</p>}
                        </div>
                        <div className="SignupFormFirstSurname">
                            <label>Primer apellido</label>
                            <input type="text" placeholder="Primer apellido" onChange={(e) => setfirst_surname(e.target.value)}></input>
                            {verifyFirstSurname() ? <p></p> : <p>Primer apellido no válido</p>}
                        </div>
                        <div className="SignupFormSecondSurname">
                            <label>Segundo apellido</label>
                            <input type="text" placeholder="Segundo apellido" onChange={(e) => setsecond_surname(e.target.value)}></input>
                            {verifySecondSurname() ? <p></p> : <p>Segundo apellido no válido</p>}
                        </div>
                        <div className="SignupFormEmail">
                            <label>Email</label>
                            <input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)}></input>
                            {verifyEmailCopilot() ? <p></p> : <p>Email no válido</p>}
                        </div>
                        <div className="SignupFormPhone">
                            <label>Teléfono</label>
                            <input type="text" placeholder="Teléfono" onChange={(e) => setphone(e.target.value)}></input>
                            {verifyPhoneCopilot() ? <p></p> : <p>Teléfono no válido</p>}
                        </div>
                        <div className="SignupFormDNI">
                            <label>NIF/CIF/NIE</label>
                            <input type="text" placeholder="NIF/CIF/NIE" onChange={(e) => setdni(e.target.value)}></input>
                            {verifyDNICopilot() ? <p></p> : <p>NIF/CIF/NIE no válido</p>}
                        </div>
                        <div className="SignupFormAddress">
                            <label>Dirección</label>
                            <input type="text" placeholder="Dirección" onChange={(e) => setaddress(e.target.value)}></input>
                            {verifyAddress() ? <p></p> : <p>Dirección no válida</p>}
                        </div>
                        <div className="SignupFormPostcode">
                            <label>Código postal</label>
                            <input type="text" placeholder="Código postal" onChange={(e) => setpostcode(e.target.value)}></input>
                            {verifyPostcode() ? <p></p> : <p>Código postal no válido</p>}
                        </div>
                        <div className="SignupFormPassword">
                            <label>Contraseña</label>
                            <input type="password" placeholder="Contraseña" onChange={(e) => setpassword(e.target.value)}></input>
                            {verifyPasswordCopilot() ? <p></p> : <p>Contraseña no válida</p>}
                        </div>
                        <div className="SignupFormButton">
                            <button onClick={() => {if(verifyName() && verifyFirstSurname() && verifySecondSurname() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPostcode() && verifyPasswordCopilot()){alert("Registro completado con éxito")} else {alert("Registro no completado")}}}>Registrarse</button>
                        </div>
                        <div className="SignupFormLogin">
                            <button onClick={() => navigate('/login')}>Iniciar sesión</button>
                        </div>
                    </div>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Signup.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de registro de la aplicación. */}
                {/* Dicha vista debe tener los campos de nombre, primer apellido, segundo apellido, email, teléfono, identificador personal, dirección, código postal y contraseña, con sus respectivos verificadores. */}
                {/* Debe tener un botón de registro y uno de iniciar sesión para ir al login */}
            {codeWhisperer ?
                <div>
                    <div className="Signup-form">
                        <h1>Registro</h1>
                        <form>
                            <label>Nombre</label> 
                            <input type="text" value={name} onChange={e => setname(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>Primer apellido</label>
                            <input type="text" value={first_surname} onChange={e => setfirst_surname(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>Segundo apellido</label>
                            <input type="text" value={second_surname} onChange={e => setsecond_surname(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>Email</label>
                            <input type="text" value={email} onChange={e => setemail(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>Teléfono</label>
                            <input type="text" value={phone} onChange={e => setphone(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>DNI</label>
                            <input type="text" value={dni} onChange={e => setdni(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>Dirección</label>
                            <input type="text" value={address} onChange={e => setaddress(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>Código postal</label>
                            <input type="text" value={postcode} onChange={e => setpostcode(e.target.value)}/>
                            <br/>
                            <br/>
                            <label>Contraseña</label>
                            <input type="password" value={password} onChange={e => setpassword(e.target.value)}/>
                            <br/>
                            <br/>
                            <button onClick={signup}>Registrarse</button>
                        </form>
                        <br/>
                        <br/>
                        <button onClick={() => navigate('/login')}>Iniciar sesión</button>
                    </div>
                </div>
                : null    
            }
        </div>
    );
}