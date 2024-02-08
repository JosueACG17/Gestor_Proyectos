import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedUser = () => {
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [equipo, setEquipo] = useState('');
  const [id, setId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const idCategoria = localStorage.getItem("id");
    axios
      .get(`http://localhost:3000/obtenercategoria/${idCategoria}`)
      .then((respuesta) => {
        if (respuesta.data.mensaje === "exitoso") {
          setCategoria(respuesta.data.contenido[0]);
        } else {
        }
      })
  }, []);

  const actualizarUsuario = async () => {
    try {
      await axios.put('http://localhost:3000/editarusuario', {
        id_usuarios: id,
        correo_electronico: correo,
        contrasenia: contra,
        nombre_del_usuario: usuario,
        nombre_del_rol: rol,
        equipo: equipo,
      });
      alert('Usuario actualizado con éxito');
      window.location.reload();
    } catch (error) {
    }
  };

  return (
    <>
      <a href="#" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
          data-tooltip="tooltip"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </a>

      {isModalOpen && (
        <div
          id="crud-modal"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white"
        >
          <div className="bg-green-700 ml-20 w-full max-w-md p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Editar Usuario</h3>
              <button
                type="button"
                className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
                onClick={closeModal}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="grid gap-4 grid-cols-2">
            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label for="name" className="block mb-2 text-sm font-medium text-white">Nombre</label>
                                    <input
                                    onChange={(event) =>{
                                        setUsuario(event.target.value);
                                    }} 
                                    type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce un nombre" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label for="name" className="block mb-2 text-sm font-medium text-white">Correo</label>
                                    <input
                                    onChange={(event) =>{
                                        setCorreo(event.target.value);
                                    }}
                                    type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce un correo electronico" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label for="name" className="block mb-2 text-sm font-medium text-white">Contraseña</label>
                                    <input 
                                    onChange={(event) =>{
                                    setContra(event.target.value);
                                    }}
                                    type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce una contraseña" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label for="name" className="block mb-2 text-sm font-medium text-white">Equipo</label>
                                    <input 
                                    onChange={(event) =>{
                                        setEquipo(event.target.value);
                                    }}  
                                    type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce un nombre" required="" />
                                </div>
                               
                                <div className="col-span-2 sm:col-span-1">
                                    <label for="category" className="block mb-2 text-sm font-medium text-white">Rol</label>
                                    <select 
                                    onChange={(event) =>{
                                        setRol(event.target.value);
                                    }}
                                    id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected="">Selecciona un rol</option>
                                        <option value="Miembro">Miembro</option>
                                        <option value="Aministrador">Administrador</option>
                                    </select>
                                </div>
                            </div>
            </form>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={actualizarUsuario}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="ms-2">Actualizar Usuario</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MedUser;
