import React from "react";
import "../../styles/section.css"
import imgcab from "../../images/Fondo_cab.png"

function Cabecera() {
    return (
        <>
            <div className="relative w-full h-full pb-10">
                <div className="hidden md:block">
                    <img className="absolute bg-cover bg-center w-full h-full inset-0" src="https://img.freepik.com/vector-gratis/vector-fondo-verde-blanco-simple-negocios_53876-174906.jpg" alt />
                </div>
                <div className="relative px-4 xl:px-0 container mx-auto md:flex items-center gap-8">
                    <div className="text-color w-full md:w-1/3 pt-16 lg:pt-32 xl:pt-12">
                        <h1 className="text-4xl text-center md:text-4xl lg:text-6xl w-12/12 lg:w-11/12 xl:w-full xl:text-6xl text-gray-900 font-extrabold f-f-l mt-10">Potencia tus proyectos</h1>
                        <div className="f-f-r text-base lg:text-medium text-justify pb-20 sm:pb-0 pt-10 xl:pt-6">
                            <h2>Haz de la coordinación de proyectos una experiencia fluida y sin complicaciones. Nuestra app simplifica la asignación de tareas, facilita la comunicación del equipo y ofrece análisis en tiempo real para que cada proyecto sea un éxito.</h2>
                        </div>
                    </div>
                    <img className="w-full mt-8 md:mt-0 object-fill md:w-2/3 md:-ml-4 lg:-ml-4 xl:ml-0" src={imgcab} alt="sample page" role="img" />
                </div>
            </div>

        </>
    );
}

export default Cabecera;