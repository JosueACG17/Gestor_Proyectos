import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import "../../styles/tables.css"

function TablaProyect() {
    const [ProjectsList, setProject] = useState([]);
    const [editar, setEditar] = useState(false);
    const [proyecto, setProyecto] = useState('');
    const [estado, setEstado] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [id, setId] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3000/proyectos');
                setProject(respuesta.data.datos);
            } catch (error) {
            }
        };
        fetch();
    }, []);

    const handleDeleteProject = async (projectId) => {
        const confirmDeletion = await Swal.fire({
            title: '¿Estás seguro de eliminar este proyecto?',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            icon: 'warning',
        });

        if (confirmDeletion.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/eliminarProyecto/${projectId}`);
                setProject((prevProjects) =>
                    prevProjects.filter((project) => project.id_proyectos !== projectId)
                );
                Swal.fire('Proyecto eliminado', '', 'success');
            } catch (error) {

            }
        }
    };

    const validarCampos = () => {
        if (
            proyecto.trim() !== '' &&
            estado.trim() !== '' &&
            descripcion.trim() !== ''
        ) {
            if (/[^a-zA-Z0-9\s]/.test(proyecto) || /[^a-zA-Z0-9\s]/.test(estado) || /[^a-zA-Z0-9\s]/.test(descripcion)) {
                setErrorMessage('Datos a insertar no permitidos.');
                return false;
            }
            return true;
        } else {
            setErrorMessage('Todos los campos son obligatorios');
            return false;
        }
    };

    const actualizarProyecto = async () => {
        if (validarCampos()) {
            try {
                await axios.put('http://localhost:3000/editarproyecto', {
                    id_proyectos: id,
                    nombre_proyecto: proyecto,
                    estado_del_proyecto: estado,
                    descripcion: descripcion,
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Proyecto actualizado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });
            } catch (error) {
                console.error('Error al actualizar el proyecto:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar el proyecto',
                    text: 'Ha ocurrido un error al intentar actualizar el proyecto. Por favor, inténtalo de nuevo más tarde.',
                });
            }
        }
    };
    

    const editarUsuario = (val) => {
        setEditar(true);
        setId(val.id_proyectos);
        setProyecto(val.nombre_proyecto);
        setEstado(val.estado_del_proyecto);
        setDescripcion(val.descripcion);
    };

    const cerrarFormulario = () => {
        setEditar(false);
    };

    return (
        <>
            {editar ? (
                <div className="fixed inset-0 flex items-center justify-center bg-green-800 bg-opacity-70">
                    <div className="bg-white rounded-lg p-8 ml-20 max-w-md">
                        <div className="flex items-center mb-6">
                            <h1 className="text-2xl font-bold mr-20">Formulario de Editar</h1>
                            <button className="text-black font-extrabold w-10 h-10 hover:bg-red-600 hover:text-white" onClick={cerrarFormulario}>X</button>
                        </div>
                        <label className="block mb-4 text-medium font-medium">
                            Nombre del proyecto:
                            <input
                                className="border rounded-lg w-full mt-1 py-2 p-2"
                                onChange={(event) => {
                                    setProyecto(event.target.value.trim());
                                    setErrorMessage('');
                                }}
                                value={proyecto}
                                type='text'
                            />
                        </label>
                        <label className="block mb-4 text-medium font-medium">
                            Estado:
                            <select
                                className="border rounded-lg w-full mt-1 py-2 p-2"
                                onChange={(event) => {
                                    setEstado(event.target.value);
                                    setErrorMessage('');
                                }}
                                value={estado}
                            >
                                <option value="En curso">En curso</option>
                                <option value="Completado">Completado</option>
                                <option value="Pendiente">Pendiente</option>
                            </select>
                        </label>
                        <label className="block mb-4 text-medium font-medium">
                            Descripción:
                            <input
                                className="border rounded-lg w-full mt-1 py-2 p-2"
                                onChange={(event) => {
                                    setDescripcion(event.target.value.trim());
                                    setErrorMessage('');
                                }}
                                value={descripcion}
                                type='text'
                            />
                        </label>
                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                        <div className="flex items-center justify-center">
                            <button className="bg-blue-800 w-40 text-center text-white py-2  rounded-md hover:bg-red-700" onClick={actualizarProyecto}>Actualizar Proyecto</button>
                        </div>
                    </div>
                </div>

            ) : (
                <div class="flex justify-center mt-10 lg:ml-60">
                    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 mx-auto">
                        <h1 class="text-3xl mb-2 text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Tabla Proyectos</span> </h1>
                        <table class="w-full border-collapse bg-white text-left text-xs md:text-sm lg:text-base text-gray-500 ">
                            <thead class="bg-gray-50 w-full">
                                <tr>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Nombre</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Estado</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900">Descripción</th>
                                    <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
                                </tr>
                            </thead>
                            {ProjectsList.map((val, key) => {
                                const cid = val.id_proyectos;
                                return (
                                    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                                        <tr class="hover:bg-gray-50">
                                            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                                <div class="text-sm">
                                                    <div class="font-medium text-gray-700">{val.nombre_proyecto}</div>
                                                </div>
                                            </th>
                                            <td class="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${val.estado_del_proyecto === 'disponible' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                                    <span className={`transition-colors text-base font-semibold duration-200 ${val.estado_del_proyecto === "Disponible" ? 'text-green-600' : 'text-red-500'} hover:text-blue-700`}>
                                                        {val.estado_del_proyecto}
                                                    </span>
                                                </span>
                                            </td>
                                            <td class="px-6 py-4">{val.descripcion}</td>
                                            <td class="px-6 py-4">
                                                <div class="flex justify-end gap-4">
                                                    <a href="#" >
                                                        <svg
                                                            onClick={() => {
                                                                handleDeleteProject(cid);
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

export default TablaProyect;
