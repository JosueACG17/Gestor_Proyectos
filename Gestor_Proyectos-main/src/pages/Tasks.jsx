import React, { useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/TasksStyles.css'

export default function Tasks() {
    //Visibilidad de los modales
    const [showAddTasksModal, setShowAddTasksModal] = useState(false);

    //Manejo de eventos
    const handleAddTasksClick = () => {
        setShowAddTasksModal(true);
    };

    const handleCreateTasksClick = () => {
        setShowAddTasksModal(false);
    };

    return (
        <>
            <div className='Tasks-Main'>
                <div className='Tasks-Navbar'>
                    <Header />
                </div>

                <div className='Tasks-Body'>
                    <div className='Tasks-Container-Header'>
                        <h1>Tareas</h1>
                        <button onClick={handleAddTasksClick}>Crear tarea</button>
                    </div>

                    <div className='Tasks-Cards-Container pb-4'>
                        <h2 className='font-bold text-2xl my-4 text-center'>Título:</h2>
                        <p className='mx-5 mb-2 font-bold'>(nombre_de_la_tarea)</p>
                        <h3 className='font-bold text-lg my-1 mx-3'>Descripción:</h3>
                        <p className='mx-5'>(descripcion_tarea)</p>

                        <div className='flex flex-wrap my-2'>
                            <div className='w-1/3'>
                                <h3 className='font-bold text-lg ml-3'>Estado:</h3>
                                <p className='ml-5'>(Estado_tarea)</p>
                            </div>
                            <div className='w-1/3'>
                                <h3 className='font-bold text-lg'>Fecha de entrega:</h3>
                                <p className='ml-3'>(Fecha_de_entrega)</p>
                            </div>
                            <div className='w-1/3'>
                                <h3 className='font-bold text-lg'>Encargado:</h3>
                                <p className='ml-3'>(Encargado)</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='Tasks-Footer'>
                    <Footer />
                </div>
            </div>

            {/* Condicionales de renderizado de los modales */}
            {showAddTasksModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2 className='font-bold text-2xl my-4 text-center'>CREAR TAREA</h2>
                        <p className='font-bold text-center mb-3'>Crea una tarea y asigna un responsable</p>
                        <label>
                            Nombre de la tarea
                            <input type='text' placeholder='Ej. Diseño de modulos' />
                            <p className='font-bold text-center'>Es necesario establecer el nombre de la tarea</p>
                        </label>

                        <label>
                            Asignar responsable
                            <select>
                                <option>Elegir...</option>
                                {/* Opciones del tipo de proyecto */}
                            </select>
                        </label>

                        <label>
                            Asignar fecha de entrega
                            <input placeholder='DD/MM/YYYY' />
                        </label>

                        <label>
                            Descripción de la tarea
                            <textarea placeholder='Establece una descripción detallada sobre las necesidades a cumplir dentro de la tarea.' />
                        </label>

                        <button onClick={handleCreateTasksClick}>Crear Proyecto</button>

                    </div>
                </div>
            )}
        </>
    )
}
