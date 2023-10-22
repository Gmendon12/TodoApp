import * as React from 'react'
import AddToDo from './Components/AddToDo';
import ToDoList from './Components/ToDoList';
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <h2>Todo App</h2>
      <AddToDo/>
      <ToDoList/>
      <Toaster position='bottom-center' />
    </div>
  );
}

export default App;
