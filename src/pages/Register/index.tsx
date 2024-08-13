import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Register.module.scss';
import { login as loginAuth } from '../../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../types/interfaces';
import { insertUser } from '../../services/UserService';
import { readErros } from '../../helpers';
import { auth } from '../../services/AuthService';

const RegisterPage: React.FC = () => {
    const [user, setUser] = useState<User>({
        id_user: 0,
        name: '',
        login: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        insertUser(user)
            .then((response) => {
                console.log(response);
                if (response.id_user) {
                    handleLogin(user.login, user.password);
                } else if (response.errors) {
                    setError(readErros(response.errors));
                } else {
                    setError("Falha ao realizar o cadastro!");
                }
            }).catch(() => {
                setError("Falha ao realizar o cadastro!");
            }).finally(() => setLoading(false));
    };

    function handleLogin(login: string, password: string) {
        setLoading(true);
        auth(login, password)
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
            }).finally(() => setLoading(false));
    };

    return (
        <div className={styles.container}>
            <form
                className="row g-3"
                onSubmit={handleRegister}
            >
                <h2>Cadastro</h2>
                <div className="col-md-12">
                    <label
                        htmlFor="name"
                        className="form-label"
                    >
                        Nome
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label
                        htmlFor="login"
                        className="form-label"
                    >
                        Login
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="login"
                        value={user.login}
                        onChange={(e) => setUser({ ...user, login: e.target.value })}
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label
                        htmlFor="password"
                        className="form-label"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                            'Cadastrar'
                        }
                    </button>
                </div>
                <div className="col-12">
                    <Link to={'/'}>Já tem cadastro ?</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
