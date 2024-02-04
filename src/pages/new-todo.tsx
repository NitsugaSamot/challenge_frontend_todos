import React, { useState, useEffect } from 'react';
import AppLayout from './app-layout';
import { useRouter } from 'next/router';
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { initializeFirebase } from '../../firebase/firebase';
import firebaseConfig from '../../firebase/config';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const db = initializeFirebase(firebaseConfig);

const NewTodo = () => {
  const [isEditing, setIsEditing] = useState(false);

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
        await addTodoForFirestore(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const { query } = router;
    if (query.id && query.userId) {
      formik.setValues({
        idUser: Number(query.userId),
        todo: Array.isArray(query.todo) ? query.todo[0] : query.todo,
      });
      setIsEditing(true);
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
          if (id !== null) {
            // editar
            await updateTodoInFirestore(id, todo);
          } else {
            console.error('ID no válido');
          }
        } else {
          // crear
          const todos = todo.split(',').map((t) => t.trim());
          for (const t of todos) {
            await addNewTodoToFirestore(idUser, t);
          }
        }
      } else {
        console.error('ID de usuario no válido');
      }

      formik.resetForm();
      setIsEditing(false);
      router.push(`/todos`);
    } catch (error: any) {
      console.error('Error al agregar/actualizar documento:', error);
    }
  };

  return (
    <AppLayout>
      <form onSubmit={formik.handleSubmit} className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow mt-5 ">
        <input
          type="number"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Id del usuario"
          {...formik.getFieldProps('idUser')}
        />
        {formik.touched.idUser && formik.errors.idUser && (
            <div className="border-red-500 p-3 text-red-700 text-lg mt-1">
            {formik.touched.idUser && formik.errors.idUser && (
                <div>{formik.errors.idUser}</div>
            )}
            </div>
        
        )}

        <textarea
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción de la tarea"
          {...formik.getFieldProps('todo')}
        />
        {formik.touched.todo && formik.errors.todo && (
            <div className="border-red-500 p-3 text-red-700 text-lg mt-1">
            {formik.touched.idUser && formik.errors.todo && (
              <div>{formik.errors.todo}</div>
            )}
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



