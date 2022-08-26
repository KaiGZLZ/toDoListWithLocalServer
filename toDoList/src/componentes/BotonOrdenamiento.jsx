import { useState } from "react";
import '../hojas-de-estilo/BotonOrdenamiento.css'
import { AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from "react-icons/ai";

function BotonOrdenamiento( props ) {

  const [estadoBoton, setEstado] = useState(0);

  const accionOrdenamiento = () => {

    setEstado(estadoBoton === 2 ? 0 : estadoBoton + 1);
    
    props.onPresionar(estadoBoton === 2 ? 0 : estadoBoton + 1);
    
  }

  return(
    
    <div  className={`boton${(estadoBoton === 0) ? ' estado-0' : (estadoBoton === 1) ? ' estado-1' : ' estado-2'}`}    
          onClick={accionOrdenamiento}>

      {(estadoBoton === 0) ? <AiFillCaretRight/> : (estadoBoton === 1) ? <AiFillCaretDown/> :  <AiFillCaretUp/>}
      
    </div>
  );
}

export default BotonOrdenamiento;