import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// Componente que permite al usuario iniciar sesión en la aplicación.
export default function Login(props) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [alert_login, setalert_login] = useState(false);

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que se ejecuta al iniciar el componente. Limpia los intentos de inicio de sesión de los clientes.
    useEffect(() => {
        props.clearCustomersPasswordsTries()
    }, [])

    // Función que verifica que el usuario y la contraseña introducidos son correctos. Además, comprueba que el email y la contraseña introducidos son válidos.
    //Si el usuario y la contraseña son correctos, inicia sesión con el perfil determinado y redirige al usuario a la página principal. En caso contrario muestra un mensaje de error.
    const verify = async () => {
        if (email === '' || password === '') {
            setalert_login(true); 
        }
        else if (props.customer_table.find(customer => customer.Email === email) && verifyEmailCopilot() && verifyPasswordCopilot()) {
            const selected_customer = props.customer_table.find(customer => customer.Email === email)
            const customer_loged = await props.setcustomer_Password_Try(selected_customer.Id, password)
            if(customer_loged?.length > 0){
                props.selectCustomer(selected_customer)
                props.setrelogin(false)
                navigate('/')
            }
            else {
                setalert_login(true)
                setpassword('')
            }
        }
        else{
            setalert_login(true)
            setpassword('')
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que verifica que el usuario y la contraseña introducidos son correctos. Además, comprueba que el email y la contraseña introducidos son válidos.
    //Si el usuario y la contraseña son correctos, inicia sesión con el perfil determinado y redirige al usuario a la página principal. En caso contrario muestra un mensaje de error.
    const verifyCopilot = async () => {
        if (verifyEmailCopilot() && verifyPasswordCopilot()) {
            if (props.customer_table.find(customer => customer.Email == email && customer.Password == password)) {
                props.loginCustomer(props.customer_table.find(customer => customer.Email == email).Customer_Id)
                props.loginCustomerProfile(props.customer_table.find(customer => customer.Email == email).Profile_Id)
                navigate('/')
            }
            else {
                setalert_login(true)
            }
        }
        else {
            setalert_login(true)
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que verifica que el usuario y la contraseña introducidos son correctos. Además, comprueba que el email y la contraseña introducidos son válidos.
    //Si el usuario y la contraseña son correctos, inicia sesión con el perfil determinado y redirige al usuario a la página principal. En caso contrario muestra un mensaje de error.
    const verifyCodeWhisperer = () => {
        if (verifyEmailCopilot() && verifyPasswordCopilot()) {
            if (props.customers.includes(email)) {
                if (props.customersPasswordsTries[email] < 3) {
                    if (props.customersPasswords[email] === password) {
                        props.setCustomer(email)
                        navigate("/customer")
                    }
                    else {
                        props.customersPasswordsTries[email] += 1
                        setalert_login(true)
                    }
                }
                else {
                    setalert_login(true)
                }
            }
            else {
                setalert_login(true)
            }
        }
        else {
            setalert_login(true)
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
    // Función que verifica que la contraseña introducida es válida. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    const verifyPasswordCopilot = () => {
        if (password?.length < 8) {
            return false
        }
        else if (password?.length > 20) {
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
        if (password?.length >= 8 && password?.length <= 20 && !password.includes(' ') && !password.match(/[^a-zA-Z0-9]/)) {
            return true
        }
        else {
            return false
        }
    }   

    // Función que permite al usuario recuperar su contraseña a través de un correo electrónico.
    const forgotPassword = () => {
        if(props.customer_table?.find(customer => customer.Email == email)){
            let new_password = generatePassword()
            props.sendEmail(email, "Recuperación de contraseña", "Se ha solicitado la recuperación de la contraseña de su cuenta. <br></br> Su nueva contraseña es la siguiente: "+ new_password +" <br></br> <b>Recuerde cambiarla en su perfil una vez haya iniciado sesión.</b> <br></br> <br></br> Atentamente, <br></br> El equipo de Just a Second.");
            props.cifrateNewCustomerPassword(new_password, props.customer_table.find(customer => customer.Email == email).Customer_Id);
            alert("Se ha enviado un correo electrónico a su cuenta con su nueva contraseña.");
        } else {
            alert("El correo electrónico introducido no está asociado a ninguna cuenta.");
        }
    }

    // Función que genera una contraseña aleatoria.
    const generatePassword = () => {
        const password = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)+1;
        return password
    }

    // Función realizada por GitHub Copilot.
    // Función que genera una contraseña aleatoria.
    const generatePasswordCopilot = () => {
        const password = Math.random().toString(36).slice(-8);
        return password
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que genera una contraseña aleatoria.
    const generatePasswordCodeWhisperer = () => {
        let password = ""
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (let i = 0; i < 8; i++) {
            password += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return password
    }

    return(
        <div className="Login">
            <div className='login_title'>
                <h1>Iniciar sesión</h1>
            </div>
            {props.relogin ?
            <div className='login_alert_relogin'>
                <Alert key="secondary" variant="secondary">
                    Por favor inicia sesión para terminar el proceso de registro.
                </Alert>
            </div>: null
            }
            <div className='login_inputs'>
                <FloatingLabel controlId="floatingInputEmail" label="Correo electrónico" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                    <Form.Control type="email" placeholder="Correo electrónico" value={email}/>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3" onChange={(e) => {setpassword(e.target.value)}}>
                    <Form.Control type="password" placeholder="Contraseña" value={password}/>
                    <div className='verifyPasswordCopilot'>
                        <Form.Text id="passwordHelpBlock">
                            Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
                        </Form.Text>
                    </div>
                </FloatingLabel>
            </div>
            <div className="login_button">
                <Button variant="secondary" size="lg" onClick={() => verify()}>Iniciar sesión</Button>
            </div>
            <div className="login_forgot_password">
                <Button variant="link" onClick={() => forgotPassword()}>¿Has olvidado tu contraseña?</Button>
                <br></br>
                <Form.Text id="login_forgot_password_text">
                    Si has olvidado tu contraseña, puedes recuperarla. Para ello introduce tu correo electrónico y te enviaremos una nueva contraseña.
                </Form.Text>
            </div>
            <div className="login_alert">
                {alert_login ? 
                <div className="alert">
                    <Alert key="primary" variant="primary">
                        Correo electrónico o contraseña incorrectos.
                    </Alert>
                </div> 
                : null}
            </div>
            <hr className='hr_separator_login'></hr>
            <div className='login_title_signup'>
                <h4>¿No tienes cuenta?</h4>
            </div>
            <div className='login_description_signup'>
                <h6>No pierdas tiempo, ¡Regístrate!</h6>
            </div>
            <div className='login_button_signup'>
                <Button variant="secondary" id="login_signup" onClick={() => navigate('/registrarse')}>Registrarse</Button>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Login.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de login de la aplicación. */}
                {/* Debe haber un formulario, por el que el usuario pueda introducir su email y contraseña e iniciar sesión mediante un botón. En el caso de que los datos introducidos sean erróneos se muestra una alerta en pantalla. */}
                {/* Además, debe tener un botón de registrar que envíe al usuario a la vista de registro y un botón de olvidar contraseña. */}
                {/* Dicho html debe estar hecho usando los componentes de bootstrap */}
            {copilot ?
                <div>
                    <h1 className="text-center">Iniciar sesión</h1>
                    <form className="text-center">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Introduce tu email" onChange={(e) => setemail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Contraseña</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Introduce tu contraseña" onChange={(e) => setpassword(e.target.value)}></input>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => verifyCopilot()}>Iniciar sesión</button>
                        <button type="button" className="btn btn-primary" onClick={() => navigate("/register")}>Registrarse</button>
                        <button type="button" className="btn btn-primary" onClick={() => forgotPassword()}>¿Olvidaste tu contraseña?</button>
                    </form>
                    {alert_login ?
                        <div className="alert alert-danger" role="alert">
                            Email o contraseña incorrectos.
                        </div>
                        : null
                    }
                </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Login.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de login de la aplicación. */}
                {/* Debe haber un formulario, por el que el usuario pueda introducir su email y contraseña e iniciar sesión mediante un botón. En el caso de que los datos introducidos sean erróneos se muestra una alerta en pantalla. */}
                {/* Además, debe tener un botón de registrar que envíe al usuario a la vista de registro y un botón de olvidar contraseña.*/}
                {/* Dicho html debe estar hecho usando los componentes de bootstrap */}
            {codeWhisperer ?
                <div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={e => setemail(e.target.value)}/>
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setpassword(e.target.value)}/>
                        <button className="btn btn-primary" onClick={verifyCodeWhisperer}>Login</button>
                        <button className="btn btn-primary" onClick={forgotPassword}>Forgot Password</button>
                        <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
                    </div>
                    {alert_login ? 
                        <div className="alert alert-danger" role="alert">
                            Invalid email or password
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    :  null
                    }
                </div>
            : null
            }
        </div>
    );
}