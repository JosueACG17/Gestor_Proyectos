import React from "react";
import video from "../../images/Homevideo.mp4"

function SecSection() {

  return (
    <>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="mb-10 lg:max-w-lg lg:pr-5 lg:mb-0">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-green-700">
                  Trabajo en equipo
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Optimiza tus operaciones
                <br className="hidden md:block" />
                y maximiza tu productividad {' '}
              </h2>
              <p className="text-xl text-justify text-gray-900 ">
                Descubre la herramienta definitiva que transformará la forma en que abordas los proyectos, ofreciendo una experiencia intuitiva, colaborativa y eficiente que impulsa el éxito de cada iniciativa.
              </p>
            </div>

          </div>
          <div className="relative lg:w-1/2">
            <video
              className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
              src={video}
              alt=""
              autoPlay
              muted
              loop
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SecSection;
