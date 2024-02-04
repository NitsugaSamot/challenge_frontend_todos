import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

import { initializeFirebase } from '../../../firebase/firebase';
import firebaseConfig from '../../../firebase/config';

const db = initializeFirebase(firebaseConfig);

interface Todo {
  id: string;
  idUser: number;
  todo: string;
  completed: boolean;
}

const CardTodo: React.FC<{ todo: Todo }> = ({ todo }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    const deleteTodoFromFirestore = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
  
    } catch (error: any) {
      console.error('Error al eliminar documento:', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este TODO?')) {
      deleteTodoFromFirestore(todo.id); // Asegúrate de que todo.id sea el ID correcto
      router.push(`/app-layout`);
    }
  };

  const handleEdit = () => {
    router.push(`/new-todo?id=${todo.id}&userId=${todo.idUser}&todo=${encodeURIComponent(todo.todo)}&completed=${todo.completed}`);
    closeModal();
  };
  
  return (
    <div className="card-todo bg-white shadow-md rounded-md p-4 mb-4 cursor-pointer">
      <div className='border-b p-5 flex flex-col md:flex-row text-center justify-between'>
        <div className='rounded-lg  border-gray-600'>
          <strong>ID: {todo.idUser}</strong>
        </div>
        <div>
          <button className='bg-lime-900 w-100 text-white text-lg w-full p-3 uppercase font-bold block text-center rounded-lg cursor-pointer hover:bg-lime-800 transition-colors' onClick={openModal}>
            Ver
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center">
        <div className="bg-gray-500 text-white p-8 rounded-md">
          <button className='text-red-800' onClick={closeModal}>x</button>
          <h2 className="text-2xl font-bold mb-4">Detalles del TODO</h2>
          <div><p>ID: {todo.idUser}</p></div>
          <div><p>Todo: {todo.todo}</p></div>
          <div><p>Completed: {todo.completed ? 'Yes' : 'No'}</p></div>

          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded" onClick={handleEdit}>
              Editar
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardTodo;


