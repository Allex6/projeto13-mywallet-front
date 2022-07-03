import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import NewEntrance from './components/NewEntrance';
import NewOutgoing from './components/NewOutgoing';
import Register from './components/Register';
import UserContext from './contexts/UserContext';

import './css/reset.css';
import './css/style.css';

function App() {

  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
    <UserContext.Provider value={{user, setUser}}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/" element={<Main />} />
        <Route path="/nova-entrada" element={<NewEntrance />} />
        <Route path="/nova-saida" element={<NewOutgoing />} />
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;