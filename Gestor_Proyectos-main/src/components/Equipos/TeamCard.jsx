import React, { useState, useEffect } from "react";
import axios from "axios";

function TeamCard() {
  const [equiposList, setEquipos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3000/equipos');
        setEquipos(respuesta.data.datos);
        console.log(respuesta.data.datos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {equiposList.map((equipo, key) => (
          <div key={key} className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
            <img
              src={`/imagenes/${equipo.nombre_de_la_imagen}`}
              className="object-cover w-full h-64"
              alt=""
            />
            <div className="p-5 border border-t-0">
              <a
                href="/"
                aria-label="Category"
                title="Visit the East"
                className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                {equipo.nombre_del_equipo}
              </a>
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                <p
                  href="/"
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
  );
}

export default TeamCard;
