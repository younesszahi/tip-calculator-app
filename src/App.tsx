import React, { useState, useEffect } from "react";

interface TodoI {
  id: number;
  title: string;
  date: string;
  description: string;
  isCompleted: boolean;
  tag: string[];
}

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todos, setTodos] = useState<TodoI[]>([]);
  const [tags, setTodoTags] = useState<string>("");
  const [tagsFilter, setTagsFilter] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (): void => {
    if (todoTitle) {
      const newTodo: TodoI = {
        id: new Date().getTime(),
        title: todoTitle,
        description: todoDescription,
        date: todoDate,
        isCompleted: false,
        tag: tags.split(",").map((tag) => tag.trim()),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodoTitle("");
      setTodoDescription("");
      setTodoDate("");
      setTodoTags("");
    }
  };

  const toggleCompleted = (id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTask = (id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filterByTags = (): TodoI[] => {
    if (!tagsFilter) return todos;
    return todos.filter((todo) =>
      todo.tag.some((tag) =>
        tag.toLowerCase().includes(tagsFilter.toLowerCase())
      )
    );
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[700px] p-7 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Todo App
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          className="w-full p-2 mt-4 rounded border"
        />

        <input
          type="text"
          placeholder="Description"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          className="w-full p-2 mt-2 rounded border"
        />

        <input
          type="date"
          value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
          className="w-full p-2 mt-2 rounded border"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTodoTags(e.target.value)}
          className="w-full p-2 mt-2 rounded border"
        />

        <button
          onClick={addTodo}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 mt-4 rounded shadow-md hover:opacity-90"
        >
          Add Todo
        </button>

        <input
          type="text"
          placeholder="Filter by tags"
          value={tagsFilter}
          onChange={(e) => setTagsFilter(e.target.value)}
          className="w-full p-2 mt-4 rounded border"
        />

        <ul className="mt-4">
          {filterByTags().map((todo) => (
            <li
              key={todo.id}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-md mt-2 shadow-md"
            >
              <p className={todo.isCompleted ? "line-through" : ""}>
                {todo.title}
              </p>
              <p>{todo.description}</p>
              <p>{todo.date}</p>
              <p>Tags: {todo.tag.join(", ")}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => toggleCompleted(todo.id)}
                  className="bg-white text-black px-3 py-1 rounded"
                >
                  {todo.isCompleted ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
