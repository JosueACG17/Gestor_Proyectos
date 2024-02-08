import React from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FiHome, FiUsers, FiUser,FiSliders } from 'react-icons/fi';
import { BiBookmarkAlt } from "react-icons/bi";
import logo from "../images/Logo_Proyect.png"
const MySwal = withReactContent(Swal);

function Header() {
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

  // Obtenemos el rol del usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.nombre_del_rol === 'Administrador';

  return (
    <>
      <header>
        <nav className="bg-green-700 border-gray-200 px-4 lg:px-6 py-2.5 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/home" className="flex items-center">
              <img src={logo} className="mr-1 h-6 sm:h-9" alt="Logo" />
              <span className="self-center font-serif text-xl font-bold whitespace-nowrap text-white">PriorityPilot</span>
            </a>
            <div className="flex items-center lg:order-2">
              <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a href="/home" className="flex font-sans items-center py-2 pr-4 pl-3 hover:bg-blue-100 hover:text-black text-white bg-primary-700  w-16 rounded-lg lg:text-center lg:text-primary-700 lg:p-0  " aria-current="page">
                    <FiHome className="mr-1" /> Inicio
                  </a>
                </li>
                <li>
                  <a href="/proyects" className="flex font-sans items-center py-2 pr-4 pl-3  text-white border-b border-gray-100 hover:bg-blue-100 hover:text-black rounded-lg lg:border-0  lg:p-0 ">
                    <BiBookmarkAlt className="mr-1" /> Proyectos
                  </a>
                </li>
                <li>
                  <a href="/teams" className="flex font-sans items-center py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-blue-100 hover:text-black  lg:border-0 rounded-lg lg:p-0  ">
                    <FiUsers className="mr-1" /> Equipos
                  </a>
                </li>
                <li>
                  <a href="/members" className="flex font-sans items-center py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-blue-100 hover:text-black rounded-lg  lg:border-0  lg:p-0  ">
                    <FiUser className="mr-1" /> Miembros
                  </a>
                </li>
                {isAdmin && (
                  <li>
                    <a href="/dashboard" className="flex font-sans items-center py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-blue-100 hover:text-black rounded-lg  lg:border-0  lg:p-0  ">
                    <FiSliders className="mr-1"/>Dashboard
                    </a>
                  </li>
                )}
              </ul>
              <button onClick={handleLogout} class=" justify-end ml-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center ">Cerrar Sesión</button>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header;
