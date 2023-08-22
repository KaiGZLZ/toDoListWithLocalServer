
import './App.css';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";

import HomePage from "./views/HomePage";
import Dashboard from "./views/Dashboard";
import { PrivateRoute } from "./__helpers/PrivateRoute";


function App() {  
  return(
    <>
      <Router>
        <Switch>

          {/* Public Routes */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<HomePage />} />
          
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
