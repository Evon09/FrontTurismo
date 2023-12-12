import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  CardBody,
  HStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import StarRating from './starRating';
import { DeleteIcon } from '@chakra-ui/icons';
import AuthContext from '../../contexts/auth';
import { useContext } from 'react';

function Remove({ idFeedback }) {
  const toast = useToast();
  const auth = useContext(AuthContext);
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
            await auth.deleteFeedback(idFeedback);
            window.location.reload();
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

export default function Comentario({
  nota,
  nome,
  comentario,
  idFeedback,

  idUser,
}) {
  const auth = useContext(AuthContext);
  return (
    <>
      <Card w="70vw" position={'relative'}>
        {idUser === auth.id ? (
          <Flex position="absolute" top="20px" right={'20px'}>
            <Remove idFeedback={idFeedback}></Remove>
          </Flex>
        ) : (
          <></>
        )}

        <HStack>
          <CardHeader>
            <Flex>
              <Flex alignItems="center" flexWrap="wrap">
                <Avatar name={nome} src={`https://bit.ly/${nome}`} />
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <Box>
                <Heading size="sm">{nome}</Heading>
                <StarRating rating={nota}></StarRating>
              </Box>
              <Text>{comentario}</Text>
            </Flex>
          </CardBody>
        </HStack>
      </Card>
    </>
  );
}
