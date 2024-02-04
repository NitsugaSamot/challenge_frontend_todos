import Link from "../../../node_modules/next/link"
import Image from "../../../node_modules/next/image"

const Header = () => {

  return (
    <header className="px-4 py-5 bg-green-800 botder-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-green-600 font-black text-center mb-5 md:mb-0">
                <Image 
                    src='/img/logo-green.png'
                    alt="Logo"
                    width={150}
                    height={100}
                />
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-4 text-white">

                <button 
                    type="button"
                    className="text-white text-lg p-3 uppercase font-bold"
                >
                    Buscar todo
                </button>

                <Link  legacyBehavior href='/'>
                    <button
                        type="button"
                        className="text-white text-lg p-3 uppercase font-bold"
                    >
                    Home   
                    </button>    
                </Link>    

            </div>
        </div>
    </header>
  )
}

export default Header