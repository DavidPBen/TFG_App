import './EmployeeEdition.css';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Componente que renderiza el formulario para editar un empleado.
export default function EmployeeEdition(props) {
    let { Employee_Id } = useParams();
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [dni, setdni] = useState('');
    const [phone, setphone] = useState('');
    const [role, setrole] = useState('');
    const [id, setid] = useState('');
    const [active, setactive] = useState();

    // Función que se ejecuta al iniciar el componente. Se encarga de rellenar los campos del formulario con los datos del empleado.
    useEffect(() => {
        chooseEmployee()
    }, [props.employee_table])

    // Función que rellena los campos del formulario con los datos del empleado.
    const chooseEmployee = () => {
        if(props.employee_table === undefined){
            return
        } 
        const employee_localized = props.employee_table.find((employee) => employee.Id == Employee_Id)
        setname(employee_localized.Name)
        setemail(employee_localized.Email)
        setdni(employee_localized.DNI)
        setphone(employee_localized.Phone)
        setrole(employee_localized.Role)
        setid(employee_localized.Employee_Id)
        employee_localized.Active ? setactive(true) : setactive(false)
    }

    // Función que se encarga de actualizar los datos del empleado en la base de datos cuando verifican dichos valores. En caso contrario, muestra una alerta.
    const applyChanges = () => {
        const employee_localized = props.employee_table.find((employee) => employee.Id == Employee_Id)
        var employee_accepted = true
        var employee_validated = false
        if(name !== employee_localized.Name){
            if(verifyName()){
                props.setEmployee(Employee_Id, 'Name', name)
                employee_validated = true
            }
            else{
                alert ('Nombre no válido')
                employee_accepted = false
            }
        }
        if(email !== employee_localized.Email){
            if(verifyEmailCopilot()){
                props.setEmployee(Employee_Id, 'Email', email)
                employee_validated = true
            }
            else{
                alert ('Correo no válido')
                employee_accepted = false
            }
        }
        if(dni !== employee_localized.DNI){
            if(verifyDNICopilot()){
                props.setEmployee(Employee_Id, 'DNI', dni)
                employee_validated = true
            }
            else{
                alert ('DNI/NIE no válido')
                employee_accepted = false
            }
        }
        if(phone !== employee_localized.Phone){
            if(verifyPhoneCopilot()){
                props.setEmployee(Employee_Id, 'Phone', phone)
                employee_validated = true
            }
            else{
                alert ('Teléfono no válido')
                employee_accepted = false
            }
        }
        if(role !== employee_localized.Role){
            if(verifyRole()){
                props.setEmployee(Employee_Id, 'Role', role)
                employee_validated = true
            }
            else{
                alert ('Rol no válido')
                employee_accepted = false
            }
        }
        if(id !== employee_localized.Employee_Id){
            if(verifyId()){
                props.setEmployee(Employee_Id, 'Employee_Id', id)
                employee_validated = true
            }
            else{
                alert ('Identificador no válido')
                employee_accepted = false
            }
        }
        const active_field = (active === true ? 1 : 0)
        if(active_field !== employee_localized.Active){
            props.setEmployee(Employee_Id, 'Active', active_field)
            employee_validated = true
        }
        if(employee_accepted && employee_validated){
            navigate(-1)
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que se encarga de actualizar los datos del empleado en la base de datos cuando verifican dichos valores. En caso contrario, muestra una alerta.
    const updateEmployeeCopilot = () => {
        if (verifyName() && verifyEmailCopilot() && verifyDNICopilot() && verifyPhoneCopilot()) {
            const reqInit = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "Name": name, "Email": email, "DNI": dni, "Phone": phone, "Role": role, "Active": active })
            }
            fetch(`http://localhost:8000/employee_table/${id}`, reqInit)
                .then(response => response.json())
                .then(data => console.log(data))
            navigate('/employees')
        }
        else {
            alert('Error al actualizar el empleado. Comprueba que los datos introducidos son correctos.')
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que se encarga de actualizar los datos del empleado en la base de datos cuando verifican dichos valores. En caso contrario, muestra una alerta.
    const updateEmployeeCodeWhisperer = () => {
        if (verifyName() && verifyEmailCodeWhisperer() && verifyDNICodeWhisperer() && verifyPhoneCodeWhisperer() && verifyRole()) {
            props.updateEmployeeCodeWhisperer(id, name, email, dni, phone, role, active)
            navigate('/employees')
        }
        else {
            alert('Por favor, revise los campos requeridos.')
        }
    }

    // Función que comprueba que el nombre del empleado está relleno correctamente.
    const verifyName = () => {
        if (name === '') {
            return false
        }
        else {
            return true
        }
    }

        // Función realizada por GitHub Copilot.
    // Función que comprueba que el email del empleado está relleno correctamente. El email no puede estar registrado en la base de datos.
    const verifyEmailCopilot = () => {
        if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) || props.employee_table.find((employee) => employee.Email === email)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el email del empleado está relleno correctamente. El email no puede estar registrado en la base de datos.
    const verifyEmailCodeWhisperer = () => {
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) || props.employee_table.find((employee) => employee.Email === email)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el DNI/NIE del empleado está relleno correctamente. El DNI/NIE no puede estar registrado en la base de datos.
    const verifyDNICopilot = () => {
        if ((!dni.match(/^[0-9]{8}[A-Z]$/) && !dni.match(/^[A-Z]{1}[0-9]{8}$/)) || props.employee_table.find((employee) => employee.DNI === dni)) {
            return false
        }
        else {
            return true
        }
    }    

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el DNI/NIE del empleado está relleno correctamente. El DNI/NIE no puede estar registrado en la base de datos.
    const verifyDNICodeWhisperer = () => {
        if (!dni.match(/^[0-9]{8}[A-Z]$/) || props.employee_table.find((employee) => employee.DNI === dni)) {
            return false
        }
        else {
            return true
        }
    }
    
    // Función realizada por GitHub Copilot.
    // Función que comprueba que el teléfono del empleado está relleno correctamente.
    const verifyPhoneCopilot = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que el teléfono del empleado está relleno correctamente.
    const verifyPhoneCodeWhisperer = () => {
        if (!phone.match(/^[0-9]+$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función que comprueba que el rol del empleado está relleno correctamente.
    const verifyRole = () => {
        if (role === '') {
            return false
        }
        else {
            return true
        }
    }

    // Función que comprueba que el id del empleado está relleno correctamente y no está en uso.
    const verifyId = () => {
        if (!id.match(/^[0-9]+$/) || props.employee_table.find((employee) => employee.Employee_Id == id)) {
            return false
        }
        else {
            return true
        }
    }

    return (
        <div className="EmployeeEdition">
            <div className='EmployeeEdition_title'>
                <h1>Editar un empleado</h1>
            </div>
            <div className='EmployeeEdition_form'>
                <div className='EmployeeEdition_Id'>
                    <h5>Id del empleado = {Employee_Id}</h5>
                </div>
                <FloatingLabel controlId="floatingName" label="Nombre *" className="mb-3" onChange={(e) => {setname(e.target.value)}}>
                    <Form.Control type="text" placeholder="Nombre" value={name}/>  
                    <Form.Text className='form_text'>
                        Nombre y apellidos del nuevo empleado.
                    </Form.Text> 
                </FloatingLabel>
                <FloatingLabel controlId="floatingEmail" label="Correo electrónico *" className="mb-3" onChange={(e) => {setemail(e.target.value)}}>
                    <Form.Control type="email" placeholder="Correo electrónico" value={email}/>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingDNI" label="DNI/NIE *" className="mb-3" onChange={(e) => {setdni(e.target.value)}}>
                    <Form.Control type="text" placeholder="DNI/NIE" value={dni}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPhone" label="Teléfono *" className="mb-3" onChange={(e) => {setphone(e.target.value)}}>
                    <Form.Control type="number" placeholder="Teléfono" value={phone}/>  
                </FloatingLabel>
                <FloatingLabel controlId="floatingRole" label="Rol *" className="mb-3" onChange={(e) => {setrole(e.target.value)}}>
                    <Form.Control type="text" placeholder="Rol" value={role}/>
                    <Form.Text className='form_text'>
                        El rol debe ser el rol del empleado en la empresa. Por ejemplo: "repartidor", "atención al cliente" o "manager".
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingId" label="Identificador del empleado *" className="mb-3" onChange={(e) => {setid(e.target.value)}}>
                    <Form.Control type="number" placeholder="Identificador del empleado" value={id}/>
                    <Form.Text className='form_text'>
                        El identificador del empleado es un número que se le asigna a cada empleado en la compañía.
                    </Form.Text> 
                </FloatingLabel>
                <Button variant="secondary" onClick={() => setactive(!active)}>{active ? 'Desactivar empleado' : 'Activar empleado'}</Button>
            </div>
            <div className='EmployeeEdition_buttons'>
                <div className='EmployeeEdition_Iteration_Buttons'>
                    <div className='EmployeeEdition_goBack'>
                        <Button variant="secondary" size='lg' onClick={() => navigate(-1)}>Volver</Button>
                    </div>
                    <div className='EmployeeEdition_apply_changes'>
                        <Button variant="secondary" size='lg' onClick={() => applyChanges()}>Aplicar cambios</Button>
                    </div>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "EmployeeEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo empleado. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo empleado, y tres botones: uno para aplicar los cambios, otro para volver a la vista anterior y otro para desactivar al empleado. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie, teléfono, rol (como un selector) e identificador del empleado. */}
                {copilot ?
                <div>
                    <h1>Editar empleado</h1>
                    <div className="form">
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
                        <label>DNI/NIE</label>
                        <input type="text" value={dni} onChange={(e) => setdni(e.target.value)} />
                        <label>Teléfono</label>
                        <input type="text" value={phone} onChange={(e) => setphone(e.target.value)} />
                        <label>Rol</label>
                        <select value={role} onChange={(e) => setrole(e.target.value)}>
                            <option value="Administrador">Administrador</option>
                            <option value="Empleado">Empleado</option>
                        </select>
                        <label>Identificador</label>
                        <input type="text" value={id} onChange={(e) => setid(e.target.value)} />
                    </div>
                    <div className="buttons">
                        <button onClick={() => updateEmployeeCopilot()}>Aplicar cambios</button>
                        <button onClick={() => navigate('/employees')}>Volver</button>
                        <button onClick={() => props.deleteEmployee(id)}>Desactivar empleado</button>
                    </div>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "EmployeeEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo empleado. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo empleado, y tres botones: uno para aplicar los cambios, otro para volver a la vista anterior y otro para desactivar al empleado. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie, teléfono, rol (como un selector) e identificador del empleado. */}
            {codeWhisperer ?
                <div>
                    <h1>Editar empleado</h1>
                    <form onSubmit={updateEmployeeCodeWhisperer}>
                        <input type="text" name="name" value={name} onChange={props.handleInputChange} placeholder="Nombre" />
                        <input type="text" name="email" value={email} onChange={props.handleInputChange} placeholder="Email" />
                        <input type="text" name="dni" value={dni} onChange={props.handleInputChange} placeholder="DNI/NIE" />
                        <input type="text" name="phone" value={phone} onChange={props.handleInputChange} placeholder="Teléfono" />
                        <select name="role" value={role} onChange={props.handleInputChange}>
                            <option value="">Rol</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Operario">Operario</option>
                        </select>
                        <input type="text" name="id" value={id} onChange={props.handleInputChange} placeholder="Identificador del empleado" />
                    </form>
                    <button onClick={updateEmployeeCodeWhisperer}>Aplicar cambios</button>
                    <button onClick={() => navigate('/employees')}>Volver</button>
                    <button onClick={() => props.deactivateEmployee(id)}>Desactivar</button>
                </div>
                : null
            }
        </div>
    );
}