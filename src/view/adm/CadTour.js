import { Button, Flex, Text } from '@chakra-ui/react';
import ExtendedTurCard from '../../components/cards/extendedTurCard';
// import TurCard from '../components/cards/turCard';
import Header from '../../components/commons/Header';

import FeedBacks from '../../components/commons/feedBacks';

import FeedBackForm from '../../components/form/feedBackForm';
import TourCadastro from '../../components/form/TourCadastro';

export default function CadTour() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex align="center" justifyContent="center" h="100%">
        <TourCadastro></TourCadastro>
      </Flex>
    </Flex>
  );
}
