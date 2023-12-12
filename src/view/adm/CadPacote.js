import { Button, Flex, Text } from '@chakra-ui/react';
import ExtendedTurCard from '../../components/cards/extendedTurCard';
// import TurCard from '../components/cards/turCard';
import Header from '../../components/commons/Header';

import FeedBacks from '../../components/commons/feedBacks';

import FeedBackForm from '../../components/form/feedBackForm';
import TourCadastro from '../../components/form/TourCadastro';
import PacoteCadastro from '../../components/form/PacoteCadastro';

export default function CadPacote() {
  return (
    <>
      <Header />
      <Flex
        direction="column"
        h="100vh"
        align="center"
        justify="space-between"
        gap="20px"
      >
        <Flex align="center" justifyContent="center" h="100%" m="20px">
          <PacoteCadastro></PacoteCadastro>
        </Flex>
      </Flex>
    </>
  );
}
