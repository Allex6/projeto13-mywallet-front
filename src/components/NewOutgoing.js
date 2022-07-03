import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import TransactionForm from "./TransactionForm";
import axios from 'axios';

export default function NewOutgoing(){

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if(!user.token) {
        alert('Você não está autenticado.');
        navigate('/login');
    }

    async function newOutgoing(event){

        event.preventDefault();
        const formData = new FormData(event.target);
        const value = formData.get('value');
        const title = formData.get('title');

        try {
            
            const requestConfig = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const bodyData = {
                value,
                title
            }

            await axios.post('http://localhost:5000/new-outgoing', bodyData, requestConfig);
            navigate('/');

        } catch (err) {
            console.log(err);
            alert('Ocorreu um erro ao cadastrar uma nova entrada. Tente novamente.');
        }

    }

    return (
        <>
            <div class="screen">
                <div class="header d-flex">
                    <h2>Nova saída</h2>
                </div>
                <TransactionForm submitFn={newOutgoing} submitText="Salvar saída" />

            </div>
        </>
    );

};