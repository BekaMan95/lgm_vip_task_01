import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import {useEffect, useState} from "react";


function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const locVal = localStorage.getItem("TODOITEMS");
    if (locVal == null) return []
    return JSON.parse(locVal)
  });
  useEffect(() => {
    localStorage.setItem("TODOITEMS", JSON.stringify(todos))
  }, [todos])
  function handleSubmit(e) {
    e.preventDefault()
    if (newItem !== '') {
      setTodos(currentTodos => {
        return [
          ...currentTodos,
          {id: crypto.randomUUID(), title: newItem, completed: false},
        ]
      })
      setNewItem("");
    }
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id){
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  return (
      <>
        <form onSubmit={handleSubmit} className={"new-item-form"}>
          <label>My ToDo List</label>
          <div className={"form-row"}>
            <input type={"text"} id={"item"} placeholder={"Title..."} value={newItem} onChange={e => setNewItem(e.target.value)}/>
            <button className={"btn"}>Add</button>
          </div>
        </form>
        <h1 className={"header"}>Todo List</h1>
        <ul className={"list"}>
          {todos.length === 0 && "No Tasks to do"}
          {todos.map(todo => {
            return <li key={todo.id}>
              <label>
                <input type={"checkbox"} checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
                {todo.title}
              </label>
              <button className={"btn btn-danger"} onClick={() => deleteTodo(todo.id)}>X</button>
            </li>
          })}
        </ul>
      </>
  );
}
export default App;