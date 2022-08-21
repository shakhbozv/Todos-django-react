import React, {useState} from 'react';
import axios from "axios";

function Navbar({isAdding, setIsAdding, countOfOpen, countOfCompleted,setTodos, load, setEditingTodo, editingTodo}) {


    const [showing, setShowing] = useState('all')

    const filterTodos = category => {
        axios.get('http://localhost:8000/api/todos/')
            .then(res => {
                if (category === 'open') {
                    setTodos(res.data.filter(task => !task.completed))
                    setShowing('open')
                } else if (category === 'completed') {
                    setTodos(res.data.filter(task => task.completed))
                    setShowing('completed')
                } else {
                    setShowing('all')
                    return load()
                }

            })
            .catch(err => console.error(err))

    }

    const close = () => {
      if (editingTodo) {
          setIsAdding(false)
          setEditingTodo(null)
      } else {
          setIsAdding(!isAdding)
      }
    }


    return (
        <div className="navbar">
            <div className="navbar-start">
                <button className="button is-info"
                        onClick={close}>{editingTodo || isAdding ? 'X' : 'Add Todo'}</button>
            </div>
            <div className="navbar-end">
                {showing !== 'all' && <button className="button mr-30" onClick={filterTodos}>All</button>}
                <button
                    className={showing === 'completed' ? "button mr-30 is-active is-completed" : "button mr-30 is-completed"}
                    onClick={() => filterTodos('completed')}>Completed {countOfCompleted}</button>
                <button className={showing === 'open' ? "button is-active" : "button"}
                        onClick={() => filterTodos('open')}>Open {countOfOpen}</button>
            </div>
        </div>
    );
}

export default Navbar;