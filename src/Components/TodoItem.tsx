import {useEffect, useRef, useState} from 'react'
import { useTodo } from '../Context/useTodos'
import { Input } from './Input'
import {toast} from 'react-hot-toast'
import {BsCheck2Square} from 'react-icons/bs'
import {TbRefresh} from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin7Line } from 'react-icons/ri'

import {motion} from 'framer-motion'
import cn from 'classnames'

interface Todo {
    id:string,
    text:string,
    status: 'undone' | 'completed'
}

export const TodoItem = (props: { todo: Todo }) => {
    const { todo } = props

    const[editingTodotext, setEditingTodotext] = useState<string>('')
    const[editingTodoid, setEditingtodoid] = useState<string | null>(null)

    const{deleteTodo, editTodo, updateTodoStatus} = useTodo()

    const editInutRef = useRef<HTMLInputElement>(null)
  
   useEffect(()=>{
    if(editingTodoid !== null && editInutRef.current){
        editInutRef.current.focus()
    }
   },[editingTodoid])

   const handleEdit = (todoId:string, todoText:string) => {
    setEditingtodoid(todoId)
    setEditingTodotext(todoText)

    if(editInutRef.current){
        editInutRef.current.focus()
    }
   }

   const handleUpdate = (todoId:string) =>{
    if(editingTodotext.trim() !== ""){
        editTodo(todoId, editingTodotext)
        setEditingtodoid(null)
        setEditingTodotext('')
        toast.success('todo updated sucessfully')
    } else{
        toast.error("Todo field cannot be empty")
    }
   }

   const handelDelete = (todoId:string) =>{
    deleteTodo(todoId)
    toast.success('Todo deleted successfully')
   }

   const handleStatusUpdate = (todoId:string) =>{
    updateTodoStatus(todoId)
    toast.success("Todo status updated successfully")
   }

    return (
      <motion.li
        layout
      >
        {editingTodoid === todo.id ? (
            <motion.div 
            className='todo-contents-update'
            >
                <Input 
                ref={editInutRef}
                type='text'
                value={editingTodotext}
                onChange={e => setEditingTodotext(e.target.value)}
                />

                <button
                 className='update-btn'
                 onClick={()=> handleUpdate(todo.id)}
                >Update</button>
            </motion.div>
        ) : (
            <div className='todo-contents'>
                <motion.span
                layout
                style={{
                  textDecoration:
                    todo.status === 'completed' ? 'line-through' : 'none',
                }}
                className='todo-text'
                >
                    {todo.text}
                </motion.span>
                <div className='todo-btns'>
                    <button onClick={()=> handleStatusUpdate(todo.id)} className='mark-btn'>
                        {todo.status === 'undone' ? (
                            <span>
                                <BsCheck2Square /> {" "}
                                Mark Completed
                            </span>
                        ) : (
                            <span>
                                <TbRefresh /> {" "}
                                Mark Undone
                            </span>
                        )}
                    </button>
                    <div>
                        <button onClick={()=>handleEdit(todo.id, todo.text)} className='edit-btn'>
                            <FaRegEdit />
                            Edit
                        </button>
                        <button onClick={()=> handelDelete(todo.id)} className='delete-btn'>
                            <RiDeleteBin7Line />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        ) 
    }
      </motion.li>
    )
  }