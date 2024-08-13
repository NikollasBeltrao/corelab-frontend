import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';
import { login as loginAuth } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/AuthService';
import { readErros } from '../../helpers';

const LoginPage: React.FC = () => {
    const [formLogin, setFormLogin] = useState({ login: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        auth(formLogin.login, formLogin.password)
            .then((response) => {
                if (response.status === 200) {
                    const { token, name, login, id_user } = response.data;
                    dispatch(loginAuth({ token, name, login, id: id_user }));
                    navigate('/home');
                } else if (response.status === 422) {
                    setError(readErros(response?.data?.errors));
                } else if (response.status === 401) {
                    setError("Login ou senha incorretos!");
                } else {
                    setError("Falha ao realizar o login!");
                }
            }).catch(() => {
                setError("Falha ao realizar o login!");
            }).finally(() => setLoading(false));
    };

    return (
        <div className={styles.container}>
            <form
                className="row g-3"
                onSubmit={handleLogin}
            >
                <h2>Login</h2>
                <div className="col-md-12">
                    <label
                        htmlFor="validationServer01"
                        className="form-label"
                    >
                        Login
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationServer01"
                        value={formLogin.login}
                        onChange={(e) => setFormLogin({ ...formLogin, login: e.target.value })}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label
                        htmlFor="validationServer02"
                        className="form-label"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="validationServer02"
                        value={formLogin.password}
                        onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                        required
                    />
                </div>
                <span className="text-danger">{error}</span>
                <div className="col-12">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ?
                            <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Carregando...</span>
                            </>
                            :
                            'Entrar'
                        }
                    </button>
                </div>
                <div className="col-12">
                    <Link to={'/register'}>Ainda não tem cadastro ?</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
