import React, { useState, useEffect } from "react";

function TarjetasProy() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/proyectos")
      .then((response) => response.json())
      .then((data) => {
        if (data.datos) {
          setProyectos(data.datos);
        }
      })

  }, []);

  return (
    <>
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="object-cover w-full h-64"
                alt=""
              />
              <div className="p-5 border border-t-0">
                <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
                  <p
                    href="/"
                    className={`transition-colors text-base font-bold duration-200 ${proyecto.estado_del_proyecto === "Disponible" ? 'text-green-600' : 'text-red-500'
                      } hover:text-blue-700`}
                    aria-label="Category"
                    title="traveling"
                  >
                    {proyecto.estado_del_proyecto}
                  </p>

                  <div className="flex">
                    <p className="text-black">Fecha de Inicio:</p>
                    <span className="text-gray-600 ml-2">{proyecto.fecha_de_inicio}</span>
                  </div>
                </p>
                <p
                  href="/"
                  aria-label="Category"
                  title={proyecto.nombre_proyecto}
                  className="inline-block mb-3 text-3xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  {proyecto.nombre_proyecto}
                </p>
                <p className="mb-2 text-gray-700">
                  {proyecto.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TarjetasProy;