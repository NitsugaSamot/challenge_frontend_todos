
const Header = () => {

  return (
    <header className="px-4 py-5 bg-black botder-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-green-600 font-black text-center mb-5 md:mb-0">
                TodoS
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4 text-white">

                <button 
                    type="button"
                    className="font-bold"
                >
                    Buscar Todo
                </button>

                <button
                    className="font-bold"
                >
                    Todos
                </button>     

                <button
                    type="button"
                    className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold"
                >
                    Cerrar Sesión    
                </button>      

            </div>
        </div>
    </header>
  )
}

export default Header