import { Button, Flex, Text } from '@chakra-ui/react';
import ExtendedTurCard from '../components/cards/extendedTurCard';
// import TurCard from '../components/cards/turCard';
import Header from '../components/commons/Header';

import FeedBacks from '../components/commons/feedBacks';

import FeedBackForm from '../components/form/feedBackForm';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100%"
        bg="gray.200"
      >
        <Text fontSize="100">Seja Bem vindo!!</Text>
        <Text fontSize="90">Vamos viajar?</Text>
        <Button
          as={Link}
          to="/pacotes"
          bg="gray.100"
          _hover={{ bg: 'gray.700', color: 'white' }}
        >
          Reservar
        </Button>
      </Flex>
    </Flex>
  );
}
