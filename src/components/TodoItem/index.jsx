import './styles.css';
export default function TodoItem({ todo, selectedTodoEdit, checkedTodoItem, deleteTodoItem }) {
    const isChecked = todo.active && 'checked'
    return (
        <div className="todos__item">
            <p className={`todo__text ${isChecked}`} onClick={() => checkedTodoItem(todo)}>{todo.task}</p>
            <button className='button' onClick={() => selectedTodoEdit(todo)}>Editar</button>
            <button className='button button--secundary' onClick={() => deleteTodoItem(todo.id)}>Excluir</button>
        </div>
    )
}