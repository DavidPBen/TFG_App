import './App.css'; 
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Header from './Components/Header.js';
import Login from './Components/Login.js';
import Main_View from './Components/Main_View.js';
import Error from './Components/Error/Error.js';

// Componente principal donde se renderizan el resto de componentes, se ejecutan las conexiones con la API y se recoge el empleado que utiliza la aplicación.
function App() {
  const [employee_selected, setemployee_selected] = useState();
  const [employee_table, setemployee_table] = useState([]);
  const [customer_table, setcustomer_table] = useState([]);
  const [order_table, setorder_table] = useState([]);
  const [package_table, setpackage_table] = useState([]);

  const navigate = useNavigate();
  
  // Función que se ejecuta al iniciar la aplicación. Carga los datos de la base de datos.
  useEffect(() => {
    getEmployees();
    getCustomers();
    getOrders();
    getPackages();
  }, []) 

  // Función que obtiene los datos de los empleados de la base de datos.
  const getEmployees = async () => {
    try{
      let response = await fetch('http://localhost:8000/employee_table')
      if(!response?.ok){
        throw new Error('Employee table not found.')
      }
      let data = await response.json()
      await setemployee_table(data)
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que obtiene los datos de los clientes de la base de datos.
  const getCustomers = async () => {
    try{
      let response = await fetch('http://localhost:8000/customer_table')
      if(!response?.ok){
        throw new Error('Customer table not found.')
      }
      let data = await response.json()
      await setcustomer_table(data)
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que obtiene los datos de los pedidos de la base de datos.
  const getOrders = async () => {
    try{
      let response = await fetch('http://localhost:8000/order_table')
      if(!response?.ok){
        throw new Error('Order table not found.')
      }
      let data = await response.json()
      await setorder_table(data)
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que obtiene los datos de los paquetes de la base de datos.
  const getPackages = async () => {
    try{
      let response = await fetch('http://localhost:8000/package_table')
      if(!response?.ok){
        throw new Error('Package table not found.')
      }
      let data = await response.json()
      await setpackage_table(data)
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que actualiza los datos de un pedido en la base de datos.
  const setOrderValue = async (id,field,value) => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({[field]: value})
      }
      let response = await fetch('http://localhost:8000/order_table/'+id, reqInit)
      if(!response?.ok){
        throw new Error('Order data does not updated.')
      }
      await getOrders()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que actualiza los datos de un cliente en la base de datos.
  const setCustomer = async (id,field,value) => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({[field]: value})
      }
      let response = await fetch('http://localhost:8000/customer_table/'+id, reqInit)
      if(!response?.ok){
        throw new Error('Customer data does not updated.')
      }
      await getCustomers()    
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que actualiza los datos de un empleado en la base de datos.
  const setEmployee = async (id,field,value) => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({[field]: value})
      }
      let response = await fetch('http://localhost:8000/employee_table/'+id, reqInit)
      if(!response?.ok){
        throw new Error('Employee data does not updated.')
      }
      await getEmployees()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que actualiza los datos de un paquete en la base de datos.
  const setPackage = async (id,field,value) => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({[field]: value})
      }
      let response = await fetch('http://localhost:8000/package_table/'+id, reqInit)
      if(!response?.ok){
        throw new Error('Package data does not updated.')
      }
      await getPackages()
    } 
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que añade un cliente en la base de datos.
  const addNewCustomer = async (fields, password, Customer_Id) => {
    try{
      const reqInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      }
      let response = await fetch('http://localhost:8000/customer_table/create', reqInit)
      if(!response?.ok){
        throw new Error('Customer data does not added.')
      }
      await cifrateNewCustomerPassword(password, Customer_Id)
      await getCustomers()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que cifra la contraseña de un cliente.
  const cifrateNewCustomerPassword = async (password, Customer_Id) => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([password])
      }
      let response = await fetch('http://localhost:8000/customer_table/create/'+Customer_Id, reqInit)
      if(!response?.ok){
        throw new Error('Customer password does not added.')
      }
      await getCustomers()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que añade un empleado en la base de datos.
  const addNewEmployee = async (fields, password, DNI) => {
    try{
      const reqInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      }
      let response = await fetch('http://localhost:8000/employee_table/create', reqInit)
      if(!response?.ok){
        throw new Error('Employee data does not added.')
      }
      await cifrateNewEmployeePassword(password, DNI)
      await getEmployees()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que cifra la contraseña de un empleado.
  const cifrateNewEmployeePassword = async (password, DNI) => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([password])
      }
      let response = await fetch('http://localhost:8000/employee_table/create/'+DNI, reqInit)
      if(!response?.ok){
        throw new Error('Employee password does not added.')
      }
      await getEmployees()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que añade un pedido en la base de datos.
  const addNewOrder = async (fields) => {
    try{
      const reqInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      }
      let response = await fetch('http://localhost:8000/order_table', reqInit)
      if(!response?.ok){
        throw new Error('Order data does not added.')
      }
      await getOrders()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que añade un paquete en la base de datos.
  const addNewPackage = async (fields) => {
    try{
      const reqInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      }
      let response = await fetch('http://localhost:8000/package_table', reqInit)
      if(!response?.ok){
        throw new Error('Package data does not added.')
      }
      await getPackages()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que limpia toda la columna de intento de contraseña de la tabla de empleados de la base de datos.
  const clearEmployeesPasswordsTries = async () => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      }
      let response = await fetch('http://localhost:8000/employee_table/login', reqInit)
      if(!response?.ok){
        throw new Error('Password attempts by employees are not deleted.')
      }
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que actualiza el intento de contraseña de un empleado en la base de datos.
  const setemployee_Password_Try = async (id, value) => {
    try{
      const reqInit = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([value])
      }
      let response = await fetch('http://localhost:8000/employee_table/password_try/'+id, reqInit)
      if(!response?.ok){
        throw new Error('Password attempt by employee is not updated.')
      }
      const result = await getEmployeeLoged()
      return result
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que devuelve el empleado logeado (En el que la contraseña cifrada es igual al intento de contraseña cifrado).
  const getEmployeeLoged = async () => {
    try{
      const response = await fetch('http://localhost:8000/employee_table/login')
      if(!response?.ok){
        throw new Error('Employee loged does not found.')
      }
      const data = await response.json()
      return data
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que selecciona el empleado que va a utilizar la aplicación.
  const selectEmployee = (employee) => {
    setemployee_selected(employee)
  }

  // Función que envía un correo electrónico al cliente.
  const sendEmail = async (correo, asunto, texto) => {
    const reqInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({msg: texto})
    }
    try{
      let response = await fetch('http://localhost:8000/send_email/'+correo+'/'+asunto, reqInit)
      if(!response?.ok){
        throw new Error('No se ha podido enviar el correo electrónico.')
      }
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función realizada por GitHub Copilot.
  // Función que devuelve los datos de un cliente de la base de datos del puerto 8000.
  const getCustomerCopilot = (customer_id) => {
    fetch(`http://localhost:8000/customers/${customer_id}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

  // Función realizada por Amazon CodeWhisperer.
  // Función que devuelve los datos de un cliente de la base de datos del puerto 8000.
  const getCustomerCodeWhisperer = (customer_id) => {
    fetch(`http://localhost:8000/customers/${customer_id}`)
        .then(response => response.json())
        .then(data => setcustomer_table(data))
        .catch(error => console.log(error));
  }

  // Función realizada por Code GPT.
  // Función que devuelve los datos de un cliente de la base de datos del puerto 8000.
  // function getClientCodeGPT(id){ 
  //   return new Promise((resolve, reject) => { 
  //     const options = { 
  //       hostname: 'localhost', 
  //       port: 8000, 
  //       path: '/client/' + id, 
  //       method: 'GET' 
  //     }; 
  //     const req = http.request(options, (res) => { 
  //       let data = '';
  //       res.on('data', (chunk) => { 
  //         data += chunk; 
  //       }); 
  //       res.on('end', () => { 
  //         resolve(JSON.parse(data));
  //       }); 
  //     }); 
  //     req.on('error', (e) => { 
  //       reject(e); 
  //     }); 
  //     req.end(); 
  //   }); 
  // }

  // Función realizada por GitHub Copilot.
  // Función que añade en la base de datos del puerto 8000 los valores de un cliente.
  const addCustomerCopilot = (fields) => {
    fetch('http://localhost:8000/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

  // Función realizada por Amazon CodeWhisperer.
  // Función que añade en la base de datos del puerto 8000 los valores de un cliente.
  const addNewCustomerCodeWhisperer = (name, email, phone, address, city, country, postal_code) => {
      fetch('http://localhost:8000/customers', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: name,
              email: email,
              phone: phone,
              address: address,
              city: city,
              country: country,
              postal_code: postal_code
          })
      })
          .then(response => response.json())
          .then(data => console.log(data))
  }

  // Función realizada por Code GPT.
  // Función de flecha que añade en la base de datos del puerto 8000 los valores de un cliente, añadiendo el nombre, email, dni, teléfono, dirección y contraseña.
  // const addClientCodeGPT = (client) => {
  //   fetch('http://localhost:8000/api/clients', {
  //     method: 'POST',
  //     body: JSON.stringify(client),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res => res.json()) 
  //   .then(data => { 
  //     this.props.history.push('/') 
  //   })
  // }

  // Función realizada por GitHub Copilot.
  // Función que modifica en la base de datos del puerto 8000 los valores de un cliente de una aplicación de mensajería.
  const setCustomerCopilot = (customer_id, name, email, phone, address, city, country, postal_code) => {
    fetch(`http://localhost:8000/customers/${customer_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        country: country,
        postal_code: postal_code
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))    
  }

  // Función realizada por Amazon CodeWhisperer.
  // Función que modifica en la base de datos del puerto 8000 los valores de un cliente de una aplicación de mensajería.
  const setCustomerCodeWhisperer = (customer) => {
    fetch(`http://localhost:8000/customer/${customer.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
  }

  // Función realizada por Code GPT.
  // Función de flecha que modifica en la base de datos del puerto 8000 los valores de un cliente de una aplicación de mensajería. Cambiando el nombre, email, dni, teléfono, dirección y contraseña
  // const modificarClienteCodeGPT = (id, nombre, email, dni, telefono, direccion, contrasena) => {
  //   fetch(`http://localhost:8000/clientes/${id}`, {
  //     method: "PUT",
  //     body: JSON.stringify({ nombre: nombre, email: email, dni: dni, telefono: telefono, direccion: direccion, contrasena: contrasena }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));

  //   this.setState({ nombreModificarCliente: "" });
  //   this.setState({ emailModificarCliente: "" });
  //   this.setState({ dniModificarCliente: "" });
  //   this.setState({ telefonoModificarCliente: "" });
  //   this.setState({ direccionModificarCliente: "" });
  //   this.setState({ contrasenaModificarCliente: "" });
  // };

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Login employee_table={employee_table} clearEmployeesPasswordsTries={clearEmployeesPasswordsTries} setemployee_Password_Try={setemployee_Password_Try} selectEmployee={selectEmployee}/>}/>
        <Route path="/main/*" element={<Main_View employee={employee_selected} employee_table={employee_table} customer_table={customer_table} order_table={order_table} package_table={package_table} setOrderValue={setOrderValue} addNewCustomer={addNewCustomer} setCustomer={setCustomer} setEmployee={setEmployee} addNewEmployee={addNewEmployee} addNewOrder={addNewOrder} setPackage={setPackage} addNewPackage={addNewPackage} sendEmail={sendEmail}/>}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
