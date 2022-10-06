import styles from '../hojas-de-estilo/FormularioInicioSesion.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";


function FormularioInicioSesion( { isOpen, obtenerTareasDeUsuario, cerrarFormulario, ipServer} ){

  const navigate = useNavigate(); //  Hook para cambiar el path del navegador


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [estadoMensajeOculto, setEstadoMensajeOculto] = useState(true);
  
  
  const manejarCambiosUsuario = e => { setUsername(e.target.value) };
  const manejarCambiosClave = e => { setPassword(e.target.value) };


  const enviarDatos = e => {  //  Al presionar el boton
    e.preventDefault();
    const nuevoLogin = {
      name: username,
      password: password,
    }

    fetch(ipServer + '/user', {
      method: 'POST', 
      body: JSON.stringify(nuevoLogin), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if (response.result === false) {setEstadoMensajeOculto(false)}

      else{ 
        obtenerTareasDeUsuario(JSON.parse(response.data));
        navigate('/user/'+username);
      }
    });
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
              
              <input className={styles.entradaDeDatos} type="text" value={username} placeholder="Usuario" onChange={manejarCambiosUsuario}/>
              <input className={styles.entradaDeDatos} type="password" value={password} placeholder="Clave" onChange={manejarCambiosClave}/>
              
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