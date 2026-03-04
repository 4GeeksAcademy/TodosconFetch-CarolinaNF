import React, { useState, useEffect } from "react";

function TodoList() {
  const [tareas, setTareas] = useState([]);
  const [inputValue, setInputValue] = useState("");

  
  const obtenerTareas = () => {
    fetch("https://playground.4geeks.com/todo/users/Carolina")
      .then(response => response.json())
      .then(data => {
        setTareas(data.todos || []);
      })
      .catch(error => console.log(error));
  };

  
  useEffect(() => {
    obtenerTareas();
  }, []);

 
  const agregarTarea = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {

      const nuevaTarea = {
        label: inputValue,
        is_done: false
      };

      fetch("https://playground.4geeks.com/todo/users/Carolina/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaTarea)
      })
      .then(response => response.json())
      .then(() => {
        obtenerTareas();
        setInputValue("");
      })
      .catch(error => console.log(error));
    }
  };

  
  const eliminarTarea = (id) => {
    fetch("https://playground.4geeks.com/todo/users/Carolina/todos/", {
      method: "DELETE"
    })
    .then(() => obtenerTareas())
    .catch(error => console.log(error));
  };

  return (
  <div className="container">
    <h1>todos</h1>

    <div className="todo-card">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={agregarTarea}
      />

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            {tarea.label}
            <button onClick={() => eliminarTarea(tarea.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="footer">
        {tareas.length} item left
      </div>
    </div>
  </div>
);
}
export default TodoList;