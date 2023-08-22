import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { passphrase } from '../config/config';
import CryptoJS from "crypto-js"

//Renderizar un componente ruta si el usuario está conectado, de lo contrario, lo redirige a la página /login.
//Verifica rol de igual forma para restringir el acceso
export const PrivateRoute = () => {
    
    let currentUser = localStorage.getItem('user');

    //no logueado redireccionar al login
    if (!currentUser) {
        return  <Navigate to={'/'}/>
    }

    //Obtener data de usuario
    try{
        let bytes  = CryptoJS.AES.decrypt(currentUser, passphrase);
        let originalData = bytes.toString(CryptoJS.enc.Utf8);
        JSON.parse(originalData);
        return <Outlet />

    }catch(err){
        //  The user is not authorized
        return <Navigate to={'/'}/>
    }
}