import './Error.css';
import { useNavigate } from "react-router-dom";

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
            <h2 id='error_message'>Ha ocurrido un error. Intenta iniciar sesión de nuevo o contacta con tu responsable.</h2>
            <Button variant="secondary" onClick={() => navigate('/')}>Volver al inicio</Button>
            {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Error.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista error de la aplicación. En ella se mostrará el mensaje de error y un botón para volver al inicio.*/}
            {copilot ?
                <div>
                    <h1>Error</h1>
                    <p>El usuario no está registrado</p>
                    <Button onClick={() => navigate('/')} variant="primary">Volver al inicio</Button>
                </div>
                : null
            }
            {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Error.js"*/}
                {/* En el html debe mostrar de una forma bonita y ordenada la vista error de la aplicación. En ella se mostrará el mensaje de error y un botón para volver al inicio.*/}
            {codeWhisperer ?
                <div>
                    <div className='Error-title'>
                        <h1>Error</h1>
                    </div>
                    <div className='Error-body'>
                        <p>You are not logged in. Please log in to continue.</p>
                        <Button variant="primary" onClick={() => navigate("/")}>Go to Home</Button>
                    </div>
                </div>
                : null
            }
        </div>    
    );
}