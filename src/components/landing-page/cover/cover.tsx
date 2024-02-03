
export const Cover = () => {
  return (
    <section id="somos">
        
    <div className="container__nosotros">
        <div className="nosotros__title">
            <h1>SOMOS</h1>
        </div>

        <div className="nosotros__titles">

            <div className="div_link_nosotros">
                <a href="#" className="navegacion__nosotros">Somos una aplicación web que simplifica tu vida organizando tus tareas con un sistema de TODOs.</a>
            </div>
            <div className="div_link_nosotros">
                <a href="#" className="navegacion__nosotros">Cada tarea creada en nuestra plataforma cuenta con un ID único, un texto descriptivo y un estado que indica si ha sido completada.</a>
            </div>
            <div className="div_link_nosotros">
                <a href="#" className="navegacion__nosotros">Para ofrecerte una experiencia inicial, consumimos la API https://dummyjson.com/todos, brindándote TODOs predeterminados</a>
            </div>
            <div className="div_link_nosotros">
                <a href="#" className="navegacion__nosotros">Garantizamos la persistencia de la información, evitando pérdidas por actualizaciones, y permitimos editar el texto de cada tarea para mayor flexibilidad.</a>
            </div>
            <div className="div_link_nosotros">
                <a href="#" className="navegacion__nosotros">Priorizamos la limpieza y eficiencia, ofreciendo la posibilidad de eliminar cualquier tarea, a excepción de las predeterminadas del dummyjson, y evitando duplicados en tu lista de TODOs.</a>
            </div>
        </div>
    </div>

</section>
  )
}
