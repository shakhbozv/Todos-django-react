import React from 'react';
import axios from "axios";
import {motion} from "framer-motion";

function Todo({todo, number, load, editingTodo, setEditingTodo}) {

    function deleteTodo(task) {
        axios.delete(`http://localhost:8000/api/todos/${task.id}`)
            .then(res => load())
            .catch(err => console.error(err))
    }

    async function completeTodo(task){
       await axios.patch(`http://localhost:8000/api/todos/${task.id}/`, {
            completed: !task.completed
        })
            .then(res => load())
            .catch(err => console.error(err))
    }

    function showEditingTodo(task) {
        axios.get(`http://localhost:8000/api/todos/${task.id}/`)
            .then(res => setEditingTodo(res.data))
            .catch(err => console.error(err))
    }

    return (
        <div>
            <motion.div
                // whileHover={{scale: 1.01, paddingLeft: 10}}
                initial={{opacity: 0, y: 1000}}
                transition={{type:'just' ,duration: number*0.1 ,delay: .1}}
                animate={{opacity:1, y: 0}}

                className={todo.completed ? 'todo is-completed' : 'todo'}>
                <span>
                    <span>{number}</span>. <span>{todo.title}</span>
                </span>
                <span>
                    <i className="mr-30 icon" onClick={() => completeTodo(todo)}>
                        {todo.completed ?
                            <motion.img whileHover={{scale: 1.3}} src="./images/completed.png" width={18}/>:
                            <motion.img whileHover={{scale: 1.3}} src='./images/completed-black.png' width={18}/>
                        }
                    </i>
                    <button className='button mr-30 is-info' onClick={() => showEditingTodo(todo)}>Edit</button>
                    <button className='button is-danger ' onClick={() => deleteTodo(todo)}>Delete</button>

                </span>
            </motion.div>
        </div>
    );
}

export default Todo;