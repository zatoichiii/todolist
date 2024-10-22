"use client"
import { useState, useEffect } from 'react'; 
import styles from "./style.module.css";

interface Todo {
  id: number; 
  title: string; 
  completed: boolean; 
}

const TodoForm = () => {
  const [newTodoTitle, setNewTodoTitle] = useState(''); 
  const [newTodoCompleted, setNewTodoCompleted] = useState(false); 
  const [todos, setTodos] = useState<Todo[]>([]); 

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json()) 
      .then(data => setTodos(data)); 
  }, []); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = { id: Date.now(), title: newTodoTitle, completed: newTodoCompleted };
    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
    setNewTodoCompleted(false);
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}> 
        <input
          type="text"
          placeholder="Введите название задачи"
          value={newTodoTitle}
          onChange={event => setNewTodoTitle(event.target.value)}
        />
        <input
          type="checkbox"
          checked={newTodoCompleted}
          onChange={event => setNewTodoCompleted(event.target.checked)}
        />
        <button type="submit">Добавить задачу</button>
      </form>
      <ul className={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? styles.completed : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompletion(todo.id)}
            />
            {todo.title} - {todo.completed ? 'Сделано' : 'Не сделано'}
            <button onClick={() => handleDelete(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm; 


// 'use client'
// import { useState, useEffect } from 'react';
// import styles from "./style.module.css";

// interface Todo {
//   id: number; 
//   title: string; 
//   completed: boolean; 
// }

// const TodoForm = () => {
//   const [newTodoTitle, setNewTodoTitle] = useState(''); 
//   const [newTodoCompleted, setNewTodoCompleted] = useState(false); 
//   const [todos, setTodos] = useState<Todo[]>([]); 

//   useEffect(() => {
//     fetch('data.json')
//       .then(response => response.json()) 
//       .then(data => setTodos(data)); 
//   }, []); 

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const newTodo = { id: Date.now(), title: newTodoTitle, completed: newTodoCompleted };

//     const response = await fetch('/api/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTodo),
//     });

//     if (response.ok) {
//       const updatedTodos = await response.json();
//       setTodos(updatedTodos);
//     } else {
//       console.error('errorka');
//     }

//     setNewTodoTitle('');
//     setNewTodoCompleted(false);
//   };

//   const toggleTodoCompletion = (id: number) => {
//     setTodos(todos.map(todo => 
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const handleDelete = (id: number) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   return (
//     <div>
//       <form className={styles.form} onSubmit={handleSubmit}> 
//         <input
//           type="text"
//           placeholder="Введите название задачи"
//           value={newTodoTitle}
//           onChange={event => setNewTodoTitle(event.target.value)}
//         />
//         <input
//           type="checkbox"
//           checked={newTodoCompleted}
//           onChange={event => setNewTodoCompleted(event.target.checked)}
//         />
//         <button type="submit">Добавить задачу</button>
//       </form>
//       <ul className={styles.list}>
//         {todos.map(todo => (
//           <li key={todo.id} className={todo.completed ? styles.completed : ''}>
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodoCompletion(todo.id)}
//             />
//             {todo.title} - {todo.completed ? 'Сделано' : 'Не сделано'}
//             <button onClick={() => handleDelete(todo.id)}>Удалить</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoForm; 