import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import { getItem, setItem } from '../../storage';
import './styles.css';
import { toast } from 'react-toastify';

export default function Login() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmit(e) {
        try {
            e.preventDefault()

            if (!form.email || !form.password) return

            const response = await api.post('/login', {
                ...form
            })
            const { token, name } = response.data;

            setItem('token', token);
            setItem('user', name)

            navigate('/todos');
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    useEffect(() => {
        const token = getItem('token');
        if (token)
            navigate('/todos')
    }, [])

    return (
        <main className='container container__login'>
            <section className="content__login">
                <form className="login" onSubmit={handleSubmit}>
                    <h1 className='logo'>Task Manager</h1>
                    <input name="email" type="email" placeholder="Email" className='input' onChange={handleForm} />
                    <input name="password" type="password" placeholder="Senha**" className='input' onChange={handleForm} />
                    <button className='button button__login'>Entrar</button>
                </form>
            </section>
        </main>
    )
}