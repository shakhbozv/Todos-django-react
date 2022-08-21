import React, {useState, useEffect} from 'react';
import '../static/style.css'
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Todos from "../components/Todos";
import axios from "axios";


function Home() {
    const [isAdding, setIsAdding] = useState(false)
    const [todos, setTodos] = useState(false)
    const [countOfOpen, setCountOfOpen] = useState()
    const [countOfCompleted, setCountOfCompleted] = useState()
    const [editingTodo, setEditingTodo] = useState(null)


    const load = () => {
        axios.get('http://localhost:8000/api/todos/')
            .then(res => {
                let filteredTodos = []
                let completedTodos = []
                let openTodos = []

                res.data.map(task => {
                    if (!task.completed) {
                        filteredTodos.push(task)
                        openTodos.push(task)
                    }
                })
                res.data.map(task => {
                    if (task.completed) {
                        filteredTodos.push(task)
                        completedTodos.push(task)

                    }
                })
                setCountOfOpen(openTodos.length)
                setCountOfCompleted(completedTodos.length)


                setTodos(filteredTodos)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => load(), [])


    return (
        <div className="container">
            <div className="box">
                <Navbar
                    load={load}
                    todos={todos}
                    setTodos={setTodos}
                    isAdding={isAdding}
                    setIsAdding={setIsAdding}
                    countOfOpen={countOfOpen}
                    countOfCompleted={countOfCompleted}
                    setEditingTodo={setEditingTodo}
                    editingTodo={editingTodo}
                />
                {isAdding || editingTodo ? <Form
                        load={load}
                        setIsAdding={setIsAdding}
                        editingTodo={editingTodo}
                        setEditingTodo={setEditingTodo}
                    /> :
                    <Todos
                        todos={todos}
                        setTodos={setTodos}
                        load={load}
                        editingTodo={editingTodo}
                        setEditingTodo={setEditingTodo}
                    />}
            </div>
        </div>
    );
}

export default Home;