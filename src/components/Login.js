import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

export default function Login(){

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function doLogin(event){

        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if(!email || !password){
            alert('Preencha todos os campos.');
            return;
        }

        try {
            
            const response = await axios.post('https://lovely-kings-canyon-54355.herokuapp.com/login', { email, password });
            setUser(response.data);
            navigate('/');

        } catch (err) {
            console.log(err);
            alert('Ocorreu um erro ao fazer login. Verifique se digitou as credenciais corretas.');
        }

    }

    return (
        <>
            <div className="login screen">
                <div className="logo">
                    <h1>MyWallet</h1>
                </div>
                <form className="login-form d-flex" onSubmit={doLogin}>
                    <input type="email" name="email" placeholder="E-mail" />
                    <input type="password" name="password" placeholder="Senha" />
                    <button type="submit">Entrar</button>
                    <Link to="/cadastro">
                        <strong>Primeira vez ? Cadastre-se!</strong>
                    </Link>
                    
                </form>
            </div>
        </>
    );

};