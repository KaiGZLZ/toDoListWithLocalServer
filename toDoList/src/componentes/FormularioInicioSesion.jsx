import styles from '../hojas-de-estilo/FormularioInicioSesion.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';



function FormularioInicioSesion( { isOpen, onSubmit, cerrarFormulario} ){

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const [estadoMensajeOculto, setEstadoMensajeOculto] = useState(true);
  
  
  const manejarCambiosUsuario = e => { setUsuario(e.target.value) };
  const manejarCambiosClave = e => { setClave(e.target.value) };


  const enviarDatos = e => {  //  Al presionar el boton
    e.preventDefault();
    const nuevoLogin = {
      usuario: usuario,
      clave: clave,
    }
    onSubmit(nuevoLogin);
  }

  return(
    <div>
      
      <div className={styles.contenedorGeneral + (isOpen ? "" : " " + styles.modalSeOculta) }>
          <div className={styles.formularioContenedor + (isOpen ? "" : " " + styles.contenedorFormularioSeOculta) }>
            <div className={styles.botonSalida} onClick={() => cerrarFormulario(!isOpen)}>
              <AiFillCloseCircle />
            </div>

            <form className={styles.formulario} >
              
              <p className={styles.titulo}>
                Inicio de sesion
              </p>
              
              <input className={styles.entradaDeDatos} type="text" placeholder="Usuario" onChange={manejarCambiosUsuario}/>
              <input className={styles.entradaDeDatos} type="text" placeholder="Clave" onChange={manejarCambiosClave}/>
              
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