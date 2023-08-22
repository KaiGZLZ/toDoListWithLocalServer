import React from "react";
import { useState } from 'react';
import "../hojas-de-estilo/Formulario.css"
import styles from '../hojas-de-estilo/CuadroInicio.module.css'
import { apiUrl } from "../config/config";
import FormularioInicioSesion from "../componentes/FormularioInicioSesion";
import FormularioRegistro from "../componentes/FormularioRegistro";


function LoginPage(){

  const [loginFormState, setLoginFormState] = useState(false);
  const [registerFormState, setRegisterFormState] = useState(false);

  return( <>
    
    {/* Formular section */}
    <div>
      <div className='formulario-contenedor'>

      <form className="formulario" >

        <input className="entrada-datos" type="text"
          placeholder="Tarea" 
          />
        <input className="entrada-datos" type="text"
          placeholder="Descripcion" 
          />
        <input className="entrada-datos" type="text"
          placeholder="Responsable" 
          />

        <div className="opciones-prioridad">
          <p className="titulo-Prioridad">Prioridad</p>
          <div className="opciones-contenedor">
            <div className="opcion">
              <input type="radio" id="prioridadAlta" name="prioridad" />
              <label htmlFor="prioridadAlta"> Baja</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadMedia" name="prioridad" />
              <label htmlFor="prioridadMedia"> Media</label>
            </div>
            <div className="opcion">
              <input type="radio" id="prioridadBaja" name="prioridad" />
              <label htmlFor="prioridadBaja"> Alta</label>
            </div>
          </div>
        </div>
        <button className='boton-submit'> Enviar </button>
      </form>
      </div>
    </div>

    {/* Login section */}
    <div className={styles.contenedorPrincipal}>

      <div className={styles.controlEspacio}>
        {/* Empty div */}
      </div>

      <div className={styles.contenedorBotones}>

        <button 
          className={styles.botonIniciarSesion + " " + styles.prototipoBoton} 
          onClick={() => {setLoginFormState(!loginFormState)}}>
            Iniciar sesion
        </button>
        

        <FormularioInicioSesion
          isOpen={loginFormState}
          cerrarFormulario={setLoginFormState}
          apiUrl={apiUrl}
          />

        <button 
          className={styles.botonRegistrarse + " " + styles.prototipoBoton}
          onClick={() => setRegisterFormState(!registerFormState)}>
            Registrarse
        </button>
        
        <FormularioRegistro
          isOpen={registerFormState}
          cerrarFormulario={setRegisterFormState}
          />
      </div>
    </div>
  </>
    
  );
}

export default LoginPage;