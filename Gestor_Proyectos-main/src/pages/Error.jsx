import React from "react";

function Error() {
  return (
    <>
      <div className="flex h-screen flex-col bg-white">
        <img
          src="https://images.pexels.com/photos/7988692/pexels-photo-7988692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="h-64 w-full object-cover"
        />

        <div className="flex flex-1 items-center justify-center">
          <div className="mx-auto max-w-xl px-4 py-8 text-center">
            <h1 class="text-9xl font-black text-green-700">404</h1>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pagina no encontrada
            </h1>

            <p className="mt-4 text-gray-700 font-semibold">
              Porfavor regresa a la página de inicio.
            </p>

            <a
              className="group relative inline-flex items-center mt-5 overflow-hidden rounded bg-green-800 px-10 py-3 ml-3 text-white focus:outline-none focus:ring hover:bg-lime-700"
              href="/"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">
                Regresar
              </span>
            </a>
          </div>
        </div>
      </div>


    </>
  )
}

export default Error;