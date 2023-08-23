import React from "react";
import "../hojas-de-estilo/Formulario.css"
import styles from '../hojas-de-estilo/FormularioInicioSesion.module.css'
import { v4 as uuidv4} from "uuid"
import { useLazyRegisterTaskQuery } from "../services/task.service";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/userSlice";
import { useForm } from "react-hook-form";

function Formulario(){

  const dispatch = useDispatch();

  const [registerTask, { isFetching }] = useLazyRegisterTaskQuery();

  const { register, handleSubmit, reset, clearErrors, formState: { errors } } = useForm({ reValidateMode: "onSubmit" });

  // When the button is pressed
  const sendData = data => {

    const dataToSend = {
      task: {
        id: uuidv4(),
        ...data
      }
    }
    registerTask(dataToSend)
      .then((response) => {

        if(response.isSuccess){          
          dispatch(setTasks([...response.data.tasks]));
          reset();
        }
        else{
          console.log(response.error);
        }
      })
  }

  return(
    <div>
      <div className='formulario-contenedor'>

      <form className="formulario" onSubmit={handleSubmit(sendData)}>

        <input 
          className={"entrada-datos" } 
          type="text"
          placeholder="Tarea"
          { ...register(
              "title",  
              { required: "The title field is required",
                setValueAs: value => value.trim(),
                onChange:() => clearErrors(),
              }
            )
          }
          />
        {errors.title && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.title.message}</span>}
          
        <input 
          className={"entrada-datos" } 
          type="text"
          placeholder="Descripcion"
          { ...register(
              "description",  
              { setValueAs: value => value.trim(),
                onChange:() => clearErrors(),
              }
            )
          }
          />
        {errors.description && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.description.message}</span>}

        <input 
          className={"entrada-datos" } 
          type="text"
          placeholder="Responsable"
          { ...register(
              "responsible",    
              { required: "The responsible field is required",
                setValueAs: value => value.trim(),
                onChange:() => clearErrors(),
              }
            )
          }
          />
        {errors.responsible && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.responsible.message}</span>}

        <div className="opciones-prioridad">
          <p className="titulo-Prioridad">Prioridad</p>
          <div className="opciones-contenedor">
            <div className="opcion">
              <input id="prioridadBaja" {...register("priority", { required: "The priority field is required" })} type="radio" value="1" />
              <label htmlFor="prioridadBaja"> Baja</label>
            </div>
            <div className="opcion">
              <input id="prioridadMedia" {...register("priority", { required: "The priority field is required" })} type="radio" value="2" />
              <label htmlFor="prioridadMedia"> Media</label>
            </div>
            <div className="opcion">
              <input id="prioridadAlta" {...register("priority", { required: "The priority field is required" })} type="radio" value="3" />
              <label htmlFor="prioridadAlta"> Alta</label>
            </div>
          </div>
        </div>
        {errors.priority && <span className={styles.avisoUsuarioOContraseñaIncorrecta}  >{errors.priority.message}</span>}

        <button className='boton-submit' disabled={isFetching}> 
          { isFetching && <div className='spinner'></div> }Enviar 
        </button>
      </form>
      </div>
    </div>
    
  );
}

export default Formulario;