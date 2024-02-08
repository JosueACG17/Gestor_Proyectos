import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import logo from "../../images/Logo_Proyect.png"
import Tab_User from "../../images/Tab_Users.png";
import Tab_Project from "../../images/proyecto_icon.png";
import Tab_Teams from "../../images/Tab_Teams.png";
import Icon_Dash from "../../images/dash_icon.png"

const MySwal = withReactContent(Swal);

function Sidebar() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
    }, []);

    const handleLogout = () => {
        MySwal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = '/';
            }
        });
    };

    return (
        <>
            <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-green-700 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                <div>
                    <div className="-mx-6 px-6 py-4">
                        <a href="/home" className="flex items-center ml-4">
                            <img src={logo} className="mr-1 h-6 sm:h-9" alt="Logo" />
                            <span className="self-center font-serif text-xl font-bold whitespace-nowrap text-white">PriorityPilot</span>
                        </a>
                    </div>

                    {userData && (
                        <div className="mt-8 text-center">
                            <img src="https://img.freepik.com/foto-gratis/firewall-datos-negro_1150-1733.jpg" alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                            <h5 className="hidden mt-4 text-xl font-bold text-white lg:block">{userData.nombre_del_usuario}</h5>
                            <span className="hidden text-white font-semibold lg:block">{userData.nombre_del_rol}</span>
                        </div>
                    )}
                    <ul className="space-y-2 tracking-wide mt-4">
                        <li>
                            <a href="/dashboard" aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white group-hover:text-blue-100">
                                <img className="h-5 w-5" src={Icon_Dash} alt="Dashboard" />
                                <span className=" group-hover:text-blue-100 -mr-1 font-medium text-white">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/table" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                                <img className="h5 w-5" src={Tab_User} alt="Tabla Usuarios" />
                                <span className="group-hover:text-blue-100 font-medium text-white">Tabla Usuarios</span>
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/tab_project" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                                <img className="h5 w-5" src={Tab_Project} alt="Tabla Proyectos" />
                                <span className="group-hover:text-blue-100 font-medium text-white">Tabla Proyectos</span>
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/tab_team" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                                <img className="h5 w-5" src={Tab_Teams} alt="Tabla Equipos" />
                                <span className="group-hover:text-blue-100 font-medium text-white">Tabla Equipos</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center  border-t">
                    <button onClick={handleLogout} className="px-4 text-white py-3 flex items-center space-x-4 rounded-md hover:bg-red-700 hover:text-white  group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="group-hover:text-white text-white hover:text-white">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;
