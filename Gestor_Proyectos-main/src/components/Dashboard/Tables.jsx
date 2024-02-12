import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/tables.css"
import ModalUser from './ModalUser';
import Swal from 'sweetalert2';

function Tables() {
  const [MiembrosList, setMiembros] = useState([]);
  const [EquiposList, setEquipos] = useState([]); // Estado para almacenar los equipos
  const [editar, setEditar] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [estado, setEstado] = useState('');
  const [equipo, setEquipo] = useState('');
  const [id, setId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchMiembros = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/usuarios');
        setMiembros(respuesta.data.datos);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchEquipos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/equipos');
        setEquipos(respuesta.data.datos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMiembros();
    fetchEquipos();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/usuarios');
        setMiembros(respuesta.data.datos);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const validarCampos = () => {
    const caracteresPermitidos = /^[a-zA-Z0-9\s@#$%^&*_!-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      usuario.trim() !== '' &&
      correo.trim() !== '' &&
      contra.trim() !== '' &&
      rol.trim() !== ''
    ) {
      if (
        !caracteresPermitidos.test(usuario) ||
        !caracteresPermitidos.test(rol)
      ) {
        setErrorMessage('Datos a insertar no permitidos.');
        return false;
      }

      if (!emailRegex.test(correo.trim())) {
        setErrorMessage('Formato de correo electrónico inválido.');
        return false;
      }

      return true;
    } else {
      setErrorMessage('Todos los campos son obligatorios');
      return false;
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDeletion = await Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (confirmDeletion.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/eliminarUsuario/${userId}`);
        setMiembros((prevMiembros) =>
          prevMiembros.filter((miembro) => miembro.id_usuarios !== userId)
        );
        Swal.fire('Usuario eliminado', '', 'success');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const actualizarUsuario = async () => {
    if (validarCampos()) {
      try {
        await axios.put('http://localhost:3000/editarusuario', {
          id_usuarios: id,
          correo_electronico: correo,
          contrasenia: contra,
          especialidad: especialidad, // Aquí es donde estás enviando el valor actual del estado
          nombre_del_usuario: usuario,
          nombre_del_rol: rol,
          estado: estado,
          equipo: equipo, // Aquí es donde estás enviando el valor actual del estado
        });
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado con éxito',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el usuario',
          text: 'Ha ocurrido un error al intentar actualizar el usuario. Por favor, inténtalo de nuevo más tarde.',
        });
      }
    }
  };


  const editarUsuario = (val) => {
    setEditar(true);
    setId(val.id_usuarios);
    setCorreo(val.correo_electronico);
    setContra(val.contrasenia);
    setUsuario(val.nombre_del_usuario);
    setEspecialidad(val.especialidad);
    setRol(val.nombre_del_rol);
    setEstado(val.estado);
    setEquipo(val.equipo);
    setMostrarFormulario(true); // Cuando se edita un usuario, se muestra el formulario

  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false); // Al hacer clic en cerrar, se cierra el formulario
  }


  return (
    <>
      {mostrarFormulario && editar && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <div className="flex items-center mb-6">
              <h1 className="text-2xl font-bold mr-24">Formulario de Editar</h1>
              <button className="text-black font-extrabold w-10 h-10 hover:bg-red-600 hover:text-white" onClick={cerrarFormulario}>X</button>
            </div>
            <label className="block mb-4 text-medium font-medium">
              Nombre de usuario:
              <input
                className="border rounded-lg w-full mt-1 py-2 p-2"
                onChange={(event) => {
                  setUsuario(event.target.value.trim());
                  setErrorMessage('');
                }}
                value={usuario}
                type='text'
                required
              />
            </label>
            <label className="block mb-4 text-medium font-medium">
              Correo electrónico:
              <input
                className="border rounded-lg w-full mt-1 py-2 p-2"
                onChange={(event) => {
                  setCorreo(event.target.value.trim());
                  setErrorMessage('');
                }}
                value={correo}
                type='email'
                required
              />
            </label>
            <div className="col-span-2 sm:col-span-1 flex-grow w-full mr-2">
              <label htmlFor="category" className="block text-sm font-medium">Especialidad</label>
              <select
                onChange={(event) => {
                  setEspecialidad(event.target.value);
                  setErrorMessage('');
                }}
                value={especialidad || ""} // Aquí aseguramos que el valor no sea nulo
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="" disabled>Selecciona una especialidad</option>
                <option value="Programador">Programador</option>
                <option value="Diseñador">Diseñador</option>
                <option value="Analista">Analista</option>
              </select>

            </div>

            <div className="mb-4">
              <label htmlFor="rol" className="block  text-medium font-medium">Rol</label>
              <select
                onChange={(event) => {
                  setRol(event.target.value);
                  setErrorMessage('');
                }}
                value={rol || ""} // Aseguramos que el valor no sea nulo
                id="rol"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Selecciona un rol</option>
                <option value="Miembro">Miembro</option>
                <option value="Administrador">Administrador</option>
              </select>

            </div>
            <label htmlFor="team" className="block  text-medium font-medium">Equipo</label>
            <select
              onChange={(event) => {
                setEquipo(event.target.value);
                setErrorMessage('');
              }}
              value={equipo}
              id="team"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="">Selecciona un equipo</option>
              {EquiposList.map((equipo) => (
                <option key={equipo.id_equipos} value={equipo.nombre_del_equipo}>{equipo.nombre_del_equipo}</option>
              ))}
            </select>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <div className="flex items-center justify-center mt-2">
              <button className="bg-blue-800 w-52 text-center text-white py-2 rounded-md hover:bg-red-700" onClick={actualizarUsuario}>Actualizar Usuario</button>
            </div>
          </div>
        </div>

      )}
      <div class="flex justify-center mt-10  lg:ml-60">
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 mx-auto">
          <div className='flex justify-between space-y-3'>
            <h1 class="text-3xl mb-2 text-left font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
              <span class="text-transparent mr-10 bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Tabla Usuarios
              </span>
            </h1>
            <ModalUser></ModalUser>
          </div>
          <table class="w-full border-collapse bg-white text-left text-xs md:text-sm lg:text-base text-gray-500 ">
            <thead class="bg-gray-50 w-full">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nombre</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Rol</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Especialidad</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Equipo</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
              </tr>
            </thead>
            {MiembrosList.map((val, key) => {
              const cid = val.id_usuarios;
              const isAdmin = val.nombre_del_rol === 'Miembro';
              return (
                <tbody key={key} class="divide-y divide-gray-100 border-t border-gray-100">
                  <tr class="hover:bg-gray-50">
                    <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div class="text-sm">
                        <div class="font-medium text-gray-700">{val.nombre_del_usuario}</div>
                        <div class="text-gray-400">{val.correo_electronico}</div>
                      </div>
                    </th>
                    <td class="px-6 py-4">{val.especialidad}</td>
                    <td class="px-6 py-4">{val.nombre_del_rol}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                          {val.equipo}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex justify-end gap-4 w-30">
                        {isAdmin ? (
                          <a href="#" >
                            <svg
                              onClick={() => {
                                handleDeleteUser(cid);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            <svg
                              onClick={() => {
                                editarUsuario(val);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </a>
                        ) : null}
                        {!isAdmin && (
                          <a x-data="{ tooltip: 'Edite' }" href="#">
                            <svg
                              onClick={() => {
                                editarUsuario(val);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-6 w-6"
                              x-tooltip="tooltip"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      </div>
    </>
  )
}

export default Tables