import Header from "./header/header"
import Footer from "./footer/Footer"

const LandingPage = () => {
  return (
    <>
    <Header/>
    <main className="nucleus">
    <h2 className="nucleus__heading">¿Qué es?</h2>
    <div className="nucleus__contenedor">
        <div className="nucleus__grid">
            <div className="nucleus__imagen">
                <img src="/img/app_2.svg" alt="app nucleus"/>
            </div>

            <div className="listado">
                <div className="listado__elemento">
                    <h2 className="listado__heading">Fácil</h2>
                    <p className="listado__texto">Crea una cuenta, envía tu documentación y comienza a utilizar nucleus en un par de horas</p>
                </div>

                <div className="listado__elemento">
                    <h2 className="listado__heading">Seguro</h2>
                    <p className="listado__texto">Por su tecnología digital nucleus es imposible de hackear o robar</p>
                </div>

                <div className="listado__elemento">
                    <h2 className="listado__heading">Administrable</h2>
                    <p className="listado__texto">Añade o transfiere fondos a tu banco, añade limites o controla tus gastos</p>
                </div>
            </div>                
        </div>
    </div>
    </main>
    <Footer/>
  </>
  )
}

export default LandingPage