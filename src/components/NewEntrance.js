import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import TransactionForm from "./TransactionForm";
import axios from 'axios';

export default function NewEntrance(){

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if(!user.token) {
        alert('Você não está autenticado.');
        navigate('/login');
    }

    async function newEntrance(event){

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

            await axios.post('https://lovely-kings-canyon-54355.herokuapp.com/new-entrance', bodyData, requestConfig);
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
                    <h2>Nova entrada</h2>
                </div>

                <TransactionForm submitFn={newEntrance} submitText="Salvar entrada" />

            </div>
        </>
    );

};