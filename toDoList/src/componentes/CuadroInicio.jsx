import styles from '../hojas-de-estilo/CuadroInicio.module.css'

import { useState } from 'react';
import FormularioInicioSesion from './FormularioInicioSesion';
import FormularioRegistro from './FormularioRegistro';

function CuadroInicio({ obtenerTareas, ipServer }) {

  const [estadoFormularioInicioSesion, setEstadoFormularioInicioSesion] = useState(false);
  const [estadoFormularioRegistro, setEstadoFormularioRegistro] = useState(false);

  return(

    <div className={styles.contenedorPrincipal}>

      <div className={styles.controlEspacio}>
        {/* Es un div vacio */}
      </div>

      <div className={styles.contenedorBotones}>

        <button 
          className={styles.botonIniciarSesion + " " + styles.prototipoBoton} 
          onClick={() => {setEstadoFormularioInicioSesion(!estadoFormularioInicioSesion)}}>
            Iniciar sesion
        </button>

        <FormularioInicioSesion
          isOpen={estadoFormularioInicioSesion}
          obtenerTareasDeUsuario={obtenerTareas}
          cerrarFormulario={setEstadoFormularioInicioSesion}
          ipServer={ipServer}
          />

        <button 
          className={styles.botonRegistrarse + " " + styles.prototipoBoton}
          onClick={() => setEstadoFormularioRegistro(!estadoFormularioRegistro)}>
            Registrarse
        </button>
        
        <FormularioRegistro
          isOpen={estadoFormularioRegistro}
          cerrarFormulario={setEstadoFormularioRegistro}
          ipServer={ipServer}
          />

      </div>
    </div>
  );
}

export default CuadroInicio;