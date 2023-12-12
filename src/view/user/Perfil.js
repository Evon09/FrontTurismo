import React, { useContext, useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Header from '../../components/commons/Header';
import PerfilUser from '../../components/commons/perfil';
import SimpleReserva from '../../components/cards/simpleReserva';
import AuthContext from '../../contexts/auth';
import SimpleReservaAdm from '../../components/cards/simpleReservaAdm';

const Perfil = () => {
  const auth = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  const [adm, setAdm] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adm = await auth.isAdm(auth.token, auth.id);
        setAdm(adm);

        const reservas = adm
          ? await auth.reservaAgencia(auth.token, auth.id)
          : await auth.pacotesUser(auth.token, auth.id);

        setReservas(reservas);
      } catch (error) {
        setReservas([]); // Set to an empty array to avoid 'undefined' in the map
        console.error('Erro ao verificar se o usuário é administrador:', error);
      }
    };

    checkAdminStatus();
  }, []);

  // Move the function declaration above its usage
  const somaPrecosPasseios = passeios =>
    passeios
      ? passeios.reduce((total, passeio) => total + passeio.preco, 0)
      : 0;

  // Check if pacotes is defined before mapping
  const pacotesList =
    reservas && reservas.length > 0
      ? reservas.map(item => (
          <SimpleReserva
            destino={item.passeios[0].destino}
            id={item.id}
            img={item.passeios[0].imagem}
            valor={somaPrecosPasseios(item.passeios)}
            key={item.id}
            descricao={item.passeios}
          ></SimpleReserva>
        ))
      : null;

  const pacotesListAdm =
    reservas && reservas.length > 0
      ? reservas.map(item => (
          <SimpleReservaAdm
            destino={item.passeios[0].destino}
            id={item.id}
            img={item.passeios[0].imagem}
            valor={somaPrecosPasseios(item.passeios)}
            key={item.id}
            descricao={item.passeios}
          ></SimpleReservaAdm>
        ))
      : null;

  return (
    <>
      <Header />
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="20px"
        marginTop="20px"
      >
        <PerfilUser />
        {adm ? pacotesList : pacotesListAdm}
      </Flex>
    </>
  );
};

export default Perfil;
