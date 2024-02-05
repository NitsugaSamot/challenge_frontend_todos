import React, { useState, useEffect } from 'react';
import AppLayout from './app-layout';
import ErrorAlert from '@/components/alert/alert-error';
import SuccessAlert from '@/components/alert/alert-success';
import { useRouter } from 'next/router';
import { doc, collection, addDoc, updateDoc, getDocs, query, where  } from 'firebase/firestore';
import { initializeFirebase } from '../../firebase/firebase';
import firebaseConfig from '../../firebase/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const db = initializeFirebase(firebaseConfig);

interface TodoDocument {
    id: string;
    todo: string;
  }

interface ErrorAlert {
    msg: string;
}
  
interface SuccesAlert {
    msg: string;
}
  
const NewTodo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string>('');
  const [successAlert, setSuccessAlert] = useState<string>('');

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      idUser: null as number | null,
      todo: '',
    },
    validationSchema: Yup.object({
      idUser: Yup.number().required('El campo ID no puede ir vacío ni debe tener carácteres especiales, debe ser un Número'),
      todo: Yup.string().required('Debes asignar una actividad en TODOs para completar el Formulario'),
    }),

    onSubmit: async (values) => {

      try {
        if (isEditing) {
          // Si está editando, enviar la edición
          await updateTodoInFirestore(router.query.id as string, values.todo);

        } else {
          // Si no está editando, agregar un nuevo todo
          await addTodoToFirestore(values.idUser as number, values.todo)
            
        }
      } catch (error) {
        console.error('Error al agregar/actualizar documento:', error);
      }
    },

  });


  useEffect(() => {
    const { query } = router;
    if (query.id && query.userId) {
      formik.setValues({
        idUser: Number(query.userId),
        todo: Array.isArray(query.todo) ? query.todo[0] : query.todo?.toString() || '',
      });
      setIsEditing(true);
    }
  }, [router.query]);


  const checkDocDuplicate = async (todo: string): Promise<TodoDocument[]> => {
    const todosRef = collection(db, 'todos');
    const q = query(todosRef, where('todo', '==', todo));
    const querySnapshot = await getDocs(q);
  
    const existingTodos: TodoDocument[] = [];
  
    querySnapshot.forEach((doc) => {
      existingTodos.push(doc.data() as TodoDocument);
    });
  
    return existingTodos;
  };

  const updateTodoInFirestore = async (id: string, todo: string) => {
    try {
      const existingTodos = await checkDocDuplicate(todo);
  
      if (existingTodos.length > 0) {
        setErrorAlert('El TODO que intentas ingresar ya está registrado');

        setTimeout(() => {
            setErrorAlert(''); // Reiniciar la alerta después de un tiempo
          }, 2000);
    
        throw new Error('El TODO que intentas ingresar ya está registrado');

      }
  
      const todoDocRef = doc(db, 'todos', id);
      await updateDoc(todoDocRef, { todo });
      console.log('Documento actualizado:', id);
      formik.resetForm();
      setIsEditing(false);

      setSuccessAlert('El TODO fue editado con Éxito!!');

      setTimeout(() => {
        setSuccessAlert('');
        router.push(`/todos`);
      }, 2000);

    } catch (error) {
      console.error('Error al actualizar documento:', error);
    }
  };
  
  const addTodoToFirestore = async (idUser: number, todo: string) => {
    try {
      const existingTodos = await checkDocDuplicate(todo);
  
      if (existingTodos.length > 0) {
        setErrorAlert('El TODO que intentas ingresar ya está registrado');

        setTimeout(() => {
            setErrorAlert(''); // Reiniciar la alerta después de un tiempo
          }, 2000);
    
        throw new Error('El TODO que intentas ingresar ya está registrado');
      }
  
      const docRef = await addDoc(collection(db, 'todos'), {
        idUser,
        todo,
        completed: false,
      });
      console.log('Documento agregado con ID:', docRef.id);
  
      formik.resetForm();
      setIsEditing(false);

      setSuccessAlert('El TODO fue editado con Éxito!!');

      setTimeout(() => {
        setSuccessAlert('');
        router.push(`/todos`);
      }, 2000);
    } catch (error) {
      console.error('Error al agregar documento:', error);
    }
  };
  

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow mt-5 ">

      {errorAlert && <ErrorAlert msg={errorAlert} />}
        {successAlert && <SuccessAlert msg={successAlert} />}

        <input
          type="number"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Id del usuario"
          {...formik.getFieldProps('idUser')}
        />
        {formik.touched.idUser && formik.errors.idUser && (
          <div className="border-red-500 p-3 text-red-700 text-lg mt-1">
            {formik.touched.idUser && formik.errors.idUser && <div>{formik.errors.idUser}</div>}
          </div>
        )}

        <textarea
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción de la tarea"
          {...formik.getFieldProps('todo')}
        />
        {formik.touched.todo && formik.errors.todo && (
          <div className="border-red-500 p-3 text-red-700 text-lg mt-1">
            {formik.touched.idUser && formik.errors.todo && <div>{formik.errors.todo}</div>}
          </div>
        )}

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


