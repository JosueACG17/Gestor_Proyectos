import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/tables.css"
import ModalUser from './ModalUser';
import Swal from 'sweetalert2';

function Tables() {
  const [MiembrosList, setMiembros] = useState([]);
  const [editar, setEditar] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const [usuario, setUsuario] = useState('');
  const [rol, setRol] = useState('');
  const [estado, setEstado] = useState('');
  const [equipo, setEquipo] = useState('');
  const [id, setId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (
      usuario.trim() !== '' &&
      correo.trim() !== '' &&
      contra.trim() !== '' &&
      equipo.trim() !== '' &&
      rol.trim() !== ''
    ) {
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
          nombre_del_usuario: usuario,
          nombre_del_rol: rol,
          estado: estado,
          equipo: equipo,
        });
        alert('Usuario actualizado con éxito');
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } 
  };

  const editarUsuario = (val) => {
    setEditar(true);
    setId(val.id_usuarios);
    setCorreo(val.correo_electronico);
    setContra(val.contrasenia);
    setUsuario(val.nombre_del_usuario);
    setRol(val.nombre_del_rol);
    setEstado(val.estado);
    setEquipo(val.equipo);
  };

  return (
    <>
      {editar ? (
        <div className="app">
          <div className="datos">
            <label>Correo electrónico:
              <input
                onChange={(event) => {
                  setCorreo(event.target.value.trim());
                  setErrorMessage('');
                }}
                value={correo}
                type='email' />
            </label><br />
            <label>Contraseña:
              <input
                onChange={(event) => {
                  setContra(event.target.value.trim());
                  setErrorMessage('');
                }}
                value={contra}
                type='text' />
            </label><br />
            <label>Nombre de usuario:
              <input
                onChange={(event) => {
                  setUsuario(event.target.value.trim());
                  setErrorMessage('');
                }}
                value={usuario}
                type='text' />
            </label><br />
            <label>Rol:
              <input
                onChange={(event) => {
                  setRol(event.target.value.trim());
                  setErrorMessage('');
                }}
                value={rol}
                type='text' />
            </label><br />
            <label>Equipo:
              <input
                onChange={(event) => {
                  setEquipo(event.target.value.trim());
                  setErrorMessage('');
                }}
                value={equipo}
                type='text' />
            </label><br />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button onClick={actualizarUsuario}>Editar</button>
          </div>
        </div>
      ) : (
        <div class="flex justify-center mt-10  lg:ml-60">
          <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 mx-auto">
            <div className='flex justify-between space-y-3'>
              <h1 class="text-3xl mb-2 text-left font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
                <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
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
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900">Equipo</th>
                  <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                </tr>
              </thead>
              {MiembrosList.map((val, key) => {
                const cid = val.id_usuarios;
                return (
                  <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                    <tr class="hover:bg-gray-50">
                      <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="text-sm">
                          <div class="font-medium text-gray-700">{val.nombre_del_usuario}</div>
                          <div class="text-gray-400">{val.correo_electronico}</div>
                        </div>
                      </th>
                      <td class="px-6 py-4">{val.nombre_del_rol}</td>
                      <td class="px-6 py-4">
                        <div class="flex gap-2">
                          <span
                            class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                          >
                            {val.equipo}
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex justify-end gap-4">
                          <a href="#" >
                            <svg
                              onClick={() => {
                                handleDeleteUser(cid);
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </a>
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                              />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default Tables;
