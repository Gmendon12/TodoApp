import React, {useState, useEffect, useRef } from 'react'
import {toast} from 'react-hot-toast'
import { Input } from './Input'
import { useTodo } from '../Context/useTodos'

function AddToDo() {

  const[input, setInput] = useState<string>("")
  const[todos, setTodos] = useState<string[]>([])
  const{addTodo} = useTodo()

  const inputRef = useRef<HTMLInputElement>(null)

 useEffect(()=>{
    if(inputRef.current){
        inputRef.current.focus()
    }
 },[])

  const handleSubmission = (e:React.FormEvent) =>{
    e.preventDefault()
    console.log("form has been submitted")
    if(input.trim()!==""){
        addTodo(input)
        // setTodos([...todos, input])
        setInput('')
        toast.success('Todo added successfully')
    }
    else{
        toast.error("Todo field cannot be empty")
    }
  }
  
  return (
    <form onSubmit={handleSubmission}>
        <div>
            <Input 
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='start typing...'
            className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
            />

           <button
           type='submit'
           className="input-btn"
           >Submit</button>
        </div>
    </form>
  )
}

export default AddToDo