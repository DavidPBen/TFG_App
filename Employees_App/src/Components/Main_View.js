import './Main_View.css';
import { useState,useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import Error from './Error/Error';
import Delivery from './Delivery/Delivery';
import CustomerService from './CustomerService/CustomerService';
import Manager from './Manager/Manager';
import CustomerAdd from './Editors/CustomerAdd';
import CustomerEdition from './Editors/CustomerEdition';
import EmployeeAdd from './Editors/EmployeeAdd';
import EmployeeEdition from './Editors/EmployeeEdition';
import OrderAdd from './Editors/OrderAdd';
import OrderEdition from './Editors/OrderEdition';
import PacketAdd from './Editors/PacketAdd';
import PacketEdition from './Editors/PacketEdition';

// Componente que se encarga de renderizar componentes específicos dependiendo del rol del empleado que utiliza la aplicación.
export default function Main_View(props) {
    const [role, setRole] = useState();

    const navigate = useNavigate();

    // Función que se ejecuta al iniciar el componente. Asigna el rol del empleado y redirige a la ruta correspondiente.
    useEffect(() => {
        assign_Role()
    }, [props.employee])

    // Función que asigna el rol del empleado y redirige a la ruta correspondiente.
    const assign_Role = () => {
        if (!props.employee) {
            setRole('error')
            navigate('/main/error')
        }
        else if (props.employee.Role === 'repartidor') {
            setRole('delivery')
            navigate('/main/delivery')
        }
        else if (props.employee.Role === 'atención al cliente') {
            setRole('customer_service')
            navigate('/main/customer_service')
        }
        else if (props.employee.Role === 'manager') {
            setRole('manager')
            navigate('/main/manager')
        }
        else{
            setRole('error')
            navigate('/main/error')
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que asigna el role del empleado según el valor de Role de dicho empleado y redirige a la ruta correspondiente. Dependiendo si es reparidor, atención al cliente o manager. 
    // En caso contrario muestra error. Redirigiendo a la ruta de error.
    const assign_Role_Copilot = () => {
        if (props.employee.Role === 'delivery') {
            setRole('delivery')
            navigate('/delivery')
        } else if (props.employee.Role === 'customer_service') {
            setRole('customer_service')
            navigate('/customer_service')
        } else if (props.employee.Role === 'manager') {
            setRole('manager')
            navigate('/manager')
        } else {
            navigate('/error')
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que asigna el role del empleado según el valor de Role de dicho empleado y redirige a la ruta correspondiente. Dependiendo si es reparidor, atención al cliente o manager. 
    // En caso contrario muestra error. Redirigiendo a la ruta de error.
    const assign_Role_CodeWhisperer = () => {
        if (props.employee.Role === 'reparidor') {
            setRole('delivery')
            navigate('/delivery')
        } else if (props.employee.Role === 'atencion_al_cliente') {
            setRole('customer_service')
            navigate('/customer_service')
        } else if (props.employee.Role === 'manager') {
            setRole('manager')
            navigate('/manager')
        } else {
            navigate('/error')
        }
    }

    // Función realizada por Code GPT.
    // Función de flecha que asigna el role del empleado según el valor de Role de dicho empleado y redirige a la ruta correspondiente. Dependiendo si es reparidor, atención al cliente o manager. 
    // En caso contrario muestra error. Redirigiendo a la ruta de error.
    // const assign_Role_CodeGPT = (role) => {
    //     if (role === "Reparador") {
    //       setRole("Reparador");
    //       history.push("/reparador");
    //     } else if (role === "Atencion al Cliente") {
    //       setRole("Atencion al Cliente");
    //       history.push("/atencion-cliente");
    //     } else if (role === "Manager") {
    //       setRole("Manager");
    //       history.push("/manager");
    //     } else {
    //       history.push("/error");
    //     }
    // };

    return (
        <div className="Main_View">
            {role === 'delivery' &&
                <div className='delivery'>
                    <Routes>
                        <Route path="/delivery/*" element={<Delivery employee_ID={props.employee.Employee_Id} customer_table={props.customer_table} order_table={props.order_table} package_table={props.package_table} setOrderValue={props.setOrderValue}/>}/>
                    </Routes>
                </div>}
            {role === 'customer_service' &&
                <div className='customer_service'>
                    <Routes>
                        <Route path="/customer_service" element={<CustomerService customer_table={props.customer_table} order_table={props.order_table}/>}/>
                        <Route path="/customer_service/customer_edition/add" element={<CustomerAdd addNewCustomer={props.addNewCustomer} customer_table={props.customer_table}/>}/>
                        <Route path="/customer_service/customer_edition/:Customer_Id" element={<CustomerEdition customer_table={props.customer_table} setCustomer={props.setCustomer}/>}/>
                        <Route path="/customer_service/order_edition/add" element={<OrderAdd addNewOrder={props.addNewOrder} employee_table={props.employee_table} customer_table={props.customer_table} order_table={props.order_table} sendEmail={props.sendEmail}/>}/>
                        <Route path="/customer_service/order_edition/:Order_Id" element={<OrderEdition order_table={props.order_table} customer_table={props.customer_table} employee_table={props.employee_table} package_table={props.package_table} setOrderValue={props.setOrderValue}/>}/>
                        <Route path="/customer_service/order_edition/:Order_Id/packet_edition/add" element={<PacketAdd addNewPackage={props.addNewPackage}/>}/>
                        <Route path="/customer_service/order_edition/:Order_Id/packet_edition/:Package_Id" element={<PacketEdition package_table={props.package_table} setPackage={props.setPackage}/>}/>
                    </Routes>
                </div>
            }
            {role === 'manager' &&
                <div className='manager'>
                    <Routes>
                        <Route path="/manager" element={<Manager customer_table={props.customer_table} employee_table={props.employee_table} order_table={props.order_table}/>}/>
                        <Route path="/manager/customer_edition/add" element={<CustomerAdd addNewCustomer={props.addNewCustomer} customer_table={props.customer_table}/>}/>
                        <Route path="/manager/customer_edition/:Customer_Id" element={<CustomerEdition customer_table={props.customer_table} setCustomer={props.setCustomer}/>}/>
                        <Route path="/manager/employee_edition/add" element={<EmployeeAdd addNewEmployee={props.addNewEmployee} employee_table={props.employee_table}/>}/>
                        <Route path="/manager/employee_edition/:Employee_Id" element={<EmployeeEdition employee_table={props.employee_table} setEmployee={props.setEmployee}/>}/>
                        <Route path="/manager/order_edition/add" element={<OrderAdd addNewOrder={props.addNewOrder} employee_table={props.employee_table} customer_table={props.customer_table} order_table={props.order_table} sendEmail={props.sendEmail}/>}/>
                        <Route path="/manager/order_edition/:Order_Id" element={<OrderEdition order_table={props.order_table} customer_table={props.customer_table} employee_table={props.employee_table} package_table={props.package_table} setOrderValue={props.setOrderValue}/>}/>
                        <Route path="/manager/order_edition/:Order_Id/packet_edition/add" element={<PacketAdd addNewPackage={props.addNewPackage}/>}/>
                        <Route path="/manager/order_edition/:Order_Id/packet_edition/:Package_Id" element={<PacketEdition package_table={props.package_table} setPackage={props.setPackage}/>}/>
                    </Routes>
                </div>
            }
            {role === 'error' &&
                <div className='error'>
                    <Routes>
                        <Route path="/error" element={<Error/>}/>
                    </Routes>
                </div>
            }
        </div>
    );
}