import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';

import { initializeFirebase } from '../../../firebase/firebase';
import firebaseConfig from '../../../firebase/config';

const db = initializeFirebase(firebaseConfig);

// Definir tipo para tareas
interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

const Form = () => {
  const [expanded, setExpanded] = useState(false);
  const [id, setId] = useState('');
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [editingTask, setEditingTask] = useState<Todo | null>(null);
  const [editingTodo, setEditingTodo] = useState<string>('');  
  const [isEditing, setIsEditing] = useState(false);

  const addTodoForFirestore = async (id: string, todo: string) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), { id, todo, completed: false });
  
      console.log('Documento agregado con ID:', docRef.id);
  
      // Actualizar la lista de tareas
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: docRef.id, todo, completed: false }
      ]);
  
      // Limpiar el formulario después de enviar
      setId('');
      setTodo('');
    } catch (error: any) {
      console.error('Error al agregar documento:', error);
    }
  };
  
  const deleteTodoFromFirestore = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
  
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error: any) {
      console.error('Error al eliminar documento:', error);
    }
  };
  
  const updateTodoInFirestore = async (todo: Todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), { todo: todo.todo, completed: todo.completed });
  
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t.id === todo.id ? { ...t, todo: todo.todo, completed: todo.completed } : t
        )
      );
  
      setEditingTask(null);
      setTodo('');
    } catch (error: any) {
      console.error('Error al actualizar documento:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodoForFirestore(id, todo);
  };
  
  const handleDelete = async (id: string) => {
    await deleteTodoFromFirestore(id);
  };
  
  const handleEdit = (todo: Todo) => {
    console.log('Editando todo:', todo);
    setEditingTask(todo);
    setEditingTodo(todo.todo); // Inicializa el estado de edición con la descripción actual
    setIsEditing(true);
  };

  const handleUpdate = async (todo: Todo) => {
    await updateTodoInFirestore(todo);
  };
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'todos'));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()} as Todo));
        setTodos(data);
      } catch (error: any) {
        console.error('Error al obtener Todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const toggleForm = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    console.log('Estado de isEditing:', isEditing);
  }, [isEditing]);

  return (
    <div>
      <button
        onClick={toggleForm}
        className="bg-lime-900 text-white p-3 uppercase font-bold rounded cursor-pointer hover:bg-lime-800 transition-colors"
      >
        {expanded ? 'Cerrar Formulario' : 'Crear nueva tarea'}
      </button>

      {expanded && (
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
      )}
      
      <ul>
        {todos.map((tarea) => (
          <li key={tarea.id}>
            {isEditing && editingTask?.id === tarea.id ? (
              // Campo de entrada para editar
              <div>
                  <input
                    type="text"
                    value={editingTodo}
                    onChange={(e) => setEditingTodo(e.target.value)}
                  />
                  <button onClick={() => handleUpdate({ ...tarea, todo: editingTodo })}>
                    Actualizar
                  </button>
              </div>
            ) : (
              <div>
                {/* {tarea.todo} */}
                <button onClick={() => handleDelete(tarea.id)}>Eliminar</button>
                <button onClick={() => handleEdit(tarea)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;