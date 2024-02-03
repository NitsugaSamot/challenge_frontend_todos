import React, { useState, useEffect } from 'react';
import CardsTodos from '@/components/cards-todos/cards-todos';
import Form from '@/components/form/form-todo';
import firebaseConfig from '../../firebase/config';
import { initializeFirebase, getAllTodos } from '../../firebase/firebase';

const db = initializeFirebase(firebaseConfig);

// Importa la interfaz Tarea o define la interfaz aquí
interface Tarea {
  id: string;
  todo: string;
  completed: boolean;
}

const AppHome = () => {
  const [todos, setTodos] = useState<Tarea[]>([]); // Especifica el tipo como Tarea[]

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
    <>
      <div>
        <CardsTodos todos={todos} />
      </div>

      <div>
        <Form />
      </div>
    </>
  );
};

export default AppHome;
