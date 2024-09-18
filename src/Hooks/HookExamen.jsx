import React, { useState } from 'react';
import axios from 'axios';
import {alertReactCrud, closeModal, focus} from "../js/functions.js";

export const HookExamen = () => {
    
    const [result, setResult] = useState();
    const [data, setData] =useState([]);
    const [joperacion, setJoperacion] = useState();
    
    const [jid, setJid] = useState('');
    const [jname, setJname] = useState('');
    const [jimg, setJimg] = useState('');


    const getCategories = async () => {
        var numberOfItemsToShow = 200;

        const url = 'https://api.escuelajs.co/api/v1/categories';
        const result = await axios.get(url);
        const resultData = await result;
    
        if (resultData.data.length > numberOfItemsToShow){
          alertReactCrud("La lista de categorias es muy grande "+resultData.data.length+" usuarios, mostrando solo los primeros "+numberOfItemsToShow+" registros.", "warning");
          setData(resultData.data.slice(0, numberOfItemsToShow));
        } else {
          setData(resultData.data);
        } 
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        if (jname == null || jname.length == 0){
            alertReactCrud("El Name ingresado es incorrecto. {"+jname+"}", 'warning');
            focus('name');
            return;
        }

        if (jimg == null || jimg.length == 0){
            alertReactCrud("La imagen ingresada es incorrecta.", 'warning');
            focus('img');
            return;
        }

        closeModal('btonCloseEdit');

        const catObject = {
            name: jname,
            image: jimg
        }

        var url;
        var resultApi;

        if (joperacion == 1){
            // Create //
            url = "https://api.escuelajs.co/api/v1/categories/";
            resultApi = await axios.post(url, catObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
            //console.info("Creando ...");
        } else {
            // Update //
            url = "https://api.escuelajs.co/api/v1/categories/"+jid;
            resultApi = await axios.put(url, catObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
        }
        
        try {

            const data = await resultApi;
            setResult(resultApi.data);

            if (resultApi.data.id > 0){
                if (joperacion == 1) {
                    alertReactCrud("La categoria "+resultApi.data.name+" fue creada exitosamente.\n", 'success');
                } else {
                    alertReactCrud("La categoria "+resultApi.data.name+" fue actualizada exitosamente.\n", 'success');
                }

                getCategories();
            } else {
                alertReactCrud("Ocurrio un error en el proceso.", 'error');
            }
        } catch (error) {
        console.info(error.message || 'Error desconocido');
      }
    }

    const submitDeletetHandler = async (event) => {
        event.preventDefault();
        const url = "https://api.escuelajs.co/api/v1/categories/"+jid;
        const resultApi = await axios.delete(url);
        setResult(await resultApi.data);
        alertReactCrud("La categoria "+jname+" fue borrada exitosamente.", 'success');
        getCategories();
    }

    return {
        getCategories,
        data,
        setJid,
        setJname,
        setJimg,
        setJoperacion,
        submitHandler,
        submitDeletetHandler
    }
}
