import style from "../hojas-de-estilo/BotonEliminarCuenta.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillCloseCircle, AiOutlineWarning } from "react-icons/ai";
import { useLazyDeleteUserQuery } from "../services/user.service";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/userSlice";


function BotonEliminarCuenta() {

  const [deleteUser, {data, isFetching, isSuccess, error}] = useLazyDeleteUserQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ password, setPasswordUser ] = useState("");
  const [ hiddenMessagePasswordState, setHiddenMessagePasswordState] = useState(true);
  const [isOpen, setIsOpen] = useState(false);


  const cancelFunction = () => {

    setPasswordUser("");
    setHiddenMessagePasswordState(true);
    setIsOpen(!isOpen);
  }

  const deleteAcount = (e) => {

    e.preventDefault();

    deleteUser({ password: password })
      .then((response) => {
        if(response.data.data.result === false){
          setHiddenMessagePasswordState(false);
        } else {
          console.log('Usuario Eliminado');
          dispatch(setTasks([]))
          navigate('/');
        }
      })
  }

  return(
    <>
        <button className={style.botonEliminar} onClick={() => setIsOpen(!isOpen)}>Eliminar cuenta</button>

        <div className={style.contenedorGeneral + (isOpen ? "" : " " + style.modalSeOculta) }>
          <div className={style.formularioContenedor + (isOpen ? "" : " " + style.contenedorFormularioSeOculta) }>
            <div className={style.botonSalida} onClick={cancelFunction}>
              <AiFillCloseCircle />
            </div>

            <form className={style.formulario} >
              <AiOutlineWarning color='red' size={100}/>
              
              <p className={style.titulo }>
                ATENCION!!
              </p>
              <p className={style.parrafoAviso}>
                Usted esta eliminando su cuenta. <br/> <br/> Por favor ingrese la clave para continuar con el procedimiento
              </p>
              
              <input 
                className={style.entradaDeDatos} 
                type="password" 
                value={password} 
                placeholder="Clave" 
                onChange={ (e) =>  setPasswordUser(e.target.value)} 
                />
              
              <div className={style.cajita}>
                <p className={style.avisoUsuarioOContraseñaIncorrecta + (hiddenMessagePasswordState ? " " + style.oculto : "")}>
                  *La contraseña ingresada es incorrecta*
                </p>
              </div>
              
              <button className={style.botonSubmit} disabled={isFetching} onClick={deleteAcount}> Eliminar cuenta </button>
            </form>
          </div>
      </div>
    </>
  );
}

export default BotonEliminarCuenta;