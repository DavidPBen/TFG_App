import './Header.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// Componente que muestra la cabecera de la aplicación con el logo y el nombre de la empresa.
export default function Header(props) {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const copilot = false;
  const codeWhisperer = false;

  useEffect(() => {
    if(props.customer_selected){
      if(props.customer_selected.Name.length<=30){
        setTitle(props.customer_selected.Name.substr(0,30))
      }
      else{
        setTitle(props.customer_selected.Name.substr(0,28)+" ...")
      }
    }
  }, [props.customer_selected]);

  // Función que redirige a la página de login.
  const login = () => {
    navigate("/iniciar-sesion");
  }

  // Función que redirige a la página de registro.
  const signup = () => {
    navigate("/registrarse");
  }

  // Función que cierra la sesión del usuario.
  const closeSession = () => {
    props.selectCustomer("");
    navigate("/");
  }

  return (
    <div className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-3">
            <div id='comany_logo'><img src={process.env.PUBLIC_URL + "/logo.png"} className="logo" alt="logo" onClick={() => navigate("/")}/></div>
          </div>
          <div className="col-6">
            <div id='comany_name'>Just a Second</div>
          </div>
          { props.customer_selected ?
            <div className="col-3">
              <div className="row align-items-center">
                <div className="col-10" id="customer_name_header_container">
                  <h5 id="customer_name_header">{title}</h5>
                </div>
                <div className="col-2">
                  <div className='menu_header'>
                    <DropdownButton as={ButtonGroup} key="drop-down-header" id='down-basic-button' variant="secondary" size="sm" title="">
                      <Dropdown.Item eventKey="1" onClick={() => navigate("/modificar-perfil")}>Modificar perfil</Dropdown.Item>
                      <Dropdown.Divider/>
                      <Dropdown.Item eventKey="2" onClick={() => closeSession()}>Cerrar sesión</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div> :
            <div className="col-3">
              <div className="row align-items-center">
                <div className="col-8">
                  <Button variant="secondary" id="Log_in" onClick={() => login()}>Iniciar sesión</Button>
                </div>
                <div className="col-4">
                  <Button variant="primary" id="Sign_up" size="lg" onClick={() => signup()}>Registrarse</Button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      {/* HTML realizado por GitHub Copilot sin usar las funciones creadas en el archivo "Header.js" */}
        {/* En el html debe mostrar de una forma bonita y ordenada la cabecera de la aplicación. Para ello muestra el logo a la izquierda, el nombre "Just a Second" en el medio */}
        {/* y el botón de iniciar sesión y el de registrarse a la derecha, en el caso de no haber un cliente registrado. Si hay un cliente registrado se pone el nombre del cliente a la derecha */}
        {/* y un menú desplegable con la opción de modificar perfil y cerrar sesión. */}
      { copilot ?
          <div className="header">  
              <img src="https://i.imgur.com/9ZQZ1Zu.png" alt="Logo" className="logo" />
              <h1 className="title">Just a Second</h1>
              <div className="buttons">
                  <Button variant="outline-primary" className="button" onClick={() => navigate("/login")}>Iniciar sesión</Button>
                  <Button variant="primary" className="button" onClick={() => navigate("/register")}>Registrarse</Button>
              </div>
          </div>
        : null
      }
      {/* HTML realizado por Amazon CodeWhisperer sin usar las funciones creadas en el archivo "Header.js" */}
        {/* En el html debe mostrar de una forma bonita y ordenada la cabecera de la aplicación. Para ello muestra el logo a la izquierda, el nombre "Just a Second" en el medio */}
        {/* y el botón de iniciar sesión y el de registrarse a la derecha, en el caso de no haber un cliente registrado. Si hay un cliente registrado se pone el nombre del cliente a la derecha */}
        {/* y un menú desplegable con la opción de modificar perfil y cerrar sesión. */}
      { codeWhisperer ?
          <div className="codewhisperer-header">
            <div className="codewhisperer-logo">
              <img src="https://justasecond.s3.amazonaws.com/justasecond-logo.png" alt="Just a Second" />
            </div>
            <div className="codewhisperer-title">
              Just a Second
            </div>
            <div className="codewhisperer-buttons">
              <ButtonGroup>
                <Button variant="primary" onClick={login}>Iniciar sesión</Button>
                <Button variant="primary" onClick={signup}>Registrarse</Button>
              </ButtonGroup>
            </div>
            <div className="codewhisperer-dropdown">
              <DropdownButton variant="primary" title="Modificar perfil">
                <Dropdown.Item onClick={login}>Modificar perfil</Dropdown.Item>
                <Dropdown.Item onClick={login}>Cerrar sesión</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        : null
      }
    </div>
  );
}