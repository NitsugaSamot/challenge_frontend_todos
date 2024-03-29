import { useState, useEffect } from 'react';
import CardsTodos from '@/components/cards-todos/cards-todos';
import firebaseConfig from '../../firebase/config';
import { initializeFirebase, getAllTodos } from '../../firebase/firebase';
import AppLayout from './app-layout';

const db = initializeFirebase(firebaseConfig);

/* Interfaz de Todo */
interface Todo {
  id: string;
  userId: number;
  todo: string;
  completed: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Especifica el tipo como Tarea[]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de la API externa
        const externalResponse = await fetch('https://dummyjson.com/todos');
        const externalData = await externalResponse.json();

        // Limitar la cantidad de todos de la API externa 
        const limitedExternalTodos = externalData.todos.slice(0, 2);

        // Obtener todos de Firebase
        const firebaseData = await getAllTodos(db);

        // Combinar ambos conjuntos de datos
        const combinedTodos = [...limitedExternalTodos, ...firebaseData];

        // Establecer los todos combinados en el estado
        setTodos(combinedTodos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [db]);

  return (
    <AppLayout>
      <div className='text-lg'>
        <CardsTodos todos={todos} />
      </div>
    </AppLayout>
  );
};

export default Todos;
