import styles from '../hojas-de-estilo/FormularioRegistro.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';


function FormularioRegistro( { isOpen, onSubmit, cerrarFormulario} ) {

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  const [estadoMensajeUsuarioOculto, setEstadoMensajeUsuarioOculto] = useState(true);
  const [estadoMensajeClaveOculto, setEstadoMensajeClaveOculto] = useState(true);
  
  
  const manejarCambiosUsuario = e => { setUsuario(e.target.value) };
  const manejarCambiosClave = e => { setClave(e.target.value) };


  const enviarDatos = e => {  //  Al presionar el boton
    e.preventDefault();
    const nuevoRegistro = {
      usuario: usuario,
      clave: clave,
    }
    onSubmit(nuevoRegistro);
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
                Registro <br/>de Usuario
              </p>
              
              
              <input className={styles.entradaDeDatos} type="text" placeholder="Usuario" onChange={manejarCambiosUsuario}/>
              
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeUsuarioOculto ? " " + styles.oculto : "")}>
                  *El nombre de usuario ya es usado*
                </p>
              </div>

              <input className={styles.entradaDeDatos} type="text" placeholder="Clave" onChange={manejarCambiosClave}/>
              
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeClaveOculto ? " " + styles.oculto : "")}>
                  *La contraseña debe ser de minimo 8 digitos*
                </p>
              </div>
              
              <button className={styles.botonSubmit} onClick={enviarDatos}> Registrar </button>
            </form>
          </div>
      </div>
      
      
    </div>
  );
}

export default FormularioRegistro;