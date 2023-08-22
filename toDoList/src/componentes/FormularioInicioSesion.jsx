import styles from '../hojas-de-estilo/FormularioInicioSesion.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { apiUrl, passphrase } from '../config/config';
import CryptoJS from "crypto-js"

function FormularioInicioSesion( { isOpen, cerrarFormulario} ){

  const navigate = useNavigate(); //  Hook para cambiar el path del navegador


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [estadoMensajeOculto, setEstadoMensajeOculto] = useState(true);
  
  
  const manejarCambiosUsuario = e => { setUsername(e.target.value) };
  const manejarCambiosClave = e => { setPassword(e.target.value) };


  const enviarDatos = async e => {  //  Al presionar el boton
    e.preventDefault();
    const userRequested = {
      name: username,
      password: password,
    }

    const response = await fetch(apiUrl + 'user/authenticate', {
      method: 'POST', 
      body: JSON.stringify({userRequested}), 
      headers:{
        'Content-Type': 'application/json'
      }
    })

    await response.text().then(data => {
      if (response.ok) {

        let result = JSON.parse(data)
        
        // almacenar detalles de usuario y token jwt en almacenamiento local para mantener al usuario conectado entre actualizaciones de página
        var cryptUser = CryptoJS.AES.encrypt(JSON.stringify(result.user), passphrase).toString();

        localStorage.setItem('user', cryptUser);
        
        //obtenerTareasDeUsuario(result.user.tasks);
        navigate('/dashboard');
      }
      else{
        console.log(JSON.parse(data));
        setEstadoMensajeOculto(false)
      }
    })    
  }

  const outOfModal = () => {
    setUsername("");
    setPassword("");
    setEstadoMensajeOculto(true);
    cerrarFormulario(!isOpen);
  }

  const clickException = (e) => {  //  El click no se propaga hacia atras
    
    e.stopPropagation();
  }

  return(
    <div>
      <div className={styles.contenedorGeneral + (isOpen ? "" : " " + styles.modalSeOculta) } onClick={outOfModal}>
          <div className={styles.formularioContenedor + (isOpen ? "" : " " + styles.contenedorFormularioSeOculta) } onClick={clickException}>
            <div className={styles.botonSalida} onClick={outOfModal}>
              <AiFillCloseCircle />
            </div>

            <form className={styles.formulario} >
              
              <p className={styles.titulo}>
                Inicio de sesion
              </p>
              
              <input className={styles.entradaDeDatos} 
                type="text" value={username} 
                placeholder="Usuario" 
                onChange={manejarCambiosUsuario}
                />
                
              <input className={styles.entradaDeDatos} 
                type="password" 
                value={password} 
                placeholder="Clave" 
                onChange={manejarCambiosClave}
                />
              
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeOculto ? " " + styles.oculto : "")}>
                  *El usuario o la contraseña ingresada fueron incorrectos*
                </p>
              </div>
              
              <button className={styles.botonSubmit} onClick={enviarDatos}> Ingresar </button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default FormularioInicioSesion;