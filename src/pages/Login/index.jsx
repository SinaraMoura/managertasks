import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.svg';
import api from '../../service/api';
import { getItem, setItem } from '../../storage';
import './styles.css';

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
            console.log("🚀 ~ file: index.jsx:33 ~ handleSubmit ~ response:", response.data)
            const { token, name } = response.data;


            setItem('token', token);
            setItem('user', name)

            navigate('/todos');
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const token = getItem('token');
        if (token)
            navigate('/todos')
    }, [])

    return (
        <main className='container'>
            <section className="content__login">
                <form className="login" onSubmit={handleSubmit}>
                    <img src={logoImage} alt="logo cubos academy" className='logo' />
                    <input name="email" type="email" placeholder="Email" className='input' onChange={handleForm} />
                    <input name="password" type="password" placeholder="Senha**" className='input' onChange={handleForm} />
                    <button className='button button__login'>Entrar</button>
                </form>
            </section>
        </main>
    )
}