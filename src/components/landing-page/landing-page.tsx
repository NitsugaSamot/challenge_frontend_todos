import Header from "./header/header";
import  {Cover}  from "./cover/cover";
import Footer from "./footer/footer";
import Image from "../../../node_modules/next/image";

const LandingPage = () => {
  return (
    <>
      <Header />
      <main className="info">
        <h3 className="info__heading">¿Cómo Funciona?</h3>
        <div className="info__contenedor">
          <div className="info__grid">
            <div className="info__imagen">
                <div className="div__image">
                    <Image 
                        src='/img/meet-two.jpg'
                        alt="Logo"
                        width={300}
                        height={200}
                    />             
                </div>
                <div className="div__image">
                    <Image 
                        src='/img/meet.jpg'
                        alt="Logo"
                        width={300}
                        height={200}
                    />
                </div>
                <div className="div__image">
                    <Image 
                        src='/img/meet-three.jpg'
                        alt="Logo"
                        width={300}
                        height={200}
                    />
                </div>
              {/* <img src="/img/app_2.svg" alt="app nucleus"/> */}
            </div>

            <div className="listado">
              <div className="listado__elemento">
                <h3 className="listado__heading">Fácil</h3>
                <p className="listado__texto">Ingresa, accede a los usuarios y comienza a implementar las tareas necesarias</p>
              </div>

              <div className="listado__elemento">
                <h3 className="listado__heading">Seguro</h3>
                <p className="listado__texto">Por su tecnología digital Todos es imposible de hackear o robar</p>
              </div>

              <div className="listado__elemento">
                <h3 className="listado__heading">Administrable</h3>
                <p className="listado__texto">Con una navegación sencilla e intuitiva lograras una gran performance en tu día a día</p>
              </div>
            </div>                
          </div>
        </div>
      </main>
      <Cover/>
      <Footer />
    </>
  );
};

export default LandingPage;
