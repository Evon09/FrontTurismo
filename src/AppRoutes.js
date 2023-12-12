import Home from './view/Home';
import UserForm from './view/Cadastro';
import UserList from './view/user/UserList';

import NotFound from './view/NotFound';
import CadTour from './view/adm/CadTour';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './view/Login';

import Shop from './view/user/Shop';
import Reserva from './view/user/Reserva';

import CadPacote from './view/adm/CadPacote';
import AuthContext from './contexts/auth';

import Perfil from './view/user/Perfil';
import PacoteDetails from './view/PacoteDetails';
import Pacotes from './view/Pacote';
import Tours from './view/adm/Tours';

const IsAdm = ({ Item }) => {
  const auth = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adm = await auth.isAdm(auth.token, auth.id);
        setIsAdmin(adm);
      } catch (error) {
        console.error('Erro ao verificar se o usuário é administrador:', error);
      }
    };

    checkAdminStatus();
  }, [auth.token, auth.id]);

  return isAdmin ? <Item /> : <Home />;
};

const Private = ({ Item }) => {
  const auth = useContext(AuthContext);

  return auth.username ? <Item /> : <Login />;
};

const Loged = ({ Item }) => {
  const auth = useContext(AuthContext);

  return !auth.username ? <Item /> : <Home />;
};

const AppRoutes = () => {
  return (
    <Fragment>
      <Routes>
        {/* desologado */}
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Loged Item={UserForm} />} />
        <Route path="/login" element={<Loged Item={Login} />} />
        <Route path="/pacotes/:id" element={<PacoteDetails />} />
        <Route path="/pacotes" element={<Pacotes />} />

        {/* Logado  user*/}
        <Route path="/perfil" element={<Private Item={Perfil} />} />
        {/* <Route path="/shop" element={<Private Item={Shop} />} /> */}
        <Route path="/reserva" element={<Private Item={Reserva} />} />

        {/* Logado  adm*/}
        <Route path="/adm/perfil" element={<IsAdm Item={UserList} />} />
        <Route path="/adm/pacotes" element={<IsAdm Item={Pacotes} />} />
        <Route
          path="/adm/dashboard-agencia/pacote"
          element={<IsAdm Item={CadPacote} />}
        />
        <Route
          path="/adm/dashboard-agencia/tour"
          element={<IsAdm Item={CadTour} />}
        />
        <Route
          path="/adm/tours"
          element={<IsAdm Item={Tours} />}
        />
        <Route path="/adm/reserva" element={<isAdm Item={Reserva} />} />

        {/* NAO ENCONTROU NADA */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default AppRoutes;
