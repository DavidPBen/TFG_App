import './App.css'; 
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import React from 'react';

import Header from './Components/Header';
import MainPage from './Components/MainPage';
import Error from './Components/Error/Error';
import Login from './Components/Customer/Login';
import Signup from './Components/Customer/Signup';
import ModifyProfile from './Components/Customer/ModifyProfile';
import ViewOrder from './Components/Order/ViewOrder';
import ReturnView from './Components/Order/ReturnView';
import SendOrder from './Components/Order/SendOrder';
import SendPackage from './Components/Order/SendPackage';
import Pay from './Components/Order/Pay';

// Componente principal donde se renderizan el resto de componentes, se ejecutan las conexiones con la API y se recoge el empleado que utiliza la aplicación.
function App() {
  const [employee_table, setemployee_table] = useState([]);
  const [customer_table, setcustomer_table] = useState([]);
  const [order_table, setorder_table] = useState([]);
  const [package_table, setpackage_table] = useState([]);
  const [order_selected, setorder_selected] = useState();
  const [customer_selected, setcustomer_selected] = useState();
  const [relogin, setrelogin] = useState(false);
  const [packages, setpackages] = useState([]);
  const [customer_created, setcustomer_created] = useState();
  const [order, setorder] = useState();
  const [cost, setcost] = useState();

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
        throw new Error('No se han podido cargar los datos de los empleados.')
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
        throw new Error('No se han podido cargar los datos de los clientes.')
      }
      let data = await response.json()
      await setcustomer_table(data)
      return data
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
        throw new Error('No se han podido cargar los datos de los pedidos.')
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
        throw new Error('No se han podido cargar los datos de los paquetes.')
      }
      let data = await response.json()
      await setpackage_table(data)
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que limpia toda la columna de intento de contraseña de la tabla de clientes de la base de datos.
  const clearCustomersPasswordsTries = async () => {
    const reqInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    try{
      let response = await fetch('http://localhost:8000/customer_table/login', reqInit)
      if(!response?.ok){
        throw new Error('No se han podido limpiar los intentos de contraseña.')
      }
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que actualiza el intento de contraseña de un cliente en la base de datos.
  const setcustomer_Password_Try = async (id, value) => {
    const reqInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([value])
    }
    try{
      let response = await fetch('http://localhost:8000/customer_table/password_try/'+id, reqInit)
      if(!response?.ok){
        throw new Error('No se ha podido actualizar el intento de contraseña.')
      }
      const result = await getCustomerLoged()
      return result
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que devuelve el cliente logeado (En el que la contraseña cifrada es igual al intento de contraseña cifrado).
  const getCustomerLoged = async () => {
    try{
      const response = await fetch('http://localhost:8000/customer_table/login')
      if(!response?.ok){
        throw new Error('No se ha podido obtener el cliente logeado.')
      }
      const data = await response.json()
      return data
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que añade un cliente en la base de datos.
  const addNewCustomer = async (fields, password, Customer_Id) => {
    const reqInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    }
    try{
      let response = await fetch('http://localhost:8000/customer_table/create', reqInit)
      if(!response?.ok){
        throw new Error('No se ha podido añadir el cliente.')
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
    const reqInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([password])
    }
    try{
      let response = await fetch('http://localhost:8000/customer_table/create/'+Customer_Id, reqInit)
      if(!response?.ok){
        throw new Error('No se ha podido cifrar la contraseña del cliente.')
      }
      await getCustomers()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
    
  }

  // Función que actualiza los datos de un cliente en la base de datos.
  const setCustomer = async (id,field,value) => {
    const reqInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({[field]: value})
    }
    if(field == "Password"){
      try{
        let response = await fetch('http://localhost:8000/customer_table/'+id, reqInit)
        if(!response?.ok){
          throw new Error('No se ha podido actualizar los datos del cliente.')
        }
        let customers = await getCustomers()
        await selectCustomer(customers.find(customer => customer.Id == id))
        await cifrateNewCustomerPassword(value, customers.find(customer => customer.Id == id).Customer_Id)
      }
      catch(error){
        console.log(error)
        navigate('/error')
      }   
    }
    else{
      try{
        let response = await fetch('http://localhost:8000/customer_table/'+id, reqInit)
        if(!response?.ok){
          throw new Error('No se ha podido actualizar los datos del cliente.')
        }
        let customers = await getCustomers()
        await selectCustomer(customers.find(customer => customer.Id == id))
      }
      catch(error){
        console.log(error)
        navigate('/error')
      }
    }
  }

  // Función que añade un nuevo pedido en la base de datos. Para ello añade el cliente, en caso de que no exista, y el pedido.
  const sendOrder = async (new_customer, new_order) => {
    if(!customer_selected){
      const reqInit_customer = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new_customer)
      }
      try{
        let response = await fetch('http://localhost:8000/customer_table', reqInit_customer)
        if(!response?.ok){
          throw new Error('No se ha podido añadir el cliente.')
        }
        await cifrateNewCustomerPassword(new_customer.Password, new_customer.Customer_Id)
        await getCustomers()
      }
      catch(error){
        console.log(error)
        navigate('/error')
      }
    }
    const reqInit_order = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(new_order)
    }
    try{
      let response = await fetch('http://localhost:8000/order_table', reqInit_order)
      if(!response?.ok){
        throw new Error('No se ha podido añadir el pedido.')
      }
      await getOrders()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que añade un nuevo paquete en la base de datos.
  const sendPackage = async (packet) => {
    let reqInit_package = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packet)
    }
    try{
      let response = await fetch('http://localhost:8000/package_table', reqInit_package)
      if(!response?.ok){
        throw new Error('No se ha podido añadir el paquete.')
      }
      await getPackages()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que permite activar un pedido tras realizar el pago.
  const payOrder = async (exp_num) => {
    let reqInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([""])
    }
    try{
      let response = await fetch('http://localhost:8000/order_table/pay/'+exp_num, reqInit)
      if(!response?.ok){
        throw new Error('No se ha podido activar el pedido.')
      }
      await getOrders()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función que permite cancelar un pedido. Actualiza el estado del pedido a devolución y la fecha esperada de devolución.
  const returnOrder = async (exp_num, new_state, new_return_date) => {
    let reqInitstate = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([new_state])
    }
    try{
      let response = await fetch('http://localhost:8000/order_table/return_state/'+exp_num, reqInitstate)
      if(!response?.ok){
        throw new Error('No se ha podido devolver el pedido.')
      }
      await getOrders()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
    let reqInitdate = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([new_return_date])
    }
    try{
      let response = await fetch('http://localhost:8000/order_table/return_date/'+exp_num, reqInitdate)
      if(!response?.ok){
        throw new Error('No se ha podido devolver el pedido.')
      }
      await getOrders()
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
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

  // Función que selecciona el cliente que va a utilizar la aplicación.
  const selectCustomer = async (customer) => {
      await setcustomer_selected(customer)
  }

  // Función realizada por GitHub Copilot.
  // Función que añade un nuevo pedido en la base de datos del puerto 8000. Para ello añade el cliente, en caso de que no exista, y el pedido. 
  //Los parámetros son el nuevo cliente y el nuevo pedido. Esto lo hace a través de dos peticiones post  pasando los datos con el body en formato JSON.
  //Las URL de las peticiones son las siguientes: http://localhost:8000/customer_table/{cliente} y http://localhost:8000/order_table/{pedido}.
  //En caso de que la petición no se haya realizado correctamente, se lanza una excepción y se redirige a la página de error. En caso contrario, se actualizan los datos de los clientes y los pedidos.
  const addNewOrderCopilot = async (newCustomer, newOrder) => {
    try{
      let response = await fetch(`http://localhost:8000/customer_table/${newCustomer}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newCustomer)
      })
      if(!response?.ok){
        throw new Error('No se ha podido añadir el cliente.')
      }
      response = await fetch(`http://localhost:8000/order_table/${newOrder}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newOrder)
      })
      if(!response?.ok){
        throw new Error('No se ha podido añadir el pedido.')
      }
      await getCustomers();
      await getOrders();
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función realizada por GitHub Copilot.
  // Función que permite enviar un correo a través de la base de datos del puerto 8000. Para ello se realiza una petición post pasando el texto con el body en formato JSON.
  //La URL de la petición es la siguiente: http://localhost:8000/send_email/{correo}/{asunto}, ya que se le pasa el correo del destinatario y el asunto del correo en el path.
  //En caso de que la petición no se haya realizado correctamente, se lanza una excepción y se redirige a la página de error.
  const sendEmailCopilot = async (correo, asunto, texto) => {
    try {
      const response = await fetch(`http://localhost:8000/send_email/${correo}/${asunto}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({texto})
      });
      const data = await response.json();
      return data;
    } catch (error) {
      navigate('/error');
    }
  }

  // Función realizada por Amazon CodeWhisperer.
  // Función que añade un nuevo pedido en la base de datos del puerto 8000. Para ello añade el cliente, en caso de que no exista, y el pedido. 
  //Los parámetros son el nuevo cliente y el nuevo pedido. Esto lo hace a través de dos peticiones post  pasando los datos con el body en formato JSON.
  //Las URL de las peticiones son las siguientes: http://localhost:8000/customer_table/{cliente} y http://localhost:8000/order_table/{pedido}.
  //En caso de que la petición no se haya realizado correctamente, se lanza una excepción y se redirige a la página de error. En caso contrario, se actualizan los datos de los clientes y los pedidos.
  const addNewOrderCodeWhisperer = (newCustomer, newOrder) => {
    try{
      fetch(`http://localhost:8000/customer_table/${newCustomer}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newCustomer)
      })
      .then(response => {
        if(!response?.ok){
          throw new Error('No se ha podido añadir el cliente.')
        }
      })
      .then(response => {
        fetch(`http://localhost:8000/order_table/${newOrder}`, {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newOrder)
        })
        .then(response => {
          if(!response?.ok){
            throw new Error('No se ha podido añadir el pedido.')
          }
        })
      })
      .then(response => {
        getCustomers();
        getOrders();
      })
      .catch(error => {
        console.log(error)
        navigate('/error')
      })
    }
    catch(error){
      console.log(error)
      navigate('/error')
    }
  }

  // Función realizada por Amazon CodeWhisperer.
  // Función que permite enviar un correo a través de la base de datos del puerto 8000. Para ello se realiza una petición post pasando el texto con el body en formato JSON.
  //La URL de la petición es la siguiente: http://localhost:8000/send_email/{correo}/{asunto}, ya que se le pasa el correo del destinatario y el asunto del correo en el path.
  //En caso de que la petición no se haya realizado correctamente, se lanza una excepción y se redirige a la página de error.
  const sendEmailCodeWhisperer = (correo, asunto, texto) => {
    try {
      fetch(`http://localhost:8000/send_email/${correo}/${asunto}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({texto})
      })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        navigate('/error');
      })
    } catch (error) {
      navigate('/error');
    }
  }

  return (
    <div className="App">
      <Header customer_selected={customer_selected} selectCustomer={selectCustomer}/>
      <Routes>
        <Route path="/" element={<MainPage order_table={order_table} package_table={package_table} setorder_selected={setorder_selected} customer_selected={customer_selected}/>}/>
        <Route path="/iniciar-sesion" element={<Login customer_table={customer_table} clearCustomersPasswordsTries={clearCustomersPasswordsTries} setcustomer_Password_Try={setcustomer_Password_Try} selectCustomer={selectCustomer} relogin={relogin} setrelogin={setrelogin} sendEmail={sendEmail} cifrateNewCustomerPassword={cifrateNewCustomerPassword}/>}/>
        <Route path="/registrarse" element={<Signup customer_table={customer_table} selectCustomer={selectCustomer} addNewCustomer={addNewCustomer} setrelogin={setrelogin} sendEmail={sendEmail}/>}/>
        <Route path="/modificar-perfil" element={<ModifyProfile customer_selected={customer_selected} setCustomer={setCustomer}/>}/>
        <Route path="/pedido=/:OrderId" element={<ViewOrder order_selected={order_selected} package_table={package_table} customer_selected={customer_selected} order_table={order_table}/>}/>
        <Route path="/pedido=/:OrderId/devolución" element={<ReturnView order_selected={order_selected} customer_selected={customer_selected} order_table={order_table} setcost={setcost}/>}/>
        <Route path="/enviar-paquete" element={<SendOrder customer_selected={customer_selected} packages={packages} setpackages={setpackages} customer_table={customer_table} employee_table={employee_table} order_table={order_table} setcustomer_created={setcustomer_created} customer_created={customer_created} order={order} setorder={setorder} sendOrder={sendOrder} sendPackage={sendPackage} setcost={setcost} sendEmail={sendEmail}/>}/>
        <Route path="/enviar-paquete/paquete/:PackageNumber" element={<SendPackage setpackages={setpackages} packages={packages}/>}/>
        <Route path="/enviar-paquete/:OrderId/pagar" element={<Pay cost={cost} payOrder={payOrder}/>}/>
        <Route path="/devolver-pedido/:OrderId/pago" element={<Pay cost={cost} returnOrder={returnOrder} order_table={order_table} sendEmail={sendEmail} customer_selected={customer_selected}/>}/>
        <Route path="/*" element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;