import '../hojas-de-estilo/BotonOrdenamiento.css'
import { AiFillCaretDown, AiFillCaretUp, AiFillCaretRight } from "react-icons/ai";

function BotonOrdenamiento( {onClick, state} ) {

  return(
    
    <div  className={`boton${(state === 0) ? ' estado-0' : (state === 1) ? ' estado-1' : ' estado-2'}`} onClick={onClick}>

      {(state === 0) ? <AiFillCaretRight/> : (state === 1) ? <AiFillCaretDown/> :  <AiFillCaretUp/>}
      
    </div>
  );
}

export default BotonOrdenamiento;