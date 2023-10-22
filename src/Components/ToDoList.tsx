import React from 'react'
import { useTodo } from '../Context/useTodos'
import {SiStarship} from 'react-icons/si'
import { TodoItem } from './TodoItem'
import {motion} from 'framer-motion'

function ToDoList() {
  const{todos} = useTodo()

  if(!todos.length){
    return(
        <div>
            <h1 className='nothing-to-do'>
                <SiStarship />
                You have nothing to do
            </h1>
        </div>
    )
  }
  return (
    <motion.ul className='todo-item'>
        {todos.map(todo =>(
            <TodoItem todo={todo} key={todo.id} />
        ))}
    </motion.ul>
  )
}

export default ToDoList