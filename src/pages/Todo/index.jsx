import { useState, useEffect, useRef } from 'react';
import TodoItem from '../../components/TodoItem';
import api from '../../service/api';
import { getItem } from '../../storage';
import { toast } from 'react-toastify';

export default function Todo() {
    const token = getItem('token')
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [todos, setTodos] = useState([])
    const [todoEdit, setTodoEdit] = useState(null)
    const todoItem = useRef('')

    async function loadTodos() {
        try {
            const response = await api.get('/todos/list', {
                headers
            });
            setTodos(response.data)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        loadTodos()
    }, [])

    function handleSubmit(e) {
        try {
            e.preventDefault()
            if (!todoItem.current.value.length) return

            if (todoEdit) {
                updateTodoItem({
                    ...todoEdit,
                    task: todoItem.current.value
                })
                return
            }

            addTodoItem()

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    async function addTodoItem() {
        try {
            const newTodoItem = {
                task: todoItem.current.value,
                active: false
            }
            const response = await api.post('/todos/register', newTodoItem, {
                headers
            });
            console.log("🚀 ~ file: index.jsx:59 ~ addTodoItem ~ response:", response)

            setTodos([...todos, response.data])
            clearTodoItem()

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    function selectedTodoEdit(todo) {
        setTodoEdit(todo);
        todoItem.current.value = todo.task
    }
    async function updateTodoItem(newTodoItem) {
        try {
            await api.put(`/todos/edit/${newTodoItem.id}`, newTodoItem, {
                headers
            })
            const todosLocal = [...todos]
            const selectedTodoItem = todosLocal.reduce((acc, todo) => todo.id === newTodoItem.id ? acc = todo : acc, null);

            selectedTodoItem.task = newTodoItem.task
            selectedTodoItem.active = newTodoItem.active

            setTodos(todosLocal);
            clearTodoItem()

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }

    }

    function checkedTodoItem(todo) {
        updateTodoItem({
            ...todo,
            active: !todo.active
        })
    }

    function clearTodoItem() {
        todoItem.current.value = ''
        setTodoEdit(null)
    }

    async function deleteTodoItem(id) {
        try {
            await api.delete(`/todos/delete/${id}`, { headers })
            const todosLocal = [...todos]
            const newTodos = todosLocal.filter(todo => todo.id !== id)
            setTodos(newTodos)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <main className='container'>
            <section className="content">
                <h1 className="title">To Do List</h1>
                <form className='todos__form' onSubmit={handleSubmit}>
                    <input type="text" className='input' ref={todoItem} />
                </form>
                <div className="todos__list">
                    {todos.map(todo => (
                        <TodoItem todo={todo} key={todo.id} selectedTodoEdit={selectedTodoEdit} checkedTodoItem={checkedTodoItem} deleteTodoItem={deleteTodoItem} />
                    ))}
                </div>
            </section>
        </main>
    )
}