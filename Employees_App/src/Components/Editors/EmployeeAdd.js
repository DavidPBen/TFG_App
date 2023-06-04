import './EmployeeAdd.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Componente que renderiza el formulario para añadir un nuevo empleado.
export default function EmployeeAdd(props) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [dni, setdni] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [role, setrole] = useState('repartidor');
    const [id, setid] = useState('');

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    // Función que añade un nuevo empleado a la base de datos.
    const addEmployee = () => {
        if (props.employee_table.find(employee => employee.Email === email || employee.DNI === dni || employee.Employee_Id == id)) {
            alert('El empleado ya existe')
        }
        else {
            const fields = [name, email, dni, phone, role, id, '', 1, password]
            props.addNewEmployee(fields, password, dni)
            navigate(-1)
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que añade un nuevo empleado a la base de datos. Enviando los datos del formulario a la función addEmployee. 
    const addEmployeeCopilot = () => { 
        const new_employee = {
            Name: name,
            Email: email,
            DNI: dni,
            Phone: phone,
            Password: password,
            Role: role,
            Id: id
        }
        props.addEmployee(new_employee)
        navigate('/employees')
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que añade un nuevo empleado a la base de datos. Enviando los datos del formulario a la función addEmployee. 
    const addEmployeeCodeWhisperer = () => {
        let newEmployee = {
            Employee_Name: name,
            Employee_Email: email,
            Employee_DNI: dni,
            Employee_Phone: phone,
            Employee_Password: password,
            Employee_Role: role,
            Employee_Id: id
        }
        props.addEmployee(newEmployee);
        navigate('/employees');
    }

    // Función que comprueba que todos los campos del formulario están rellenos correctamente. En caso contrario, muestra una alerta.
    const verify = () => {
        if (verifyName() && verifyEmailCopilot() && verifyDNICopilot() && verifyPhoneCopilot() && verifyPasswordCopilot() && verifyRole() && verifyId()) {
            addEmployee()
        }
        else {
            if(props.employee_table.find((employee) => employee.Employee_Id == id)){
                alert ('El identificador del empleado elegido ya está en uso')
            }
            else{
                alert('Por favor, rellena todos los campos correctamente')
            }
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que verifica que todos los campos del formulario están rellenos correctamente. En caso contrario, muestra una alerta.
    const verifyFormCopilot = () => {
        if (verifyName() && verifyEmailCopilot() && verifyDNICopilot() && verifyPhoneCopilot() && verifyPasswordCopilot() && verifyRole() && verifyId()) {
            addEmployee()
        }
        else {
            alert('Please fill all the fields correctly')
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que verifica que todos los campos del formulario están rellenos correctamente. En caso contrario, muestra una alerta.    
    const verifyFormCodeWhisperer = () => {
        if (verifyName() && verifyEmailCodeWhisperer() && verifyDNICodeWhisperer() && verifyPhoneCodeWhisperer() && verifyPasswordCodeWhisperer()) {
            addEmployeeCodeWhisperer();
        }
        else {
            alert('Please fill all the fields correctly')
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
    // Función que comprueba que el email del empleado está relleno correctamente.
    const verifyEmailCopilot = () => {
        if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el email del empleado está relleno correctamente.
    const verifyEmailCodeWhisperer = () => {
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            return false
        }
        else {
            return true
        }
    } 
    
    // Función realizada por GitHub Copilot.
    // Función que comprueba que el DNI/NIE del empleado está relleno correctamente.
    const verifyDNICopilot = () => {
        if (!dni.match(/^[0-9]{8}[A-Z]$/) && !dni.match(/^[A-Z]{1}[0-9]{8}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el DNI/NIE del empleado está relleno correctamente.
    const verifyDNICodeWhisperer = () => {
        if (!dni.match(/^[0-9]{8}[A-Z]$/)) {
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

    // Función realizada por Amazon CodeWhisperer.
    // Función que comprueba que el teléfono del empleado está relleno correctamente.
    const verifyPhoneCodeWhisperer = () => {
        if (!phone.match(/^[0-9]{9}$/)) {
            return false
        }
        else {
            return true
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que comprueba que la contraseña del empleado está rellena correctamente. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
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
    // Función que comprueba que la contraseña del empleado está rellena correctamente. Debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
    const verifyPasswordCodeWhisperer = () => {
        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)) {
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
        <div className="EmployeeAdd">
            <div className='EmployeeAdd_title'>
                <h1>Añadir un nuevo empleado</h1>
            </div>
            <div className='EmployeeAdd_form'>
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
                <FloatingLabel controlId="floatingPassword" label="Contraseña *" className="mb-3" onChange={(e) => {setpassword(e.target.value)}}>
                    <Form.Control type="password" placeholder="Contraseña" value={password}/>
                    <Form.Text className='form_text'>
                        La contraseña debe ser de 8-20 caracteres, contener letras y números, y no contener espacios ni caracteres especiales.
                    </Form.Text>   
                </FloatingLabel>
                <FloatingLabel controlId="floatingRole" label="Rol *" className="mb-3">
                    <Form.Select className='form_role' value={role} key={'selector'} onChange={(e) => setrole(e.target.value)}>
                                                <option>repartidor</option>
                                                <option>atención al cliente</option>
                                                <option>manager</option>
                    </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingId" label="Identificador del empleado *" className="mb-3" onChange={(e) => {setid(e.target.value)}}>
                    <Form.Control type="number" placeholder="Identificador del empleado" value={id}/>
                    <Form.Text className='form_text'>
                        El identificador del empleado es un número que se le asigna a cada empleado en la compañía.
                    </Form.Text>  
                </FloatingLabel>
            </div>
            <div className='EmployeeAdd_buttons'>
                <div className='EmployeeAdd_add'>
                    <Button variant="secondary" size='lg' onClick={() => verify()}>Añadir empleado</Button>
                </div>
                <div className='EmployeeAdd_goBack'>
                    <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "EmployeeAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo empleado. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo empleado, y dos botones: uno para añadir el empleado y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie, teléfono, contraseña, rol (como un selector) e identificador del empleado. */}
            {copilot ?
                <div>
                    <h1>Add Employee</h1>
                    <form>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
                        <label>DNI/NIE</label>
                        <input type="text" value={dni} onChange={(e) => setdni(e.target.value)} />
                        <label>Phone</label>
                        <input type="text" value={phone} onChange={(e) => setphone(e.target.value)} />
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        <label>Role</label>
                        <select value={role} onChange={(e) => setrole(e.target.value)}>
                            <option value=""></option>
                            <option value="Admin">Admin</option>
                            <option value="Employee">Employee</option>
                        </select>
                        <label>Employee Id</label>
                        <input type="text" value={id} onChange={(e) => setid(e.target.value)} />
                    </form>
                    <button onClick={() => props.addEmployee(name, email, dni, phone, password, role, id)}>Add Employee</button>
                    <button onClick={() => props.setview('EmployeeTable')}>Back</button>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "EmployeeAdd.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de añadir un nuevo empleado. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para añadir un nuevo empleado, y dos botones: uno para añadir el empleado y otro para volver a la vista anterior. */}
                {/* El formulario debe contener los campos de nombre, email, dni/nie, teléfono, contraseña, rol (como un selector) e identificador del empleado. */}
            {codeWhisperer ?
                <div>
                    <h1>Add Employee</h1>
                    <form>
                        <label>Name</label>
                        <input type="text" name="name" value={name} onChange={(e)  => setname(e.target.value)} />
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={(e)  => setemail(e.target.value)} />
                        <label>DNI/NIE</label>
                        <input type="text" name="dni" value={dni} onChange={(e)  => setdni(e.target.value)} />
                        <label>Phone</label>
                        <input type="text" name="phone" value={phone} onChange={(e)  => setphone(e.target.value)} />
                        <label>Password</label>
                        <input type="text" name="password" value={password} onChange={(e)  => setpassword(e.target.value)} />
                        <label>Role</label>
                        <select name="role" value={role} onChange={(e)  => setrole(e.target.value)}>
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                            <option value="customer">Customer</option>
                        </select>
                        <label>Employee Id</label>
                        <input type="text" name="id" value={id} onChange={(e)  => setid(e.target.value)} />
                    </form>
                    <button onClick={addEmployeeCodeWhisperer}>Add Employee</button>
                    <button onClick={props.back}>Back</button>
                </div>
                : null
            }
        </div>
    );
}