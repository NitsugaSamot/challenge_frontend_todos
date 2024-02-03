import React from 'react'
import Image from '../../../../node_modules/next/image'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__contenedor">
            <div className="footer__grid">
                <div className="footer__logo">
                <Image 
                    src='/img/logo-green.png'
                    alt="Logo"
                    width={200}
                    height={100}
                />
                </div>

                <nav className="navegacion">
                    <div className="copyright">
                       <p>
                       Todos los derechos reservados 2024 &copy;
                       </p>
                    </div>
                       
                </nav>
            </div>
        </div>
    </footer>
  )
}

export default Footer