import './Header.css';

// Componente que muestra la cabecera de la aplicación con el logo y el nombre de la empresa.
export default function Header() {

  const copilot = false;
  const codeWhisperer = false;

  return (
    <div className="header">
        <ul className='list'>
            <li className='list_element'><img src={process.env.PUBLIC_URL + "/logo.png"} className="logo" alt="logo"/></li>
            <li className='list_element'><div id='comany_name'>Just a Second</div></li>
        </ul>
        {/* HTML realizado por GitHub Copilot usando las funciones creadas en el archivo "Header.js"*/}
          {/* En el html debe mostrar de una forma bonita y ordenada la cabecera de la aplicación. Para ello muestra el logo y el nombre de la empresa (Just a Second) de forma equidistante en una fila. */}
        {copilot ?
          <div>
            <img src="https://i.imgur.com/7Q3Q3bG.png" alt="Logo" className="logo" />
            <h1 className="title">Just a Second</h1>
          </div>
        : null
        }
        {/* HTML realizado por Amazon CodeWhisperer usando las funciones creadas en el archivo "Header.js"*/}
          {/* En el html debe mostrar de una forma bonita y ordenada la cabecera de la aplicación. Para ello muestra el logo y el nombre de la empresa (Just a Second) de forma equidistante en una fila. */}
        {codeWhisperer ?
          <div className="header-codewhisperer">
              <img src="https://i.imgur.com/JKX8XKL.png" alt="logo" />
              <h1>Just a Second</h1>
          </div>
          : null
        }
    </div>
  );
}