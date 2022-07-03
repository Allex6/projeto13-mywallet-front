import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import TransactionItem from './TransactionItem';
import UserContext from '../contexts/UserContext';

export default function Main(){

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const [transactions, setTransactions] = useState([]);
    const saldo = String(transactions.reduce((prev, current)=>{

        let value = current.value;
        if(current.type !== 'entrance') value *= -1;

        return prev + parseFloat(value);

    }, 0));

    useEffect(()=>{

        (async ()=>{

            try {
                
                const requestConfig = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };

                const response = await axios.get('http://localhost:5000/transactions', requestConfig);
                setTransactions(response.data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao carregar a lista de transações. Tente novamente.');
            }

        })();

    }, []);

    if(!user.token) {
        alert('Você não está autenticado.');
        navigate('/login');
    }

    async function logout(){

        try {
            
            const requestConfig = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            await axios.delete('http://localhost:5000/logout', requestConfig);
            navigate('/login');

        } catch (err) {
            console.log(err);
            alert('Ocorreu um erro ao sair da sua conta. Tente novamente.');
        }

    }

    return (
        <>
            <div className="index-screen screen d-flex">

                <div className="header d-flex">
                    <h2>Olá, Fulano</h2>
                    <ion-icon onClick={logout} name="log-out-outline"></ion-icon>
                </div>

                <div className="transactions-list d-flex">

                    {
                        transactions.length === 0 ?
                            <p className="no-records">Não há registros <br /> de entrada ou saída.</p>
                        :
                            null
                    }

                    {transactions.map(transaction => <TransactionItem title={transaction.title} type={transaction.type} value={transaction.value} date={transaction.date} />)}
                    

                    <div className="total d-flex">
                        <span><strong>SALDO</strong></span>
                        <span className={`${saldo >= 0 ? 'text-success' : 'text-danger'}`}>{saldo.replace(/\./gi, ",")}</span>
                    </div>

                </div>

                <div className="actions d-flex">

                    <Link to="/nova-entrada" >
                        <div className="add-entry">
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <p>Nova entrada</p>
                        </div>
                    </Link>

                    <Link to="/nova-saida">
                        <div className="add-expense">
                            <ion-icon name="remove-circle-outline"></ion-icon>
                            <p>Nova saída</p>
                        </div>
                    </Link>

                </div>

            </div>
        </>
    );

};