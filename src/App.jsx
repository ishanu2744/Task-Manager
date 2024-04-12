import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finished, setFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setFinished(!finished);
  };

  const handleEdit = (e, id) => {
    const todo = todos.filter((item) => item.id === id);
    setTodo(todo[0].todo);
    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocal();
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocal();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocal();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheck = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((items) => {
      return items.id === id;
    });
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocal();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-screen md:w-1/2">
        <h1 className="font-bold text-center text-3xl">
          iTask - Manage Your Todos
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add Todo</h2>
          <div className="flex">
            <input
              type="text"
              className="w-full rounded-lg p-1 px-5"
              onChange={handleChange}
              value={todo}
            />
            <button
              className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white disabled:bg-violet-500 mx-2 rounded-md"
              disabled={todo.length <= 3}
              onClick={handleAdd}
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="my-4"
          id="show"
          onChange={toggleFinished}
          checked={finished}
          type="checkbox"
        />
        <label className="mx-2" htmlFor="show">
          Show Finished
        </label>
        <hr />
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((items) => {
            return (
              (finished || !items.isCompleted) && (
                <div key={items.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={items.id}
                      onChange={handleCheck}
                      type="checkbox"
                      checked={items.isCompleted}
                    />
                    <div className={items.isCompleted ? "line-through" : ""}>
                      {items.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white rounded-md mx-1"
                      onClick={(e) => handleEdit(e, items.id)}
                    >
                      <FaEdit />

                    </button>
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-2 font-bold text-sm py-1 text-white rounded-md mx-1"
                      onClick={(e) => handleDelete(e, items.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
