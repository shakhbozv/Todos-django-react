import React, {useEffect, useState} from 'react';
import axios from "axios";

function Form({load, setIsAdding, editingTodo = null , setEditingTodo}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addTodo = event => {
        event.preventDefault()
       if (title && description) {
            axios.post('http://localhost:8000/api/todos/', {
            title: title,
            description: description,
            confirmed: false,
        })
            .then(res => load())
            .catch(err => console.error(err))
        setIsAdding(false)
       } else window.alert('Write something to add task!')
    }

    const updateTodo = event => {
        event.preventDefault()
        if (title && description) {
            axios.patch(`http://localhost:8000/api/todos/${editingTodo.id}/`, {
                title: title, description:description
            })
                .then(res => load())
                .catch(err => console.error(err))
            setIsAdding(false)
            setEditingTodo(null)
        }
        console.log('Edit')
    }

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title)
            setDescription(editingTodo.description)
        }
    }, [editingTodo])


    return (
        <form className="form" onSubmit={!editingTodo ?(e) =>  addTodo(e) : (e) => updateTodo(e)}>
            <input
                className="input"
                type="text"
                placeholder='title of your todo...'
                value={title}
                onInput={event => setTitle(event.target.value)}
            />
            <textarea
                className="input"
                type="text"
                placeholder='description of your todo...'
                rows={10}
                value={description}
                onInput={event => setDescription(event.target.value)}
            />
            <button className="button-fullwidth">{editingTodo? 'Update': 'Add'}</button>
        </form>
    );
}

export default Form;