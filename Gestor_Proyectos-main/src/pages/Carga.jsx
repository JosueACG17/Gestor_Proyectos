import React from 'react';
import '../styles/carga.css';

const Carga = () => {
    return (
        <div className='bg-green-900 w-auto h-screen contenedor'>
        <div id="preloader">
            <div id="volumenes">
                <div className="volume1" />
                <div className="volume2" />
                <div className="volume3" />
                <div className="volume4" />
                <div className="volume5" />
            </div>
            <h3 className='texto'>PRIORITY PILOT</h3>
        </div>
        </div>

    );
};

export default Carga;