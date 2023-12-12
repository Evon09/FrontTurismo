import { DeleteIcon } from '@chakra-ui/icons';
import {
  VStack,
  Image,
  Flex,
  Text,
  Box,
  Button,
  HStack,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/auth';

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
            await auth.deleteTour(auth.token, id);
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

export default function SimpleTur({ img, destino, valor, descricao, id }) {
  const { colorMode } = useColorMode();
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
      <HStack
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
        paddingTop="10px"
        paddingBottom="10px"
        borderRadius="10px"
        h="20vh"
        w="70vw"
        overflow="hidden"
        position="relative"
      >
        {adm ? <Remove id={id} /> : <></>}
        <Box overflow="hidden" w="40%">
          <Image src={img} objectFit="cover" w="100%" h="100%" />
        </Box>
        <Flex justify="space-between" w="60%" gap="30px">
          <Flex direction="column" w="20%">
            <Text>Destino: {destino}</Text>
            <Text>Valor:{valor}</Text>
          </Flex>
          <Text w="60%">{descricao}</Text>
        </Flex>
      </HStack>
    </>
  );
}
