import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// Componente que permite al usuario iniciar sesión en la aplicación.
export default function Login(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [alert, setalert] = useState(false);

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;
    
    // Función que se ejecuta al iniciar el componente. Limpia los intentos de inicio de sesión de los empleados.
    useEffect(() => {
        props.clearEmployeesPasswordsTries()
    }, [])
    
    // Función que verifica que el usuario y la contraseña introducidos son correctos. Además, comprueba que el email y la contraseña introducidos son válidos.
    // Si el usuario y la contraseña son correctos, se redirige al usuario a la página principal de la aplicación y seleciona el empleado. En caso contrario muestra un mensaje de error.
    const verify = async () => {
        if (email === '' || password === '') {
            setalert(true); 
        }
        else if (props.employee_table.find(employee => employee.Email === email) && verifyEmailCopilot() && verifyPasswordCopilot()) {
            const selected_employee = props.employee_table.find(employee => employee.Email === email)
            const employee_loged = await props.setemployee_Password_Try(selected_employee.Id, password)
            if(employee_loged.length > 0 && selected_employee.Active == 1){
                props.selectEmployee(selected_employee)
                navigate('/main')
            }
            else {
                setalert(true)
                setpassword('')
            }
        }
        else{
            setalert(true)
            setpassword('')
        }
    }
    
    // Función realizada por GitHub Copilot.
    // Función que comprueba que un empleado de employee_table tiene el password correcto. En caso contrario activa el estado alert, y en caso de que el password sea correcto, navega a /main_view.
    //Manda a la base de datos el campo Password_Try con el password introducido por el usuario, tras esto lo compara en la base de datos con el valor del campo Password de employee_table.
    //Para ello tiene que validar que el email introducido es válido y que la contraseña introducida es válida.
    const verifyCopilot = () => {
        if (verifyEmailCopilot()) {
            if (verifyPasswordCopilot()) {
                props.setEmployeePasswordTry(email, password)
                props.employee_table.map((employee) => {
                    if (employee.Email === email) {
                        if (employee.Password === password) {
                            props.setEmployeePasswordTry(email, '')
                            props.setEmployeeSelected(employee)
                            navigate('/main_view')
                        }
                        else {
                            props.setEmployeePasswordTry(email, '')
                            setalert(true)
                        }
                    }
                })
            }  
            else {
                setalert(true)
            }
        }
        else {
            setalert(true)
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que un empleado de employee_table tiene el password correcto. En caso contrario activa el estado alert, y en caso de que el password sea correcto, navega a /main_view.
    //Manda a la base de datos el campo Password_Try con el password introducido por el usuario, tras esto lo compara en la base de datos con el valor del campo Password de employee_table.
    //Para ello tiene que validar que el email introducido es válido y que la contraseña introducida es válida.
    const verifyCodeWhisperer = () => {
        if (!verifyEmailCodeWhisperer()) {
            setalert(true)
        }
        else if (!verifyPasswordCodeWhisperer()) {
            setalert(true)
        }
        else {
            props.verifyPassword(email, password)
                .then(res => {
                    if (res.data.password_try === res.data.password) {
                        navigate('/main_view')
                    }
                    else {
                        setalert(true)
                    }
                })
        }
    }

    // Función realizada por Code GPT.
    // Función de flecha que comprueba que un empleado de employee_table tiene el password correcto. En caso contrario activa el estado alert, y en caso de que el password sea correcto, navega a /main_view.
    //Manda a la base de datos del puerto 8000 el campo Password_Try con el password introducido por el usuario, tras esto lo compara en la base de datos con el valor del campo Password de employee_table.
    //Para ello tiene que validar que el email introducido es válido y que la contraseña introducida es válida.
    // const verifyCodeGPT = (e) => {
    //     e.preventDefault();
    
    //     if (this.validateEmail(this.state.email)) {
    //         if (this.validatePassword(this.state.password)) {
    //             fetch('http://localhost:8000/employee_table/login', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ password_try: this.state.password }),
    //             })
    //             .then((response) => response.json()) // response.text() si es texto plano, response.json() si es json, response.blob() si es blob, etc...
    //             .then((data) => { // data será lo que devuelva el servidor tras la petición POST, en este caso un json con el campo "result" y su valor "ok" o "error" dependiendo de si se ha podido insertar o no el registro en la base de datos
        
    //                 if (data === true) { // Si el servidor devuelve true significa que la contraseña introducida por el usuario coincide con la contraseña almacenada en employee_table para el email introducido por el usuario
        
    //                 this.setState({ alert: false }); // Desactivamos el estado alert para que desaparezca del DOM cualquier mensaje de error anteriormente mostrado
        
    //                 this.props.history.push('/main_view'); // Navegamos a /main_view tras comprobar que los datos introducidos son correctos
        
    //                 } else { // Si no se ha podido insertar en la base de datos porque ya existía un registro con ese email o porque ha habido algún error al hacer la petición POST al servidor
        
    //                 this.setState({ alert: true }); // Activamos el estado alert para que aparezca en pantalla un mensaje de error indicando que los datos introducidos no son correctos
        
    //                 }
        
    //             });
    //         }
    //         else{
    //             this.setState({ alert: true });
    //         }
    //     }
    //     else{
    //         this.setState({ alert: true });
    //     }
    // }
        
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
        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Code GPT.
    // Función de flecha que verifica que la contraseña introducida es válida. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    // const validPasswordCodeGPT = (password) => {
    //     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password);
    // }

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
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Función realizada por CodeGPT.
    // Función de flecha que verifica que el email introducido es válido.
    // const validEmailCodeGPT = (email) => {
    //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    // }

    return (
        <div className="login">
            <div className="login_alert">
                {alert ? 
                <div className="alert">
                    <Alert key="primary" variant="primary">
                        Correo electrónico o contraseña incorrectos.
                    </Alert>
                </div> 
                : null}
            </div>
            <div className="login_container">
                <h1 className="login_text">Iniciar sesión</h1> 
                <div className="login_input">
                    <FloatingLabel controlId="floatingInput" label="Correo electrónico" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                        <Form.Control type="email" placeholder="Correo electrónico" value={email}/>  
                    </FloatingLabel>
                </div>
                <div className="login_input">
                    <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3" onChange={(e) => {setpassword(e.target.value)}}>
                        <Form.Control type="password" placeholder="Contraseña" value={password}/>
                        <div className='verifyPasswordCopilot'>
                            {!verifyPasswordCopilot() && (password !== "" || alert) ?
                            <div> 
                                <Form.Text id="passwordHelpBlock">
                                    Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
                                </Form.Text>
                            </div>
                            : null
                            }
                        </div>
                    </FloatingLabel>
                </div>
                <div className="login_button">
                    <Button variant="secondary" onClick={() => verify()}>Iniciar sesión</Button>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Login.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de login de la aplicación. */}
                {/* Debe haber un formulario, por el que el usuario pueda introducir su email y contraseña e iniciar sesión mediante un botón. En el caso de que los datos introducidos sean erróneos se muestra una alerta en pantalla. */}
            {copilot ?
                <div className="login_container">
                    <div className="login_title">
                        <h1>Inicio de sesión</h1>
                    </div>
                    <div className="login_form">
                        <form onSubmit={verifyCopilot}>
                            <div className="login_form_email">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Introduce tu email" value={email} onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div className="login_form_password">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" id="password" name="password" placeholder="Introduce tu contraseña" value={password} onChange={(e) => setpassword(e.target.value)} />
                            </div>
                            <div className="login_form_button">
                                <button type="submit">Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                    <div className="login_alert">
                        {alert ?
                            <div className="login_alert_message">
                                <p>El email o la contraseña introducidos no son correctos.</p>
                            </div>
                        : null
                        }
                    </div>
                </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Login.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de login de la aplicación. */}
                {/* Debe haber un formulario, por el que el usuario pueda introducir su email y contraseña e iniciar sesión mediante un botón. En el caso de que los datos introducidos sean erróneos se muestra una alerta en pantalla. */}
            {codeWhisperer ?
                <div className="login-form">
                    <form onSubmit={verifyCodeWhisperer}>
                        <label>Email</label>
                        <input type="text" name="email" onChange={({target}) => setemail(target.value)}/>
                        <label>Password</label>
                        <input type="password" name="password" onChange={({target}) => setpassword(target.value)}/>
                        <button>Login</button>
                    </form>
                    {alert ?
                        <div className="alert">
                            <p>Email or password is incorrect</p>
                        </div>
                    :  null
                    }
                </div>
            : null
            }
        </div>    
    );
}