import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register(){

    const navigate = useNavigate();

    async function doRegister(event){

        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const password = formData.get('password');
        const email = formData.get('email');
        const confirmPassword = formData.get('confirmPassword');

        if(password !== confirmPassword){
            alert('As senhas não coincidem.');
            return;
        }

        if(!name || !email || !password || !confirmPassword){
            alert('Preencha todos os campos.');
            return;
        }

        try {

            const bodyData = {
                name,
                email,
                password,
                confirmPassword
            };

            await axios.post('http://localhost:5000/cadastro', bodyData);
            alert('Cadastro realizado com sucesso. Estamos te redirecionando para a página de login.');
            setTimeout(() => navigate('/login'), 1000);

        } catch (err) {
            console.log(err);
            alert('Ocorreu um erro ao fazer seu cadastro. Tente novamente.');
        }

    }

    return (
        <>
            <div className="register screen">
                <div className="logo">
                    <h1>MyWallet</h1>
                </div>
                <form className="login-form d-flex" onSubmit={doRegister}>
                    <input type="name" name="name" placeholder="Nome" />
                    <input type="email" name="email" placeholder="E-mail" />
                    <input type="password" name="password" placeholder="Senha" />
                    <input type="password" name="confirmPassword" placeholder="Confirme a senha" />
                    <button type="submit">Cadastrar</button>
                    <Link to="/login">
                        <strong>Já tem uma conta ? Entre agora!</strong>
                    </Link>
                </form>

            </div>
        </>
    );

};