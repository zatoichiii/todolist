import { useState, useEffect } from 'react'; 
import styles from "./style.module.css";

// интерфейс 
interface Todo {
  id: number; 
  title: string; 
  completed: boolean; 
}

const TodoForm = () => {
  // ввод нового названия задачи
  const [newTodoTitle, setNewTodoTitle] = useState(''); 
  // флаг выполнения новой задачи
  const [newTodoCompleted, setNewTodoCompleted] = useState(false); 
  // массив задач
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
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Сделано' : 'Не сделано'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm; 