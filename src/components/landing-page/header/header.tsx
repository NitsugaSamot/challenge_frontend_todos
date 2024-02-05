import React from 'react';
import Image from '../../../../node_modules/next/image';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const handleRedirect = () => {

    router.push('/app-layout');
  };

  return (
    <>
      <header className="header">
        <div className="header__contenedor">
          <div className="header__barra">
            <div className="header__logo">
              <Image 
                src='/img/logo-green.png'
                alt="Logo"
                width={200}
                height={100}
              />
            </div>

            <div>
              {/* Contenido opcional */}
            </div>

            <nav className="navegacion">
              <button className='navegacion__link'>
                <a href="#somos" className="">Somos</a>
              </button>
              <button className='navegacion__link'>                          
                <a href="#" className="">¿Cómo Funciona?</a>
              </button>
              <button className='navegacion__link'>   
                <a href="#" className="">Regístrate</a>
              </button>                       
            </nav>
          </div>

          <div className="header__grid">
            <div className="header__texto">
              <h2 className="header__heading">Gestor de Todos</h2>
              <a onClick={handleRedirect} className="header__boton" href="#">Ingresar</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
