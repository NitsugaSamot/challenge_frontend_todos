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
      // Verifica si query.todo es una cadena antes de establecer el estado
      if (typeof query.todo === 'string') {
        setTodo(query.todo);
      }
    }
  }, [router.query]);
  
//   useEffect(() => {
//     const { query } = router;
//     if (query.id && query.userId && query.todo) {
//       setIdUser(Number(query.userId));
//       setTodo(query.todo);
//       setId(query.id);
//       setIsEditing(true);
//     }
//   }, [router.query]);

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
          await updateTodoInFirestore(id, todo);
        } else {
          await addNewTodoToFirestore(idUser, todo);
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
// import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
// import { initializeFirebase } from '../../firebase/firebase';
// import firebaseConfig from '../../firebase/config';

// const db = initializeFirebase(firebaseConfig);

// const NewTodo = () => {
//   const [idUser, setIdUser] = useState<number | null>(null);
//   const [todo, setTodo] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [id, setId] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     const { query } = router;
//     if (query.id && query.userId && query.todo) {
//       setIdUser(Number(query.userId));
//       setTodo(query.todo);
//       setId(query.id);
//       setIsEditing(true);
//     }
//   }, [router.query]);

//   const addTodoForFirestore = async ({ id, idUser, todo }: { id: string | null; idUser: number | null; todo: string }) => {
//     try {
//       if (idUser !== null) {
//         if (isEditing) {
//           const todoDocRef = doc(db, 'todos', id);
//           await updateDoc(todoDocRef, { todo });
//           console.log('Documento actualizado:', id);
//         } else {
//           const docRef = await addDoc(collection(db, 'todos'), { idUser, todo, completed: false });
//           console.log('Documento agregado con ID:', docRef.id);
//         }
//       } else {
//         console.error('ID no válido');
//       }

//       setIdUser(null);
//       setTodo('');
//       setIsEditing(false);
//       router.push(`/todos`);
//     } catch (error: any) {
//       console.error('Error al agregar/actualizar documento:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await addTodoForFirestore({ id, idUser, todo });
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
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//         />

//         <input
//           type="submit"
//           className={`bg-${isEditing ? 'yellow' : 'lime'}-900 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-${isEditing ? 'yellow' : 'lime'}-800 transition-colors`}
//           value={isEditing ? 'Actualizar' : 'Enviar'}
//         />
//       </form>
//     </AppLayout>
//   );
// };

// export default NewTodo;


// import { useState, useEffect } from 'react';
// import AppLayout from './app-layout';
// import { useRouter } from 'next/router';
// import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
// import { initializeFirebase } from '../../firebase/firebase';
// import firebaseConfig from '../../firebase/config';

// const db = initializeFirebase(firebaseConfig);

// const NewTodo = () => {
//   const [idUser, setIdUser] = useState<number | null>(null);
//   const [todo, setTodo] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [id, setId] = useState<string | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     const { query } = router;
//     if (query.id && query.userId && query.todo) {
//       setIdUser(Number(query.userId));
//       setTodo(query.todo);
//       setId(query.id);
//       setIsEditing(true);
//     }
//   }, [router.query]);

//   const addTodoForFirestore = async ({ id, idUser, todo }: { id: string, idUser: number | null, todo: string }) => {
//     try {
//       if (id !== null) {
//         if (isEditing) {
//           const todoDocRef = doc(db, 'todos', id);
//           await updateDoc(todoDocRef, { todo });
//           console.log('Documento actualizado:', id);
//         } else {
//           const docRef = await addDoc(collection(db, 'todos'), { idUser, todo, completed: false });
//           console.log('Documento agregado con ID:', docRef.id);
//         }
//       } else {
//         console.error('ID no válido');
//       }

//       setIdUser(null);
//       setTodo('');
//       setIsEditing(false);
//       router.push(`/todos`);
//     } catch (error: any) {
//       console.error('Error al agregar/actualizar documento:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await addTodoForFirestore({  idUser, todo });
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
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//         />

//         <input
//           type="submit"
//           className={`bg-${isEditing ? 'yellow' : 'lime'}-900 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-${isEditing ? 'yellow' : 'lime'}-800 transition-colors`}
//           value={isEditing ? 'Actualizar' : 'Enviar'}
//         />
//       </form>
//     </AppLayout>
//   );
// };

// export default NewTodo;


// import { useState, useEffect } from 'react';
// import AppLayout from './app-layout';
// import { useRouter } from 'next/router';
// import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
// import { initializeFirebase } from '../../firebase/firebase';
// import firebaseConfig from '../../firebase/config';

// const db = initializeFirebase(firebaseConfig);

// const NewTodo = () => {
//   const [idUser, setIdUser] = useState<number | null>(null);
//   const [todo, setTodo] = useState('');
  
//   const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar el modo de edición
//   const [id, setId] = useState<string | null>(null);

//   const router = useRouter();

// useEffect(() => {
//     const { query } = router;
//     if (query.id && query.userId && query.todo) {
//       setIdUser(Number(query.userId));
//       setTodo(query.todo);
//       setId(query.id);
//       setIsEditing(true);
//     }
//   }, [router.query]);

//   const addTodoForFirestore = async ({ id ,idUser, todo }: { id: string ,idUser: number | null, todo: string }) => {
//     try {

//           const docRef = await addDoc(collection(db, 'todos'), { idUser, todo, completed: false });
//           console.log('Documento agregado con ID:', docRef.id);

//           setIdUser(null);
//           setTodo('');
//           setIsEditing(false);
//           router.push(`/todos`)
  

//     } catch (error: any) {
//       console.error('Error al agregar/actualizar documento:', error);
//     }
//   };
  
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await addTodoForFirestore({ idUser, todo });
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
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//         />

//         <input
//           type="submit"
//           className={`bg-${isEditing ? 'yellow' : 'lime'}-900 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-${isEditing ? 'yellow' : 'lime'}-800 transition-colors`}
//           value={isEditing ? 'Actualizar' : 'Enviar'}
//         />
//       </form>
//     </AppLayout>
//   );
// };

// export default NewTodo;
