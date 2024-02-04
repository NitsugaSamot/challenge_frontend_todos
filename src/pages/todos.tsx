import{ useState, useEffect } from 'react';
import CardsTodos from '@/components/cards-todos/cards-todos';
import firebaseConfig from '../../firebase/config';
import { initializeFirebase, getAllTodos } from '../../firebase/firebase';
import AppLayout from './app-layout';

const db = initializeFirebase(firebaseConfig);

interface Todo {
  id: string;
  id_user: number;
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

        // Obtener todos de Firebase
        const firebaseData = await getAllTodos(db);

        // Combinar ambos conjuntos de datos
        const combinedTodos = [...externalData.todos, ...firebaseData];

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
        <div>
            <CardsTodos  todos={todos}/>
        </div>
    </AppLayout>
  )
}

export default Todos