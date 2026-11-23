
import { useState } from 'react';
import './App.css';

import Login from './assets/Components/Login.jsx';
import BusquedaEventos from './assets/Components/BusquedaEventos.jsx';
import AdministracionEventos from './assets/Components/AdministracionEventos.jsx';
import Reportes from './assets/Components/Reportes.jsx';

import { EventosProvider } from './assets/Context/EventosContext.jsx';

import logo from './assets/Imagenes/logo.png';

function App() {
  const [sesion, setSesion] = useState(() => {
    const guardada = localStorage.getItem('sesion');
    return guardada ? JSON.parse(guardada) : null;
  });

  const cerrarSesion = () => {
    localStorage.removeItem('sesion');
    setSesion(null);
  };

  return (
    <EventosProvider>
      {!sesion ? (
        <Login onLogin={setSesion} />
      ) : (
        <div className="app">
          <header className="encabezado">
            <img
              src={logo}
              alt="Logo de TicketMarket"
              className="logo"
            />
            <h1>TicketMarket</h1>
          </header>

          <div className="sesion-usuario">
            <div>
              <h2>Bienvenido, {sesion.nombre}</h2>
              <p>Rol: {sesion.rol}</p>
            </div>

            <button onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>

          {sesion.rol === 'admin' ? (
            <>
              <AdministracionEventos />
              <Reportes />
            </>
          ) : (
            <BusquedaEventos />
          )}
        </div>
      )}
    </EventosProvider>
  );
}

export default App;
