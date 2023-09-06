import styles from '../hojas-de-estilo/FormularioInicioSesion.module.css'
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useLazyForgottenPasswordUserQuery } from '../services/user.service';
import { setAlert } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

function ForgottenPasswordForm(){

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true) // This function is just for the fade style of the form when the page is open
  }, []);

  const [sendEmail, { isFetching, error: errorSendingEmail }] = useLazyForgottenPasswordUserQuery()
  
  const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });
  
  const sendData = data => {  //  Al presionar el boton
    
    sendEmail({data})
      .then((response) => {

        if(response.isSuccess){

          dispatch(setAlert({type: "success", message: 'The email was sent successfully'}));
          
          navigate('/');
        }
      })
  }
 
  return(
    <div>
      <div className={styles.contenedorGeneral + (isOpen ? "" : " " + styles.modalSeOculta) } >
          <div className={styles.formularioContenedor + (isOpen ? "" : " " + styles.contenedorFormularioSeOculta) } >
            <form className={styles.formulario} onSubmit={handleSubmit(sendData)}>
              <div className={styles.botonSalida}>
                <Link to="/" style={{fontSize: "20px", color: "black"}}>Go Back</Link>
              </div>

              <p className={styles.titulo}>
                Recover the password
              </p>
              
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
                       
              { errorSendingEmail && <>
                <div className={styles.cajita}>
                    <p className={styles.avisoUsuarioOContraseñaIncorrecta}>
                      {errorSendingEmail.data.message}
                    </p>
                </div>
              </>
              }
              <button disabled={isFetching} className={styles.botonSubmit}>
                 {isFetching && <CircularProgress size={25} />}   Send Email 
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default ForgottenPasswordForm;