import React, { useEffect } from "react";
import "../hojas-de-estilo/Formulario.css"
import styles from '../hojas-de-estilo/CuadroInicio.module.css'
import { CircularProgress } from "@mui/material";
import { useLazyAuthenticateUserQuery } from "../services/user.service";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/alertSlice";
import CryptoJS from "crypto-js"
import { passphrase } from '../config/config';


function AuthenticatingPage(){

  const [authenticateUser, { isFetching }] = useLazyAuthenticateUserQuery();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    authenticateUser(location.hash.replace("#", ""))
      .then((response) => {

        if(response.isSuccess){  
          dispatch(setAlert({type: "success", message: 'Your account was successfully verified'}))
          var cryptUser = CryptoJS.AES.encrypt(JSON.stringify(response.data.user), passphrase).toString();

          localStorage.setItem('user', cryptUser);
          
          navigate('/dashboard');
        }
        else{
          let error = response.error.data
          dispatch(setAlert({type: "error", message: error.message}))
          navigate('/login')
        }
      })    

  }, []);

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
        <button className='boton-submit' disabled> Enviar </button>
      </form>
      </div>
    </div>

    {/* Login section */}
    <div className={styles.contenedorPrincipal}>

      <div className={styles.controlEspacio}>
        {/* Empty div */}
      </div>

      <CircularProgress  /> 
    </div>
  </>
    
  );
}

export default AuthenticatingPage;