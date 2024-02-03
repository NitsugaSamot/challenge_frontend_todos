import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__contenedor">
            <div className="footer__grid">
                <div className="footer__logo">
                    <img src="/img/logo-blanco.svg" alt="logo blanco nucleus"/>
                </div>

                <nav className="navegacion">
                    <a href="#" className="navegacion__link navegacion__link--blanco">¿Qué es?</a>
                    <a href="#" className="navegacion__link navegacion__link--blanco">¿Cómo Funciona?</a>
                    <a href="#" className="navegacion__link navegacion__link--blanco">Precios</a>
                    <a href="#" className="navegacion__link navegacion__link--blanco">Contratar</a>
                </nav>
            </div>
        </div>
    </footer>
  )
}

export default Footer