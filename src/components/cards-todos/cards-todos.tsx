import React from 'react';
import CardTodo from '../card-todo/card-todos';

interface Todo{
  id: string;
  todo: string;
  completed: boolean;
}

const CardsTodos: React.FC<{ todos: Todo[] }> = ({ todos }) => {
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
