import { useState } from 'react';
import AppLayout from './app-layout'
import { useRouter } from 'next/router';
/* importaciones de Firebase */
import { collection, addDoc } from 'firebase/firestore';
import { initializeFirebase } from '../../firebase/firebase';
import firebaseConfig from '../../firebase/config';

const db = initializeFirebase(firebaseConfig);
  
const NewTodo = () => {
    const [id, setId] = useState('');
    const [todo, setTodo] = useState('');

    const router = useRouter();

    const addTodoForFirestore = async (id: string, todo: string) => {
        try {
          const docRef = await addDoc(collection(db, 'todos'), { id, todo, completed: false });
      
          console.log('Documento agregado con ID:', docRef.id);
      
          // Limpiar el formulario después de enviar
          setId('');
          setTodo('');
          router.push('/todos');
        } catch (error: any) {
          console.error('Error al agregar documento:', error);
        }
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addTodoForFirestore(id, todo);
      };

    return (
        <AppLayout>
            <form
                onSubmit={handleSubmit}
                className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow mt-5"
            >
                <input
                    type="number"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Id del usuario"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />

                <textarea
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción de la tarea"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />

                <input
                    type="submit"
                    className="bg-lime-900 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-lime-800 transition-colors"
                />
            </form>
        </AppLayout>
    )
}

export default NewTodo