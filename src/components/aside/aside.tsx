import Link from "../../../node_modules/next/link"

const Aside = () => {
  return( 
    <div className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10'>
    <Link href='/new-todo'>
      <button className="bg-lime-900 w-100 text-white text-lg w-full p-3 font-bold block mt-5 text-center rounded-lg cursor-pointer hover:bg-lime-800 transition-colors">
        Nuevo TODOs
      </button>
    </Link>

    <Link href='/todos'>
      <button className="bg-lime-900 w-100 text-white text-lg w-full p-3  uppercase font-bold block mt-5 text-center rounded-lg cursor-pointer hover:bg-lime-800 transition-colors">
        TODOs
      </button>
    </Link>
  </div>
  )
}

export default Aside