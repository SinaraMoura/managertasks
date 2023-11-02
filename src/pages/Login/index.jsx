import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import { getItem, setItem } from '../../storage';
import './styles.css';
import { toast } from 'react-toastify';

export default function Login() {
    const [formSignup, setFormSignup] = useState({ name: '', email: '', password: '' });
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    function handleFormLogin(e) {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    function handleFormSignup(e) {
        setFormSignup({
            ...formSignup,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmitLogin(e) {
        try {
            e.preventDefault()

            if (!formLogin.email || !formLogin.password) return

            const response = await api.post('/login', {
                ...formLogin
            })
            const { token, name } = response.data;

            setItem('token', token);
            setItem('user', name)

            navigate('/todos');
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    async function handleSubmitSignup(e) {

        try {
            e.preventDefault();

            if (!formSignup.name || !formSignup.email || !formSignup.password) return;

            const response = await api.post('/user/register', { ...formSignup });

            toast.success(response?.data?.message);
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
            <section className="container">
                <div className="login">
                    <i className="fas fa-sign-in-alt"></i>
                    <strong>Welcome!</strong>
                    <span>Sign in to your account</span>

                    <form onSubmit={handleSubmitLogin}>

                        <div className="form">
                            <div className="form-row">
                                <i className="fas fa-envelope"></i>
                                <label className="form-label" htmlFor="email" >E-mail</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="enter your e-mail"
                                    onChange={handleFormLogin}
                                    className="form-text" />
                            </div>
                            <div className="form-row">
                                <i className="fas fa-eye"></i>
                                <label className="form-label" htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-text"
                                    placeholder="enter your password"
                                    onChange={handleFormLogin}
                                />
                            </div>

                            <div className="form-row button-login">
                                <button className="btn btn-login">Sign in <i className="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="register">
                    <i className="fas fa-cicle-user"></i>
                    <strong>Create account!</strong>
                    <form onSubmit={handleSubmitSignup}>
                        <fieldset>
                            <div className="form">
                                <div className="form-row">
                                    <i className="fas fa-user"></i>
                                    <label className="form-label" htmlFor="name" >Name</label>
                                    <input name="name" type="text" className="form-text" placeholder="enter your name" onChange={handleFormSignup} />
                                </div>
                                <div className="form-row">
                                    <i className="fas fa-envelope"></i>
                                    <label className="form-label" htmlFor="email">E-mail</label>
                                    <input name="email" type="email" className="form-text" placeholder="enter your e-mail" onChange={handleFormSignup} />
                                </div>
                                <div className="form-row">
                                    <i className="fas fa-lock"></i>
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input name="password" type="password" className="form-text" placeholder="enter a password" onChange={handleFormSignup} />
                                </div>
                                <div className="form-row button-login">
                                    <button className="btn btn-login">Create <i className="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </section>
        </main>
    )
}