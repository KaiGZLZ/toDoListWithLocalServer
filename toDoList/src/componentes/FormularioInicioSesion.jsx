import styles from '../hojas-de-estilo/FormularioInicioSesion.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { passphrase } from '../config/config';
import CryptoJS from "crypto-js"
import { useForm } from 'react-hook-form';
import { useLazyAuthenticateUserQuery } from '../services/user.service';

function FormularioInicioSesion( { isOpen, cerrarFormulario} ){

  const navigate = useNavigate(); //  Hook para cambiar el path del navegador

  const [authenticateUser, { isFetching }] = useLazyAuthenticateUserQuery()
  
  const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });

  const [estadoMensajeOculto, setEstadoMensajeOculto] = useState(true);
  
  const sendData = userRequested => {  //  Al presionar el boton
    
    authenticateUser({userRequested})
      .then((response) => {

        if(response.isSuccess){

          var cryptUser = CryptoJS.AES.encrypt(JSON.stringify(response.data.user), passphrase).toString();

          localStorage.setItem('user', cryptUser);
          
          navigate('/dashboard');
        }
        else{
          setEstadoMensajeOculto(false)
        }
      })
      .catch((error) => 
        console.log(error)
      )
  }

  const outOfModal = () => {
    setEstadoMensajeOculto(true);
    cerrarFormulario(!isOpen);
    reset();
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

            <form className={styles.formulario} onSubmit={handleSubmit(sendData)}>
              
              <p className={styles.titulo}>
                Inicio de sesion
              </p>
              
              <input 
                className={styles.entradaDeDatos } 
                type="text"
                placeholder="Usuario"
                { ...register(
                    "name",  
                    { required: "The name field is required",
                      validate: (value) => {
                        if (value.includes(' ')) return "The name cannot have spaces";
                      },
                      onChange:() => clearErrors()
                    }
                  )
                }
                />
              {errors.name && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.name.message}</span>}
                       
              <input 
                className={styles.entradaDeDatos } 
                type="password"
                placeholder="Contraseña"
                { ...register(
                    "password",  
                    { required: "The password field is required",
                      validate: (value) => {
                        if (value.includes(' ')) return "The password cannot have spaces";
                        if (value.length < 8) return "The password length must be al least 8 characters";
                      },
                      onChange:() => clearErrors()
                    }
                  )
                }
                />
              {errors.password && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.password.message}</span>}
              
              <div className={styles.cajita}>
                <p className={styles.avisoUsuarioOContraseñaIncorrecta + (estadoMensajeOculto ? " " + styles.oculto : "")}>
                  *El usuario o la contraseña ingresada fueron incorrectos*
                </p>
              </div>
              
              <button disabled={isFetching} className={styles.botonSubmit}> Ingresar </button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default FormularioInicioSesion;