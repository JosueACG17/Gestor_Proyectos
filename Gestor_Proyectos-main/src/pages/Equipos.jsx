import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/equipos.css'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Equipos() {

    const [equipo, setEquipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const add = async () => {
        if (!equipo.trim() || !descripcion.trim()) {
            setErrorMessage('Todos los campos son obligatorios');
        } else if (!/^[\w\s]*$/.test(equipo) || !/^[\w\s]*$/.test(descripcion)) {
            setErrorMessage('El nombre y la descripción no deben contener caracteres especiales.');        
        } else {
            try {
                await axios.post('http://localhost:3000/crearequipo', {
                    nombre_del_equipo: equipo,
                    descripcion_equipo: descripcion,
                });
                alert('Equipo creado');
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage("");
    };

    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [equiposList, setEquipos] = useState([]);

    const handleAddProjectClick = () => {
        setShowAddProjectModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3000/equipos');
                setEquipos(respuesta.data.datos);
            } catch (error) {
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <div className='Equipos-Main'>
                <div className='Equipos-Navbar'><Header /></div>
                <div className='Equipos-Header'>
                    <h1>Equipos</h1>
                    <button onClick={handleAddProjectClick}>Agregar Equipo</button>
                </div>
                <div className='Equipos-Cards'>
                    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                            {equiposList.map((equipo, key) => (
                                <div key={key} className="overflow-hidden transition-shadow duration-300 bg-gray-200 rounded shadow-sm">
                                    <img
                                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        className="object-cover w-full h-64"
                                        alt=""
                                    />
                                    <div className="p-5 border border-t-0">
                                        <p
                                            aria-label="Category"
                                            title="Visit the East"
                                            className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                                        >
                                            {equipo.nombre_del_equipo}
                                        </p>
                                        <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                                            <p
                                                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                                                aria-label="Category"
                                                title="traveling"
                                            >
                                                {equipo.descripcion_equipo}
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='Equipos-Footer'><Footer /></div>
            </div>

            {/* Condicionales de renderizado de los modales */}
            {showAddProjectModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <button className='close-button' onClick={() => setShowAddProjectModal(false)}>X</button>
                        <h2 className='font-bold text-2xl my-4 text-center'>AGREGAR EQUIPOS</h2>
                        <label>
                            Nombre del Equipo
                            <input
                                onChange={(event) => {
                                    setEquipo(event.target.value.trim());
                                    clearErrorMessage();
                                }}
                                type='text' placeholder='Taquitos S.A.' />
                            <p>Este será el nombre que todos podrán visualizar de tu Equipo</p>
                        </label>

                        <label>
                            Descripción del equipo
                            <textarea
                                onChange={(event) => {
                                    setDescripcion(event.target.value.trim());
                                    clearErrorMessage();
                                }}
                                placeholder='Nuestro equipo se organiza aquí.' />
                        </label>
                        {errorMessage && <p className=" text-red-700 font-bold text-center mb-4 text-lg error-message">{errorMessage}</p>}
                        <button onClick={add}>Crear equipo</button>
                    </div>
                </div>
            )}

        </>
    )
}

export default Equipos;
