import styles from '../hojas-de-estilo/FormularioRegistro.module.css'
import { useState } from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useLazyRegisterUserQuery } from '../services/user.service';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';


function FormularioRegistro( { isOpen, cerrarFormulario} ) {

  const [registerUser, {isFetching, isSuccess, error}] = useLazyRegisterUserQuery()

  const { register, handleSubmit, watch, reset, clearErrors, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });

  const [estadoMensajeUsuarioExistenteOculto, setEstadoMensajeUsuarioExistenteOculto] = useState(true);
  const [estadoMensajeRegistroExitoso, setEstadoMensajeRegistroExitoso] = useState(false)  

  const sendData = data => {  //  Al presionar el boton
    
    registerUser(data);
  }

  // Handle fetch results
  useEffect(() => {

    if (isSuccess){
      setEstadoMensajeRegistroExitoso(true);
      setTimeout(outOfModal, 2000);
    }
    
    if(error){
      setEstadoMensajeUsuarioExistenteOculto(false)
    }   
    
  }, [isFetching]);


  // Function to prevent the click from propagating backwards
  const clickException = (e) => {
    
    e.stopPropagation();
  }

  const outOfModal = () => {  //  Al salir del modal, se resetea todo
    
    setEstadoMensajeRegistroExitoso(false);
    setEstadoMensajeUsuarioExistenteOculto(true);
    cerrarFormulario(!isOpen);
    reset();
  }

  return(
    <div>
      <div className={styles.contenedorGeneral + (isOpen ? "" : " " + styles.modalSeOculta) } onClick={outOfModal}>

        <div className={styles.mensajeRegistroExitoso + (estadoMensajeRegistroExitoso ? "" : " " + styles.mensajeRegistroExitosoOculto) } >
          Registro exitoso<br/><BsFillCheckCircleFill color='green'/>
        </div>
          <div className={styles.formularioContenedor + (isOpen ? "" : " " + styles.contenedorFormularioSeOculta) } onClick={clickException}>
            <div className={styles.botonSalida} onClick={outOfModal}>
              <AiFillCloseCircle />
            </div>

            <form className={styles.formulario} onSubmit={handleSubmit((sendData))}>
              
              <p className={styles.titulo}>
                Registro <br/>de Usuario
              </p>
              
              <input 
                className={styles.entradaDeDatos } 
                type="text"
                placeholder="Usuario"
                { ...register(
                    "username",  
                    { required: "The username field is required",
                      validate: (value) => {
                        if (value.includes(' ')) return "The username cannot have spaces";
                      },
                      onChange:() => clearErrors()
                    }
                  )
                }
                />
              {errors.username && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.username.message}</span>}
              {!estadoMensajeUsuarioExistenteOculto && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >*El nombre de usuario ya es usado*</span>}
                    
              <input 
                className={styles.entradaDeDatos } 
                type="text"
                placeholder="Nombre"
                { ...register(
                    "firstname",  
                    { required: "The firstname field is required",
                      onChange:() => clearErrors()
                    }
                  )
                }
                />
              {errors.firstname && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.firstname.message}</span>}
 
              <input 
                className={styles.entradaDeDatos } 
                type="text"
                placeholder="Apellido"
                { ...register(
                    "lastname",  
                    { required: "The lastname field is required",
                      onChange:() => clearErrors()
                    }
                  )
                }
                />
              {errors.lastname && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.lastname.message}</span>}

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
        
              <input 
                className={styles.entradaDeDatos } 
                type="text"
                placeholder="Email"
                { ...register(
                    "email",  
                    { required: "The email field is required",
                      validate: (value) => {
                        if (value.includes(' ')) return "The email cannot have spaces";
                        if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value))) return "Doesnt correspond with an email";
                      },
                      onChange:() => clearErrors()
                    }
                  )
                }
                />
              {errors.email && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.email.message}</span>}

              <input 
                className={styles.entradaDeDatos } 
                type="password"
                placeholder="Confirme la contraseña"
                { ...register(
                    "passwordConfirmation",  
                    { required: "The passwordConfirmation field is required",
                      validate: (value) => {
                        if (value != watch("password")) return "The password confirmation doesn´t match";
                      },
                      onChange:() => clearErrors()
                    }
                  )
                }
                />
              {errors.passwordConfirmation && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.passwordConfirmation.message}</span>}

              <button className={styles.botonSubmit} disabled={isFetching} > 
                { isFetching && <div className='spinner'></div> }Registrar 
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default FormularioRegistro;