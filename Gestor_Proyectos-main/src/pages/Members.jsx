import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Miembros from "../images/Members.png"
import '../styles/MembersStyles.css';
import axios from 'axios';

export default function Members() {
    const [MiembrosList, setMiembros] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const respuesta = await axios.get('http://localhost:3000/usuarios');
                setMiembros(respuesta.data.datos);
            } catch (error) {
            }
        };
        fetch();
    }, []);

    return (
        <>
            <div className='Members-Main'>

                <div className='Members-Navbar'><Header /></div>

                <div className='Members-Container-Header'>
                    <h1>Miembros</h1>
                </div>

                <div className='Members-Container-Cards'>
                    {MiembrosList.map((val, key) => (
                        <div className='Member-Container' key={key}>
                            <img className='Member-DefaultPicture ' src={Miembros} alt='' />
                            <h2 className='font-bold text-2xl text-center mb-1'>{val.nombre_del_usuario}</h2>
                            <h3 className='font-bold text-l mx-3 text-center mb-1'>{val.especialidad}</h3>
                            <h3 className='font-bold text-l mx-3 text-center mb-1 pb-2'>{val.correo_electronico}</h3>
                        </div>
                    ))}
                </div>

                <div className='Members-Footer'><Footer /></div>
            </div>
        </>
    );
}
