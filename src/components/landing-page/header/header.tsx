import Image from '../../../../node_modules/next/image';
import { useRouter } from 'next/router';
import Link from '../../../../node_modules/next/link';

const Header = () => {
  const router = useRouter();

  const handleRedirect = () => {

    router.push('/todos');
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

            <nav className="navegacion">
            <Link href="#somos">
                <button className="navegacion__link">Somos</button>
              </Link>
              <Link href="#main">
                <button className="navegacion__link">¿Cómo Funciona?</button>
              </Link>
              {/* <Link href="#">
                <button className="navegacion__link">Regístrate</button>
              </Link> */}
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
