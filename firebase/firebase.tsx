// firebase.tsx
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const initializeFirebase = (config) => {
  const app = initializeApp(config);
  return getFirestore(app);
};

export const getAllTodos = async (db) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'todos')); // Cambiado a 'todos' según tu nueva especificación
    const todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return todos;
  } catch (error) {
    console.error('Error al obtener todos:', error);
    return [];
  }
};


// // firebaseUtils.ts
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// export const initializeFirebase = (config) => {
//   const app = initializeApp(config);
//   return getFirestore(app);
// };

