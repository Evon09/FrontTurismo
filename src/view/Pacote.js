import React, { useContext, useEffect, useState } from 'react';
import { Grid, Box, useBreakpointValue, Text, Flex } from '@chakra-ui/react';

import PacoteCard from '../components/cards/turCard';
import Header from '../components/commons/Header';
import AuthContext from '../contexts/auth';

export default function Pacotes() {
  const auth = useContext(AuthContext);
  const [pacotes, setPacotes] = useState([]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const pacotes = await auth.Pacotes(auth.token);
        setPacotes(pacotes);
        console.log(pacotes);
      } catch (error) {
        setPacotes(null);
        console.error('Erro ao verificar se o usuário é administrador:', error);
      }
    };

    checkAdminStatus();
  }, []);

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4, xl: 5 });

  return (
    <>
      <Flex direction="column" h="100vh">
        <Header />

        <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
          {pacotes && Array.isArray(pacotes) ? (
            pacotes.map(item => (
              <Box key={item.id} p={4}>
                <PacoteCard
                  dataIda={item.dataInicial}
                  dataVolta={item.dataFinal}
                  img={item.passeios[0].imagem}
                  nome={item.passeios[0].destino}
                  id={item.id}
                />
              </Box>
            ))
          ) : (
            <Text>Nenhum pacote disponível.</Text>
          )}
        </Grid>
      </Flex>
    </>
  );
}
