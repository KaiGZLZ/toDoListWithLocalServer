
import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomePage from "./views/HomePage";
import Dashboard from "./views/Dashboard";
import AuthenticatingPage from './views/AuthenticatingPage';
import ForgottenPasswordForm from './views/ForgotenPasswordForm';
import ChangePasswordForm from './views/ChangePasswordForm';

import { PrivateRoute } from "./__helpers/PrivateRoute";
import { CustomAlert } from './componentes/CustomAlert';
import { clearAlert } from './redux/alertSlice';


function App() {  

  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);
  const [alertActive, setAlertActive] = useState(false);

  useEffect(() => {
    if (alert.type && alert.message){
      setAlertActive(true);
      setTimeout(() => {
        setAlertActive(false)
        dispatch(clearAlert())
      }, 3000);
    }
  }, [alert]);

  return(
    <>
      <CustomAlert state={alertActive} severity={alert.type} message={alert.message} />
      <Router>
        <Switch>

          {/* Public Routes */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<HomePage />} />
          <Route exact path="/authenticate" element={<AuthenticatingPage />} />
          <Route exact path="/forgotten-password" element={<ForgottenPasswordForm />} />
          <Route exact path="/change-password" element={<ChangePasswordForm />} />
          
          {/* Routes that require authentication token */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
