import React from 'react';
import CardTodo from '../card-todo/card-todos';


interface CardsTodosProps {
  todos: Array<{
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
    // Otras propiedades según sea necesario
  }>;
}

const CardsTodos: React.FC<CardsTodosProps> = ({ todos }) => {
  return (
    <div>
      <div className='flex flex-wrap gap-2'>
        {todos.map((todo) => (
          <CardTodo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default CardsTodos;
