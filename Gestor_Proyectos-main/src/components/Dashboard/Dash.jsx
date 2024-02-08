import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import user from "../../images/user.png";
import proyecto from "../../images/proyecto.png";
import equipos from "../../images/equipo.png"
import Mapa from "../Dashboard/Mapa"
import { FcHome } from "react-icons/fc";

function Dash() {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDay, setCurrentDay] = useState('');
    const [userCount, setUserCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [teamCount, setTeamCount] = useState(0);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;

            const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const dayString = daysOfWeek[now.getDay()];

            setCurrentTime(timeString);
            setCurrentDay(`Hoy es ${dayString}`);

            fetch('http://localhost:3000/usuarios')
                .then(response => response.json())
                .then(data => setUserCount(data.datos.length));

            fetch('http://localhost:3000/proyectos')
                .then(response => response.json())
                .then(data => setProjectCount(data.datos.length));

            fetch('http://localhost:3000/equipos')
                .then(response => response.json())
                .then(data => setTeamCount(data.datos.length));
        };

        const intervalId = setInterval(updateClock, 1000);
        updateClock();
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Sidebar></Sidebar>
            <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
                    <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
                        <h5 hidden class="text-2xl mt-1 text-gray-600 font-semibold lg:block">Dashboard</h5>
                        <button class="w-12 h-16 -mr-2 border-r lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div class="flex space-x-4">
                            <a href="/home">
                                <button aria-label="chat" class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                    <FcHome className="h-5 w-5 m-auto text-gray-600"></FcHome>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="px-6 pt-6 2xl:container ">
                    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div class="md:col-span-2 lg:col-span-1" >
                            <a href="/dashboard/table">
                                <div class="h-full py-8 px-6 space-y-6 rounded-xl border hover:bg-green-200 border-gray-300 bg-white">
                                    <img className="w-40 opacity-75 mx-auto" src={user}>
                                    </img>
                                    <div>
                                        <h5 class="text-4xl font-semibold text-gray-600 text-center">Usuarios</h5>
                                        <div class="mt-2 flex justify-center gap-4">
                                            <h3 class="text-3xl font-bold text-gray-700">{userCount}</h3>
                                            <div class="flex items-end gap-1 text-green-500">
                                                <svg class="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                                                </svg>
                                                <span>2%</span>
                                            </div>
                                        </div>
                                        <span class="block text-center text-gray-500">Comparado a la última semana</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <a href="/dashboard/tab_project">
                            <div class="h-full py-8 px-6 space-y-6 rounded-xl border hover:bg-green-200 border-gray-300 bg-white">
                                <img className="w-40 opacity-75 mx-auto" src={proyecto}>
                                </img>
                                <div>
                                    <h5 class="text-4xl font-semibold text-gray-600 text-center">Proyectos</h5>
                                    <div class="mt-2 flex justify-center gap-4">
                                        <h3 class="text-3xl font-bold text-gray-700">{projectCount}</h3>
                                        <div class="flex items-end gap-1 text-green-500">
                                            <svg class="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                                            </svg>
                                            <span>2%</span>
                                        </div>
                                    </div>
                                    <span class="block text-center text-gray-500">Comparado a la última semana</span>
                                </div>
                            </div>
                        </a>
                        <a href="/dashboard/tab_team">
                            <div class="h-full py-8 px-6 space-y-6 rounded-xl border hover:bg-green-200 border-gray-300 bg-white">
                                <img className="w-40 opacity-75 mx-auto" src={equipos}>
                                </img>
                                <div>
                                    <h5 class="text-4xl font-semibold text-gray-600 text-center">Equipos</h5>
                                    <div class="mt-2 flex justify-center gap-4">
                                        <h3 class="text-3xl font-bold text-gray-700">{teamCount}</h3>
                                        <div class="flex items-end gap-1 text-green-500">
                                            <svg class="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                                            </svg>
                                            <span>2%</span>
                                        </div>
                                    </div>
                                    <span class="block text-center text-gray-500">Comparado a la última semana</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="px-6 pt-6 2xl:container ">
                    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                        <div class="md:col-span-2 lg:col-span-1" >
                            <div className="h-full py-8 px-6 space-y-6 rounded-xl border text-center border-gray-300 bg-gray-100">
                                <div className="mt-4 text-center">
                                    <h5 className="text-5xl lg:mt-20 font-bold text-gray-700">{currentTime}</h5>
                                    <p className="text-5xl text-gray-700 font-semibold">{currentDay}</p>
                                </div>
                            </div>
                        </div>
                        <div class="md:col-span-2 lg:col-span-1" >
                            <div class="h-full py-4 px-4 space-y-6 rounded-xl border border-gray-300 bg-gray-100">
                                <Mapa></Mapa>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Dash;