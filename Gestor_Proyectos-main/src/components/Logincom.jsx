import React, { useEffect, useState } from "react";
import "../styles/lg.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Logincom() {
    const text = "¡Bienvenido a PriorityPilot!";
    const [animatedText, setAnimatedText] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const ojovisible = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.nombre_del_rol === 'Administrador') {
                navigate('/dashboard');
            } else {
                navigate('/home');
            }
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si la contraseña contiene caracteres especiales
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
            setError("La contraseña no puede contener caracteres especiales");
        } else if (/\s/.test(password)) {
            setError("La contraseña no puede contener espacios en blanco");
        } else if (!/(?=.*[A-Z])(?=.*\d).{5,}/.test(password)) {
            setError("La contraseña debe contener al menos una mayúscula, un número y tener un mínimo de 5 caracteres");
        } else {
            setError("");

            try {
                const response = await fetch('http://localhost:3000/acceso', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo_electronico: email, contrasenia: password }),
                });

                const data = await response.json();
                if (response.ok) {
                    if (data.Estatus === "CORRECTO" && data.Usuario && data.Usuario.token && data.Usuario.user) {
                        const { token, user } = data.Usuario;
                        localStorage.setItem('token', token);
                        localStorage.setItem('user', JSON.stringify({ ...user, role: user.role }));
                
                        if (user.nombre_del_rol === 'Administrador') {
                            navigate('/dashboard');
                        } else {
                            navigate('/home');
                        }
                    } else {
                        setError("Correo o contraseña incorrecto");
                    }
                } else {
                    setError("Error al realizar la solicitud: " + data.message);
                }                
            } catch (error) {
                setError("Error de conexión");
            }
        }
    };
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                setAnimatedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }, []);

    return (
        <>
            <div className="relative min-h-screen flex ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                    <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
                        style={{
                            backgroundImage: 'url(https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
                        }}>
                        <div className="absolute bg-green-700 opacity-70 inset-0 z-0"></div>
                        <div className="w-full  max-w-md z-10">
                            <div className="sm:text-4xl xl:text-6xl font-extrabold leading-tight mb-6">{animatedText}</div>
                        </div>
                        <ul className="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="md:flex md:items-center w-full md:justify-center  sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                        <div className="max-w-md w-full space-y-8">
                            <div className="text-center">
                                <h2 className="mt-6 text-4xl font-bold text-green-900">
                                    Inicio de Sesión
                                </h2>

                            </div>
                            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                                <input type="hidden" name="remember" value="true" />
                                <div className="relative">
                                    <label className="ml-3 text-sm font-bold text-gray-800 tracking-wide">
                                        Correo Electrónico:
                                    </label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zm10" />
                                        </svg>
                                        <input
                                            className="w-full text-base px-4 py-2 border-b border-gray-600 focus:outline-none rounded-2xl focus:border-indigo-500 pl-11"
                                            type="email"
                                            placeholder="Ingresa tu correo"
                                            onChange={(e) => setEmail(e.target.value.trim())}
                                            required

                                        />
                                    </div>
                                </div>


                                <div className="mt-8">
                                    <label className="text-normal font-bold text-gray-800 tracking-wide">
                                        Contraseña:
                                    </label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-600 dark:text-gray-500 absolute left-0 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <input
                                            className="w-full text-base px-4 py-2 pr-10 border-b rounded-2xl border-gray-600 focus:outline-none focus:border-indigo-500 pl-11"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Ingresa tu contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value.trim())}
                                            required
                                        />
                                        <button
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={ojovisible}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

                                </div>

                                <div>
                                    <button type="submit"
                                        className="w-full flex justify-center bg-gradient-to-b from-green-600 to-lime-700  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-700">
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Logincom;
