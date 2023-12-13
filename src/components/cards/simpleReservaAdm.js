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
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/auth';
import { Link } from 'react-router-dom';

function Remove() {
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
      <Button bg="transparent" _hover={{ bg: 'transparent' }}>
        <DeleteIcon size="10px"></DeleteIcon>
      </Button>
    </Flex>
  );
}

export default function SimpleReservaAdm({
  img,
  destino,
  valor,
  descricao,
  id,
}) {
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
        {adm ? <Remove /> : <></>}
        <Box overflow="hidden" w="40%">
          <Image src={img} objectFit="cover" w="100%" h="100%" />
        </Box>
        <Flex
          w="60%"
          justify="space-between"
          gap="30px"
          p="20px"
          align="center"
        >
          <Flex direction="column" w="20%">
            <Text>Destino: {destino}</Text>
            <Text>Valor:{valor}</Text>
          </Flex>
          <Flex direction="column" w="50%" overflowY="scroll">
            {descricao && descricao.length > 0 ? (
              descricao.map((item, index) => (
                <Flex key={index} direction="column">
                  <Text fontSize="20px">{item.nome}</Text>
                  <Text fontSize="15px">{item.email}</Text>
                </Flex>
              ))
            ) : (
              <Text>Ta carregando...</Text>
            )}
          </Flex>
          <Button as={Link} to={`/pacotes/${id}`}>
            Abrir
          </Button>
        </Flex>
      </HStack>
    </>
  );
}
