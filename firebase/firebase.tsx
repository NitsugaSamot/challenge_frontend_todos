import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}


interface FirebaseConfig extends FirebaseOptions {}

export const initializeFirebase = (config: FirebaseConfig) => {
  const app = initializeApp(config);
  return getFirestore(app);
};

export const getAllTodos = async (db: any) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'todos')); // Cambiado a 'todos' según tu nueva especificación
    const todos = querySnapshot.docs.map((doc): Todo => ({ id: doc.id, ...doc.data() }));
    return todos;
  } catch (error) {
    console.error('Error al obtener todos:', error);
    return [];
  }
};



