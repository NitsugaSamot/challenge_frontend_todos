import React from 'react'
import Image from '../../../../node_modules/next/image'
import { useRouter } from 'next/router';

// import './header-styles.css'

const Header = () => {

    const router = useRouter();

    const handleRedirect = () => {
      // Redirige a la página '/otra-pagina'
      router.push('/app-home');
    };
  

  return (
      <>
        <header className="header">
              <div className="header__contenedor">
                  <div className="header__barra">
                      <div className="header__logo">
                          <Image 
                              src='/img/logo.svg'
                              alt="Logo"
                              width={200}
                              height={100}
                          />
                          {/* <img src="/img/logo.svg" alt="logo nucleus"/> */}
                      </div>

                      <nav className="navegacion">
                          <a href="#" className="navegacion__link">¿Qué es?</a>
                          <a href="#" className="navegacion__link">¿Cómo Funciona?</a>
                          <a href="#" className="navegacion__link">Registrate</a>
                      </nav>
                  </div>

                  <div className="header__grid">
                      <div className="header__texto">
                          <h1 className="header__heading">Gestor de tareas</h1>
                          <a onClick={handleRedirect} className="header__boton" href="#">Ingresar</a>
                      </div>

 
                  </div>
              </div>
        </header>
    </>
  )
}

export default Header