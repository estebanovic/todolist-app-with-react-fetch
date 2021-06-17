import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';

function App() {
  const [inputText, setInputText] = useState("")
  const [todoList, setTodoList] = useState([])


  useEffect(() => {
    getTodoList();
  }, [])

  const getTodoList = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos');
      if (response.ok) {
        const data = await response.json();
        setTodoList(data);
      }
    } catch (error) {
      console.log(error);

    }
  };


  async function addTodoValue(e) {
    e.preventDefault();
    await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ label: inputText, done: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setInputText("");
    getTodoList();
  }


  async function deleteTodoValue(id) {
    await fetch('http://localhost:3001/todos/'+ id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    getTodoList();
  }


  // function addTodoValue(e) {
  //   e.preventDefault();
  //   let aux = todoList.concat({"label" : inputText, "done": false});
  //   setInputText("");
  //   setTodoList(aux);
  // }


  // function deleteTodoValue(i) {
  //   let aux = todoList;
  //   aux.splice(i, 1);
  //   setTodoList([...aux]);
  // }

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="container">
        <form onSubmit={(e) => addTodoValue(e)}>
          <input type="text" placeholder="Ingrese una nueva tarea" onChange={e => setInputText(e.target.value)} value={inputText}></input>
        </form>
        {todoList !== null && todoList.length > 0 ?
          todoList.map((todo, i) => <div className="todo" key={i}> {todo.label} <i onClick={() => deleteTodoValue(todo.id)} className="fas fa-times delete"></i></div>) : ""}
        <div className="items">{todoList.length === 1 ? todoList.length + " item left" : todoList.length + " items left"}</div>
      </div>
    </div>
  );
}

export default App;
