import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalUser() {
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [equipo, setEquipo] = useState('');
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [equiposList, setEquiposList] = useState([]);
  const [usuariosList, setUsuariosList] = useState([]); // Nuevo estado para almacenar los datos de usuarios


  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/equipos');
        setEquiposList(response.data.datos);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsuarios = async () => { // Función para obtener los datos de usuarios
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        setUsuariosList(response.data.datos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipos();
    fetchUsuarios(); // Llamar a la función para obtener los datos de usuarios
  }, []);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validarCampos = () => {
    if (
      usuario.trim() !== '' &&
      correo.trim() !== '' &&
      contra.trim() !== '' &&
      equipo.trim() !== '' &&
      rol.trim() !== ''
    ) {
      if (contra.length < 5) {
        setErrorMessage('La contraseña debe tener al menos 5 caracteres');
        return false;
      }
      if (!/(?=.*[A-Z])/.test(contra) || !/\d/.test(contra)) {
        setErrorMessage('La contraseña debe contener al menos una mayúscula y un número');
        return false;
      }
      if (/[<>]/.test(usuario) || /[<>]/.test(correo) || /[<>]/.test(equipo) || /[<>]/.test(rol) || /[()]/.test(usuario) || /[()]/.test(correo) || /[()]/.test(equipo) || /[()]/.test(rol)) {
        setErrorMessage('Datos a insertar no permitidos.');
        return false;
      }
      return true;
    } else {
      setErrorMessage('Todos los campos son obligatorios');
      return false;
    }
  };

  const actualizarUsuario = async () => {
    if (validarCampos()) {
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
        console.error(error);
      }
    }
  };

  const agregarUsuario = async () => {
    if (validarCampos()) {
      try {
        await axios.post('http://localhost:3000/crearusuario', {
          correo_electronico: correo,
          contrasenia: contra,
          nombre_del_usuario: usuario,
          nombre_del_rol: rol,
          equipo: equipo,
        });
        alert('Usuario registrado con éxito');
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <button onClick={openModal} className="w-30  mr-10 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Agregar Usuario
      </button>

      {isModalOpen && (
        <div id="crud-modal" aria-hidden="true" className=" fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white">
          <div className="bg-green-700 ml-20 w-full max-w-md p-6 rounded-lg shadow-md ">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Crear Nuevo Usuario
              </h3>
              <button type="button" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center" data-modal-toggle="crud-modal" onClick={closeModal}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="grid gap-4 grid-cols-1">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label for="name" className="block mb-2 text-sm font-medium text-white">Nombre</label>
                  <input
                    onChange={(event) => {
                      setUsuario(event.target.value);
                      setErrorMessage('');
                    }}
                    type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce un nombre" required />
                </div>
                <div className="col-span-2">
                  <label for="name" className="block text-sm font-medium text-white">Correo</label>
                  <input
                    onChange={(event) => {
                      setCorreo(event.target.value);
                      setErrorMessage('');
                    }}
                    type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce un correo electronico" required />
                </div>
                <div className="col-span-2">
                  <label for="name" className="block text-sm font-medium text-white">Contraseña</label>
                  <input
                    onChange={(event) => {
                      setContra(event.target.value);
                      setErrorMessage('');
                    }}
                    type="text" name="password" id="password" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Introduce una contraseña" required />
                </div>
                <div className="col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-white">Equipo</label>
                  <select
                    onChange={(event) => {
                      setEquipo(event.target.value);
                      setErrorMessage('');
                    }}
                    id="team" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black ">
                    <option style={{ color: 'black' }} value="">Selecciona un equipo</option>
                    {equiposList.map((equipo) => (
                      <option style={{ color: 'black' }} key={equipo.id_equipos} value={equipo.nombre_del_equipo}>{equipo.nombre_del_equipo}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="category" className="block text-sm font-medium text-white">Rol</label>
                  <select
                    onChange={(event) => {
                      setRol(event.target.value);
                      setErrorMessage('');
                    }}
                    id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="" disabled selected>Selecciona un rol</option>
                    <option value="Miembro">Miembro</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>

              </div>
            </form>

            {errorMessage && <p className="text-white font-bold text-lg text-center mb-2">{errorMessage}</p>}

            <button
              type="submit"
              className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={editar ? actualizarUsuario : agregarUsuario}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="ms-2">{editar ? 'Actualizar Usuario' : 'Agregar Nuevo Usuario'}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalUser;
