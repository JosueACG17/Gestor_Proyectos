import React from "react";

function Tarjetas() {
    return (
        <>
            <section className="px-4 py-20 mx-auto max-w-7xl">
                <h1 className="mb-10 text-3xl text-center font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                    ¿Porqué <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-600 lg:inline">usar</span> nuestra aplicación?
                </h1>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    <div >
                        <img src="https://images.pexels.com/photos/4065137/pexels-photo-4065137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="object-cover w-full h-56 mb-5 bg-center rounded" alt="Kutty" loading="lazy" />
                        <h2 className="mb-2 text-2xl font-bold text-center text-gray-900">
                            <p href="#" className="text-gray-900 hover:text-green-700">PRODUCTIVIDAD</p>
                        </h2>
                        <p className="mb-3 text-lg font-normal text-justify text-gray-900">
                            Optimiza tu productividad y controla cada aspecto de tus proyectos con nuestra intuitiva app de gestión, simplificando tareas, asignaciones y seguimientos para un éxito garantizado.
                        </p>

                    </div>
                    <div>
                        <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="object-cover w-full h-56 mb-5 bg-center rounded" alt="Kutty" loading="lazy" />
                        <h2 className="mb-2 text-2xl font-bold text-center text-gray-900">
                            <p href="#" className="text-gray-900 hover:text-green-700">TRABAJO EN EQUIPO</p>
                        </h2>
                        <p className="mb-3 text-lg font-normal text-justify text-gray-900">
                            Potencia la colaboración y el rendimiento de tu equipo con nuestro sistema de gestión de proyectos, ofreciendo una visión integral, herramientas colaborativas y seguimiento en tiempo real.
                        </p>
                    </div>
                    <div>
                        <img src="https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="object-cover w-full h-56 mb-5 bg-center rounded" alt="Kutty" loading="lazy" />
                        <h2 className="mb-2 text-2xl font-bold text-center text-gray-900">
                            <p href="#" className="text-gray-900 hover:text-green-700">POTENCIALIZACIÓN</p>
                        </h2>
                        <p className="mb-3 text-lg font-normal text-justify text-gray-900">
                            Transforma tu manera de trabajar con nuestra aplicación que no solo organiza eficientemente tus tareas, sino que también maximiza la eficacia.
                        </p>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Tarjetas;