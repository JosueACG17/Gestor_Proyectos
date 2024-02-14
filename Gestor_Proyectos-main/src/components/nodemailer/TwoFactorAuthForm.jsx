import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuthForm = ({ email, password, verificationCode, setEmail, setPassword, setVerificationCode, handleSubmit }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleVerificationCodeSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/verificarCodigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo_electronico: email, codigo: verificationCode }),
            });

            const data = await response.json();
            console.log('Respuesta de verificación de código:', data);

            if (response.ok) {
                if (data.mensaje === 'Código de autenticación válido') {
                    // Guardar el código de autenticación en la base de datos
                    const guardarCodigoResponse = await fetch('http://localhost:3000/guardarCodigo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ correo_electronico: email, codigo: verificationCode }),
                    });

                    if (!guardarCodigoResponse.ok) {
                        setError('Error al guardar el código de autenticación en la base de datos');
                        return;
                    }


                    if (data.mensaje === 'Código de autenticación válido') {
                        // Guardar el código de autenticación en la base de datos
                        const eliminarCodigoResponse = await fetch('http://localhost:3000/eliminarCodigo', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ correo_electronico: email, codigo: verificationCode }),
                        });

                        if (!eliminarCodigoResponse.ok) {
                            setError('Error al guardar el código de autenticación en la base de datos');
                            return;
                        }
                    }

                    // Obtener el usuario del almacenamiento local
                    const user = JSON.parse(localStorage.getItem('user'));

                    // Redirigir al usuario al dashboard o home según su rol
                    if (user && user.nombre_del_rol === 'Administrador') {
                        navigate('/dashboard');
                    } else {
                        navigate('/home');
                    }
                } else {
                    setError('Código de autenticación incorrecto');
                }
            } else {
                setError('Error al verificar el código: ' + data.message);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            setError('Error de conexión');
        }
    };

    return (
        <>
            <div>
                <h2 className="text-center mt-6 text-4xl font-bold text-green-900">Autenticación de Dos Factores</h2>
                <form onSubmit={handleVerificationCodeSubmit}>
                    <div className='pt-5'>
                        <label>Código de Verificación:</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button 
                    className="mt-5 w-full flex justify-center bg-gradient-to-b from-green-600 to-lime-700  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-700"
                    type="submit">Iniciar Sesion</button>
                </form>
            </div>
        </>
    );
};

export default TwoFactorAuthForm;
