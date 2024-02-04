import React, { useState, useEffect } from 'react';
import AppLayout from './app-layout';
import { useRouter } from 'next/router';
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { initializeFirebase } from '../../firebase/firebase';
import firebaseConfig from '../../firebase/config';

const db = initializeFirebase(firebaseConfig);

const NewTodo = () => {
  const [idUser, setIdUser] = useState<number | null>(null);
  const [todo, setTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    if (query.id && query.userId) {
      setIdUser(Number(query.userId));
      setId(query.id);
      setIsEditing(true);
      setTodo(Array.isArray(query.todo) ? query.todo.join(', ') : query.todo || '');
    }
  }, [router.query]);

  const updateTodoInFirestore = async (id: string, todo: string) => {
    const todoDocRef = doc(db, 'todos', id);
    await updateDoc(todoDocRef, { todo });
    console.log('Documento actualizado:', id);
  };

  const addNewTodoToFirestore = async (idUser: number, todo: string) => {
    const docRef = await addDoc(collection(db, 'todos'), { idUser, todo, completed: false });
    console.log('Documento agregado con ID:', docRef.id);
  };

  const addTodoForFirestore = async ({ id, idUser, todo }: { id: string | null; idUser: number | null; todo: string }) => {
    try {
      if (idUser !== null) {
        if (isEditing) {
          // editar
          await updateTodoInFirestore(id, todo);
        } else {
          // crear
          const todos = todo.split(',').map(t => t.trim());
          for (const t of todos) {
            await addNewTodoToFirestore(idUser, t);
          }
        }
      } else {
        console.error('ID no válido');
      }

      setIdUser(null);
      setTodo('');
      setIsEditing(false);
      router.push(`/todos`);
    } catch (error: any) {
      console.error('Error al agregar/actualizar documento:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTodoForFirestore({ id, idUser, todo });
  };

  return (
    <AppLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow mt-5 "
      >
        <input
          type="number"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Id del usuario"
          value={idUser !== null ? idUser : ''}
          onChange={(e) => setIdUser(e.target.value !== '' ? Number(e.target.value) : null)}
        />

        <textarea
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción de la tarea"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <input
          type="submit"
          className={`bg-lime-600 w-full p-3 text-lg uppercase font-bold text-white rounded cursor-pointer hover:bg-lime-700 transition-color`}
          value={isEditing ? 'Actualizar' : 'Enviar'}
        />
      </form>
    </AppLayout>
  );
};

export default NewTodo;

// import React, { useState, useEffect } from 'react';
// import AppLayout from './app-layout';
// import { useRouter } from 'next/router';
// import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
// import { initializeFirebase } from '../../firebase/firebase';
// import firebaseConfig from '../../firebase/config';

// const db = initializeFirebase(firebaseConfig);

// const NewTodo = () => {
//   const [idUser, setIdUser] = useState<number | null>(null);
//   const [todos, setTodos] = useState<string[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [id, setId] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     const { query } = router;
//     if (query.id && query.userId) {
//       setIdUser(Number(query.userId));
//       setId(query.id);
//       setIsEditing(true);
//       setTodos(Array.isArray(query.todo) ? query.todo : [query.todo]);
//     }
//   }, [router.query]);

//   const updateTodoInFirestore = async (id: string, todo: string) => {
//     const todoDocRef = doc(db, 'todos', id);
//     await updateDoc(todoDocRef, { todo });
//     console.log('Documento actualizado:', id);
//   };

//   const addNewTodoToFirestore = async (idUser: number, todo: string) => {
//     const docRef = await addDoc(collection(db, 'todos'), { idUser, todo, completed: false });
//     console.log('Documento agregado con ID:', docRef.id);
//   };

//   const addTodoForFirestore = async ({ id, idUser, todos }: { id: string | null; idUser: number | null; todos: string[] }) => {
//     try {
//       if (idUser !== null) {
//         if (isEditing) {
//           // editar
//           await updateTodoInFirestore(id, todos[0]);
//         } else {
//           // crear
//           for (const todo of todos) {
//             await addNewTodoToFirestore(idUser, todo);
//           }
//         }
//       } else {
//         console.error('ID no válido');
//       }

//       setIdUser(null);
//       setTodos([]);
//       setIsEditing(false);
//       router.push(`/todos`);
//     } catch (error: any) {
//       console.error('Error al agregar/actualizar documento:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await addTodoForFirestore({ id, idUser, todos });
//   };

//   return (
//     <AppLayout>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow mt-5 "
//       >
//         <input
//           type="number"
//           className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
//           placeholder="Id del usuario"
//           value={idUser !== null ? idUser : ''}
//           onChange={(e) => setIdUser(e.target.value !== '' ? Number(e.target.value) : null)}
//         />

//         <textarea
//           className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
//           placeholder="Descripción de la tarea"
//           value={todos.length > 0 ? todos[0] : ''}
//           onChange={(e) => setTodos([e.target.value])}
//         />

//         <input
//           type="submit"
//           className={`bg-lime-600 w-full p-3 text-lg uppercase font-bold text-white rounded cursor-pointer hover:bg-lime-700 transition-color`}
//           value={isEditing ? 'Actualizar' : 'Enviar'}
//         />
//       </form>
//     </AppLayout>
//   );
// };

// export default NewTodo;