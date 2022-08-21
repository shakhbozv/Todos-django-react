import React from 'react';
import Todo from "./Todo";
import {motion} from 'framer-motion'

function Todos({todos, setTodos, load, editingTodo, setEditingTodo}) {
    return (
        <div


            className="todos">
            {todos.length ? todos.map((todo, index) => (
                <Todo

                    key={todo.id} todo={todo} number={index + 1} load={load} editingTodo={editingTodo}
                    setEditingTodo={setEditingTodo}/>
            )) : (
                <p className='no-todos'>There is no todos yet...</p>
            )}
        </div>
    );
}

export default Todos;