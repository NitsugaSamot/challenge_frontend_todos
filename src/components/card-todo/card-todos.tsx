import React, { useState } from 'react';

interface Tarea {
  id: string;
  todo: string;
  completed: boolean;
}

const CardTodo: React.FC<{ todo: Tarea }> = ({ todo }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="card-todo bg-white shadow-md rounded-md p-4 mb-4 cursor-pointer" onClick={toggleDetails}>
      <li className=''>
        <strong>ID:</strong> {todo.id}
        {showDetails && (
          <>
            <br />
            <span className="">
              Todo: {todo.todo}<br />
              Completed: {todo.completed ? 'Yes' : 'No'}<br />
              User ID: {todo.id}
            </span>

          </>
        )}
      </li>
    </div>
  );
};

export default CardTodo;
