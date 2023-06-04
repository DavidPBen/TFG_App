import './CustomerEdition.css';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Componente que renderiza el formulario para editar un cliente.
export default function CustomerEdition(props) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [id, setid] = useState('');
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');

    let { Customer_Id } = useParams();
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;


    // Función que se ejecuta al iniciar el componente. Se encarga de rellenar los campos del formulario con los datos del cliente.
    useEffect(() => {
        chooseCustomer()
    }, [props.customer_table])

    // Función que rellena los campos del formulario con los datos del cliente.
    const chooseCustomer = () => {
        if(props.customer_table === undefined){
            return
        } 
        const customer_localized = props.customer_table.find((customer) => customer.Id == Customer_Id)
        setname(customer_localized.Name)
        setemail(customer_localized.Email)
        setid(customer_localized.Customer_Id)
        setphone(customer_localized.Phone)
        setaddress(customer_localized.Address)
    }
    
    // Función que se encarga de actualizar los datos del cliente en la base de datos cuando verifican dichos valores. En caso contrario, muestra una alerta.
    const applyChanges = () => {
        const customer_localized = props.customer_table.find((customer) => customer.Id == Customer_Id)
        var customer_accepted = true
        var customer_validated = false
        if(name !== customer_localized.Name){
            if(verifyName()){
                props.setCustomer(Customer_Id, 'Name', name)
                customer_validated = true
            }
            else{
                alert ('Nombre no válido')
                customer_accepted = false
            }
        }
        if(email !== customer_localized.Email){
            if(verifyEmailCopilot()){
                props.setCustomer(Customer_Id, 'Email', email)
                customer_validated = true
            }
            else{
                alert ('Correo no válido')
                customer_accepted = false
            }
        }
        if(id !== customer_localized.Customer_Id){
            if(verifyIdCopilot()){
                props.setCustomer(Customer_Id, 'Customer_Id', id)
                customer_validated = true
            }
            else{
                alert ('Identificador no válido')
                customer_accepted = false
            }
        }
        if(phone !== customer_localized.Phone){
            if(verifyPhoneCopilot()){
                props.setCustomer(Customer_Id, 'Phone', phone)
                customer_validated = true
            }
            else{
                alert ('Teléfono no válido')
                customer_accepted = false
            }
        }
        if(address !== customer_localized.Address){
            if(verifyAddress()){
                props.setCustomer(Customer_Id, 'Address', address)
                customer_validated = true
            }
            else{
                alert ('Dirección no válida')
                customer_accepted = false
            }
        }
        if(customer_accepted && customer_validated){
            navigate(-1)
        }
    }

    // Función realizada por GitHub Copilot.
    // Función encargada de actualizar los datos de los clientes en la base de datos, modificando el cliente con el Id indicado. En caso contrario, muestra una alerta de error por cada campo del formulario.
    //Cada campo solo se actualiza si es diferente al valor que tenía en la base de datos.
    const updateCustomerCopilot = () => {
        if (name === '') {
            alert('El nombre del cliente no puede estar vacío.')
        }
        else if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) || props.customer_table.find((customer) => customer.Email === email)) {
            alert('El email del cliente no es válido o ya existe.')
        }
        else if ((!id.match(/^[0-9]{8}[A-Z]$/) && !id.match(/^[A-Z]{1}[0-9]{8}$/)) || props.customer_table.find((customer) => customer.Customer_Id === id)) {
            alert('El Id del cliente no es válido o ya existe.')
        }
        else if (phone === '') {
            alert('El teléfono del cliente no puede estar vacío.')
        }
        else if (address === '') {
            alert('La dirección del cliente no puede estar vacía.')
        }
        else {
            const reqInit = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({Name: name, Email: email, Customer_Id: id, Phone: phone, Address: address})
            }
            fetch(`http://localhost:8000/customer_table/${Customer_Id}`, reqInit)
            .then(() => {
                alert('El cliente se ha actualizado correctamente.')
                navigate('/customers')
            })
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función encargada de actualizar los datos de los clientes en la base de datos, modificando el cliente con el Id indicado. En caso contrario, muestra una alerta de error por cada campo del formulario.
    //Cada campo solo se actualiza si es diferente al valor que tenía en la base de datos.
    const updateCustomerCodeWhisperer = () => {
        if (verifyName() && verifyEmailCodeWhisperer() && verifyIdCodeWhisperer() && verifyPhoneCodeWhisperer() && verifyAddress()) {
            if (name !== props.customer_table.find((customer) => customer.Customer_Id === Customer_Id).Name) {
                props.updateCustomerName(Customer_Id, name)
            }
            if (email !== props.customer_table.find((customer) => customer.Customer_Id === Customer_Id).Email) {
                props.updateCustomerEmail(Customer_Id, email)
            }
            if (id !== props.customer_table.find((customer) => customer.Customer_Id === Customer_Id).Customer_Id) {
                props.updateCustomerId(Customer_Id, id)
            }
            if (phone !== props.customer_table.find((customer) => customer.Customer_Id === Customer_Id).Phone) {
                props.updateCustomerPhone(Customer_Id, phone)
            }
            if (address !== props.customer_table.find((customer) => customer.Customer_Id === Customer_Id).Address) {
                props.updateCustomerAddress(Customer_Id, address)
            }
            navigate(-1)
        }
        else {
            alert('El formulario contiene errores.')
            if (!verifyName()) {
                alert('El nombre del cliente no puede estar vacío.')
            }
            if (!verifyEmailCodeWhisperer()) {
                alert('El email del cliente no es válido o ya existe.')
            }
            if (!verifyIdCodeWhisperer()) {
                alert('El Id del cliente no es válido o ya existe.')
            }
            if (!verifyPhoneCodeWhisperer()) {
                alert('El teléfono del cliente no puede estar vacío.')
            }
            if (!verifyAddress()) {
                alert('La direcci�3n del cliente no puede estar vacía.')
            }
            navigate(-1)
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
        if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) || props.customer_table.find((customer) => customer.Email === email)) {
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
    // Función que comprueba que el Id del cliente está relleno correctamente.
    const verifyIdCopilot = () => {
        if ((!id.match(/^[0-9]{8}[A-Z]$/) && !id.match(/^[A-Z]{1}[0-9]{8}$/)) || props.customer_table.find((customer) => customer.Customer_Id === id)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el Id del cliente está relleno correctamente.
    const verifyIdCodeWhisperer = () => {
        if (!id.match(/^[0-9]{8}[A-Z]$/) && !id.match(/^[A-Z]{1}[0-9]{8}$/)) {
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

    return (
        <div className="CustomerEdition">
            <div className='CustomerEdition_title'>
                <h1>Editar un cliente</h1>
            </div>
            <div className='CustomerEdition_form'>
                <div className='CustomerEdition_Id'>
                    <h5>Id del cliente = {Customer_Id}</h5>
                </div>
                <FloatingLabel controlId="floatingName" label="Nombre *" className="mb-3" onChange={(e) => {setname(e.target.value)}}>
                    <Form.Control type="text" placeholder="Nombre" value={name}/>  
                    <Form.Text className='form_text'>
                        Nombre y apellidos o nombre de la empresa.
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Correo electrónico *" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                    <Form.Control type="email" placeholder="Correo electrónico" value={email}/>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingCustomer_Id" label="Identificador del cliente *" className="mb-3" onChange={(e) => {setid(e.target.value)}}>
                    <Form.Control type="text" placeholder="Identificador del cliente" value={id}/>  
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
            </div>
            <div className='CustomerEdition_buttons'>
                <div className='CustomerEdition_apply_changes'>
                    <Button variant="secondary" size='lg' onClick={() => applyChanges()}>Aplicar cambios</Button>
                </div>
                <div className='CustomerEdition_goBack'>
                        <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "CustomerEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo cliente. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo cliente, y dos botones: uno para aplicar los cambios y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie/cif, teléfono y dirección. Dichos campos deben estar rellenos inicialmente con los valores del cliente. */}
            {copilot ?
                <div>
                    <h1>Editar cliente</h1>
                    <form>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setname(e.target.value)} />
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
                        <label htmlFor="id">DNI/NIE/CIF</label>
                        <input type="text" id="id" name="id" value={id} onChange={(e) => setid(e.target.value)} />
                        <label htmlFor="phone">Teléfono</label>
                        <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setphone(e.target.value)} />
                        <label htmlFor="address">Dirección</label>
                        <input type="text" id="address" name="address" value={address} onChange={(e) => setaddress(e.target.value)} />
                    </form>
                    <button onClick={() => applyChanges()}>Aplicar cambios</button>
                    <button onClick={() => navigate(-1)}>Volver</button>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "CustomerEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo cliente. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo cliente, y dos botones: uno para aplicar los cambios y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie/cif, teléfono y dirección. Dichos campos deben estar rellenos inicialmente con los valores del cliente. */}
            {codeWhisperer ?
                <div>
                    <h1>Editar Cliente</h1>
                    <form>
                        <label>Nombre:</label>
                        <input type="text" value={name} onChange={e => setname(e.target.value)} />
                        <br />
                        <label>Email:</label>
                        <input type="text" value={email} onChange={e => setemail(e.target.value)} />
                        <br />
                        <label>Id:</label>
                        <input type="text" value={id} onChange={e => setid(e.target.value)} />
                        <br />
                        <label>Teléfono:</label>
                        <input type="text" value={phone} onChange={e => setphone(e.target.value)} />
                        <br />
                        <label>Dirección:</label>
                        <input type="text" value={address} onChange={e => setaddress(e.target.value)} />
                    </form>
                    <button onClick={updateCustomerCodeWhisperer}>Aplicar Cambios</button>
                    <button onClick={() => navigate(-1)}>Volver</button>
                </div>
                : null
            }
        </div>
    );
}