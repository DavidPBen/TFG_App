import './OrderEdition.css';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

// Componente que renderiza el formulario para editar un pedido.
export default function OrderEdition(props) {
    let { Order_Id } = useParams();
    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    const [order, setorder] = useState();
    const [customer_Id, setcustomer_Id] = useState('');
    const [origin, setorigin] = useState('');
    const [destination, setdestination] = useState('');
    const [additional_Destination, setadditional_Destination] = useState();
    const [volume, setvolume] = useState('');
    const [cost, setcost] = useState('');
    const [state, setstate] = useState('');
    const [shipment_Type, setshipment_Type] = useState('');
    const [collection_Date, setcollection_Date] = useState();
    const [expected_Collection_Date, setexpected_Collection_Date] = useState('');
    const [arrival_Date, setarrival_Date] = useState();
    const [expected_Arrival_Date, setexpected_Arrival_Date] = useState('');
    const [return_Date, setreturn_Date] = useState('');
    const [expected_Return_Date, setexpected_Return_Date] = useState('');
    const [commentary, setcommentary] = useState();
    const [employee_In_Charge, setemployee_In_Charge] = useState('');
    const [active, setactive] = useState();
    const [return_order, setreturn_order] = useState(false);
    
    // Función que se ejecuta al iniciar el componente. Se encarga de rellenar los campos del formulario con los datos del pedido.
    useEffect(() => {
        chooseOrder()
    }, [props.order_table, props.package_table])

    // Función que rellena los campos del formulario con los datos del pedido.
    const chooseOrder = () => {
        if(props.order_table === undefined || props.package_table === undefined){
            return
        } 
        const order_localized = (props.order_table.find((order) => order.Id == Order_Id))
        setcustomer_Id(order_localized.Customer_Id)
        setorigin(order_localized.Origin)
        setdestination(order_localized.Destination)
        setadditional_Destination(order_localized.Additional_Destination)
        setstate(order_localized.State)
        if(order_localized.State === 'En devolución - En trámite' || order_localized.State === 'En devolución - En almacén origen' || order_localized.State === 'En devolución - En camino' || order_localized.State === 'En devolución - En almacén destino' || order_localized.State === 'En devolución - Entregado'){
            setreturn_order(true)
        }
        setreturn_Date(obtainReturnDate(order_localized))
        setexpected_Return_Date(obtainExpectedReturnDate(order_localized))
        setshipment_Type(order_localized.Shipment_Type)
        setcollection_Date(obtainCollectionDate(order_localized))
        setexpected_Collection_Date(obtainExpectedCollectionDate(order_localized))
        setarrival_Date(obtainArrivalDate(order_localized))
        setexpected_Arrival_Date(obtainExpectedArrivalDate(order_localized))
        setcommentary(order_localized.Commentary)
        setemployee_In_Charge(order_localized.Employee_In_Charge)
        order_localized.Active ? setactive(true) : setactive(false)
        setorder(order_localized)
        calculateCost(order_localized?.Shipment_Type, order_localized?.State)
        calculateVolume()
    }

    // Función realizada por GitHub Copilot.
    // Función que rellena los campos del formulario con los datos del pedido de la base de datos. Añadiendo los datos de las fechas de devolución en caso de que el estado contenga "En devolución".
    const chooseOrderCopilot = () => {
        if(props.order_table.length > 0 && props.package_table.length > 0){
            var order = props.order_table.find(order => order.Order_Id === parseInt(Order_Id))
            setorder(order)
            setcustomer_Id(order.Customer_Id)
            setorigin(order.Origin)
            setdestination(order.Destination)
            setadditional_Destination(order.Additional_Destination)
            setvolume(order.Volume)
            setcost(order.Cost)
            setstate(order.State)
            setshipment_Type(order.Shipment_Type)
            setcollection_Date(order.Collection_Date)
            setexpected_Collection_Date(order.Expected_Collection_Date)
            setarrival_Date(order.Arrival_Date)
            setexpected_Arrival_Date(order.Expected_Arrival_Date)
            setreturn_Date(order.Return_Date)
            setexpected_Return_Date(order.Expected_Return_Date)
            setcommentary(order.Commentary)
            setemployee_In_Charge(order.Employee_In_Charge)
            setactive(order.Active)
            if(order.State.includes('En devolución')){
                setreturn_order(true)
            }
        }
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que rellena los campos del formulario con los datos del pedido de la base de datos. Añadiendo los datos de las fechas de devolución en caso de que el estado contenga "En devolución".
    const chooseOrderCodeWhisperer = () => {
        if (order.State === 'En devoluci�3n') {
            setreturn_order(true)
            setreturn_Date(order.Return_Date)
            setexpected_Return_Date(order.Expected_Return_Date)
        }
        setcustomer_Id(order.Customer_Id)
        setorigin(order.Origin)
        setdestination(order.Destination)
        setadditional_Destination(order.Additional_Destination)
        setvolume(order.Volume)
        setcost(order.Cost)
        setstate(order.State)
        setshipment_Type(order.Shipment_Type)
        setcollection_Date(order.Collection_Date)
        setexpected_Collection_Date(order.Expected_Collection_Date)
        setarrival_Date(order.Arrival_Date)
        setexpected_Arrival_Date(order.Expected_Arrival_Date)
        setcommentary(order.Commentary)
        setemployee_In_Charge(order.Employee_In_Charge)
        setactive(order.Active)
    }
    
    // Función que se encarga de actualizar los datos del pedido en la base de datos cuando verifican dichos valores. En caso contrario, muestra una alerta.
    const applyChanges = () => {
        var order_accepted = true
        var order_validated = false
        if(customer_Id !== order.Customer_Id){
            if(verifyCustomer_Id()){
                props.setOrderValue(Order_Id, 'Customer_Id', customer_Id)
                order_validated = true
            }
            else{
                alert ('Id del cliente no válido')
                order_accepted = false
            }
        }
        if(origin !== order.Origin){
            if(verifyOrigin()){
                props.setOrderValue(Order_Id, 'Origin', origin)
                order_validated = true
            }
            else{
                alert ('Origen no válido')
                order_accepted = false
            }
        }
        if(destination !== order.Destination){
            if(verifyDestination()){
                props.setOrderValue(Order_Id, 'Destination', destination)
                order_validated = true
            }
            else{
                alert ('Destino no válido')
                order_accepted = false
            }
        }
        if(additional_Destination !== order.Additional_Destination){
            props.setOrderValue(Order_Id, 'Additional_Destination', additional_Destination)
            order_validated = true
        }
        if(volume !== order.Volume){
            if(verifyVolume()){
                props.setOrderValue(Order_Id, 'Volume', volume)
                order_validated = true
            }
            else{
                alert ('Volumen no válido')
                order_accepted = false
            }
        }
        if(cost !== order.Cost){
            if(verifyCost()){
                props.setOrderValue(Order_Id, 'Cost', cost)
                order_validated = true
            }
            else{
                alert ('Coste no válido')
                order_accepted = false
            }
        }
        if(state !== order.State){
            if(verifyState()){
                props.setOrderValue(Order_Id, 'State', state)
                order_validated = true
            }
            else{
                if(return_order){
                    alert ('Estado, fecha de devolución, fecha de devolución esperada, fecha de recogida o fecha de llegada no válidas')
                }
                else{
                    alert('Estado, fecha de recogida o fecha de llegada no válidas')
                }
                order_accepted = false
            }
        }
        if(return_order){
            if(return_Date != obtainReturnDate(order)){
                props.setOrderValue(Order_Id, 'Return_Date', return_Date)
                order_validated = true
            }
            if(expected_Return_Date != obtainExpectedReturnDate(order)){
                if(verifyExpected_Return_Date()){
                    props.setOrderValue(Order_Id, 'Expected_Return_Date', expected_Return_Date)
                    order_validated = true
                }
                else{
                    alert ('Por favor, introduzca una fecha de devolución esperada válida')
                    order_accepted = false
                }
            }
        }
        if(shipment_Type !== order.Shipment_Type){
            if(verifyShipment_Type()){
                props.setOrderValue(Order_Id, 'Shipment_Type', shipment_Type)
                order_validated = true
            }
            else{
                alert ('Tipo de envío no válido')
                order_accepted = false
            }
        }
        if(collection_Date != obtainCollectionDate(order)){
            props.setOrderValue(Order_Id, 'Collection_Date', collection_Date)
            order_validated = true
        }
        if(expected_Collection_Date != obtainExpectedCollectionDate(order)){
            if(verifyExpected_Collection_Date()){
                props.setOrderValue(Order_Id, 'Expected_Collection_Date', expected_Collection_Date)
                order_validated = true
            }
            else{
                alert ('Por favor, introduzca una fecha de recogida esperada válida')
                order_accepted = false
            }
        }
        if(arrival_Date != obtainArrivalDate(order)){
            props.setOrderValue(Order_Id, 'Arrival_Date', arrival_Date)
            order_validated = true
        }
        if(expected_Arrival_Date != obtainExpectedArrivalDate(order)){
            if(verifyExpected_Arrival_Date()){
                props.setOrderValue(Order_Id, 'Expected_Arrival_Date', expected_Arrival_Date)
                order_validated = true
            }
            else{
                alert ('Por favor, introduzca una fecha de llegada esperada válida')
                order_accepted = false
            }
        }
        if(commentary !== order.Commentary){
            props.setOrderValue(Order_Id, 'Commentary', commentary)
            order_validated = true
        }
        if(employee_In_Charge !== order.Employee_In_Charge){
            if(verifyEmployee_In_Charge()){
                props.setOrderValue(Order_Id, 'Employee_In_Charge', employee_In_Charge)
                order_validated = true
            }
            else{
                alert ('Id del empleado a cargo no válido')
                order_accepted = false
            }
        }
        const active_field = (active === true ? 1 : 0)
        if(active_field !== order.Active){
            props.setOrderValue(Order_Id, 'Active', active_field)
            order_validated = true
        }
        if(order_accepted && order_validated){
            navigate(-1)
        }
    }

    // Función que se encarga de verificar que el Id del cliente sea válido y que exista en la base de datos.
    const verifyCustomer_Id = () => {
        const possibleCustomer = props.customer_table?.find((customer) => customer.Id == customer_Id)
        if(!customer_Id.match(/^[0-9]+$/) || !(possibleCustomer)){
            return false
        }
        else{
            return true
        }
    }

    // Función que se encarga de verificar el campo origen del pedido.
    const verifyOrigin = () => {
        if(origin === ''){
            return false
        }
        else{
            return true
        }
    }

    // Función que se encarga de verificar el campo destino del pedido.
    const verifyDestination = () => {
        if(destination === ''){
            return false
        }
        else{
            return true
        }
    }

    // Función que se encarga de verificar el campo volumen del pedido.
    const verifyVolume = () => {
        if(volume < 0 || volume == ''){
            return false
        }
        return true
    }

    // Función que se encarga de verificar el campo coste del pedido.
    const verifyCost = () => {
        if(cost < 0 || cost == ''){
            return false
        }
        return true
    }

    // Función que se encarga de verificar el campo estado del pedido. Además, se verifica que deben estar las fechas correspondientes a cada estado.
    const verifyState = () => {     
        if (state === '' || (collection_Date === 'undefined-undefined-undefined NaN:undefined' && state !== 'En trámite') || (arrival_Date === 'undefined-undefined-undefined NaN:undefined' && state === 'Entregado')) {
            return false
        }
        if(return_order){
            if(((state === 'En devolución - En trámite' || state === 'En devolución - En almacén origen' || state === 'En devolución - En camino' || state === 'En devolución - En almacén destino' || state === 'En devolución - Entregado') && expected_Return_Date === 'undefined-undefined-undefined NaN:undefined') || (state === 'En devolución - Entregado' && return_Date === 'undefined-undefined-undefined NaN:undefined')){
                return false
            }     
            return true
        }
        return true
    }

    // Función que se encarga de verificar el campo tipo de envío del pedido.
    const verifyShipment_Type = () => {
        if(shipment_Type === ''){
            return false
        }
        else{
            return true
        }
    }

    // Función que se encarga de verificar el campo fecha de recogida esperada del pedido.
    const verifyExpected_Collection_Date = () => {
        if (expected_Collection_Date === '') {
            return false
        }
        else if(translateDate()){
            return true;
        }
        else{
            return false;
        }
    }

    // Función que se encarga de verificar el campo fecha de entrega esperada del pedido.
    const verifyExpected_Arrival_Date = () => {
        if (expected_Arrival_Date === '') {
            return false
        }
        else if(translateDate()){
            return true;
        }
        else{
            return false;
        }
    }

    // Función que se encarga de verificar el campo fecha de devolución esperada del pedido.
    const verifyExpected_Return_Date = () => {
        if (expected_Return_Date === '') {
            return false
        }
        else if(translateReturnDate()){
            return true;
        }
        else{
            return false;
        }
    }

    // Función que se encarga de verificar el campo empleado encargado del pedido.
    const verifyEmployee_In_Charge = () => {
        const possibleEmployee = props.employee_table?.find((employee) => employee.Employee_Id == employee_In_Charge)
        if (!employee_In_Charge.match(/^[0-9]+$/) || !possibleEmployee) {
            return false
        }
        return true
    }

    // Función que se encarga de obtener la fecha de recogida esperada de un pedido.
    const obtainExpectedCollectionDate = (order) => {
        return ((order?.Expected_Collection_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Collection_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Collection_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Collection_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de entrega esperada de un pedido.
    const obtainExpectedArrivalDate = (order) => {
        return ((order?.Expected_Arrival_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Arrival_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Arrival_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Arrival_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de devolución esperada de un pedido.
    const obtainExpectedReturnDate = (order) => {
        return ((order?.Expected_Return_Date?.toString().substr(8,2)) +'-'+ (order?.Expected_Return_Date?.toString().substr(5,2)) +'-'+ (order?.Expected_Return_Date?.toString().substr(0,4)) +' '+ (+(order?.Expected_Return_Date?.toString().substr(11,2))+1) +':'+ (order?.Expected_Return_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de recogida de un pedido.
    const obtainCollectionDate = (order) => {
        return ((order?.Collection_Date?.toString().substr(8,2)) +'-'+ (order?.Collection_Date?.toString().substr(5,2)) +'-'+ (order?.Collection_Date?.toString().substr(0,4)) +' '+ (+(order?.Collection_Date?.toString().substr(11,2))+1) +':'+ (order?.Collection_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de entrega de un pedido.
    const obtainArrivalDate = (order) => {
        return ((order?.Arrival_Date?.toString().substr(8,2)) +'-'+ (order?.Arrival_Date?.toString().substr(5,2)) +'-'+ (order?.Arrival_Date?.toString().substr(0,4)) +' '+ (+(order?.Arrival_Date?.toString().substr(11,2))+1) +':'+ (order?.Arrival_Date?.toString().substr(14,2)))
    }

    // Función que se encarga de obtener la fecha de devolución de un pedido.
    const obtainReturnDate = (order) => {
        return ((order?.Return_Date?.toString().substr(8,2)) +'-'+ (order?.Return_Date?.toString().substr(5,2)) +'-'+ (order?.Return_Date?.toString().substr(0,4)) +' '+ (+(order?.Return_Date?.toString().substr(11,2))+1) +':'+ (order?.Return_Date?.toString().substr(14,2)))
    }

    // Función que calcula el coste de un pedido en función de su peso y tipo de envío. Tiene en cuenta los paquetes que contiene el pedido.
    // Está diseñada con los costes asociados a Correos, excepto en las devoluciones, que está basado en en SEUR.
    const calculateCost = (shipment_Type_field, state_field) => {
        var cost = 0
        var weight = 0
        props.package_table?.map((packet) => {
            if(packet.Order_Id == Order_Id){
                weight = weight + packet.Weight;
            }
        })
        if(weight <= 1 && shipment_Type_field === 'Normal'){
            cost=12.75;
        }
        else if(weight > 1 && weight <= 5 && shipment_Type_field === 'Normal'){
            cost=15.95;
        }
        else if(weight > 5 && weight <= 10 && shipment_Type_field === 'Normal'){
            cost=21.4;
        }
        else if(weight > 10 && weight <= 15 && shipment_Type_field === 'Normal'){
            cost=25.95;
        }
        else if(weight > 15 && weight <= 20 && shipment_Type_field === 'Normal'){
            cost=31.4;
        }
        else if(weight > 20 && weight <= 25 && shipment_Type_field === 'Normal'){
            cost=36.4;
        }
        else if(weight > 25 && weight <= 30 && shipment_Type_field === 'Normal'){
            cost=41.3;
        }
        else if(weight > 30 && shipment_Type_field === 'Normal'){
            cost = 41.3 + (weight-30)*1.25;
        }
        else if(weight <= 1 && shipment_Type_field === 'Rápido'){
            cost=14.3;
        }
        else if(weight > 1 && weight <= 5 && shipment_Type_field === 'Rápido'){
            cost=17.65;
        }
        else if(weight > 5 && weight <= 10 && shipment_Type_field === 'Rápido'){
            cost=23.1;
        }
        else if(weight > 10 && weight <= 15 && shipment_Type_field === 'Rápido'){
            cost=27.5;
        }
        else if(weight > 15 && weight <= 20 && shipment_Type_field === 'Rápido'){
            cost=33.5;
        }
        else if(weight > 20 && weight <= 25 && shipment_Type_field === 'Rápido'){
            cost=39.65;
        }
        else if(weight > 25 && weight <= 30 && shipment_Type_field === 'Rápido'){
            cost=45.65;
        }
        else if(weight > 30 && shipment_Type_field === 'Rápido'){
            cost = 45.65 + (weight-30)*1.29;
        }
        if(state_field !== 'En devolución - En trámite' && state_field !== 'En devolución - En almacén origen' && state_field !== 'En devolución - En camino' && state_field !== 'En devolución - En almacén destino' && state_field !== 'En devolución - Entregado'){
            setcost(cost.toFixed(2))
        }
        else{
            if(cost*0.056 < 7.09){
                cost = cost + 7.09
                setcost(cost.toFixed(2))
            }
            else if(cost*0.056 > 138.53){
                cost = cost + 138.53
                setcost(cost.toFixed(2))
            }
            else{
                cost = cost + cost*0.056
                setcost(cost.toFixed(2))
            }
        }
    }

    // Función realizada por GitHub Copilot.
    // Función que calcula el coste del pedido en función del peso del mismo. Está basada en Correos, con un coste extra para devoluciones.
    //Almacena el coste en la variable "cost".
    const calculateCostCopilot = (cost, weight) => {
        var cost = 0
        if (weight < 1) {
            cost = 4.5
        }
        else if (weight < 2) {
            cost = 5.5
        }
        else if (weight < 5) {
            cost = 6.5
        }
        else if (weight < 10) {
            cost = 7.5
        }
        else if (weight < 20) {
            cost = 8.5
        }
        else if (weight < 30) {
            cost = 9.5
        }
        else if (weight < 40) {
            cost = 10.5
        }
        else if (weight < 50) {
            cost = 11.5
        }
        else if (weight < 60) {
            cost = 12.5
        }
        else if (weight < 70) {
            cost = 13.5
        }
        else if (weight < 80) {
            cost = 14.5
        }
        else if (weight < 90) {
            cost = 15.5
        }
        else if (weight < 100) {
            cost = 16.5
        }
        else if (weight < 150) {
            cost = 17.5
        }
        else if (weight < 200) {
            cost = 18.5
        }
        else if (weight < 250) {
            cost = 19.5
        }
        else if (weight < 300) {
            cost = 20.5
        }
        else if (weight < 350) {
            cost = 21.5
        }
        else if (weight < 400) {
            cost = 22.5
        }
        else if (weight < 450) {
            cost = 23.5
        }
        else if (weight < 500) {
            cost = 24.5
        }
        else if (weight < 550) {
            cost = 25.5
        }
        else if (weight < 600) {
            cost = 26.5
        }
        else {
            cost = 27.5
        }
        if (state === 'En devolución - En trámite' || state === 'En devolución - En almacén origen' || state === 'En devolución - En camino' || state === 'En devolución - En almacén destino' || state === 'En devolución - Entregado') {
            cost = cost + 2
        }
        setcost(cost.toFixed(2))
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que calcula el coste del pedido en función del peso del mismo. Está basada en Correos, con un coste extra para devoluciones.
    //Almacena el coste en la variable "cost".
    const calculateCostCodeWhisperer = (cost, weight) => {
        if (weight <= 1) {
            cost = 0.5
        } else if (weight <= 3) {
            cost = 1
        } else if (weight <= 5) {
            cost = 2
        } else if (weight <= 10) {
            cost = 3
        } else {
            cost = 4
        }
        setcost(cost.toFixed(2))
    }

    // Función que calcula el volumen de un pedido en función de los paquetes que contiene el pedido.
    const calculateVolume = () => {
        var volume = 0
        props.package_table?.map((packet) => {
            if(packet.Order_Id == Order_Id){
                volume = volume + packet.Volume;
            }
        })
        setvolume(volume.toFixed(2))
    }

    // Función realizada por GitHub Copilot.
    // Función que calcula el volumen de un pedido en función de los paquetes que contiene el pedido (el Id del pedido es el mismo que el asociado en el paquete en Order_Id).
    //Almacena el volumen en la variable "volume".
    const calculateVolumeCopilot = (packages, id) => {
        var volume = 0
        for (let i = 0; i < packages.length; i++) {
            if (packages[i].Order_Id === id) {
                volume = volume + packages[i].Length * packages[i].Width * packages[i].Height
            }
        }
        setvolume(volume)
    }

    // Función realizada por Amazon CodeWhisperer.
    // Función que calcula el volumen de un pedido en función de los paquetes que contiene el pedido (el Id del pedido es el mismo que el asociado en el paquete en Order_Id).
    //Almacena el volumen en la variable "volume".
    const calculateVolumeCodeWhisperer = (packages, id) => {
        var volume = 0
        for (var i = 0; i < packages.length; i++) {
            if (packages[i].Order_Id === id) {
                volume = volume + packages[i].Weight
            }
        }
        setvolume(volume.toFixed(2))
    }

    // Función que se encarga de cambiar el estado de un pedido. Si el estado es de devolución, se muestran los campos "Fecha de devolución" y "Fecha prevista de devolución".
    const changeState = (actual_state) => {
        setstate(actual_state)
        calculateCost(shipment_Type, actual_state)
        if(actual_state === 'En devolución - En trámite' || actual_state === 'En devolución - En almacén origen' || actual_state === 'En devolución - En camino' || actual_state === 'En devolución - En almacén destino' || actual_state === 'En devolución - Entregado'){
            setreturn_order(true)
        }
        else{
            setreturn_order(false)
        }
    }

    // Función que se encarga de cambiar el tipo de envío de un pedido.
    const changeShipmentType = (actual_shipment_type) => {
        setshipment_Type(actual_shipment_type)
        calculateCost(actual_shipment_type, state)
    }

    // Función que comprueba que han pasado los días mínimos obligatorios entre las fechas esperadas.
    const translateDate = () => {
        let collection_Date = expected_Collection_Date;
        let arrival_Date = expected_Arrival_Date;
        let collectionyear = expected_Collection_Date.substr(0, 4);
        let collectionmonth = expected_Collection_Date.substr(5,2);
        let collectionday = expected_Collection_Date.substr(8,2);
        let arrivalyear = expected_Arrival_Date.substr(0, 4);
        let arrivalmonth = expected_Arrival_Date.substr(5,2);
        let arrivalday = expected_Arrival_Date.substr(8,2);
        if(collectionyear.includes("-")){
            collectionyear = expected_Collection_Date.substr(6, 4);
            collectionmonth = expected_Collection_Date.substr(3,2);
            collectionday = expected_Collection_Date.substr(0,2);
            collection_Date = collectionyear + "-" + collectionmonth + "-" + collectionday;
        }
        if(arrivalyear.includes("-")){
            arrivalyear = expected_Arrival_Date.substr(6, 4);
            arrivalmonth = expected_Arrival_Date.substr(3,2);
            arrivalday = expected_Arrival_Date.substr(0,2);
            arrival_Date = arrivalyear + "-" + arrivalmonth + "-" + arrivalday;
        }
        if(shipment_Type == "Normal"){
            if(new Date(collection_Date) >= new Date(arrival_Date)){
                return false;
            }else if(collectionmonth == arrivalmonth && collectionyear == arrivalyear){
                if(+arrivalday - collectionday < 5){
                    return false;
                }
                else{
                    return true;
                }
            }else if(collectionyear == arrivalyear && +collectionmonth+1 == +arrivalmonth){
                let daysInMonth = new Date(collectionyear, collectionmonth, 0).getDate();
                if(+arrivalday + (daysInMonth - collectionday) < 5){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+collectionyear+1 == +arrivalyear && collectionmonth == 12 && arrivalmonth == 1){
                if(+arrivalday + (31 - collectionday) < 5){
                    return false;
                }
                else{
                    return true;
                }
            }else{
                return true;
            }
        }else{
            if(new Date(collection_Date) >= new Date(arrival_Date)){
                return false;
            }else if(collectionmonth == arrivalmonth && collectionyear == arrivalyear){
                if(+arrivalday - collectionday < 2){
                    return false;
                }
                else{
                    return true;
                }
            }else if(collectionyear == arrivalyear && +collectionmonth+1 == +arrivalmonth){
                let daysInMonth = new Date(collectionyear, collectionmonth, 0).getDate();
                if(+arrivalday + (daysInMonth - collectionday) < 2){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+collectionyear+1 == +arrivalyear && collectionmonth == 12 && arrivalmonth == 1){
                if(+arrivalday + (31 - collectionday) < 2){
                    return false;
                }
                else{
                    return true;
                }
            }else{
                return true;
            }
        }
    }

    // Función que comprueba que han pasado los días mínimos obligatorios entre las fechas de devolución esperadas.
    const translateReturnDate = () => {
        let collection_Date = expected_Collection_Date;
        let arrival_Date = expected_Arrival_Date;
        let return_Date = expected_Return_Date;
        let collectionyear = expected_Collection_Date.substr(0, 4);
        let collectionmonth = expected_Collection_Date.substr(5,2);
        let collectionday = expected_Collection_Date.substr(8,2);
        let arrivalyear = expected_Arrival_Date.substr(0, 4);
        let arrivalmonth = expected_Arrival_Date.substr(5,2);
        let arrivalday = expected_Arrival_Date.substr(8,2);
        let returnyear = expected_Return_Date.substr(0, 4);
        let returnmonth = expected_Return_Date.substr(5,2);
        let returnday = expected_Return_Date.substr(8,2);
        if(collectionyear.includes("-")){
            collectionyear = expected_Collection_Date.substr(6, 4);
            collectionmonth = expected_Collection_Date.substr(3,2);
            collectionday = expected_Collection_Date.substr(0,2);
            collection_Date = collectionyear + "-" + collectionmonth + "-" + collectionday;
        }
        if(arrivalyear.includes("-")){
            arrivalyear = expected_Arrival_Date.substr(6, 4);
            arrivalmonth = expected_Arrival_Date.substr(3,2);
            arrivalday = expected_Arrival_Date.substr(0,2);
            arrival_Date = arrivalyear + "-" + arrivalmonth + "-" + arrivalday;
        }
        if(returnyear.includes("-")){
            returnyear = expected_Return_Date.substr(6, 4);
            returnmonth = expected_Return_Date.substr(3,2);
            returnday = expected_Return_Date.substr(0,2);
            return_Date = returnyear + "-" + returnmonth + "-" + returnday;
        }
        if(state == "En devolución - En almacén destino"){
            if(new Date(collection_Date) >= new Date(return_Date)){
                return false;
            }else if(collectionmonth == returnmonth && collectionyear == returnyear){
                if(+returnday - collectionday < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(collectionyear == returnyear && +collectionmonth+1 == +returnmonth){
                let daysInMonth = new Date(collectionyear, collectionmonth, 0).getDate();
                if(+returnday + (daysInMonth - collectionday) < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+collectionyear+1 == +returnyear && collectionmonth == 12 && returnmonth == 1){
                if(+returnday + (31 - collectionday) < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else{
                return true;
            } 
        } else {   
            if(new Date(arrival_Date) >= new Date(return_Date)){
                return false;
            }
            else if(arrivalmonth == returnmonth && arrivalyear == returnyear){
                if(+returnday - arrivalday < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(arrivalyear == returnyear && +arrivalmonth+1 == +returnmonth){
                let daysInMonth = new Date(arrivalyear, arrivalmonth, 0).getDate();
                if(+returnday + (daysInMonth - arrivalday) < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else if(+arrivalyear+1 == +returnyear && arrivalmonth == 12 && returnmonth == 1){
                if(+returnday + (31 - arrivalday) < 7){
                    return false;
                }
                else{
                    return true;
                }
            }else{
                return true;
            } 
        }
    }

    return (
        <div className="OrderEdition">
            <div className='OrderEdition_title'>
                <h1>Editar un pedido</h1>
            </div>
            <div className='OrderEdition_form'>
                <div className='OrderEdition_Id'>
                    <h5>Id del pedido = {Order_Id}</h5>
                    <h6>Número de expedición = {order?.Expedition_Number}</h6>
                    <br></br>
                </div>
                <FloatingLabel controlId="floatingOrderCustomer_Id" label="Id del cliente*" className="mb-3" onChange={(e) => {setcustomer_Id(e.target.value)}}>
                    <Form.Control type="number" placeholder="Id del cliente" value={customer_Id}/>  
                    <Form.Text className='form_text'>
                        El Id del cliente debe ser el Id proporcionado en la base de datos.
                    </Form.Text> 
                </FloatingLabel>
                <FloatingLabel controlId="floatingOrderOrigin" label="Origen *" className="mb-3" onChange={(e) => {setorigin(e.target.value)}}>
                    <Form.Control type="text" placeholder="Origen" value={origin}/>
                    <Form.Text className='form_text'>
                        La dirección de origen debe ser una calle, un número, un piso, una puerta y un código postal.
                    </Form.Text> 
                </FloatingLabel>
                <FloatingLabel controlId="floatingOrderDestination" label="Destino *" className="mb-3" onChange={(e) => {setdestination(e.target.value)}}>
                    <Form.Control type="text" placeholder="Destino" value={destination}/>
                    <Form.Text className='form_text'>
                        La dirección de destino debe ser una calle, un número, un piso, una puerta y un código postal.
                    </Form.Text>
                </FloatingLabel>
                <FloatingLabel controlId="floatingOrderAdditional_Destination" label="Destino adicional" className="mb-3" onChange={(e) => {setadditional_Destination(e.target.value)}}>
                    <Form.Control type="text" placeholder="Destino adicional" value={additional_Destination}/>
                    <Form.Text className='form_text'>
                        La dirección de destino adicional debe ser una calle, un número, un piso, una puerta y un código postal.
                    </Form.Text> 
                </FloatingLabel>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-5'>
                            <p className='OrderEdition_volume_cost'>Volumen = <b>{volume}cm<sup>3</sup></b></p>
                        </div>
                        <div className='col-6'>
                            <p className='OrderEdition_volume_cost'>Coste = <b>{cost}€</b></p>
                        </div>
                    </div>
                </div>
                <FloatingLabel controlId="floatingOrderState" label="Estado del pedido *" className="mb-3">
                    <Form.Select className='customer_service_form_state' value={state} key={'selector_state'} onChange={(e) => changeState(e.target.value)}>
                                                <option>En trámite</option>
                                                <option>En almacén origen</option>
                                                <option>En camino</option>
                                                <option>En almacén destino</option>
                                                <option>Entregado</option>
                                                <option>En devolución - En trámite</option>
                                                <option>En devolución - En almacén origen</option>
                                                <option>En devolución - En camino</option>
                                                <option>En devolución - En almacén destino</option>
                                                <option>En devolución - Entregado</option>
                    </Form.Select>
                    <Form.Text className='form_text'>
                        Si el estado no es 'En trámite' la fecha de recogida debe añadirse. Si es 'Entregado' la fecha de llegada también debe añadirse.
                    </Form.Text> 
                    {return_order ? <Form.Text className='form_text'>Si el estado es 'En devolución - Entregado' la fecha de devolución debe añadirse.</Form.Text> : null}
                </FloatingLabel>
                {return_order ? 
                    <div>
                        <Form.Text className='form_text'>Fecha de devolución</Form.Text>
                        <InputGroup  controlId="floatingOrderReturn_Date" label="Fecha de devolución" className="mb-3" onChange={(e) => {setreturn_Date(e.target.value)}}>
                            {obtainReturnDate(order) != "undefined-undefined-undefined NaN:undefined" ? <Form.Label className='form_dates'>{obtainReturnDate(order)}</Form.Label> : <Form.Label className='form_dates'>Sin fecha</Form.Label>}
                            <Form.Control type="datetime-local" placeholder="Fecha de devolución" value={return_Date}/> 
                        </InputGroup>
                        <Form.Text className='form_text'>Fecha de devolución esperada *</Form.Text>
                        <InputGroup  controlId="floatingOrderExpected_Return_Date" label="Fecha de devolución esperada" className="mb-3" onChange={(e) => {setexpected_Return_Date(e.target.value)}}>
                            {obtainExpectedReturnDate(order) != "undefined-undefined-undefined NaN:undefined" ? <Form.Label className='form_dates'>{obtainExpectedReturnDate(order)}</Form.Label> : <Form.Label className='form_dates'>Sin fecha</Form.Label>}
                            <Form.Control type="datetime-local" placeholder="Fecha de devolución esperada" value={expected_Return_Date}/> 
                        </InputGroup>
                        <Form.Text className='form_text_date'>
                                Deben pasar al menos 7 días entre la fecha esperada de devolución y la fecha de recogida si el pedido no ha sido enviado. Si el pedido se encuentra enviado, deben pasar al menos 7 días entre la fecha esperada de devolución y la fecha de llegada.
                        </Form.Text>
                    </div>
                : null}
                <FloatingLabel controlId="floatingOrderShipment_Type" label="Tipo de envío *" className="mb-3">
                    <Form.Select className='customer_service_form_shipment_Type' value={shipment_Type} key={'selector_shipment_Type'} onChange={(e) => changeShipmentType(e.target.value)}>
                                                <option>Normal</option>
                                                <option>Rápido</option>
                    </Form.Select>
                </FloatingLabel>
                <Form.Text className='form_text_date'>
                    Debe haber al menos 5 días de diferencia entre la fecha esperada de recogida y entrega en el caso de un pedido "Normal" y 2 días en el caso de un pedido "Rápido".
                </Form.Text>
                <Form.Text className='form_text'>Fecha de recogida</Form.Text>
                <InputGroup  controlId="floatingOrderCollection_Date" label="Fecha de recogida" className="mb-3" onChange={(e) => {setcollection_Date(e.target.value)}}>
                    {obtainCollectionDate(order) != "undefined-undefined-undefined NaN:undefined" ? <Form.Label className='form_dates'>{obtainCollectionDate(order)}</Form.Label> : <Form.Label className='form_dates'>Sin fecha</Form.Label>}
                    <Form.Control type="datetime-local" placeholder="Fecha de recogida" value={collection_Date}/> 
                </InputGroup>
                <Form.Text className='form_text'>Fecha de recogida esperada *</Form.Text>
                <InputGroup controlId="floatingOrderExpected_Collection_Date" label="Fecha de recogida esperada *" className="mb-3" onChange={(e) => {setexpected_Collection_Date(e.target.value)}}>
                    {obtainExpectedCollectionDate(order) != "undefined-undefined-undefined NaN:undefined" ? <Form.Label className='form_dates'>{obtainExpectedCollectionDate(order)}</Form.Label> : <Form.Label className='form_dates'>Sin fecha</Form.Label>}
                    <Form.Control type="datetime-local" placeholder="Fecha de recogida esperada" value={expected_Collection_Date}/>
                </InputGroup>
                <Form.Text className='form_text'>Fecha de llegada</Form.Text>
                <InputGroup controlId="floatingOrderArrival_Date" label="Fecha de llegada" className="mb-3" onChange={(e) => {setarrival_Date(e.target.value)}}>
                    {obtainArrivalDate(order) != "undefined-undefined-undefined NaN:undefined" ? <Form.Label className='form_dates'>{obtainArrivalDate(order)}</Form.Label> : <Form.Label className='form_dates'>Sin fecha</Form.Label>}
                    <Form.Control type="datetime-local" placeholder="Fecha de llegada" value={arrival_Date}/>
                </InputGroup>
                <Form.Text className='form_text'>Fecha de llegada esperada *</Form.Text>
                <InputGroup controlId="floatingOrderExpected_Arrival_Date" label="Fecha de llegada esperada *" className="mb-3" onChange={(e) => {setexpected_Arrival_Date(e.target.value)}}>
                    {obtainExpectedArrivalDate(order) != "undefined-undefined-undefined NaN:undefined" ? <Form.Label className='form_dates'>{obtainExpectedArrivalDate(order)}</Form.Label> : <Form.Label className='form_dates'>Sin fecha</Form.Label>}
                    <Form.Control type="datetime-local" placeholder="Fecha de llegada esperada" value={expected_Arrival_Date}/>
                </InputGroup>
                <FloatingLabel controlId="floatingOrderCommentary" label="Comentario" className="mb-3" onChange={(e) => {setcommentary(e.target.value)}}>
                    <Form.Control type="text" placeholder="Comentario" value={commentary}/>
                </FloatingLabel>
                <FloatingLabel controlId="floatingOrderEmployee_In_Charge" label="Id del empleado a cargo del pedido *" className="mb-3" onChange={(e) => {setemployee_In_Charge(e.target.value)}}>
                    <Form.Control type="number" placeholder="Id del empleado a cargo del pedido" value={employee_In_Charge}/>
                    <Form.Text className='form_text'>
                        El Id del empleado a cargo del pedido debe ser el Id del empleado de reparto proporcionado en la base de datos.
                    </Form.Text>  
                </FloatingLabel>
                <Button variant="secondary" onClick={() => setactive(!active)}>{active ? 'Desactivar pedido' : 'Activar pedido'}</Button>
            </div>
            <div className='OrderEdition_buttons'>
                <div className='OrderEdition_Iteration_Buttons'>
                    <div className='OrderEdition_goBack'>
                            <Button variant="secondary" size='lg' onClick={() => navigate(-1)}>Volver</Button>
                    </div>
                    <div className='OrderEdition_apply_changes'>
                        <Button variant="secondary" size='lg' onClick={() => applyChanges()}>Aplicar cambios</Button>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='OrderEdition_Packets'>
                <h2 className='OrderEdition_Packets_Title'>Paquetes enviados en el pedido</h2>
                {props.package_table?.map((packet) => {
                    if(packet.Order_Id === order?.Id){
                        return(
                            <div className='OrderEdition_Packets_Container'>
                                <Table size="sm">
                                    <tbody>
                                        <tr key={'OrderEdition_Packet_Id'+packet.Id}>
                                            <td className='field_title'>Id del paquete</td> 
                                            <td className='field_value'>{packet.Id}</td>
                                        </tr>
                                        <tr key={'OrderEdition_Packet_Fragility'+packet.Id+packet.Fragility}>
                                            <td className='field_title'>Fragilidad del paquete</td>
                                            {packet.Fragility ? <td className='field_value' id='fragile'>Sí</td> : <td className='field_value'>No</td>}
                                        </tr>
                                        <tr key={'OrderEdition_Packet_Weight'+packet.Id+packet.Weight}>
                                            <td className='field_title'>Peso del paquete (kg)</td> 
                                            <td className='field_value'>{packet.Weight}</td>
                                        </tr>
                                        <tr key={'OrderEdition_Packet_Width'+packet.Id+packet.Width}>
                                            <td className='field_title'>Anchura del paquete (cm)</td> 
                                            <td className='field_value'>{packet.Width}</td>
                                        </tr>
                                        <tr key={'OrderEdition_Packet_Height'+packet.Id+packet.Height}>
                                            <td className='field_title'>Altura del paquete (cm)</td>
                                            <td className='field_value'>{packet.Height}</td>
                                        </tr>
                                        <tr key={'OrderEdition_Packet_Length'+packet.Id+packet.Length}>
                                            <td className='field_title'>Profundidad del paquete (cm)</td>
                                            <td className='field_value'>{packet.Length}</td>
                                        </tr>
                                        <tr key={'OrderEdition_Packet_Volume'+packet.Id+packet.Volume}>
                                            <td className='field_title'>Volumen del paquete (cm<sup>3</sup>)</td>
                                            <td className='field_value'>{packet.Volume}</td>
                                        </tr>
                                    </tbody>
                                </Table> 
                                <div className='OrderEdition_Edit_Packets'>
                                    <Button variant="secondary" onClick={() => navigate('packet_edition/'+packet.Id)}>Editar paquete</Button>
                                </div>
                            </div>
                        )
                    }
                })}
                <div className='OrderEdition_Field_add_Packet'>
                    <Button variant="secondary" size="lg" onClick={() => navigate('packet_edition/add')}>Añadir paquete al pedido</Button>
                </div>
            </div>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "OrderEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo pedido. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo pedido, y tres botones: uno para aplicar los cambios, otro para volver a la vista anterior y otro para desactivar el pedido. */}
                {/* El formulario debe contener los campos de  id del cliente, origen, destino, destino adicional, estado del pedido (es un selector), tipo de envío (es un selector),  */}
                {/* fecha de recogida, fecha esperada de recogida, fecha de llegada, fecha esperada de llegada, comentario y empleado a cargo del pedido. Además, debe mostrar el volumen y el coste asociados. */}
                {/* Se muestra una tabla con los paquetes de dicho pedido con los campos id del paquete, fragilidad del paquete, peso del paquete, anchura del paquete, altura del paquete, profundidad del paquete y volumen del paquete. */}
                {/* Cada paquete tiene un botón de editar y hay un botón principal para añadir paquetes. */}
            {copilot ?
                <div>
                    <h1>Editar pedido</h1>
                    <form onSubmit={props.handleSubmit}>
                        <label htmlFor="client_id">Id del cliente</label>
                        <input type="text" className="form-control" id="client_id" name="client_id" value={customer_Id} onChange={props.handleChange} />
                        <label htmlFor="origin">Origen</label>
                        <input type="text" className="form-control" id="origin" name="origin" value={origin} onChange={props.handleChange} />
                        <label htmlFor="destination">Destino</label>
                        <input type="text" className="form-control" id="destination" name="destination" value={destination} onChange={props.handleChange} />
                        <label htmlFor="additional_Destination">Destino adicional</label>
                        <input type="text" className="form-control" id="additional_Destination" name="additional_Destination" value={additional_Destination} onChange={props.handleChange} />
                        <label htmlFor="state">Estado del pedido</label>
                        <select className="form-control" id="state" name="state" value={state} onChange={props.handleChange}>
                            <option value="En almacén origen">En almacén origen</option>
                            <option value="En ruta - En almacén origen">En ruta - En almacén origen</option>
                            <option value="En ruta - En almacén destino">En ruta - En almacén destino</option>
                            <option value="En almacén destino">En almacén destino</option>
                            <option value="En devolución - En almacén destino">En devolución - En almacén destino</option>
                            <option value="En devolución - En almacén origen">En devolución - En almacén origen</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                        <label htmlFor="shipping_Type">Tipo de envío</label>
                        <select className="form-control" id="shipping_Type" name="shipping_Type" value={shipment_Type} onChange={props.handleChange}>
                            <option value="Terrestre">Terrestre</option>
                            <option value="Marítimo">Marítimo</option>
                            <option value="Aéreo">Aéreo</option>
                        </select>
                        <label htmlFor="collection_Date">Fecha de recogida</label>
                        <input type="date" className="form-control" id="collection_Date" name="collection_Date" value={collection_Date} onChange={props.handleChange} />
                        <label htmlFor="expected_Collection_Date">Fecha esperada de recogida</label>
                        <input type="date" className="form-control" id="expected_Collection_Date" name="expected_Collection_Date" value={expected_Collection_Date} onChange={props.handleChange} />
                        <label htmlFor="arrival_Date">Fecha de llegada</label>
                        <input type="date" className="form-control" id="arrival_Date" name="arrival_Date" value={arrival_Date} onChange={props.handleChange} />
                        <label htmlFor="expected_Arrival_Date">Fecha esperada de llegada</label>
                        <input type="date" className="form-control" id="expected_Arrival_Date" name="expected_Arrival_Date" value={expected_Arrival_Date} onChange={props.handleChange} />
                        <label htmlFor="comment">Comentario</label>
                        <input type="text" className="form-control" id="comment" name="comment" value={commentary} onChange={props.handleChange} />
                        <label htmlFor="employee">Empleado a cargo del pedido</label>
                        <input type="text" className="form-control" id="employee" name="employee" value={employee_In_Charge} onChange={props.handleChange} />
                        <label htmlFor="volume">Volumen</label>
                        <input type="text" className="form-control" id="volume" name="volume" value={volume} onChange={props.handleChange} />
                        <label htmlFor="cost">Coste</label>
                        <input type="text" className="form-control" id="cost" name="cost" value={cost} onChange={props.handleChange} />
                        <br />
                        <button type="submit" className="btn btn-primary">Aplicar cambios</button>
                        <button type="button" className="btn btn-primary" onClick={props.handleBack}>Volver</button>
                        <button type="button" className="btn btn-primary" onClick={props.handleDelete}>Desactivar pedido</button>
                    </form>
                    <br />
                    <h2>Paquetes</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id del paquete</th>
                                <th scope="col">Fragilidad</th>
                                <th scope="col">Peso</th>
                                <th scope="col">Anchura</th>
                                <th scope="col">Altura</th>
                                <th scope="col">Profundidad</th>
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.packages?.map((pack) => {
                                return (
                                    <tr key={pack.id}>
                                        <td>{pack.id}</td>
                                        <td>{pack.fragility}</td>
                                        <td>{pack.weight}</td>
                                        <td>{pack.width}</td>
                                        <td>{pack.height}</td>
                                        <td>{pack.depth}</td>
                                        <td><button type="button" className="btn btn-primary" onClick={() => props.handleEditPackage(pack.id)}>Editar</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>  
                    <br />                
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "OrderEdition.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de editar un nuevo pedido. */}
                {/* Debe mostrar un título, un formulario con los campos necesarios para editar un nuevo pedido, y tres botones: uno para aplicar los cambios, otro para volver a la vista anterior y otro para desactivar el pedido. */}
                {/* El formulario debe contener los campos de  id del cliente, origen, destino, destino adicional, estado del pedido (es un selector), tipo de envío (es un selector),  */}
                {/* fecha de recogida, fecha esperada de recogida, fecha de llegada, fecha esperada de llegada, comentario y empleado a cargo del pedido. Además, debe mostrar el volumen y el coste asociados. */}
                {/* Se muestra una tabla con los paquetes de dicho pedido con los campos id del paquete, fragilidad del paquete, peso del paquete, anchura del paquete, altura del paquete, profundidad del paquete y volumen del paquete. */}
                {/* Cada paquete tiene un botón de editar y hay un botón principal para añadir paquetes. */}
            {codeWhisperer ?
                <div>
                    <h1>Editar pedido</h1>
                    <form onSubmit={props.handleSubmit}>
                        <div>
                            <label>Id del cliente</label>
                            <input type="text" name="id_Client" value={customer_Id} onChange={props.handleChange} />
                            <label>Origen</label>
                            <input type="text" name="origin" value={origin} onChange={props.handleChange} />
                            <label>Destino</label>
                            <input type="text" name="destination" value={destination} onChange={props.handleChange} />
                            <label>Destino adicional</label>
                            <input type="text" name="additional_Destination" value={additional_Destination} onChange={props.handleChange} />
                            <label>Estado del pedido</label>
                            <select name="state" value={state} onChange={props.handleChange}>
                                {props.states?.map(state => <option key={state} value={state}>{state}</option>)}
                            </select>
                            <label>Tipo de envío</label>
                            <select name="shipping_Type" value={shipment_Type} onChange={props.handleChange}>
                                {props.shipping_Types?.map(shipping_Type => <option key={shipping_Type} value={shipping_Type}>{shipping_Type}</option>)}
                            </select>
                            <label>Fecha de recogida</label>
                            <input type="date" name="collection_Date" value={collection_Date} onChange={props.handleChange} />
                            <label>Fecha esperada de recogida</label>
                            <input type="date" name="expected_Collection_Date" value={expected_Collection_Date} onChange={props.handleChange} />
                            <label>Fecha de llegada</label>
                            <input type="date" name="arrival_Date" value={arrival_Date} onChange={props.handleChange} />
                            <label>Fecha esperada de llegada</label>
                            <input type="date" name="expected_Arrival_Date" value={expected_Arrival_Date} onChange={props.handleChange} />
                            <label>Fecha de devolución</label>
                            <input type="date" name="return_Date" value={return_Date} onChange={props.handleChange} />
                            <label>Fecha esperada de devolución</label>
                            <input type="date" name="expected_Return_Date" value={expected_Return_Date} onChange={props.handleChange} />
                            <label>Comentario</label>
                            <input type="text" name="comment" value={commentary} onChange={props.handleChange} />
                            <label>Empleado a cargo del pedido</label>
                            <input type="text" name="employee" value={employee_In_Charge} onChange={props.handleChange} />
                            <label>Volumen</label>
                            <input type="text" name="volume" value={volume} onChange={props.handleChange} />
                            <label>Coste</label>
                            <input type="text" name="cost" value={cost} onChange={props.handleChange} />
                            <button type="submit">Aplicar cambios</button>
                            <button onClick={props.handleCancel}>Volver</button>
                            <button onClick={props.handleDelete}>Desactivar pedido</button>
                        </div>
                        <div>
                            <h2>Paquetes del pedido</h2>
                            <button onClick={props.handleAddPackage}>Añadir paquete</button>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id del paquete</th>
                                        <th>Fragilidad</th>
                                        <th>Peso</th>
                                        <th>Anchura</th>
                                        <th>Altura</th>
                                        <th>Profundidad</th>
                                        <th>Volumen</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.packages?.map(package_ =>{
                                        return(
                                            <tr key={package_.id}>
                                                <td>{package_.id}</td>
                                                <td>{package_.fragility}</td>
                                                <td>{package_.weight}</td>
                                                <td>{package_.width}</td>
                                                <td>{package_.height}</td>
                                                <td>{package_.depth}</td>
                                                <td>{package_.volume}</td>
                                                <td><button onClick={() => props.handleEditPackage(package_.id)}>Editar</button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                : null
            }
        </div>
    );
}