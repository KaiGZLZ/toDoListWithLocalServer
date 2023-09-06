import styles from '../hojas-de-estilo/FormularioInicioSesion.module.css'
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useLazyChangePasswordUserQuery } from '../services/user.service';
import { setAlert } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

function ChangePasswordForm(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true) // This function is just for the fade style of the form when the page is open
  }, []);

  const [changePassword, { isFetching, error: errorChangingPassword }] = useLazyChangePasswordUserQuery()
  
  const { register, handleSubmit, reset, watch, clearErrors, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });
  
  const sendData = data => {  //  Al presionar el boton
    
    data.token = location.hash.replace("#", "");
    
    changePassword({data})
      .then((response) => {

        if(response.isSuccess){

          dispatch(setAlert({type: "success", message: response.data.message}));
          
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
                Change the password
              </p>
              
              <input 
                className={styles.entradaDeDatos } 
                type="password"
                placeholder="Enter the new password"
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
                type="password"
                placeholder="Repeat the password"
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

              { errorChangingPassword && <>
                <div className={styles.cajita}>
                    <p className={styles.avisoUsuarioOContraseñaIncorrecta}>
                      {errorChangingPassword.data?.message ?? errorChangingPassword.error}
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

export default ChangePasswordForm;