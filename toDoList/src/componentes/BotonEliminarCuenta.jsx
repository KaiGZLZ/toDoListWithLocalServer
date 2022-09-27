import style from "../hojas-de-estilo/BotonEliminarCuenta.module.css"
import { useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import { AiFillCloseCircle, AiOutlineWarning } from "react-icons/ai";


function BotonEliminarCuenta(props) {

  const navigate = useNavigate();
  const { username } = useParams();
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

    const userToDelete = {
      name: username,      
      password: password
    }

    fetch(props.ipServer + '/delete/user', {
      method: 'DELETE', 
      body: JSON.stringify(userToDelete), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response.result === false){
        setHiddenMessagePasswordState(false);
      } else {
        console.log('Usuario Eliminado');
        navigate('/');
      }
    });
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
                  *El usuario o la contraseña ingresada fueron incorrectos*
                </p>
              </div>
              
              <button className={style.botonSubmit} onClick={deleteAcount}> Eliminar cuenta </button>
            </form>
          </div>
      </div>
    </>
  );
}

export default BotonEliminarCuenta;