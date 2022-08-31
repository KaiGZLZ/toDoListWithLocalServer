import styles from '../hojas-de-estilo/FormularioRegistro.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';


function FormularioRegistro( { isOpen, cerrarFormulario} ) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [estadoMensajeUsuarioExistenteOculto, setEstadoMensajeUsuarioExistenteOculto] = useState(true);
  const [estadoMensajeOcultoClaveMenorOchoDigitos, setEstadoMensajeOcultoClaveMenorOchoDigitos] = useState(true);
  const [estadoMensajeOcultoNombreVacio, setEstadoMensajeOcultoNombreVacio] = useState(true);
  const [estadoMensajeOcultoPasswordConfirmation, setEstadoMensajeOcultoPasswordConfirmation] = useState(true);

  const [estadoMensajeRegistroExitoso, setEstadoMensajeRegistroExitoso] = useState(false)
  
  
  const manejarCambiosUsuario = e => { setUsername(e.target.value.trim()) };
  const manejarCambiosClave = e => { setPassword(e.target.value.trim()) };
  
  const manejarCambiosPasswordConfirmation = e => { 
    {(e.target.value.trim() == password) ? setEstadoMensajeOcultoPasswordConfirmation(true) : setEstadoMensajeOcultoPasswordConfirmation(false)} 
    setPasswordConfirmation(e.target.value.trim());
  };


  const sendRegisterData = e => {  //  Al presionar el boton
    
    e.preventDefault();

    if (username == ""){
      return setEstadoMensajeOcultoNombreVacio(false);
    }

    if (password.length < 8){
      return setEstadoMensajeOcultoClaveMenorOchoDigitos(false);
    }

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
    setPasswordConfirmation("");
    setEstadoMensajeRegistroExitoso(false);
    setEstadoMensajeUsuarioExistenteOculto(true);
    setEstadoMensajeOcultoClaveMenorOchoDigitos(true);
    setEstadoMensajeOcultoNombreVacio(true);
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
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeOcultoNombreVacio ? " " + styles.oculto : "")}>
                  *El nombre no debe estar vacio*
                </p>
              </div>

              <input className={styles.entradaDeDatos} type="password" value={password} placeholder="Clave" onChange={manejarCambiosClave}/>
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeOcultoClaveMenorOchoDigitos ? " " + styles.oculto : "")}>
                  *La contraseña debe ser de minimo 8 caracteres*
                </p>
              </div>
              <input className={styles.entradaDeDatos} type="password" value={passwordConfirmation} placeholder="Confirme la clave" onChange={manejarCambiosPasswordConfirmation}/>
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeOcultoPasswordConfirmation ? " " + styles.oculto : "")}>
                  *La confirmacion no coincide*
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