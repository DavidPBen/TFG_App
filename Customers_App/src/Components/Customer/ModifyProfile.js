import './ModifyProfile.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

// Componente que permite modificar los datos del cliente.
export default function ModifyProfile(props) {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [dni, setdni] = useState("");
    const [address, setaddress] = useState("");
    const [new_password, setnew_password] = useState("");
    const [confirm_new_password, setconfirm_new_password] = useState("");
    const [alert_fields, setalert_fields] = useState({message: "", show: false});

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    useEffect(() => {
        if(!props.customer_selected){
            return ;
        }
        else{
            setname(props.customer_selected.Name);
            setemail(props.customer_selected.Email);
            setphone(props.customer_selected.Phone);
            setdni(props.customer_selected.Customer_Id);
            setaddress(props.customer_selected.Address);
        }
    }, [props.customer_selected]);

    // Función que permite modificar datos en la web. Tiene que cumplir todos los validadores. En caso de que se cumplan todos los validadores se modifican los datos del cliente y se redirige al usuario a la página de inicio.
    const Modify = () => {
        var changes_accepted = true
        var changes_validated = false
        if(name !== props.customer_selected.Name){
            if(verifyName()){
                props.setCustomer(props.customer_selected.Id, 'Name', name)
                changes_validated = true
            }
            else{
                setalert_fields ({message:'Introduzca su nombre correctamente', show:true})
                changes_accepted = false
            }
        }
        if(email !== props.customer_selected.Email){
            if(verifyEmailCopilot()){
                props.setCustomer(props.customer_selected.Id, 'Email', email)
                changes_validated = true
            }
            else{
                setalert_fields ({message:'Introduzca su correo electrónico correctamente', show:true})
                changes_accepted = false
            }
        }
        if(dni !== props.customer_selected.Customer_Id){
            if(verifyDNICopilot()){
                props.setCustomer(props.customer_selected.Id, 'Customer_Id', dni)
                changes_validated = true
            }
            else{
                setalert_fields ({message:'Introduzca su identificador personal correctamente', show:true})
                changes_accepted = false
            }
        }
        if(phone !== props.customer_selected.Phone){
            if(verifyPhoneCopilot()){
                props.setCustomer(props.customer_selected.Id, 'Phone', phone)
                changes_validated = true
            }
            else{
                setalert_fields ({message:'Introduzca su teléfono correctamente', show:true})
                changes_accepted = false
            }
        }
        if(address !== props.customer_selected.Address){
            if(verifyAddress()){
                props.setCustomer(props.customer_selected.Id, 'Address', address)
                changes_validated = true
            }
            else{
                setalert_fields ({message:'Introduzca su dirección correctamente', show:true})
                changes_accepted = false
            }
        }
        if(new_password !== "" || confirm_new_password !== ""){
            if(verifyPasswordCopilot() && verifyConfirmPassword()){
                props.setCustomer(props.customer_selected.Id, 'Password', new_password)
                changes_validated = true
            }else{
                setalert_fields ({message:'Introduzca su contraseña correctamente', show:true})
                changes_accepted = false
            }
        }
        if(changes_accepted && changes_validated){
            setalert_fields ({message:'Datos modificados correctamente', show:true})
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que permite modificar datos en la web. Tiene que cumplir todos los validadores. En caso de que se cumplan todos los validadores se modifican los datos del cliente y se redirige al usuario a la página de inicio.
    //En caso contrario se muestra un mensaje de error.
    const ModifyCopilot = () => {
        if (verifyName() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPasswordCopilot() && verifyConfirmPassword()) {
            props.modifyCustomer(name, email, phone, dni, address, new_password);
            navigate("/");
        }
        else {
            setalert_fields({message: "Los datos introducidos no son válidos.", show: true});
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que permite modificar datos en la web. Tiene que cumplir todos los validadores. En caso de que se cumplan todos los validadores se modifican los datos del cliente y se redirige al usuario a la página de inicio.
    //En caso contrario se muestra un mensaje de error.
    const ModifyCodeWhisperer = () => {
        if (verifyName() && verifyEmailCopilot() && verifyPhoneCopilot() && verifyDNICopilot() && verifyAddress() && verifyPasswordCopilot()) {
            props.modifyCustomer(name, email, phone, dni, address, new_password);
            navigate("/");
        }
        else {
            setalert_fields({message: "Error en los datos introducidos", show: true});
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

    // Función realizada por GitHub Copilot.
    // Función que verifica que la contraseña introducida es válida. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    const verifyPasswordCopilot = () => {
        if (new_password.length < 8) {
            return false
        }
        else if (new_password.length > 20) {
            return false
        }
        else if (!new_password.match(/[a-z]/) && !new_password.match(/[A-Z]/)) {
            return false
        }
        else if (!new_password.match(/[0-9]/)) {
            return false
        }
        else if (new_password.match(/\s/)) {
            return false
        }
        else if (new_password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
            return false
        }
        else {
            return true
        }
    }   

    // Función realizada por Amazon CodeWhisperer.
    // Función que verifica que la contraseña introducida es válida. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    const verifyPasswordCodeWhisperer = () => {
        if (new_password.length >= 8 && new_password.length <= 20 && !new_password.includes(' ') && !new_password.match(/[^a-zA-Z0-9]/)) {
            return true
        }
        else {
            return false
        }
    }   

    // Función que verifica que la contraseña de confirmación introducida es válida.
    const verifyConfirmPassword = () => {
        if(confirm_new_password != new_password){
            return false;
        }
        else{
            return true;
        }
    }

    // Función que redirige a la página de login.
    const login = () => {
        navigate("/iniciar-sesion");
    }

    // Función que redirige a la página de registro.
    const signup = () => {
        navigate("/registrarse");
    }
    
    return (
        <div className="ModifyProfile">
            {   props.customer_selected ?
                <div className="modify_profile_loged">
                    <div className='container'>
                        <div className="row align-items-center">
                            <div className="col-12">
                                <h2 id="text_modifyprofile_loged">Modificar perfil</h2>
                            </div>
                            <div className='col-12'>
                                {alert_fields.show ? <Alert variant='primary' id="alert_modifyProfile">{alert_fields.message}</Alert> : null}
                            </div>
                            <div className="col-12">
                                <div className='modify_inputs_Name'>
                                    <FloatingLabel controlId="floatingInputName" label="Nombre" className="mb-3" onChange={(e) => {setname(e.target.value)}}>
                                        <Form.Control type="text" placeholder="Nombre" value={name}/>  
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='modify_inputs_Email'>
                                    <FloatingLabel controlId="floatingInputEmail" label="Correo electrónico" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                                        <Form.Control type="email" placeholder="Correo electrónico" value={email}/>  
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='modify_inputs_Phone'>
                                    <FloatingLabel controlId="floatingInputPhone" label="Teléfono" className="mb-3" onChange={(e) => {setphone(e.target.value)}}>
                                        <Form.Control type="number" placeholder="Teléfono" value={phone}/>  
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='modify_inputs_DNI'>
                                    <FloatingLabel controlId="floatingInputDNI" label="NIF/CIF/NIE" className="mb-3" onChange={(e) => {setdni(e.target.value)}}>
                                        <Form.Control type="text" placeholder="NIF/CIF/NIE" value={dni}/>  
                                        <Form.Text className="HelpBlock">
                                            Introduce tu DNI o NIE. En caso de ser una empresa, introduce el CIF.
                                        </Form.Text>
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='modify_inputs_Address'>
                                    <FloatingLabel controlId="floatingInputAddress" label="Dirección" className="mb-3" onChange={(e) => {setaddress(e.target.value)}}>
                                        <Form.Control type="text" placeholder="Dirección" value={address}/>  
                                        <Form.Text className="HelpBlock">
                                            Introduce la dirección de tu domicilio. Recuerda poner el código postal.
                                        </Form.Text>
                                    </FloatingLabel>
                                </div>
                            </div>
                            <div className='col-12'>
                                <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3" onChange={(e) => {setnew_password(e.target.value)}}>
                                    <Form.Control type="password" placeholder="Contraseña" value={new_password}/>
                                    <Form.Text className="HelpBlock">
                                        Añade una contraseña si quieres modificarla.
                                        Tu contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
                                    </Form.Text>
                                </FloatingLabel>
                            </div>
                            <div className='col-12'>
                                <FloatingLabel controlId="floatingPasswordconfirm" label="Confirmar contraseña" className="mb-3" onChange={(e) => {setconfirm_new_password(e.target.value)}}>
                                    <Form.Control type="password" placeholder="Confirmar contraseña" value={confirm_new_password}/>
                                    <Form.Text className="HelpBlock">
                                        Confirma la contraseña introducida anteriormente.
                                    </Form.Text>
                                </FloatingLabel>
                            </div>
                            <div className='col-12'>
                                <div className='modify_inputs_Button'>
                                    <Button variant="secondary" type="submit" size="lg" id="apply_changes_button" onClick={() => Modify()}>Modificar datos</Button>
                                </div>
                                <hr></hr>
                            </div>
                            <div className='col-12'>
                                <div className='go_home_modifyprofile_loged'>
                                    <Button variant="secondary" id="Go_home_modify_profile_loged" onClick={() => navigate("/")}>Volver a la página principal</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:
                <div className="modify_profile_not_loged">
                    <div className='container'>
                        <div className="row align-items-center">
                            <div className="col-12">
                                <h4 id="text_modifyprofile_not_loged">No puedes modificar tu perfil si aún no has iniciado sesión.</h4>
                            </div>
                            <div className="col-6">
                                <div className="login_modifyprofile_not_loged">
                                    <Button variant="secondary" id="Log_in_modify_profile" size="lg" onClick={() => login()}>Iniciar sesión</Button>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="signup_modifyprofile_not_loged">
                                    <Button variant="primary" id="Sign_up_modify_profile" size="lg" onClick={() => signup()}>Registrarse</Button>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                    <div className='go_home_modifyprofile_not_loged'>
                        <Button variant="secondary" id="Go_home_modify_profile_notloged" onClick={() => navigate("/")}>Volver a la página principal</Button>
                    </div>
                </div>
            }
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "ModifyProfile.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de modificar el perfil del usuario. Para ello el usuario debe de estar registrado (props.customer_selected) */}
                {/* Si el usuario no está registrado, debe mostrar un mensaje indicando que no puede modificar el perfil si no está registrado. */}
                {/* Si el usuario está registrado, debe mostrar un formulario con los campos necesarios para modificar el perfil (nombre, correo electrónico, teléfono, dni, dirección y contraseña). */}
                {/* El formulario debe tener un botón para modificar los datos y otro para volver a la página principal. Además, debe tener una alerta (alert_fields) si los campos son erróneos. */}
                {/* Dicho html debe estar hecho usando los componentes de bootstrap */}
            { copilot ?
                <div className="modify_profile_loged">
                    {props.customer_selected ?
                    <div className="modify_profile_loged_form">
                        <div className="modify_profile_loged_form_title">
                            <h1>Modificar perfil</h1>
                        </div>
                        <div className="modify_profile_loged_form_inputs">
                            <div className="modify_profile_loged_form_inputs_name">
                                <label for="name">Nombre</label>
                                <input type="text" id="name" name="name" placeholder="Nombre" value={name} onChange={e => setname(e.target.value)}></input>
                            </div>
                            <div className="modify_profile_loged_form_inputs_email">
                                <label for="email">Correo electrónico</label>
                                <input type="text" id="email" name="email" placeholder="Correo electrónico" value={email} onChange={e => setemail(e.target.value)}></input>
                            </div>
                            <div className="modify_profile_loged_form_inputs_phone">
                                <label for="phone">Teléfono</label>
                                <input type="text" id="phone" name="phone" placeholder="Teléfono" value={phone} onChange={e => setphone(e.target.value)}></input>
                            </div>
                            <div className="modify_profile_loged_form_inputs_dni">
                                <label for="dni">DNI</label>
                                <input type="text" id="dni" name="dni" placeholder="DNI" value={dni} onChange={e => setdni(e.target.value)}></input>
                            </div>
                            <div className="modify_profile_loged_form_inputs_address">
                                <label for="address">Dirección</label>
                                <input type="text" id="address" name="address" placeholder="Dirección" value={address} onChange={e => setaddress(e.target.value)}></input>
                            </div>
                            <div className="modify_profile_loged_form_inputs_password">
                                <label for="password">Contraseña</label>
                                <input type="password" id="password" name="password" placeholder="Contraseña" value={new_password} onChange={e => setnew_password(e.target.value)}></input>
                            </div>
                            <div className="modify_profile_loged_form_inputs_confirm_password">
                                <label for="confirm_password">Confirmar contraseña</label>
                                <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirmar contraseña" value={confirm_new_password} onChange={e => setconfirm_new_password(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="modify_profile_loged_form_buttons">
                            <div className="modify_profile_loged_form_buttons_modify">
                                <button type="button" className="btn btn-primary" onClick={Modify}>Modificar</button>
                            </div>
                            <div className="modify_profile_loged_form_buttons_back">
                                <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>Volver</button>
                            </div>
                        </div>
                    </div>
                    : <div className="modify_profile_not_loged">
                        <h1>Debes iniciar sesión para modificar tu perfil</h1>
                        <div className="modify_profile_not_loged_buttons">
                            <div className="modify_profile_not_loged_buttons_login">
                                <button type="button" className="btn btn-primary" onClick={login}>Iniciar sesión</button>
                            </div>
                            <div className="modify_profile_not_loged_buttons_signup">
                                <button type="button" className="btn btn-primary" onClick={signup}>Registrarse</button>
                            </div>
                        </div>
                      </div>
                    }
                    { alert_fields ? <Alert variant="danger">Los campos no son válidos</Alert> : null }
                </div>
            : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "ModifyProfile.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de modificar el perfil del usuario. Para ello el usuario debe de estar registrado (props.customer_selected) */}
                {/* Si el usuario no está registrado, debe mostrar un mensaje indicando que no puede modificar el perfil si no está registrado. */}
                {/* Si el usuario está registrado, debe mostrar un formulario con los campos necesarios para modificar el perfil (nombre, correo electrónico, teléfono, dni, dirección y contraseña). */}
                {/* El formulario debe tener un botón para modificar los datos y otro para volver a la página principal. Además, debe tener una alerta (alert_fields) si los campos son erróneos. */}
                {/* Dicho html debe estar hecho usando los componentes de bootstrap */}
            { codeWhisperer ?
                <div className= "container">
                    <div className="row">
                        <div className="col-md-12">
                            { props.customer_selected ?
                                <div className="card">
                                    <div className="card-header">
                                        { alert_fields ? <div className="alert alert-danger" role="alert">Todos los campos son obligatorios</div> : null }
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Modificar perfil</h5>
                                        <form>
                                            <div className="form-group">
                                                <label>Nombre</label>
                                                <input type="text" className="form-control" value={name} onChange={(e) => setname(e.target.value)} />
                                                <label>Email</label>
                                                <input type="text" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
                                                <label>Teléfono</label>
                                                <input type="text" className="form-control" value={phone} onChange={(e) => setphone(e.target.value)} />
                                                <label>DNI</label>
                                                <input type="text" className="form-control" value={dni} onChange={(e) => setdni(e.target.value)} />
                                                <label>Dirección</label>
                                                <input type="text" className="form-control" value={address} onChange={(e) => setaddress(e.target.value)} />
                                                <label>Contraseña</label>
                                                <input type="password" className="form-control" value={new_password} onChange={(e) => setnew_password(e.target.value)} />
                                                <label>Confirmar contraseña</label>
                                                <input type="password" className="form-control" value={confirm_new_password} onChange={(e) => setconfirm_new_password(e.target.value)} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" className="btn btn-primary" onClick={Modify}>Modificar</button>
                                    </div>
                                    <div className="card-footer">
                                        <button type="button" className="btn btn-primary" onClick={login}>Volver</button>
                                    </div>
                                </div>
                            : <div className="alert alert-danger" role="alert">
                                    No estás registrado.
                                </div>
                            }
                        </div>
                    </div>
                </div>
            : null
            }
        </div>
    );
}