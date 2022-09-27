import style from "../hojas-de-estilo/BotonDeSalida.module.css"
import { Link} from "react-router-dom";
import { BiLogOut } from 'react-icons/bi';


function BotonDeSalida() {

  return(
    <>
      <Link to='/'>
        <button className={style.botonSalida}><BiLogOut margin='2rem' />Salir</button>
      </Link>
    </>
  );
}

export default BotonDeSalida;