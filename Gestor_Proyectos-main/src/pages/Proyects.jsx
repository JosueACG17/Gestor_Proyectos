import React, { useState, useEffect } from 'react';
import '../styles/proyectsStyles.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import TarjetasProy from '../components/Proyectos/TarjetasProy';

export default function Proyects() {
    const [proyecto, setProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const add = async () => {
        if (!proyecto.trim() || !descripcion.trim() || !estado.trim()) {
            setErrorMessage('Todos los campos son obligatorios');
        } else if (!/^[a-zA-Z0-9\s]*$/.test(proyecto) || !/^[a-zA-Z0-9\s]*$/.test(descripcion)) {
            setErrorMessage('Los datos que quiere insertar no están permitidos.');
        }
        else {
            try {
                await axios.post('http://localhost:3000/crearproyecto', {
                    nombre_proyecto: proyecto,
                    descripcion: descripcion,
                    estado_del_proyecto: estado,
                });
                alert('Proyecto creado');
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    };

    //Visibilidad de los modales
    const [ProyectoList, setProyectos] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3000/proyectos');
                setProyectos(respuesta.data.datos);
                console.log(respuesta.data.datos);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);

    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

    //Manejo de eventos
    const handleAddProjectClick = () => {
        setShowAddProjectModal(true);
    };

    return (
        <>
            <div className="Proyects-Body">
                <div className="Proyects-Navbar">
                    <Header />
                </div>
                <div className="Proyects-Buttons">
                    <h1>PROYECTOS</h1>
                    <button onClick={handleAddProjectClick}>Agregar proyecto</button>
                </div>

                <TarjetasProy> </TarjetasProy>
                <Footer></Footer>

                {showAddProjectModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <button className="close-button" onClick={() => setShowAddProjectModal(false)}>
                                X
                            </button>
                            <h2 className="font-bold text-2xl my-4 text-center">AGREGAR PROYECTO</h2>
                            <label>
                                Nombre del Proyecto
                                <input
                                    onChange={(event) => {
                                        setProyecto(event.target.value.trim());
                                        clearErrorMessage();
                                    }}
                                    type="text"
                                    placeholder="Taquitos S.A."
                                />
                                <p>Este sera el nombre que todos podran visualizar de tu proyecto</p>
                            </label>

                            <select
                                Estado del Proyecto
                                
                                    onChange={(event) => {
                                        setEstado(event.target.value.trim());
                                        clearErrorMessage();
                                    }}
                                    type="text"
                                    placeholder="Taquitos S.A."
                                    >
                                    <option value="" selected disabled>Selecciona una especialidad</option>
                                    <option value="En curso">En curso</option>
                                    <option value="Completado">Completado</option>
                                    <option value="Pendiente">Pendiente</option>
                                  </select>

                            <label>
                                Descripción del proyecto
                                <textarea
                                    onChange={(event) => {
                                        setDescripcion(event.target.value.trim());
                                        clearErrorMessage();
                                    }}
                                    placeholder="Nuestro equipo se organiza aquí."
                                />
                            </label>

                            {errorMessage && <p className=" text-red-700 font-bold text-center mb-4 text-lg error-message">{errorMessage}</p>}
                            <button onClick={add}>Crear Proyecto</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
