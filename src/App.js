import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';

function App() {
  const [inputText, setInputText] = useState("")
  const [todoList, setTodoList] = useState(["Lavar los platos", "Pasear al perro", "Hacer la cama", "Barrer"])

  function addTodoValue(e) {
    e.preventDefault()
    let aux = todoList.concat(inputText);
    setInputText("");
    setTodoList([...aux]);
  }

  function deleteTodoValue(i){
    let aux = todoList;
    aux.splice(i,1);
    setTodoList([...aux]);
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="container">
        <form onSubmit={(e) => addTodoValue(e)}>
          <input type="text" placeholder="Ingrese una nueva tarea" onChange={e => setInputText(e.target.value)} value={inputText}></input>
        </form>
        { todoList !== null && todoList.length > 0? 
        todoList.map((todo, i) => <div className="todo" key={i}> {todo} <i onClick={() => deleteTodoValue(i)} class="fas fa-times delete"></i></div> ) : ""}
        <div className="items">{todoList.length === 1 ? todoList.length +" item left" : todoList.length +" items left"}</div>
      </div>
    </div>
  );
}

export default App;
