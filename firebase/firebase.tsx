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
    const querySnapshot = await getDocs(collection(db, 'todos'));
    
    // Especifica el tipo para doc.data() usando la interfaz Todo
    const todos = querySnapshot.docs.map((doc): Todo => ({ id: doc.id, ...doc.data() } as Todo));
    
    return todos;
  } catch (error) {
    console.error('Error al obtener todos:', error);
    return [];
  }
};

