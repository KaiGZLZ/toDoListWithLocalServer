import styles from '../hojas-de-estilo/FormularioRegistro.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';


function FormularioRegistro( { isOpen, cerrarFormulario} ) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [estadoMensajeUsuarioExistenteOculto, setEstadoMensajeUsuarioExistenteOculto] = useState(true);
  const [estadoMensajeOcultoClave, setEstadoMensajeClaveOculto] = useState(true);

  const [estadoMensajeRegistroExitoso, setEstadoMensajeRegistroExitoso] = useState(false)
  
  
  const manejarCambiosUsuario = e => { setUsername(e.target.value) };
  const manejarCambiosClave = e => { setPassword(e.target.value) };


  const sendRegisterData = e => {  //  Al presionar el boton
    
    e.preventDefault();
    const nuevoRegistro = {
      name: username,
      password: password,
      tareas: []
    }

    fetch('http://192.168.1.101:3000/register/user', {
      method: 'POST', 
      body: JSON.stringify(nuevoRegistro), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response);
      if (response.result === false) {setEstadoMensajeUsuarioExistenteOculto(false)}

      else{ 
        registroExitoso()
      }
    });
  }

  const outOfModal = () => {
    setUsername("");
    setPassword("");
    setEstadoMensajeUsuarioExistenteOculto(true);
    setEstadoMensajeRegistroExitoso(false);
    cerrarFormulario(!isOpen);
  }

  const registroExitoso = () => {
    setEstadoMensajeRegistroExitoso(true);
    setTimeout(outOfModal, 2000);
  }

  return(
    <div>
      <div className={styles.contenedorGeneral + (isOpen ? "" : " " + styles.modalSeOculta) }>

        <div className={styles.mensajeRegistroExitoso + (estadoMensajeRegistroExitoso ? "" : " " + styles.mensajeRegistroExitosoOculto) } >
          Registro exitoso<br/><BsFillCheckCircleFill color='green'/>
        </div>
          <div className={styles.formularioContenedor + (isOpen ? "" : " " + styles.contenedorFormularioSeOculta) }>
            <div className={styles.botonSalida} onClick={outOfModal}>
              <AiFillCloseCircle />
            </div>

            <form className={styles.formulario} >
              
              <p className={styles.titulo}>
                Registro <br/>de Usuario
              </p>
              
              
              <input className={styles.entradaDeDatos} type="text" value={username} placeholder="Usuario" onChange={manejarCambiosUsuario}/>
              
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeUsuarioExistenteOculto ? " " + styles.oculto : "")}>
                  *El nombre de usuario ya es usado*
                </p>
              </div>

              <input className={styles.entradaDeDatos} type="text" value={password} placeholder="Clave" onChange={manejarCambiosClave}/>
              
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeOcultoClave ? " " + styles.oculto : "")}>
                  *La contraseña debe ser de minimo 8 digitos*
                </p>
              </div>
              
              <button className={styles.botonSubmit} onClick={sendRegisterData}> Registrar </button>
            </form>
          </div>
      </div>
      
      
    </div>
  );
}

export default FormularioRegistro;