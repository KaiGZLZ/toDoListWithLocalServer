import style from "../hojas-de-estilo/BotonDeSalida.module.css"
import { useNavigate} from "react-router-dom";
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/userSlice";


function BotonDeSalida() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggout = (e) => {
    e.preventDefault(); 
    localStorage.clear(); 
    dispatch(setTasks([]))
    navigate('/');
  }

  return(
    <>
      <button className={style.botonSalida} onClick={loggout}><BiLogOut margin='2rem' />Salir</button>
    </>
  );
}

export default BotonDeSalida;