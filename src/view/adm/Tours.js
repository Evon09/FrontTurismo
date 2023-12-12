import { Box, Center, Flex, SimpleGrid } from '@chakra-ui/react';

import Header from '../../components/commons/Header';
import CadastroForm from '../../components/form/cadastro';
import { ShopCart } from '../../components/shop/App';
import SimpleTur from '../../components/cards/simpleTur';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/auth';

export default function Tours() {
  const auth = useContext(AuthContext);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const tours = await auth.Tours(auth.token);
        setTours(tours);
      } catch (error) {
        setTours(null);
        console.error('Erro ao verificar se o usuário é administrador:', error);
      }
    };

    checkAdminStatus();
  }, []);

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
        {tours.map(item => (
          <SimpleTur
            descricao={item.itinerario}
            img={item.imagem}
            destino={item.destino}
            valor={item.preco}
            id={item.id}
          ></SimpleTur>
        ))}
      </Flex>
    </>
  );
}
