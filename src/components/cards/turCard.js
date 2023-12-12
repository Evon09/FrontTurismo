import { DeleteIcon } from '@chakra-ui/icons';
import {
  VStack,
  Image,
  Flex,
  Text,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import { useContext, useEffect, useState } from 'react';

function Remove({ id }) {
  const auth = useContext(AuthContext);
  const toast = useToast();
  return (
    <Flex
      position="absolute"
      zIndex="100"
      bg="red"
      w="7"
      h="7"
      borderRadius="50%"
      align="center"
      justify="center"
      top="10px"
      right="10px"
    >
      <Button
        bg="transparent"
        _hover={{ bg: 'transparent' }}
        onClick={async () => {
          try {
            await auth.deletePacote(auth.token, id);
          } catch (err) {
            toast({
              title: 'Erro ao apagar Tour',
              description: 'Este tour esta em um pacote.',
              status: 'error',
              duration: 5000,
              isClosable: false,
            });
            console.log(err);
          }
        }}
      >
        <DeleteIcon size="10px"></DeleteIcon>
      </Button>
    </Flex>
  );
}

export default function PacoteCard({ img, nome, dataIda, dataVolta, id }) {
  const auth = useContext(AuthContext);
  const [adm, setAdm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adm = await auth.isAdm(auth.token, auth.id);
        setAdm(adm);
      } catch (error) {
        console.error('Erro ao obter informações:', error);
      }
    };

    fetchData();
  }, [auth.id, auth.token, auth]);

  return (
    <>
      <VStack
        bg="#f4f8fb"
        paddingTop="10px"
        paddingBottom="10px"
        borderRadius="10px"
        w={{ sm: '80vw', md: '300px', base: '90vw' }}
        position="relative"
      >
        {adm ? <Remove id={id} /> : <></>}
        <Text>{nome}</Text>
        <Box overflow="hidden">
          <Image src={img} objectFit="cover" w="100%" h="100%" />
        </Box>
        <Flex justifyContent="space-between" w="100%">
          <Text>Ida: {dataIda}</Text>
          <Text>Volta: {dataVolta}</Text>
        </Flex>
        <Link to={`/pacotes/${id}`}>
          <Button>Reservar</Button>
        </Link>
      </VStack>
    </>
  );
}
