import React, { useContext, useEffect, useState } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import AuthContext from '../../contexts/auth';

const PerfilUser = () => {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await auth.UserInfo(auth.token, auth.id);
        setUser(user);
      } catch (error) {
        setUser(null);
        console.error('Erro ao verificar se o usuário é administrador:', error);
      }
    };

    checkAdminStatus();
  }, [auth.token, auth.id]);

  return (
    <Box
      p={8}
      w="70vw"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      color="gray.800"
    >
      <Heading as="h2" size="xl" mb={4} color="teal.500">
        Perfil do Usuário
      </Heading>
      {user ? (
        <Flex w="100%" justify="space-around">
          <Flex direction="column">
            <Text fontSize="lg" mb={2}>
              <strong>ID:</strong> {user.id}
            </Text>
            <Text fontSize="lg" mb={2}>
              <strong>Nome:</strong> {user.nome}
            </Text>
          </Flex>
          <Flex direction="column">
            <Text fontSize="lg" mb={2}>
              <strong>Email:</strong> {user.email}
            </Text>
            <Text fontSize="lg" mb={2}>
              <strong>Tipo:</strong> {user.tipo}
            </Text>
          </Flex>

          {/* Adicione outras informações do perfil conforme necessário */}
        </Flex>
      ) : (
        <Text fontSize="lg">
          Não foi possível carregar o perfil do usuário.
        </Text>
      )}
    </Box>
  );
};

export default PerfilUser;
