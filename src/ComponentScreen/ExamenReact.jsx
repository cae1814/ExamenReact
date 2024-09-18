import { useState, useEffect } from "react";
import axios from "axios";
import { HookExamen } from "../Hooks/HookExamen.jsx";
import {alertReactCrud, clearId} from "../js/functions.js";
import "../assets/font-awesome/css/font-awesome.min.css";

export const ExamenReact = () => {
  const {getCategories, data, submitHandler, submitDeletetHandler, setJoperacion, setJid, setJname, setJimg} = HookExamen();
  
  useEffect(() => {
    getCategories();
  }, []);

  const [operacion, setOperacion] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [img, setImg] = useState();

const l_submitDeletetHandler = (id, name) => {
  setId(id);
  setJid(id);
  setName(name);
  setJname(name);  
}

const l_changeName = (p_name) => {
  setName(p_name);
  setJname(p_name);
}

const l_changeImg = (p_img) => {
  setImg(p_img);
  setJimg(p_img);
}

const l_submitUpdatetHandler = (p_operacion, p_id, p_name, p_img) => {
  setOperacion(p_operacion);
  setJoperacion(p_operacion);

  if (p_operacion == 1) {
    clearId("name");
    clearId("img");
  }

  // Almacenamiento local //
  setId(p_id);
  setName(p_name);
  setImg(p_img);

  // Hook //
  setJid(p_id);
  setJname(p_name);
  setJimg(p_img);
}

  return (
    <>
      <div className="mt-2 ml-4">
        <nav className="nav nav-pills nav-fill">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/EjercicioReactJs">Ejercicio React Js</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/ejercicioReactJS2">Ejercicio React Js2</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/EjercicioCrudReact">Ejercicio CRUD React</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/EjercicioCrudReactP2">Ejercicio CRUD React p2</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/ExamenReact">ExamenReact</a>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <section className="container mt-4 mb-1 show" id="crud1">
          <div className="text-start" id="employees">
            <h5 className="font-size-17">Examen React | fecha: 17/09/2024</h5>
          </div>
          <div className="border pt-3 px-3 col-sm-8 col-md-8 col-lg-8" style={{ paddingright: "7px" }} >
            <div className="row">
                <div className="col-sm-10 col-md-10 col-lg-10">
                  <div className="row h4 pb-1 mb-5 border-bottom border-danger font-size-16 font-family-app">Listado de Categorias</div>
                </div>
                <div className="text-end col-sm-2 col-md-2 col-lg-2">
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => l_submitUpdatetHandler(1)} data-bs-toggle="modal" data-bs-target="#confEdit"><i className='fa fa-edit' style={{ fontSize: "16px" }}></i>&nbsp;Crear</button>&nbsp;
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => getCategories()}><i className='fa fa-refresh' style={{ fontSize: "16px" }}></i>&nbsp;Refrescar</button>&nbsp;
                </div>
              </div>
            <div className="row g-3 align-items-center">
              <div className="row col-lg-12 col-md-12 col-sm-12">
              <div className="bd-example">
                <table className="table table-hover font-size-13">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Image</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((item) => (
                  <tr key={item.id}>
                    <td scope="row">{item.id}</td>
                    <td> {item.name} </td>
                    <td> <div className="text-center"><img src={item.image} width="40px" className="rounded" alt="..." /></div></td>                    
                    <td>
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => l_submitUpdatetHandler(2, item.id, item.name, item.image)} data-bs-toggle="modal" data-bs-target="#confEdit"><i className='fa fa-edit' style={{ fontSize: "16px" }}></i>&nbsp;Editar</button>&nbsp;
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => l_submitDeletetHandler(item.id, item.name)} data-bs-toggle="modal" data-bs-target="#confDelete"><i className='fa fa-trash-o' style={{ fontSize: "16px" }}></i>&nbsp;Borrar</button>
                    </td>
                  </tr>
                ))}
                  </tbody>
                </table>
              </div>
              </div>           
            </div>
          </div>
          <br></br>
        </section>
      </div>


      <div className="modal fade" id="confDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Examen React | Delete Categories</b></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "16px"}}><span className="font-color-red"><i className='fa fa-exclamation-triangle' style={{ fontSize: "17px" }}></i>&nbsp;<b>Cuidado!</b></span></p>
              <p style={{ fontSize: "16px"}}>¿Esta seguro que desea borrar la categoria <b>{name}</b>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary btn-sm" onClick={submitDeletetHandler} data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="confEdit" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Examen React | Categories Management</b></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="card" style={{ width: "100%"}}>
                <div className="text-center mt-3">
                  <img src={img}className="card-img-top" alt="..." style={{ width: "50%"}} />
                </div>
                  <div className="card-body">
                  <form onSubmit={submitHandler}>
                      <legend className="font-size-17 text-center"><b>{name}</b></legend>
                      <div className="mb-2">
                        <label htmlFor="name" className="form-label font-size-14">Name</label>
                        <input type="text" name="name" id="name" className="form-control font-size-14" placeholder="Name for user" value={name} onChange={(e) => l_changeName(e.target.value)} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="img" className="form-label font-size-14">Image Url</label>
                        <input type="text" name="img" id="img" className="form-control font-size-14" placeholder="img for categories" value={img} onChange={(e) => l_changeImg(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary btn-sm"><i className='fa fa-check-square' style={{ fontSize: "16px" }}></i>&nbsp;Guardar</button>                    
                  </form>
                  </div>
                </div>
              </div>
            <div className="modal-footer">
              <button id="btonCloseEdit" type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal"><i className='fa fa-reply' style={{ fontSize: "16px" }}></i>&nbsp;Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
