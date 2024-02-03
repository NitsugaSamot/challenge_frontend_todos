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
    <div className="card-todo" onClick={toggleDetails}>
      <li>
        <strong>ID:</strong> {todo.id}
        {showDetails && (
          <>
            <br />
            <strong>Todo:</strong> {todo.todo}<br />
            <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}<br />
            <strong>User ID:</strong> {todo.id}

          </>
        )}
      </li>
    </div>
  );
};

export default CardTodo;


// import React from 'react';

// interface CardTodoProps {
//   todo: {
//     id: number;
//     todo: string;
//     completed: boolean;
//     userId: number;
//     // Otras propiedades según sea necesario
//   };
// }

// const CardTodo: React.FC<CardTodoProps> = ({ todo }) => {
//   return (
//     <div className="card-todo">
//       <li>
//         {/* <strong>ID:</strong> {todo.id}<br /> */}
//         <strong>Todo:</strong> {todo.todo}<br />
//         <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}<br />
//         <strong>User ID:</strong> {todo.userId}
//         {/* Puedes agregar más propiedades según sea necesario */}
//       </li>
//     </div>
//   );
// };

// export default CardTodo;
