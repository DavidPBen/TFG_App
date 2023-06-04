import './Error.css';
import { useNavigate } from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';

// Componente que se encarga de mostrar un mensaje de error cuando se produce un error en la aplicación. 
// Esto sucede cuando el usuario no está registrado e intenta acceder a una vista sin permisos.
export default function Error() {

    const navigate = useNavigate();
    const copilot = false;
    const codeWhisperer = false;

    return(
        <div className='Error'>
            <h1 id='error_title'>Error</h1>
            <h2 id='error_message'>Ha ocurrido un error, disculpe las molestias.</h2>
            <Button variant="secondary" onClick={() => navigate('/')} size="lg">Volver al inicio</Button>
            <p id="error_text">
                El error puede haber sido producido por un intento de acceso a una página inaccesible o por un fallo en el programa. 
            </p>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Error.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de error de la aplicación con un botón de volver al inicio. */}
            {copilot ?
                <div className='Error'>
                    <h1>¡Ups! Parece que algo ha salido mal.</h1>
                    <p>Por favor, vuelve a intentarlo más tarde.</p>
                    <Button variant="primary" onClick={() => navigate('/')}>Volver al inicio</Button>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Error.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista de error de la aplicación con un botón de volver al inicio. */}
            {codeWhisperer ?
                <div>
                    <div className='Error-title'>
                        <h1>Error</h1>
                    </div>
                    <div className='Error-body'>
                        <p>You are not registered</p>
                        <p>Please, register first</p>
                        <Button onClick={() => navigate('/')}>Go to Home</Button>
                    </div>
                </div>
                : null    
            }
        </div>   
    );
}