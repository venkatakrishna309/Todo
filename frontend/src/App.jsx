import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setLoading(false);
    }
  };

  // Create a new todo
  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      await axios.post(API, { task });
      setTask('');
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Toggle completed status
  const toggleComplete = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/${id}`, { completed: !currentStatus });
      fetchTodos();
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem', textAlign: 'center' }}>
      <h1>📝 Todo App</h1>
      <div>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={{ padding: '0.5rem', width: '70%' ,border:'2px solid black'}}
        />
        <button onClick={addTodo} style={{ padding: '0.5rem', marginLeft: '1rem' }}>
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading todos...</p>
      ) : (
        <ul style={{ padding: 0, marginTop: '2rem' }}>
          {todos.map(todo => (
            <li
              key={todo._id}
              style={{
                listStyle: 'none',
                marginBottom: '1rem',
                fontSize: '1.1rem',
                textDecoration: todo.completed ? 'line-through' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f0f0f0',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
              }}
            >
              {todo.task}
              <div>
                <button onClick={() => toggleComplete(todo._id, todo.completed)} style={{ marginRight: '10px' }}>
                  {todo.completed ? 'Undo' : 'Done'}
                </button>
                <button onClick={() => deleteTodo(todo._id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
